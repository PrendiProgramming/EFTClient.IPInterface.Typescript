import { EFTTransactionRequest, toApplicationString, defaultEftTransactionRequest } from "./model/transaction";
import moment from 'moment'
import { padRightAndCut, padLeftAsIntFromDecimal, padLeftInteger } from "./util/padding";
import { getPadFieldAsString } from "./util/pad_field";
import { EFTLogonRequest, defaultEFTLogonRequest } from './model/logon'
import { EFTPOSKey, defaultEFTSendKeyRequest, EFTSendKeyRequest } from './model/key'
import { SetDialogRequest, defaultSetDialogRequest } from './model/dialogue'
import { EFTStatusRequest, defaultEFTStatusRequest } from './model/status'
import { formatEftRequest } from "./util/requests";

export function buildEFTTransactionRequest(trans: EFTTransactionRequest) {
    let r = "M0";
    r += padRightAndCut(trans.merchant, 2)
    r += trans.txnType
    r += trans.trainingMode ? '1' : '0'
    r += trans.enableTip ? '1' : '0'
    r += padLeftAsIntFromDecimal(trans.amtCash, 9)
    r += padLeftAsIntFromDecimal(trans.amtPurchase, 9)
    r += padLeftInteger(trans.authCode, 6)
    r += padRightAndCut(trans.txnRef, 16)
    r += trans.receiptAutoPrint
    r += trans.cutReceipt
    r += trans.panSource
    r += padRightAndCut(trans.pan, 20)
    r += padRightAndCut(trans.dateExpiry, 4)
    r += padRightAndCut(trans.track2, 40)
    r += trans.accountType
    r += toApplicationString(trans.application)
    r += padRightAndCut(trans.RRN, 12)
    r += padRightAndCut(trans.currencyCode, 3)
    r += trans.originalTxnType
    r += trans.date != null ? moment(trans.date).format("ddMMyy") : "      "
    r += trans.time != null ? moment(trans.time).format("HHmmss") : "      "
    r += padRightAndCut(" ", 8) // Reserved
    r += getPadFieldAsString(trans.purchaseAnalysisData, true)
    return r
}

export function createEFTTransactionRequest(trans: Partial<EFTTransactionRequest>) {
    return formatEftRequest(buildEFTTransactionRequest({...defaultEftTransactionRequest, ...trans}))
}

export function buildEFTLogonRequest(logon: EFTLogonRequest): string {
    let r = "G"
    r += logon.logonType
    r += padRightAndCut(logon.merchant, 2)
    r += logon.receiptAutoPrint
    r += logon.cutReceipt
    r += toApplicationString(logon.application)
    r += getPadFieldAsString(logon.purchaseAnalysisData, true)
    return r;
}

export function createEFTLogonRequest(logon: Partial<EFTLogonRequest>) {
    return formatEftRequest(buildEFTLogonRequest({...defaultEFTLogonRequest, ...logon}))
}

export function buildSendKeyRequest(key: EFTSendKeyRequest) {
    let r = "Y0"
    r += key.key;
    if (key.key === EFTPOSKey.Authorise && key.data !== null) {
        r += padRightAndCut(key.data, 20);
    }

    return r;
}

export function createSendKeyRequest(logon: Partial<EFTSendKeyRequest>) {
    return formatEftRequest(buildSendKeyRequest({...defaultEFTSendKeyRequest, ...logon}))
}

export function createReceiptAckRequest() {
    return '#00073 '
}

export function buildSetDialogueRequest(dialogue: SetDialogRequest) {
    let r = "2"
    r += dialogue.disableDisplayEvents ? '5' : ' '
    r += dialogue.dialogType
    r += padLeftInteger(dialogue.dialogX, 4)
    r += padLeftInteger(dialogue.dialogY, 4)
    r += padRightAndCut(dialogue.dialogPosition.toString(), 12)
    r += dialogue.enableTopmost ? '1' : '0'
    r += padRightAndCut(dialogue.dialogTitle.toString(), 32)

    return r
}

export function createSetDialogRequest(dialogue: Partial<SetDialogRequest>) {
    return formatEftRequest(buildSetDialogueRequest({...defaultSetDialogRequest, ...dialogue}))
}

export function buildEFTStatusRequest(status: EFTStatusRequest) {
    let r = "K"
    r += status.statusType
    r += status.merchant
    r += toApplicationString(status.application)

    return r
}

export function createEFTStatusRequest(status: Partial<EFTStatusRequest>) {
    return formatEftRequest(buildEFTStatusRequest({...defaultEFTStatusRequest, ...status}))
}

export function createGetClientListRequest() {
    return formatEftRequest('Q0')
}