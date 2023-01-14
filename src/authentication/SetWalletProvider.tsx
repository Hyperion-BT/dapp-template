import React, { createContext, useContext } from "react"

import { WalletSetter } from "../types/Wallet"


type SetWalletProviderProps = {
    children:  React.ReactNode,
    setWallet: WalletSetter
}

const SetWalletContext = createContext<WalletSetter>(() => {})

export default function SetWalletProvider({children, setWallet}: SetWalletProviderProps) {
    return (
        <SetWalletContext.Provider value={setWallet}>{children}</SetWalletContext.Provider>
    )   
}

export const useSetWallet = () => useContext(SetWalletContext)