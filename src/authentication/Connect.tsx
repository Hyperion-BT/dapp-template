import { useNavigate } from "react-router-dom"

import { Button } from "@mui/material"

import { ProtocolWallet } from "../blockchain/ProtocolWallet"
import { useSetWallet } from "./SetWalletProvider"
import { WalletSetter } from "../types/Wallet"


const SUPPORTED_WALLETS = ["eternl", "nami"]

function isInstalled(name: string) {
    return name in (window?.cardano ?? {})
}

async function connect(name: string, setWallet: WalletSetter, navigate: (path: string) => void) {
    const handle = await window.cardano[name].enable()

    setWallet(new ProtocolWallet(handle))

    navigate("/")
}

export default function Connect() {
    const setWallet = useSetWallet()
    const navigate = useNavigate()

    const someInstalled = SUPPORTED_WALLETS.some(isInstalled)

    return (
        <>
            {
                someInstalled ? (
                    SUPPORTED_WALLETS.map(name => {
                        if (isInstalled(name)) {
                            return <Button key={name} onClick={() => connect(name, setWallet, navigate)}>{name}</Button>
                        } else {
                            return <></>
                        }
                    })
                ) : (
                    <p>Please install one of the following wallets: {SUPPORTED_WALLETS.join(", ")}</p>
                )

            }
        </>
    )
}
