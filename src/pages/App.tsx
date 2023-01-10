import React, { useEffect, useReducer } from "react"

import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import Toolbar from "@mui/material/Toolbar"
import { createTheme, ThemeProvider } from "@mui/material/styles"

import Wallet from "../types/Wallet"
import { AllWallets, restoreWallet } from "../blockchain"
import { WalletProvider } from "./WalletContext"

const theme = createTheme({
	palette: {
		primary: {
			light: '#757ce8',
			main: '#3f50b5',
			dark: '#002884',
			contrastText: '#fff',
		},
			secondary: {
			light: '#808080',
			main: '#000000',
			dark: '#808080',
			contrastText: '#fff',
		},
	}
})

type Action = {
	type: "connect",
	wallet: Wallet
} | {
	type: "disconnect"
} | {
	type: "choose"
} | {
	type: "cancel"
}

interface WalletState {
	isConnected(): boolean,
	isChoosing(): boolean,
	change(action: Action): WalletState
}

class Disconnected implements WalletState {
	isConnected(): boolean {
		return false
	}

	isChoosing(): boolean {
		return false
	}

	change(action: Action): WalletState {
		switch(action.type) {
			case "connect":
				return new Connected(action.wallet)
			case "choose":
				return new ChoosingWallet()
			default:
				throw new Error("unhandled")
		}
	}
}

class ChoosingWallet implements WalletState {
	isConnected(): boolean {
		return false
	}

	isChoosing(): boolean {
		return true
	}

	change(action: Action): WalletState {
		switch(action.type) {
			case "connect":
				return new Connected(action.wallet)
			case "cancel":
				return new Disconnected()
			default:
				throw new Error("unhandled")
		}
	}
}

class Connected implements WalletState {
	#wallet: Wallet

	constructor(wallet: Wallet) {
		this.#wallet = wallet;
	}

	get wallet(): Wallet {
		return this.#wallet
	}

	isConnected(): boolean {
		return true
	}

	isChoosing(): boolean {
		return false
	}

	change(action: Action): WalletState {
		switch (action.type) {
			case "disconnect":
				return new Disconnected()
			default:
				throw new Error("unhandled")
		}
	}
}

type WalletButtonProps = {
	onClick?: () => void,
	disabled?: boolean,
	children?: React.ReactNode
}

function WalletButton({onClick, disabled, children}: WalletButtonProps) {
	return <Button variant="contained" color="secondary" disabled={disabled} onClick={onClick}>{children}</Button>
}

type ChooseWalletDialogProps = {
	onClose: () => void,
	onConnectWallet: (wallet: Wallet) => void
}

function ChooseWalletDialog({onClose, onConnectWallet}: ChooseWalletDialogProps) {
	return (
		<Dialog onClose={onClose} open>
		  	<DialogTitle>Choose wallet</DialogTitle>
			<Box sx={{flexGrow: 1, p: 2}}>
				<AllWallets onConnectWallet={onConnectWallet} />
			</Box>
		</Dialog>
	);
}

export function App() {
	const [state, dispatch] = useReducer(
		(state: WalletState, action: Action) => {
			const newState = state.change(action)

			if (newState instanceof Connected) {
				window.localStorage.setItem("lastActiveWallet", newState.wallet.path)
			} else {
				window.localStorage.removeItem("lastActiveWallet")
			}

			return newState
		}, new Disconnected(), x => x)

	const wallet = state instanceof Connected ? state.wallet : null

	useEffect(() => {
		const lastActiveWallet = window.localStorage.getItem("lastActiveWallet")

		if (lastActiveWallet != null) {
			restoreWallet(lastActiveWallet, (wallet: Wallet) => {
				dispatch({type: "connect", wallet: wallet})
			})
		}
	}, []) // no dependencies, only run when component is started

	return (
		<>
			<CssBaseline />
			<Box>
				<ThemeProvider theme={theme}>
					<AppBar position="relative">
						<Toolbar>
							<h1>Genwealth</h1>
							<Box sx={{ flexGrow: 1 }} />
							{
								state.isConnected() ?
									<WalletButton onClick={() => dispatch({type: "disconnect"})}>Disconnect wallet<img width={32} src={wallet?.icon} /></WalletButton> : (
										state.isChoosing() ? 
										<>
											<WalletButton disabled>Connect wallet</WalletButton>
											<ChooseWalletDialog 
												onClose={() => dispatch({type: "cancel"})}
												onConnectWallet={(wallet: Wallet) => dispatch({type: "connect", wallet: wallet})}
											/>
										</> :
										<WalletButton onClick={() => dispatch({type: "choose"})}>Connect wallet</WalletButton>
									)
							}
						</Toolbar>
					</AppBar>
					<Box>
						{	
							(state instanceof Connected) ?
							<WalletProvider wallet={state.wallet}>
								<>Connected to wallet</>
							</WalletProvider> :
							<>Please connect your wallet to use this App</>
						}
					</Box>
				</ThemeProvider>
			</Box>
		</>
	)
}
