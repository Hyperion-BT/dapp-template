import { Cip30Handle } from "@hyperionbt/helios";

import Wallet from "./Wallet"

type CardanoWalletFullApi = Cip30Handle;

// TODO: define this in helios instead
type CardanoWalletSimpleApi = {
    name: string,
    icon: string,
    enable(): Promise<CardanoWalletFullApi>,
    isEnabled(): boolean
}

export {
    CardanoWalletFullApi,
    CardanoWalletSimpleApi,
    Wallet
}

declare global {
  interface Window {
    cardano: {
        [walletName: string]: CardanoWalletSimpleApi
    };  
  }
}