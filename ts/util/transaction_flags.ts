import { CardEntryType, CommsMethodType, CurrencyStatus, PayPassStatus } from "../model/transaction";

export interface TxnFlags {
    flags: string[]
}

export function getTransactionFlags(txnFlags: TxnFlags) {
    return {
        offline : txnFlags.flags[0] === '1',
        receiptPrinted : txnFlags.flags[1] === '1',
        cardEntry : txnFlags.flags[2] as CardEntryType,
        commsMethod : txnFlags.flags[3] as CommsMethodType,
        currency : txnFlags.flags[4] as CurrencyStatus,
        payPass : txnFlags.flags[5] as PayPassStatus,
        undefinedFlag6 : txnFlags.flags[6],
        undefinedFlag7 : txnFlags.flags[7]
    }
}