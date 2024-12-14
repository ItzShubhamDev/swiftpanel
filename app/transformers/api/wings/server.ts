import Server from '#models/server'
import { convertStopToNewFormat, parseConfig } from '#utils/api/remote/servers'
import { STATUS_SUSPENDED } from '#utils/variables'
import { startup } from '#utils/api/client/servers'

export default function serverTransformer(server: Server) {
  const environment = {} as Record<string, string>
  server.serverVariables.map((v) => {
    const name = v.variable.envVariable
    environment[name] = v.variableValue
  })

  const allocationsMapping = {} as Record<string, any>
  server.allocations.map((a) => {
    allocationsMapping[a.ip]
      ? allocationsMapping[a.ip].push(a.port)
      : (allocationsMapping[a.ip] = [a.port])
  })

  const variables = server.serverVariables.reduce(
    (acc, v) => {
      acc[v.variable.envVariable] = v.variableValue
      return acc
    },
    {} as Record<string, string>
  )

  return {
    uuid: server.uuid,
    settings: {
      uuid: server.uuid,
      meta: {
        name: server.name,
        description: server.description,
      },
      suspended: server.status === STATUS_SUSPENDED,
      environment: {
        ...environment,
        STARTUP: startup(server.startup, variables),
        P_SERVER_LOCATION: server.node.location.short,
        P_SERVER_UUID: server.uuid,
        P_SERVER_ALLOCATION_LIMIT: server.allocationLimit,
      },
      invocation: server.startup,
      skip_egg_scripts: server.skipScripts,
      build: {
        memory_limit: server.memory,
        swap: server.swap,
        io_weight: server.io,
        cpu_limit: server.cpu,
        threads: server.threads,
        disk_space: server.disk,
        oom_disabled: server.oomDisabled,
      },
      container: {
        image: server.image,
        requires_rebuild: false,
      },
      allocations: {
        force_outgoing_ip: server.egg.forceOutgoingIp,
        default: {
          ip: server.allocations[0].ip,
          port: server.allocations[0].port,
        },
        mappings: allocationsMapping,
      },
      mounts: [],
      egg: {
        id: server.egg.uuid,
        file_denylist: server.egg.fileDenylist,
      },
    },
    process_configuration: {
      startup: {
        done: JSON.parse(server.egg.configStartup!).done,
        user_interaction: [],
        strip_ansi: false,
      },
      stop: convertStopToNewFormat(server.egg.configStop!),
      configs: parseConfig(server, JSON.parse(server.egg.configFiles!)),
    },
  }
}
