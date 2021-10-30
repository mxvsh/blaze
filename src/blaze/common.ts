import fs from 'fs'
import { Api, TelegramClient } from 'telegram'
import { CustomFile } from 'telegram/client/uploads'

class BlazeCommon {
  client: TelegramClient
  userPicture: string = __dirname + '/.blaze/assets/profile.jpg'

  constructor(client: TelegramClient) {
    this.client = client
  }

  async updateProfilePicture(fileLocation: string) {
    const result = await this.client.invoke(
      new Api.photos.UploadProfilePhoto({
        file: await this.client.uploadFile({
          file: new CustomFile(
            'photo.png',
            fs.statSync(fileLocation).size,
            fileLocation
          ),
          workers: 1,
        }),
      })
    )

    return result
  }

  async downloadProfilePicture(user: string) {
    const buffer = await this.client.downloadProfilePhoto(user, { isBig: true })
    return buffer
  }
}
export { BlazeCommon }
