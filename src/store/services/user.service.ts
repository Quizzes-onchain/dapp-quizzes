import suiClient from './suiClient'

export const userServices = {
  fetchBalance: async (address: string) => {
    if (address) {
      const suiBalance = await suiClient.getBalance({
        owner: address,
        coinType: '0x2::sui::SUI',
      })
      return parseInt(suiBalance.totalBalance, 10) / 1_000_000_000
    } else return 0
  },
}
