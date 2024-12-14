export function startup(rawStartup: string, variables: Record<string, string>) {
  Object.keys(variables).forEach((key) => {
    rawStartup = rawStartup.replace(new RegExp(`{{${key}}}`, 'g'), variables[key])
  })

  return rawStartup
}
