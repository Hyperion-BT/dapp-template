import { Value } from "@hyperionbt/helios"

export default interface Wallet {
    balance: Promise<Value>
}

export type WalletSetter = (wallet: Wallet) => void