import { prompt } from 'enquirer'
import config from '../providers/config'
import { TelegramClient } from 'telegram'
import { StringSession } from 'telegram/sessions'
import { Blaze } from '../blaze'

type LoginProps = {
  apiId: number
  apiHash: string
}

const login = async () => {
  let { apiId, apiHash } = await prompt<LoginProps>([
    {
      type: 'input',
      name: 'apiId',
      message: 'API ID: ',
    },
    {
      type: 'input',
      name: 'apiHash',
      message: 'API Hash: ',
    },
  ])

  apiId = Number(apiId)

  const stringSession = new StringSession('')

  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  })

  await client.start({
    phoneNumber: async () => {
      const response = await prompt<{ phoneNumber: string }>({
        type: 'input',
        name: 'phoneNumber',
        message: 'Enter your Phone Number: ',
      })

      return response.phoneNumber
    },
    password: async () => {
      const response = await prompt<{ password: string }>({
        type: 'password',
        name: 'password',
        message: 'Enter your Password: ',
      })

      return response.password
    },
    phoneCode: async () => {
      const response = await prompt<{ code: string }>({
        type: 'input',
        name: 'code',
        message: 'Enter OTP: ',
      })

      return response.code
    },
    onError: (err) => {
      console.log(err)
      process.exit(-1)
    },
  })

  await client.start({ botAuthToken: '' })
  const session = client.session.save()

  config.set('stringSession', session)
  config.set('apiId', apiId)
  config.set('apiHash', apiHash)

  new Blaze(client)
}

export { login }
