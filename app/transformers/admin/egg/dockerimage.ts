export function dockerStoreTransform(dockerImages: string) {
  const images = {} as Record<string, string>
  dockerImages.split('\r\n').forEach((image: string) => {
    if (image.includes('|')) {
      const [key, value] = image.split('|', 2)
      images[key] = value
    } else {
      images[image] = image
    }
  })
  return JSON.stringify(images)
}

export function dockerShowTransform(dockerImages: string | null) {
  const images = JSON.parse(dockerImages ?? '{}')
  return Object.keys(images)
    .map((key) => {
      if (key === images[key]) return key
      return `${key}|${images[key]}`
    })
    .join('\r\n')
}
