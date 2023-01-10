import React, { createContext } from "react"
import Wallet from "../types/Wallet"

type UserProviderProps = {
    children:  React.ReactNode,
    wallet: Wallet | null
}

const WalletContext = createContext<Wallet | null>(null)

export function WalletProvider({children, wallet}: UserProviderProps) {
    return (
        <WalletContext.Provider value={wallet}>{children}</WalletContext.Provider>
    )
}

export function useWallet() {
    return React.useContext(WalletContext)
}