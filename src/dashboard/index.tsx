import { useEffect, useState } from "react"

import { Value } from "@hyperionbt/helios"

import { useWallet } from "../authentication"


export default function Dashboard() {
    const [balance, setBalance] = useState(new Value())

    const wallet = useWallet()

    useEffect(() => {
        wallet.balance.then(setBalance)
    }, [wallet])

    return (
        <>  
            <p>Balance:</p>
            <p>{JSON.stringify(balance.dump(), null, "    ")}</p>
        </>
    )
}