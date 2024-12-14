import EggVariable from '#models/egg_variable'

export async function getVariables(eggId: number) {
  const egg = await EggVariable.query().where('egg_id', eggId)
  const variables = egg.map((v) => {
    return v.serialize()
  })
  return variables
}
