import fs from 'fs'
import { TelegramClient } from 'telegram'
import { SleepIndicator } from './sleep-indicator'

if (!fs.existsSync('.blaze')) {
  fs.mkdirSync(__dirname, '/.blaze')
  fs.mkdirSync(__dirname, '/.blaze/assets')
  fs.mkdirSync(__dirname, '/.blaze/config')
}

class Blaze {
  client: TelegramClient

  constructor(client: TelegramClient) {
    this.client = client
    this.init()
  }

  async init() {
    await this.client.start({ botAuthToken: '' })

    new SleepIndicator(this.client)
  }
}

export { Blaze }
