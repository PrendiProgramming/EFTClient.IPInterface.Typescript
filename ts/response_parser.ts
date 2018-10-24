import moment from 'moment'
import { IPClientResponseType } from "./model/general";
import * as _ from 'lodash'
import { defaultEFTTransactionResponse, TransactionType, AccountType } from './model/transaction';
import { setFromString } from './util/pad_field';
import { getTransactionFlags } from './util/transaction_flags';
import { defaultEFTDisplayResponse, InputType, GraphicCode } from './model/display'
import { ReceiptType, defaultEFTReceiptResponse } from './model/receipt'
import { defaultSetDialogResponse } from './model/dialogue'
import { defaultEFTLogonResponse } from './model/logon';
import { defaultEFTStatusResponse, NetworkType, KeyHandlingType, TerminalCommsType, EFTTerminalType, PINPadOptionFlags } from './model/status';

export function stringToEFTResponse(msg: string) {
    if (msg[0] !== '#' && msg.length < 6) {
        throw new Error('msg is not valid');
    }
    let parseMsg = msg.slice(5, msg.length)
    if (!parseMsg || parseMsg.length < 1) {
        throw new Error('msg is null or zero length');
    }

    switch (parseMsg[0] as IPClientResponseType) {
        case IPClientResponseType.Display:
            return parseDisplayResponse(parseMsg);
        case IPClientResponseType.Receipt:
            return parseReceiptResponse(parseMsg);
        case IPClientResponseType.Logon:
            return parseEFTLogonResponse(parseMsg);
        case IPClientResponseType.Transaction:
            return parseEFTTransactionResponse(parseMsg);
        case IPClientResponseType.SetDialog:
            return parseSetDialogResponse(parseMsg);

        // case IPClientResponseType.GetLastTransaction:
        //     return parseEFTGetLastTransactionResponse(msg);
        // case IPClientResponseType.DuplicateReceipt:
        //     return parseEFTReprintReceiptResponse(msg);
        // case IPClientResponseType.ControlPanel:
        //     return parseControlPanelResponse(msg);
        // case IPClientResponseType.Settlement:
        //     return parseEFTSettlementResponse(msg);
        case IPClientResponseType.Status:
            return parseEFTStatusResponse(parseMsg);
        // case IPClientResponseType.ChequeAuth:
        //     return parseChequeAuthResponse(msg);
        // case IPClientResponseType.QueryCard:
        //     return parseQueryCardResponse(msg);
        // case IPClientResponseType.GenericPOSCommand:
        //     return parseGenericPOSCommandResponse(msg);
        // case IPClientResponseType.Configure:
        //     return parseConfigMerchantResponse(msg);
        // case IPClientResponseType.CloudLogon:
        //     return parseCloudLogonResponse(msg);
        // case IPClientResponseType.ClientList:
        //     return parseClientListResponse(msg);
        default:
            console.error(`Unknown message type: ${parseMsg}`)
        // throw new Error(`Unknown message type: ${msg}`);
    }
}
function parseBoolean(input: string) {
    if (input.length !== 1) {
        throw new Error('Invalid length for boolean')
    }
    return (input === '1' || input === 'y')
}

// Bind/partially apply the format before passing it into the parser
function parseDate(format: string, input: string) {
    return moment(input, format)
}

function parseString(input: string) {
    return input
}

// Bind/partially apply the enum before passing it into the parser
function parseEnum(enumObj: any, input: string) {
    let enumMatch = _.some(enumObj, (val, prop) => val === input)
    if (!enumMatch) {
        console.error(`Input (${input}) failed to match enum: ${enumObj}`)
    }
    return input
}

function parseInteger(input: string) {
    return Number(input)
}

function parseCurrency(input: string) {
    return Number(Number(input) / 100)
}


function tryParse<T>(parseFunc: Function, defaultVal: T, msg: string, length: number, index: number): T {
    let result = defaultVal;

    if (msg.length - index >= length) {
        try {
            return parseFunc(msg.slice(index, index + length))
        } catch (e) {
            console.error('Failed parsing')
        }
    }

    return result;
}

