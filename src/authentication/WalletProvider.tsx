import React, { createContext, useContext } from "react"

import Wallet from "../types/Wallet"


type WalletProviderProps = {
    children:  React.ReactNode,
    wallet: Wallet
}

const WalletContext = createContext<Wallet>({} as any)

export default function WalletProvider({children, wallet: wallet}: WalletProviderProps) {
    return (
        <WalletContext.Provider value={wallet}>{children}</WalletContext.Provider>
    )   
}

export const useWallet = () => useContext(WalletContext)