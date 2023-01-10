type CardanoWalletFullApi = {
}

type CardanoWalletSimpleApi = {
    name: string,
    icon: string,
    enable(): Promise<CardanoWalletFullApi>,
    isEnabled(): boolean
}

export {
    CardanoWalletFullApi,
    CardanoWalletSimpleApi
}


declare global {
  interface Window {
    cardano: {
        [walletName: string]: CardanoWalletSimpleApi
    };
  }
}
