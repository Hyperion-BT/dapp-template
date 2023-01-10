import React, { useEffect, useState } from "react"

import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Button from "@mui/material/Button"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Stack from "@mui/material/Stack"

import Wallet from "../../types/Wallet"

import CardanoWallet from "./CardanoWallet"
import { CardanoWalletSimpleApi } from "../../types"

const SUPPORTED_WALLETS = [
    "eternl",
    "nami"
]

type CardanoWalletButtonProps = {
    name: string,
    onPick: (wallet: CardanoWalletSimpleApi) => void
}

function CardanoWalletButton({name, onPick}: CardanoWalletButtonProps) {
    const simpleApi = (window?.cardano ?? {})[name];

    if (simpleApi != null) {
        return <Button variant="outlined" onClick={() => onPick(simpleApi)}><img src={simpleApi.icon} width={32} />{name}</Button>
    } else {
        return <></>
    }
} 

export function CardanoWalletButtons(onConnectWallet: (wallet: Wallet) => void) {
    const [chosenWallet, setChosenWallet] = useState<CardanoWalletSimpleApi | null>(null)

    useEffect(() => {
        if (chosenWallet != null) {
            chosenWallet.enable().then(full => {
                console.log("Connected to wallet")
                onConnectWallet(new CardanoWallet(chosenWallet, full))
            }).catch(msg => {
                console.error("Failed to connect to wallet")
                setChosenWallet(null)
            })
        }
    }, [chosenWallet])

    return (
        <>
        {/*<Accordion defaultExpanded>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                Cardano
            </AccordionSummary>
    <AccordionDetails>*/}
                {
                    SUPPORTED_WALLETS.some(name => name in (window?.cardano ?? {})) ? 
                        <Stack spacing={2}>
                            {
                                SUPPORTED_WALLETS.map(
                                    name => (
                                        <CardanoWalletButton
                                            key={name}
                                            name={name}
                                            onPick={wallet => {
                                                console.log("picking wallet")
                                                setChosenWallet(wallet)
                                            }}
                                        />
                                    )
                                ) 
                            }
                        </Stack> :
                        <>No wallets found</>
                }
            {/*</AccordionDetails>
            </Accordion>*/}
        </>
    )
}

export function restoreCardanoWallet(lastActiveWallet: string, callback: (wallet: Wallet) => void) {
    SUPPORTED_WALLETS.forEach(s => {
        if (lastActiveWallet == `cardano.${s}` && s in window.cardano && window.cardano[s].isEnabled()) {
            const initApi = window.cardano[s]

            initApi.enable().then(fullApi => {
                callback(new CardanoWallet(initApi, fullApi))
            })
        }
    })
    
}