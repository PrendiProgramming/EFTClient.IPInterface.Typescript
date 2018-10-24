import { EFTResponse, defaultEFTResponse, IPClientResponseType } from "./general";

/// <summary>Indicates the type of receipt that has been received.</summary>
export enum ReceiptType {
    /// <summary>A logon receipt was received.</summary>
    Logon = 'L',
    /// <summary>A customer transaction receipt was received.</summary>
    Customer = 'C',
    /// <summary>A merchant transaction receipt was received.</summary>
    Merchant = 'M',
    /// <summary>A settlement receipt was received. This receipt usually contains the signature receipt line and should be printed immediately.</summary>
    Settlement = 'S',
    /// <summary>Receipt text was received. Used internally by component. You should never receive this receipt type.</summary>
    ReceiptText = 'R'
}


/// <summary>A PC-EFTPOS receipt response object.</summary>
export interface EFTReceiptResponse extends EFTResponse {
    /// <summary>The receipt type.</summary>
    /// <value>Type: <see cref="ReceiptType" /></value>
    type: ReceiptType,

    /// <summary>Receipt text to be printed.</summary>
    /// <value>Type: <see cref="System.String">String array</see></value>
    receiptText: string[],

    /// <summary>Receipt response is a pre-print.</summary>
    /// <value>Type: <see cref="System.Boolean" /></value>
    isPrePrint: boolean,
}


export const defaultEFTReceiptResponse: EFTReceiptResponse = {
    ...defaultEFTResponse,
    responseType: IPClientResponseType.Receipt,
    type: ReceiptType.Customer,
    receiptText: [],
    isPrePrint: false
}
