import { AbstractConnector } from '@web3-react/abstract-connector'
import { AuthereumConnector } from '@web3-react/authereum-connector'
import { InjectedConnector } from '@web3-react/injected-connector'
import { NetworkConnector } from '@web3-react/network-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { ConnectorUpdate } from '@web3-react/types'
import { ethers } from 'ethers'

import { supportedNetworkIds, supportedNetworkURLs, getInfuraUrl } from '../util/networks'

const MetaMask = new InjectedConnector({
  supportedChainIds: supportedNetworkIds,
})

const WalletConnect = new WalletConnectConnector({
  rpc: { [1]: supportedNetworkURLs[1] },
  bridge: 'https://safe-walletconnect.gnosis.io',
  qrcode: true,
})

const Infura = new NetworkConnector({
  urls: supportedNetworkURLs,
  defaultChainId: 1,
})

const Authereum = new AuthereumConnector({
  chainId: 1,
})

class SafeConnector extends AbstractConnector {

  address: string = ''
  networkId: number = 0

  init(address: string, networkId: number) {
    this.address = address
    this.networkId = networkId
  }

  public async activate(): Promise<ConnectorUpdate> {
    return { provider: this.getProvider(), account: this.address }
  }

  public deactivate() {}

  async getProvider(): Promise<any> {
    const provider = new ethers.providers.JsonRpcProvider(getInfuraUrl(this.networkId), this.networkId)
    const getSigner = provider.getSigner.bind(provider)
    provider.getSigner = () => getSigner(this.address)
    return provider
  }

  async getChainId(): Promise<number> {
    return this.networkId
  }

  async getAccount(): Promise<string> {
    return this.address
  }
}

const Safe = new SafeConnector()

export default {
  Infura,
  MetaMask,
  WalletConnect,
  Authereum,
  Safe,
} as Record<string, any>
