import { appUrl } from '#config/app'
import Server from '#models/server'
import { pagination } from '#utils/index'

export function convertStopToNewFormat(stop: string) {
  if (!stop.startsWith('^')) {
    return {
      type: 'command',
      value: stop,
    }
  }
  const signal = stop.slice(1)

  return {
    type: 'signal',
    value: signal.toUpperCase(),
  }
}

export function parseConfig(server: Server, config: Record<string, any>) {
  const legacyServer = legacyStructure(server)
  const newConfig = {} as Record<string, any>
  Object.keys(config).map((key) => {
    newConfig['parser'] = config[key]['parser']
    newConfig['file'] = key
    newConfig['replace'] = []
    const c = config[key]['find'] as Record<string, string>
    Object.keys(c).map((replaceKey) => {
      const value = c[replaceKey] as string
      if (typeof value === 'string') {
        newConfig['replace'].push({
          match: replaceKey,
          replace_with: getNestedValue(legacyServer, value),
        })
      } else {
        Object.keys(value).map((replaceValue) => {
          newConfig['replace'].push({
            match: replaceKey,
            if_value: replaceValue,
            replace_with: config[key]['find'][replaceKey][replaceValue],
          })
        })
      }
    })
  })

  return newConfig
}

export function legacyStructure(server: Server) {
  const environment = {} as Record<string, string>
  server.serverVariables.map((v) => {
    const name = v.variable.envVariable
    environment[name] = v.variableValue
  })

  return {
    uuid: server.uuid,
    build: {
      default: {
        ip: server.allocations[0].ip,
        port: server.allocations[0].port,
      },
      ports: server.allocations.map((a) => a.port),
      env: environment,
      oom_disabled: server.oomDisabled,
      memory: server.memory,
      swap: server.swap,
      io: server.io,
      cpu: server.cpu,
      threads: server.threads,
      disk: server.disk,
      image: server.image,
    },
    service: {
      egg: server.egg.uuid,
      skip_scripts: server.skipScripts,
    },
    rebuild: false,
    suspended: server.status === 'suspended',
  }
}

function getNestedValue(obj: Record<string, any>, path: string) {
  const match = path.match(/{{server\.(.*?)}}/)
  if (match) {
    for (const key of match[1].split('.')) {
      obj = obj[key]
    }
  }
  return path.replace(/{{server\..*?}}/, obj as unknown as string)
}

export function wingsPagination(
  total: number,
  perPage: number,
  currentPage: number,
  lastPage: number,
  path: string
) {
  const data = pagination(total, perPage, currentPage, lastPage, path)
  path = appUrl + path
  const links = [
    {
      url: currentPage === 1 ? null : `${path}?page=${currentPage - 1}`,
      label: '&laquo; Previous',
      active: true,
    },
    {
      url: currentPage === lastPage ? null : `${path}?page=${currentPage + 1}`,
      label: 'Next &raquo;',
      active: true,
    },
  ]

  for (let i = 1; i <= lastPage; i++) {
    links.push({
      url: `${path}?page=${i}`,
      label: i.toString(),
      active: i === currentPage,
    })
  }

  return {
    links: data.links,
    meta: {
      current_page: currentPage,
      from: 1,
      last_page: lastPage,
      links,
      path,
      per_page: perPage,
      to: lastPage,
      total,
    },
  }
}
