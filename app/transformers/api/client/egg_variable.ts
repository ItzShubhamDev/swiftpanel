import type ServerVariable from '#models/server_variable'

export default function eggVariableTransformer(variable: ServerVariable) {
  return {
    object: 'egg_variable',
    attributes: {
      name: variable.variable.name,
      description: variable.variable.description,
      env_variable: variable.variable.envVariable,
      default_value: variable.variable.defaultValue,
      server_value: variable.variableValue,
      is_editable: variable.variable.userEditable,
      rules: variable.variable.rules,
    },
  }
}
