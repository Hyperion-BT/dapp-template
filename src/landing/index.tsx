import { useNavigate } from "react-router-dom"

import { Button } from "@mui/material"


export default function Landing() {
    const navigate = useNavigate()

    return (
        <>
            <h1>My dApp</h1>
            <p>Connect your wallet to get started</p>
            <Button onClick={() => navigate("/connect-wallet")}>Connect</Button>
        </>
    )
}
