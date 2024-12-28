import Node from '#models/node'
import { THRESHOLD_PERCENTAGE_LOW, THRESHOLD_PERCENTAGE_MEDIUM } from '#utils/variables'
import YAML from 'yaml'

export function css(usage: number, total: number) {
  const percentage = (usage / total) * 100
  switch (true) {
    case percentage < THRESHOLD_PERCENTAGE_LOW:
      return 'green'
    case percentage < THRESHOLD_PERCENTAGE_MEDIUM:
      return 'yellow'
    default:
      return 'red'
  }
}

export async function getUsage(node: Node) {
  const data = await Node.query()
    .join('servers', 'nodes.id', 'servers.node_id')
    .where('nodes.id', node.id)
    .sum('servers.memory as sum_memory')
    .sum('servers.disk as sum_disk')
    .firstOrFail()

  const stats = node.serialize()
  const extras = data.$extras

  return Object.keys(extras).reduce((acc: Record<string, any>, k) => {
    const key = k.replace('sum_', '')
    const value = Number.parseInt(extras[k]) || 0
    const max = stats[key] * (1 + stats[key + '_overallocate'] / 100)
    acc[key] = {
      value: value,
      max: max,
      percent: ((value / max) * 100).toFixed(2),
      css: css(extras[k], stats[key]),
    }

    return acc
  }, {})
}

export function getConfig(node: Node, remote: string) {
  return {
    debug: false,
    uuid: node.uuid,
    token_id: node.daemonTokenId,
    token: node.daemonToken,
    api: {
      host: '0.0.0.0',
      port: node.daemonListen,
      ssl: {
        enabled: !node.behindProxy && node.scheme === 'https',
        cert: '/etc/letsencrypt/live/' + node.fqdn.toLowerCase() + '/fullchain.pem',
        key: '/etc/letsencrypt/live/' + node.fqdn.toLowerCase() + '/privkey.pem',
      },
      upload_limit: node.uploadSize,
    },
    system: {
      data: node.daemonBase,
      sftp: {
        bind_port: node.daemonSftp,
      },
    },
    allowed_mounts: [],
    remote,
  }
}

export function getYamlConfig(node: Node, remote: string) {
  return YAML.stringify(getConfig(node, remote))
}
