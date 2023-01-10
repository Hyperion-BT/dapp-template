import React from "react"

import Wallet from "../types/Wallet"

import { CardanoWalletButtons, restoreCardanoWallet } from "./cardano"

type AllWalletsProps = {
    onConnectWallet: (wallet: Wallet) => void
}

export function AllWallets({onConnectWallet} : AllWalletsProps) {
    return CardanoWalletButtons(onConnectWallet)
}

export function restoreWallet(lastActiveWallet: string, callback: (wallet: Wallet) => void) {
    restoreCardanoWallet(lastActiveWallet, callback)
}