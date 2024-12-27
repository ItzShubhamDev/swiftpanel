import { importEggValidator } from '#validators/admin/eggs'
import EggExportTransformer from './export.js'

type Egg = ReturnType<typeof EggExportTransformer>

export default async function EggImportTransformer(e: Egg) {
  const egg = await importEggValidator.validate(e)
  return {
    name: egg.name,
    author: egg.author,
    description: egg.description,
    dockerImages: JSON.stringify(egg.dockerImages),
    startup: egg.startup,
    configFrom: null,
    copyScriptFrom: null,
    configStop: egg.config.stop,
    configLogs: JSON.stringify(egg.config.logs),
    configFiles: JSON.stringify(egg.config.files),
    configStartup: JSON.stringify(egg.config.startup),
    features: JSON.stringify(egg.features),
    fileDenylist: JSON.stringify(egg.fileDenylist),
    forceOutgoingIp: false,
    scriptContainer: egg.scripts.installation.container,
    scriptEntry: egg.scripts.installation.entrypoint,
    scriptInstall: egg.scripts.installation.script,
    eggVariables: egg.variables.map((variable) => {
      return {
        name: variable.name,
        description: variable.description ?? '',
        envVariable: variable.envVariable,
        defaultValue: variable.defaultValue ?? '',
        userViewable: variable.userViewable,
        userEditable: variable.userEditable,
        rules: variable.rules,
      }
    }),
  }
}
