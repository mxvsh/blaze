import config from './config'

import { TelegramClient } from 'telegram'
import { StringSession } from 'telegram/sessions'

const apiId = Number(config.get('apiId'))
const apiHash = config.get('apiHash')
const stringSession = new StringSession(config.get('stringSession'))

const client = new TelegramClient(stringSession, apiId, apiHash, {
  connectionRetries: 5,
})

export default client
