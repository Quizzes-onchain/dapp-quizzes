import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client'
import { NetworkName } from '@polymedia/suits'

const NETWORK: NetworkName = 'devnet'

const suiClient = new SuiClient({
  url: getFullnodeUrl(NETWORK),
})

export default suiClient
