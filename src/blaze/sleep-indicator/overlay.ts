import Jimp from 'jimp'
import path from 'path'

const addOverlay = async (imageLink: string, overlay: string) => {
  const image = await Jimp.read(imageLink)
  let watermark = await Jimp.read(path.join(__dirname, 'overlays', overlay))

  watermark = watermark.resize(image.bitmap.width, image.bitmap.height)

  watermark = await watermark

  image.grayscale()

  image.composite(watermark, 0, 0, {
    mode: Jimp.BLEND_SOURCE_OVER,
    opacityDest: 1,
    opacitySource: 1,
  })

  return image.getBufferAsync('image/jpeg')
}

export { addOverlay }
