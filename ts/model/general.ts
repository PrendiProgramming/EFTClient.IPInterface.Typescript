export interface EFTRequest {
    isStartOfTransactionRequest: boolean,
    pairedResponseType: any, 
}

export const defaultEFTRequest: EFTRequest = {
    isStartOfTransactionRequest: true,
    pairedResponseType: null
}

export interface EFTResponse {
    responseType: IPClientResponseType | null,
    pairedResponseType: any | null, 
}

export const defaultEFTResponse: EFTResponse = {
    responseType: null,
    pairedResponseType: null
}

export enum ReceiptPrintModeType {
    /// <summary> Receipts will be passed back to the POS in the PrintReceipt event </summary>
    POSPrinter = '0',
    /// <summary> The EFT-Client will attempt to print using the printer configured in the EFT-Client (Windows only) </summary>
    EFTClientPrinter = '1',
    /// <summary> Receipts will be printed using the pinpad printer </summary>
    PinpadPrinter = '9',
    /// <summary> Merchant receipts print on internal printer, all other print on POS </summary>
    MerchantInternalPOSPrinter = '7',
    /// <summary> Merchant receipts print on internal printer, all other print using the printer configured in the EFT-Client (Windows only) </summary>
    MerchantInternalEFTClientPrinter = '8'
}

export interface PadTag {
    name: string,
    data: string,
}

export interface PadField {
    tags: PadTag[]
}

export const defaultPadField = {
    tags: []
}

export enum ReceiptCutModeType {
    /// <summary> Don't cut receipts </summary>
    DontCut = '0',
    /// <summary> Cut receipts </summary>
    Cut = '1'
}

export enum IPClientResponseType {
    Logon = 'G',
    Transaction = 'M',
    QueryCard = 'J',
    Configure = '1',
    ControlPanel = '5',
    SetDialog = '2',
    Settlement = 'P',
    DuplicateReceipt = 'C',
    GetLastTransaction = 'N',
    Status = 'K',
    Receipt = '3',
    Display = 'S',
    GenericPOSCommand = 'X',
    PINRequest = 'W',
    ChequeAuth = 'H',
    SendKey = 'Y',
    ClientList = 'Q',
    CloudLogon = 'A'
}
