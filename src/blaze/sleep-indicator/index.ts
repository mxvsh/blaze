import cron from 'node-cron'
import fs from 'fs'
import tmp from 'tmp'
import { TelegramClient } from 'telegram'
import { SleepIndicatorConfig } from '../../types'

import config from '../../providers/config'
import { addOverlay } from './overlay'
import { BlazeCommon } from '../common'

class SleepIndicator extends BlazeCommon {
  client: TelegramClient
  config: SleepIndicatorConfig | undefined

  constructor(client: TelegramClient) {
    super(client)

    this.client = client
    this.config = config.get('sleep-indicator')

    if (this.config === undefined) {
      // set default time
      config.set('sleep-indicator', {
        from: '2200',
        to: '0600',
      })
    }
  }

  async init() {
    cron.schedule('00 22 * * *', () => {
      this.update()
    })

    cron.schedule('00 06 * * *', () => {
      this.revert()
    })
  }

  private async update() {
    const buffer = await addOverlay(this.userPicture, '03.png')
    const tmpFile = tmp.fileSync()

    fs.writeFileSync(tmpFile.name, buffer)
    this.updateProfilePicture(tmpFile.name)
  }

  private async revert() {}
}
export { SleepIndicator }
