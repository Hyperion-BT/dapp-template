import { Cip30Handle, Cip30Wallet, Value, WalletHelper } from "@hyperionbt/helios"

import Wallet from "../types/Wallet"


export class ProtocolWallet implements Wallet {
    #handle: Cip30Handle
    #helper: WalletHelper

    constructor(handle: Cip30Handle) {
        this.#handle = handle
        this.#helper = new WalletHelper(new Cip30Wallet(handle))
    }

    get balance(): Promise<Value> {
        return this.#helper.calcBalance()
    }
}