function parseEFTTransactionResponse(msg: string) {
    let def = defaultEFTTransactionResponse
    msg = msg.slice(2, msg.length)
    var r = {
        responseType: IPClientResponseType.Transaction,
        success: tryParse<boolean>(parseBoolean, def.success, msg, 1, 0),
        responseCode: tryParse<string>(parseString, def.responseCode, msg, 2, 1),
        responseText: tryParse<string>(parseString, def.responseText, msg, 20, 3),
        merchant: tryParse<string>(parseString, def.merchant, msg, 2, 23),
        txnType: tryParse<TransactionType>(parseEnum.bind(null, TransactionType), def.txnType, msg, 1, 25),
        accountType: tryParse<AccountType>(parseEnum.bind(null, AccountType), def.accountType, msg, 7, 26),
        amtCash: tryParse<number>(parseCurrency, def.amtCash, msg, 9, 33),
        amtPurchase: tryParse<number>(parseCurrency, def.amtPurchase, msg, 9, 42),
        amtTip: tryParse<number>(parseCurrency, def.amtTip, msg, 9, 51),
        authCode: tryParse<number>(parseInteger, def.authCode, msg, 6, 60),
        txnRef: tryParse<string>(parseString, def.txnRef, msg, 16, 66),
        stan: tryParse<number>(parseInteger, def.stan, msg, 6, 82),
        caid: tryParse<string>(parseString, def.caid, msg, 15, 88),
        catid: tryParse<string>(parseString, def.catid, msg, 8, 103),
        dateExpiry: tryParse<string>(parseString, def.dateExpiry, msg, 4, 111),
        dateSettlement: tryParse<Date>(parseDate.bind(null, "DD-MM"), def.dateSettlement, msg, 4, 115),
        date: tryParse<Date>(parseDate.bind(null, "DD-MM-YY HH:mm:ss"), def.date, msg, 12, 119),
        cardType: tryParse<string>(parseString, def.cardType, msg, 20, 131),
        pan: tryParse<string>(parseString, def.pan, msg, 20, 151),
        track2: tryParse<string>(parseString, def.track2, msg, 40, 171),
        RRN: tryParse<string>(parseString, def.RRN, msg, 12, 211),
        cardName: tryParse<number>(parseInteger, def.cardName, msg, 2, 223),
        txnFlags: getTransactionFlags({ flags: tryParse<string>(parseString, "        ", msg, 8, 225).split("") }),
        balanceReceived: tryParse<boolean>(parseBoolean, def.balanceReceived, msg, 1, 233),
        availableBalance: tryParse<number>(parseCurrency, def.availableBalance, msg, 9, 234),
        clearedFundsBalance: tryParse<number>(parseCurrency, def.clearedFundsBalance, msg, 9, 243),
        purchaseAnalysisData: { tags: setFromString(tryParse<string>(parseString, "", msg, msg.length - 252, 252)) }
    };

    return r;
}


function parseDisplayResponse(msg: string): any {
    let def = defaultEFTDisplayResponse
    msg = msg.slice(2, msg.length)
    let numberOfLines = tryParse<number>(parseInteger, def.numberOfLines, msg, 2, 0)
    let lineLength = tryParse<number>(parseInteger, def.lineLength, msg, 2, 2)
    let displayText = _.times(numberOfLines, (i) => tryParse<string>(parseString, "", msg, lineLength, 4 + (i * lineLength)))
    let newIndex = 4 + (numberOfLines * lineLength)
    return {
        numberOfLines,
        lineLength,
        displayText,
        responseType: IPClientResponseType.Display,
        cancelKeyFlag: tryParse<boolean>(parseBoolean, def.cancelKeyFlag, msg, 1, newIndex),
        acceptYesKeyFlag: tryParse<boolean>(parseBoolean, def.acceptYesKeyFlag, msg, 1, newIndex + 1),
        declineNoKeyFlag: tryParse<boolean>(parseBoolean, def.acceptYesKeyFlag, msg, 1, newIndex + 2),
        authoriseKeyFlag: tryParse<boolean>(parseBoolean, def.acceptYesKeyFlag, msg, 1, newIndex + 3),
        inputType: tryParse<InputType>(parseEnum.bind(null, InputType), def.inputType, msg, 1, newIndex + 4),
        OKKeyFlag: tryParse<boolean>(parseBoolean, def.OKKeyFlag, msg, 1, newIndex + 5),
        graphicCode: tryParse<GraphicCode>(parseEnum.bind(null, GraphicCode), def.graphicCode, msg, 1, newIndex + 8), // increase index by 2 for protocol reasons
        purchaseAnalysisData: { tags: setFromString(tryParse<string>(parseString, "", msg, tryParse<number>(parseInteger, 0, msg, 3, newIndex + 9), newIndex + 12)) }
    }
}


function parseReceiptResponse(msg: string): any {
    let def = defaultEFTReceiptResponse
    msg = msg.slice(1, msg.length)
    let type = tryParse<ReceiptType>(parseEnum.bind(null, ReceiptType), def.type, msg, 1, 0)

    let r = { ...def, type }
    if (type !== ReceiptType.ReceiptText) {
        r.isPrePrint = true;
    } else {
        let receiptLines: string[] = msg.slice(1).split("\r\n").slice(0, -1) //remove the last line as it is empty
        r.receiptText = receiptLines
    }
    return r
}

function parseEFTLogonResponse(msg: string) {
    msg = msg.slice(2, msg.length)
    let def = defaultEFTLogonResponse
    let r = {
        ...def,
        success: tryParse<boolean>(parseBoolean, def.success, msg, 1, 0),
        responseCode: tryParse<string>(parseString, def.responseCode, msg, 2, 1),
        responseText: tryParse<string>(parseString, def.responseText, msg, 20, 3),
    }

    if (msg.length > 23) {
        r.catid = tryParse<string>(parseString, def.catid, msg, 8, 23);
        r.caid = tryParse<string>(parseString, def.caid, msg, 15, 31);
        r.date = tryParse<Date>(parseDate.bind(null, 'DD-MM-YY HH:mm:ss'), def.date, msg, 12, 46);
        r.stan = tryParse<number>(parseInteger, def.stan, msg, 6, 58);
        r.pinPadVersion = tryParse<string>(parseString, def.pinPadVersion, msg, 16, 64);
        r.purchaseAnalysisData = { tags: setFromString(tryParse<string>(parseString, "", msg, msg.length - 64, 64)) } as any;
    }
    return r;
}

