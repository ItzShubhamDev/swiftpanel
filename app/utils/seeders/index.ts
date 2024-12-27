import EggImportTransformer from '#transformers/admin/egg/import'

type Egg = Awaited<ReturnType<typeof EggImportTransformer>>

type Nest = {
  name: string
  eggs: Egg[]
}

type NestRes = {
  path: string
}

export async function getEggs() {
  const nestsNames = ['minecraft', 'rust']
  const nests = [] as Nest[]
  for (const nest of nestsNames) {
    const res = await fetch(
      `https://api.github.com/repos/pterodactyl/panel/contents/database/Seeders/eggs/${nest}`
    )
    const data = (await res.json()) as NestRes[]
    const eggs = [] as Egg[]
    for (const egg of data) {
      const eggRes = await fetch(
        `https://api.github.com/repos/pterodactyl/panel/contents/${egg.path}`,
        {
          headers: {
            Accept: 'application/vnd.github.2022-11-28.raw',
          },
        }
      )
      const eggData = await eggRes.json()
      try {
        eggs.push(await EggImportTransformer(eggData as any))
      } catch (e) {
        throw new Error(e)
      }
    }
    nests.push({ name: nest, eggs })
  }
  return nests
}
