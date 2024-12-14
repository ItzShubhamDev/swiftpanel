import Egg from '#models/egg'

export default function EggExportTransformer(egg: Egg) {
  return {
    _comment: 'DO NOT EDIT: FILE GENERATED AUTOMATICALLY BY SWIFT PANEL - SWIFTPANEL.IO',
    meta: {
      version: 'SWDL_v1',
      update_url: null,
    },
    exported_at: new Date().toLocaleString(),
    name: egg.name,
    author: egg.author,
    description: egg.description,
    features: JSON.parse(egg.features ?? '[]'),
    docker_images: JSON.parse(egg.dockerImages ?? '{}'),
    file_denylist: JSON.parse(egg.fileDenylist ?? '[]'),
    startup: egg.startup,
    config: {
      files: JSON.parse(egg.configFiles ?? '{}'),
      startup: JSON.parse(egg.configStartup ?? '{}'),
      logs: JSON.parse(egg.configLogs ?? '{}'),
      stop: egg.configStop,
    },
    scripts: {
      installation: {
        script: egg.scriptInstall,
        container: egg.scriptContainer,
        entrypoint: egg.scriptEntry,
      },
    },
    variables: egg.eggVariables.map((variable) => ({
      name: variable.name,
      description: variable.description,
      env_variable: variable.envVariable,
      default_value: variable.defaultValue,
      user_viewable: variable.userViewable,
      user_editable: variable.userEditable,
      rules: variable.rules,
      field_type: 'text',
    })),
  }
}
