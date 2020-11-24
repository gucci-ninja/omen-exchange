import { AuthereumConnector } from '@web3-react/authereum-connector'
import { InjectedConnector } from '@web3-react/injected-connector'
import { NetworkConnector } from '@web3-react/network-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { ethers } from 'ethers'

import { supportedNetworkIds, supportedNetworkURLs } from '../util/networks'

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

class SafeConnector extends Connectors.Connector {
  init(address: string, networkId: number) {
    this.address = address
    this.networkId = networkId
  }

  // @ts-expect-error ignore
  getProvider() {
    const provider = new ethers.providers.JsonRpcProvider(getInfuraUrl(this.networkId), this.networkId)
    const getSigner = provider.getSigner.bind(provider)
    provider.getSigner = () => getSigner(this.address)
    this.provider = provider
    return provider
  }

  public async getNetworkId(): Promise<number> {
    const networkId = await this.provider.getNetwork()
    return this._validateNetworkId(networkId)
  }

  public async getAccount(): Promise<string> {
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