function parseSetDialogResponse(msg: string) {
    let def = defaultSetDialogResponse
    msg = msg.slice(1, msg.length)

    return {
        ...def,
        success: tryParse<boolean>(parseBoolean, def.success, msg, 1, 0)
    }
}

function parseEFTStatusResponse(msg: string) {
    msg = msg.slice(2, msg.length)
    let def = defaultEFTStatusResponse
    let r = {
        ...def,
        success: tryParse<boolean>(parseBoolean, def.success, msg, 1, 0),
        responseCode: tryParse<string>(parseString, def.responseCode, msg, 2, 1),
        responseText: tryParse<string>(parseString, def.responseText, msg, 20, 3),
    }
    if (23 >= msg.length) {
        return r
    }

    r = {
        ...r,
        merchant: tryParse<string>(parseString, def.merchant, msg, 2, 23),
        AIIC: tryParse<string>(parseString, def.AIIC, msg, 11, 25),
        NII: tryParse<number>(parseInteger, def.NII, msg, 3, 36),
        caid: tryParse<string>(parseString, def.caid, msg, 15, 39),
        catid: tryParse<string>(parseString, def.catid, msg, 8, 54),
        timeout: tryParse<number>(parseInteger, def.timeout, msg, 3, 62),
        loggedOn: tryParse<boolean>(parseBoolean, def.loggedOn, msg, 1, 65),
        pinPadSerialNumber: tryParse<string>(parseString, def.pinPadSerialNumber, msg, 16, 66),
        pinPadVersion: tryParse<string>(parseString, def.pinPadVersion, msg, 16, 82),
        bankDescription: tryParse<string>(parseString, def.bankDescription, msg, 32, 98),
    }
    let padLength = tryParse<number>(parseInteger, 0, msg, 3, 130)
    if (msg.length - 130 < padLength) {
            return r;
    }
    r = {
        ...r, 
        SAFCount: tryParse<number>(parseInteger, def.SAFCount, msg, 4, 133),
        networkType: tryParse<NetworkType>(parseEnum.bind(null, NetworkType), def.networkType, msg, 1, 137),
        hardwareSerial: tryParse<string>(parseString, def.hardwareSerial, msg, 16, 138),
        retailerName: tryParse<string>(parseString, def.retailerName, msg, 40, 154),
        optionsFlags: generateOptionFlags(tryParse<string>(parseString, "", msg, 32, 194)),
        SAFCreditLimit: tryParse<number>(parseCurrency, def.SAFCreditLimit, msg, 9, 226),
        SAFDebitLimit: tryParse<number>(parseCurrency, def.SAFDebitLimit, msg, 9, 235),
        maxSAF: tryParse<number>(parseInteger, def.maxSAF, msg, 3, 244),
        keyHandlingScheme: tryParse<KeyHandlingType>(parseEnum.bind(null, KeyHandlingType), def.keyHandlingScheme, msg, 1, 247),
        cashoutLimit: tryParse<number>(parseCurrency, def.cashoutLimit, msg, 9, 248),
        refundLimit: tryParse<number>(parseCurrency, def.refundLimit, msg, 9, 257),
        CPATVersion: tryParse<string>(parseString, def.CPATVersion, msg, 6, 266),
        nameTableVersion: tryParse<string>(parseString, def.nameTableVersion, msg, 6, 272),
        terminalCommsType: tryParse<TerminalCommsType>(parseEnum.bind(null, TerminalCommsType), def.terminalCommsType, msg, 1, 278),
        cardMisreadCount: tryParse<number>(parseInteger, def.cardMisreadCount, msg, 6, 279),
        totalMemoryInTerminal: tryParse<number>(parseInteger, def.totalMemoryInTerminal, msg, 4, 285),
        freeMemoryInTerminal: tryParse<number>(parseInteger, def.freeMemoryInTerminal, msg, 4, 289),
        EFTTerminalType: tryParse<EFTTerminalType>(parseEnum.bind(null, EFTTerminalType), def.EFTTerminalType, msg, 4, 293),
        numAppsInTerminal: tryParse<number>(parseInteger, def.numAppsInTerminal, msg, 2, 297),
        numLinesOnDisplay: tryParse<number>(parseInteger, def.numLinesOnDisplay, msg, 2, 299),
        hardwareInceptionDate: tryParse<Date>(parseDate.bind(null, 'DD-MM-YY'), def.hardwareInceptionDate, msg, 6, 301),
    }
    return r

}

export function generateOptionFlags(msgFlags: string) {
    let binaryRepresentation = parseInt(msgFlags.split('').reverse().join(''), 2)
    return _.filter(PINPadOptionFlags, (flag) => {
        return _.isNumber(flag) && Boolean(binaryRepresentation & flag)
    })
}

