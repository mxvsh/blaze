import 'dotenv/config'

import { Blaze } from './blaze'
import { login } from './cli/login'
import config from './providers/config'

async function main() {
  const apiId = config.get('apiId')
  const apiHash = config.get('apiHash')

  if (!apiId || !apiHash) {
    login()
  } else {
    try {
      import('./providers/client').then((client) => {
        new Blaze(client.default)
      })
    } catch (e) {
      console.log(e)
    }
  }
}

export default main
