import React, { useState } from "react"
import { createRoot } from "react-dom/client"
import { Route, HashRouter, Routes } from "react-router-dom"

import { CssBaseline, ThemeProvider } from "@mui/material"

import { 
	Connect,
	SetWalletProvider,
	WalletProvider
 } from "./authentication"

import Landing from "./landing"
import { Wallet } from "./types"
import theme from "./theme"
import Dashboard from "./dashboard"


function Main() {
	const [wallet, setWallet] = useState<Wallet | null>(null)

	return (
		<React.StrictMode>
			<CssBaseline />
			<ThemeProvider theme={theme}>
				<SetWalletProvider setWallet={setWallet}>
					<HashRouter>
						{
							wallet ? (
								<WalletProvider wallet={wallet}>
									<Routes>
										<Route path="*" element={<Dashboard />} />
									</Routes>
								</WalletProvider>
							) : (
								<Routes>
									<Route path="/connect-wallet" element={<Connect />} />
									<Route path="*" element={<Landing />} />
								</Routes>
							)
						}
					</HashRouter>
				</SetWalletProvider>
			</ThemeProvider>
		</React.StrictMode>
	)
}

function main() {
	const body = document.body

	const container = document.createElement("div")

	// it is not recommended to use the document body as the root container directly
	body.appendChild(container)
	
	const root = createRoot(container)

	root.render(<Main />)
}

main()
