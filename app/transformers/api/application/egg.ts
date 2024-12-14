import type Egg from '#models/egg'

export default function eggTransformer(egg: Egg) {
  const images = JSON.parse(egg.dockerImages!)
  return {
    object: 'egg',
    attributes: {
      id: egg.id,
      uuid: egg.uuid,
      name: egg.name,
      nest: egg.nestId,
      author: egg.author,
      description: egg.description,
      docker_image: images ? Object.values(images)[0] : null,
      docker_images: images,
      config: {
        files: JSON.parse(egg.configFiles!),
        startup: JSON.parse(egg.configStartup!),
        stop: egg.configStop,
        logs: JSON.parse(egg.configLogs!),
        extends: egg.copyScriptFrom,
      },
      startup: egg.startup,
      script: {
        privileged: egg.scriptIsPrivileged,
        install: egg.scriptInstall,
        entry: egg.scriptEntry,
        container: egg.scriptContainer,
        extends: egg.copyScriptFrom,
      },
      created_at: egg.createdAt,
      updated_at: egg.updatedAt,
    },
  }
}
