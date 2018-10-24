import { PadField, ReceiptCutModeType, ReceiptPrintModeType, EFTRequest, defaultEFTRequest, defaultPadField, EFTResponse, defaultEFTResponse, IPClientResponseType } from './general'
import { TerminalApplication } from './transaction'

    /// <summary>Indicates the type of logon to perform.</summary>
export enum LogonType {
    /// <summary>Standard EFT logon to the bank.</summary>
    Standard = ' ',
    /// <summary>Standard EFT logon to the bank.</summary>
    /// <remarks>Not supported by all PIN pads.</remarks>
    RSA = '4',
    /// <summary>Standard EFT logon to the bank.</summary>
    /// <remarks>Not supported by all PIN pads.</remarks>
    TMSFull = '5',
    /// <summary>Standard EFT logon to the bank.</summary>
    /// <remarks>Not supported by all PIN pads.</remarks>
    TMSParams = '6',
    /// <summary>Standard EFT logon to the bank.</summary>
    /// <remarks>Not supported by all PIN pads.</remarks>
    TMSSoftware = '7',
    /// <exclude/>
    Logoff = '8',
    /// <summary>Enables diagnostics.</summary>
    Diagnostics = '1'
}


export interface EFTLogonRequest extends EFTRequest { 
    /// <summary>Two digit merchant code</summary>
    /// <value>Type: <see cref="string"/><para>The default is "00"</para></value>
    merchant: string,

    /// <summary>type of logon to perform.</summary>
    /// <value>Type: <see cref="LogonType" /><para>The default is <see cref="LogonType.Standard" />.</para></value>
    logonType: LogonType,

    /// <summary>Additional information sent with the request.</summary>
    /// <value>Type: <see cref="PadField"/></value>
    purchaseAnalysisData: PadField,

    /// <summary>Indicates where the request is to be sent to. Should normally be EFTPOS.</summary>
    /// <value>Type: <see cref="TerminalApplication"/><para>The default is <see cref="TerminalApplication.EFTPOS"/>.</para></value>
    application: TerminalApplication,

    /// <summary>Indicates whether to trigger receipt events.</summary>
    /// <value>Type: <see cref="ReceiptPrintModeType"/><para>The default is POSPrinter.</para></value>
    receiptAutoPrint: ReceiptPrintModeType,

    /// <summary>Indicates whether PC-EFTPOS should cut receipts.</summary>
    /// <value>Type: <see cref="ReceiptCutModeType"/><para>The default is DontCut. This property only applies when <see cref="EFTRequest.ReceiptPrintMode"/> is set to EFTClientPrinter.</para></value>
    cutReceipt: ReceiptCutModeType,

}

export const defaultEFTLogonRequest: EFTLogonRequest = {
    ...defaultEFTRequest, 
    merchant : "00", 
    logonType : LogonType.Standard, 
    purchaseAnalysisData : defaultPadField,
    application : TerminalApplication.EFTPOS, 
    receiptAutoPrint : ReceiptPrintModeType.POSPrinter, 
    cutReceipt : ReceiptCutModeType.DontCut, 
}

/// <summary>A PC-EFTPOS terminal logon response object.</summary>
export interface EFTLogonResponse extends EFTResponse {
    /// <summary>PIN pad software version.</summary>
    /// <value>Type: <see cref="System.String" /></value>
    pinPadVersion: string,

    /// <summary>Indicates if the request was successful.</summary>
    /// <value>Type: <see cref="System.Boolean"/></value>
    success: boolean,

    /// <summary>The response code of the request.</summary>
    /// <value>Type: <see cref="System.String"/><para>A 2 character response code. "00" indicates a successful response.</para></value>
    responseCode: string,

    /// <summary>The response text for the response code.</summary>
    /// <value>Type: <see cref="System.String"/></value>
    responseText: string,

    /// <summary>Date and time of the response returned by the bank.</summary>
    /// <value>Type: <see cref="System.DateTime"/></value>
    date: Date,

    /// <summary>Terminal ID configured in the PIN pad.</summary>
    /// <value>Type: <see cref="System.String" /></value>
    catid: string,

    /// <summary>Merchant ID configured in the PIN pad.</summary>
    /// <value>Type: <see cref="System.String" /></value>
    caid: string,

    /// <summary>System Trace Audit Number</summary>
    /// <value>Type: <see cref="System.Int32"/></value>
    stan: number,

    /// <summary>Additional information sent with the response.</summary>
    /// <value>Type: <see cref="PadField"/></value>
    purchaseAnalysisData: PadField,
}

const minEpoc = -8640000000000000
export const defaultEFTLogonResponse: EFTLogonResponse = {
    ...defaultEFTResponse,
    responseType: IPClientResponseType.Logon,
    pinPadVersion : "", 
    success : false, 
    responseCode : "", 
    responseText : "", 
    date : new Date(minEpoc), 
    catid : "", 
    caid : "", 
    stan : 0, 
    purchaseAnalysisData : defaultPadField, 
}
