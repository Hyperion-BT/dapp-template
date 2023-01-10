import { CardanoWalletFullApi, CardanoWalletSimpleApi } from "../../types"

import Wallet from "../../types/Wallet"

export default class CardanoWallet implements Wallet {
    #init: CardanoWalletSimpleApi
    #full: CardanoWalletFullApi

    constructor(init: CardanoWalletSimpleApi, full: CardanoWalletFullApi) {
        this.#init = init
        this.#full = full
    }

    get icon(): string {
        return this.#init.icon
    }

    get path(): string {
        return `cardano.${this.#init.name}`
    }
}