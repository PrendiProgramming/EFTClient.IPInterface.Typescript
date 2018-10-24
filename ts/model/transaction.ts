import { ReceiptPrintModeType, ReceiptCutModeType, PadField, defaultEFTRequest, EFTRequest, EFTResponse, defaultEFTResponse, defaultPadField, IPClientResponseType } from "./general";
import { TxnFlags } from '../util/transaction_flags'

export enum TerminalApplication {
    /// <summary>The request is for the EFTPOS application.</summary>
    EFTPOS,
    /// <summary>The request is for the Agency application.</summary>
    Agency,
    /// <summary>The request is for the GiftCard application.</summary>
    GiftCard,
    /// <summary>The request is for the Fuel application.</summary>
    Fuel,
    /// <summary>The request is for the Medicare application.</summary>
    Medicare,
    /// <summary>The request is for the Amex application.</summary>
    Amex,
    /// <summary>The request is for the ChequeAuth application.</summary>
    ChequeAuth,
    /// <summary>The request is for the Loyalty application.</summary>
    Loyalty,
    /// <summary>The request is for the PrePaidCard application.</summary>
    PrePaidCard,
    /// <summary>The request is for the ETS application.</summary>
    ETS
}

export function toApplicationString(terminalApplication: TerminalApplication) {
    switch (terminalApplication) {
        case TerminalApplication.EFTPOS:
            return "00";
        case TerminalApplication.Agency:
            return "01";
        case TerminalApplication.Loyalty:
        case TerminalApplication.PrePaidCard:
        case TerminalApplication.ETS:
            return "02";                // PCEFTCSA
        case TerminalApplication.GiftCard:
            return "03";
        case TerminalApplication.Fuel:
            return "04";
        case TerminalApplication.Medicare:
            return "05";
        case TerminalApplication.Amex:
            return "06";
        case TerminalApplication.ChequeAuth:
            return "07";
    }

    return "00";    // Default to EFTPOS.
}

export enum TransactionType {
    /// <summary>Transaction type was not set by the PIN pad (' ').</summary>
    NotSet = ' ',
    /// <summary>A purchase with optional cash-out EFT transaction type ('P').</summary>
    PurchaseCash = 'P',
    /// <summary>A cash-out only EFT transaction type ('C').</summary>
    CashOut = 'C',
    /// <summary>A refund EFT transaction type ('R').</summary>
    Refund = 'R',
    /// <summary>A pre-authorization EFT transaction type ('A').</summary>
    PreAuth = 'A',
    /// <summary>A pre-authorization / completion EFT transaction type ('L').</summary>
    PreAuthCompletion = 'L',
    /// <summary>A pre-authorization / enquiry EFT transaction type ('N').</summary>
    PreAuthEnquiry = 'N',
    /// <summary>A pre-authorization / cancel EFT transaction type ('Q').</summary>
    PreAuthCancel = 'Q',
    /// <summary>A completion EFT transaction type ('M').</summary>
    Completion = 'M',
    /// <summary>A tip adjustment EFT transaction type ('T').</summary>
    TipAdjust = 'T',
    /// <summary>A deposit EFT transaction type ('D').</summary>
    Deposit = 'D',
    /// <summary>A witdrawal EFT transaction type ('W').</summary>
    Withdrawal = 'W',
    /// <summary>A balance EFT transaction type ('B').</summary>
    Balance = 'B',
    /// <summary>A voucher EFT transaction type ('V').</summary>
    Voucher = 'V',
    /// <summary>A funds transfer EFT transaction type ('F').</summary>
    FundsTransfer = 'F',
    /// <summary>A order request EFT transaction type ('O').</summary>
    OrderRequest = 'O',
    /// <summary>A mini transaction history EFT transaction type ('H').</summary>
    MiniTransactionHistory = 'H',
    /// <summary>A auth pin EFT transaction type ('X').</summary>
    AuthPIN = 'X',
    /// <summary>A enhanced pin EFT transaction type ('K').</summary>
    EnhancedPIN = 'K',

    None = 0
}

/// <summary>Supported EFTPOS account types.</summary>
export enum AccountType {
    /// <summary>The default account type for a card.</summary>
    Default = ' ',
    /// <summary>The savings account type.</summary>
    Savings = '3',
    /// <summary>The cheque account type.</summary>
    Cheque = '1',
    /// <summary>The credit account type.</summary>
    Credit = '2'
}

/// <summary>The card entry type of the transaction.</summary>
export enum CardEntryType {
    /// <summary>Manual entry type was not set by the PIN pad.</summary>
    NotSet = ' ',
    /// <summary>Unknown manual entry type. PIN pad may not support this flag.</summary>
    Unknown = '0',
    /// <summary>Card was swiped.</summary>
    Swiped = 'S',
    /// <summary>Card number was keyed.</summary>
    Keyed = 'K',
    /// <summary>Card number was read by a bar code scanner.</summary>
    BarCode = 'B',
    /// <summary>Card number was read from a chip card.</summary>
    ChipCard = 'E',
    /// <summary>Card number was read from a contactless reader.</summary>
    Contactless = 'C',
}

/// <summary>The communications method used to process the transaction.</summary>
export enum CommsMethodType {
    /// <summary>Comms method type was not set by the PIN pad.</summary>
    NotSet = ' ',
    /// <summary>Transaction was sent to the bank using an unknown method.</summary>
    Unknown = '0',
    /// <summary>Transaction was sent to the bank using a P66 modem.</summary>
    P66 = '1',
    /// <summary>Transaction was sent to the bank using an Argent.</summary>
    Argent = '2',
    /// <summary>Transaction was sent to the bank using an X25.</summary>
    X25 = '3'
}

/// <summary>The currency conversion status for the transaction.</summary>
export enum CurrencyStatus {
    /// <summary>Currency conversion status was not set by the PIN pad.</summary>
    NotSet = ' ',
    /// <summary>Transaction amount was processed in Australian Dollars.</summary>
    AUD = '0',
    /// <summary>Transaction amount was currency converted.</summary>
    Converted = '1'
}

/// <summary>The Pay Pass status of the transcation.</summary>
export enum PayPassStatus {
    /// <summary>Pay Pass conversion status was not set by the PIN pad.</summary>
    NotSet = ' ',
    /// <summary>Pay Pass was used in the transaction.</summary>
    PayPassUsed = '1',
    /// <summary>Pay Pass was not used in the transaction.</summary>
    PayPassNotUsed = '0'
}

export enum PanSource {
    /// <summary>Indicates the customer will be prompted to swipe,insert or present their card.</summary>
    Default = ' ',
    /// <summary>Indicates the POS has captured the Track2 from the customer card and it is stored in the PAN property.</summary>
    POSSwiped = 'S',
    /// <summary>Indicates the POS operator has keyed in the card number and it is stored in the PAN property.</summary>
    POSKeyed = 'K',
    /// <summary>Indicates the card number was captured from the Internet and is stored in the PAN property.</summary>
    Internet = '0',
    /// <summary>Indicates the card number was captured from a telephone order and it is stored in the PAN property.</summary>
    TeleOrder = '1',
    /// <summary>Indicates the card number was captured from a mail order and it is stored in the PAN property.</summary>
    MailOrder = '2',
    /// <summary>Indicates the POS operator has keyed in the card number and it is stored in the PAN property.</summary>
    CustomerPresent = '3',
    /// <summary>Indicates the card number was captured for a recurring transaction and it is stored in the PAN property.</summary>
    RecurringTransaction = '4',
    /// <summary>Indicates the card number was captured for an installment payment and it is stored in the PAN property.</summary>
    Installment = '5'
}

export interface EFTTransactionRequest extends EFTRequest {

		/// <summary>The type of transaction to perform.</summary>
		/// <value>Type: <see cref="TransactionType"/><para>The default is <see cref="TransactionType.PurchaseCash"></see></para></value>
		txnType: TransactionType,

		/// <summary>Two digit merchant code</summary>
		/// <value>Type: <see cref="string"/><para>The default is "00"</para></value>
        merchant: string,

		/// <summary>The currency code for this transaction.</summary>
		/// <value>Type: <see cref="System.String"/><para>A 3 digit ISO currency code. The default is "   ".</para></value>
		currencyCode: string,

		/// <summary>The original type of transaction for voucher entry.</summary>
		/// <value>Type: <see cref="TransactionType"/><para>The default is <see cref="TransactionType.PurchaseCash"></see></para></value>
		originalTxnType: TransactionType,

		/// <summary>Date. Used for voucher or completion only</summary>
		/// <value>Type: <see cref="DateTime"/><para>The default is null</para></value>
		date?: Date | null,

		/// <summary>Time. Used for voucher or completion only</summary>
		/// <value>Type: <see cref="DateTime"/><para>The default is null</para></value>
		time?: Date | null,

		/// <summary>Determines if the transaction is a training mode transaction.</summary>
		/// <value>Type: <see cref="System.Boolean"/><para>Set to TRUE if the transaction is to be performed in training mode. The default is FALSE.</para></value>
		trainingMode: boolean,

		/// <summary>Indicates if the transaction should be tipable.</summary>
        /// <value>Type: <see cref="System.Boolean"/><para>Set to TRUE if tipping is to be enabled for this transaction. The default is FALSE.</para></value>
        enableTip: boolean,

		/// <summary>The cash amount for the transaction.</summary>
		/// <value>Type: <see cref="System.Decimal"/><para>The default is 0.</para></value>
        /// <remarks>This property is mandatory for a <see cref="TransactionType.CashOut"></see> transaction type.</remarks>
        amtCash: number,

		/// <summary>The purchase amount for the transaction.</summary>
		/// <value>Type: <see cref="System.Decimal"/><para>The default is 0.</para></value>
		/// <remarks>This property is mandatory for all but <see cref="TransactionType.CashOut"></see> transaction types.</remarks>
        amtPurchase: number,

		/// <summary>The authorisation number for the transaction.</summary>
		/// <value>Type: <see cref="System.Int32"/></value>
		/// <remarks>This property is required for a <see cref="TransactionType.Completion"></see> transaction type.</remarks>
        authCode: number,

		/// <summary>The reference number to attach to the transaction. This will appear on the receipt.</summary>
		/// <value>Type: <see cref="System.String"/></value>
        /// <remarks>This property is optional but it usually populated by a unique transaction identifier that can be used for retrieval.</remarks>
        txnRef: string,

		/// <summary>Indicates the source of the card number.</summary>
		/// <value>Type: <see cref="PanSource"/><para>The default is <see cref="PanSource.Default"></see>.</para></value>
		/// <remarks>Use this property for card not present transactions.</remarks>
        panSource: PanSource

		/// <summary>The card number to use when pan source of POS keyed is used.</summary>
		/// <value>Type: <see cref="System.String"/></value>
		/// <remarks>Use this property in conjunction with <see cref="PanSource"></see>.</remarks>
        pan: string

		/// <summary>The expiry date of the card when of POS keyed is used.</summary>
		/// <value>Type: <see cref="System.String"/><para>In MMYY format.</para></value>
		/// <remarks>Use this property in conjunction with <see cref="PanSource"></see> when passing the card expiry date to PC-EFTPOS.</remarks>
		dateExpiry: string,

		/// <summary>The track 2 to use when of POS swiped is used.</summary>
		/// <value>Type: <see cref="System.String"/></value>
		/// <remarks>Use this property when <see cref="PanSource"></see> is set to <see cref="PanSource.POSSwiped"></see> and passing the full Track2 from the card magnetic stripe to PC-EFTPOS.</remarks>
        track2: string,

        /// <summary>The account to use for this transaction.</summary>
        /// <value>Type: <see cref="AccountType"/><para>Default is <see cref="AccountType.Default"></see>. Use default to prompt user to enter the account type.</para></value>
        /// <remarks>Use this property in conjunction with <see cref="PanSource"></see> when passing the account type to PC-EFTPOS.</remarks>
        accountType: AccountType,

        /// <summary>The retrieval reference number for the transaction.</summary>
        /// <value>Type: <see cref="System.String"/></value>
        /// <remarks>This property is required for a <see cref="TransactionType.TipAdjust"></see> transaction type.</remarks>
        RRN: string,

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

        /// <summary>
        /// 
        /// </summary>
        CVV: number,
}

export const defaultEftTransactionRequest: EFTTransactionRequest = {
    ...defaultEFTRequest, 
    txnType: TransactionType.PurchaseCash,
    merchant: "00",
    currencyCode: "  ",
    originalTxnType: TransactionType.PurchaseCash,
    date: null,
    time: null,
    trainingMode: false,
    enableTip: false,
    amtCash: 0,
    amtPurchase: 0,
    authCode: 0,
    txnRef: "",
    panSource: PanSource.Default,
    pan: "",
    dateExpiry: "",
    track2: "",
    accountType: AccountType.Default,
    RRN: "",
    purchaseAnalysisData: defaultPadField,
    application: TerminalApplication.EFTPOS,
    receiptAutoPrint: ReceiptPrintModeType.POSPrinter,
    cutReceipt: ReceiptCutModeType.DontCut,
    CVV: 0,
}

/// <summary>A PC-EFTPOS terminal transaction response object.</summary>
export interface EFTTransactionResponse extends EFTResponse {

    /// <summary>The type of transaction to perform.</summary>
    /// <value>Type: <see cref="TransactionType"/><para>The default is <see cref="TransactionType.PurchaseCash"></see></para></value>
    txnType: TransactionType,

    /// <summary>Two digit merchant code</summary>
    /// <value>Type: <see cref="string"/><para>The default is "00"</para></value>
    merchant: string,

    /// <summary>Indicates the card type that was used in the transaction.</summary>
    /// <value>Type: <see cref="System.String" /></value>
    /// <remarks><seealso cref="EFTTransactionResponse.CardBIN"/></remarks>
    cardType: string,

    /// <summary>Indicates the card type that was used in the transaction.</summary>
    /// <value>Type: <see cref="System.Int32" /></value>
    /// <remarks><list type="table">
    /// <listheader><term>Card BIN</term><description>Card Type</description></listheader>
    ///	<item><term>0</term><description>Unknown</description></item>
    ///	<item><term>1</term><description>Debit</description></item>
    ///	<item><term>2</term><description>Bankcard</description></item>
    ///	<item><term>3</term><description>Mastercard</description></item>
    ///	<item><term>4</term><description>Visa</description></item>
    ///	<item><term>5</term><description>American Express</description></item>
    ///	<item><term>6</term><description>Diner Club</description></item>
    ///	<item><term>7</term><description>JCB</description></item>
    ///	<item><term>8</term><description>Label Card</description></item>
    ///	<item><term>9</term><description>JCB</description></item>
    ///	<item><term>11</term><description>JCB</description></item>
    ///	<item><term>12</term><description>Other</description></item></list>
    ///	</remarks>
    cardName: number,

    /// <summary>Used to retrieve the transaction from the batch.</summary>
    /// <value>Type: <see cref="System.String" /></value>
    /// <remarks>The retrieval reference number is used when performing a tip adjustment transaction.</remarks>
    RRN: string,

    /// <summary>Indicates which settlement batch this transaction will be included in.</summary>
    /// <value>Type: <see cref="System.DateTime" /><para>Settlement date is returned from the bank.</para></value>
    /// <remarks>Use this property to balance POS EFT totals with settlement EFT totals.</remarks
    dateSettlement: Date,

    /// <summary>The cash amount for the transaction.</summary>
    /// <value>Type: <see cref="System.Decimal"/><para>The default is 0.</para></value>
    /// <remarks>This property is mandatory for a <see cref="TransactionType.CashOut"></see> transaction type.</remarks>
    amtCash: number,

    /// <summary>The purchase amount for the transaction.</summary>
    /// <value>Type: <see cref="System.Decimal"/><para>The default is 0.</para></value>
    /// <remarks>This property is mandatory for all but <see cref="TransactionType.CashOut"></see> transaction types.</remarks>
    amtPurchase: number,

    /// <summary>The tip amount for the transaction.</summary>
    /// <value>Type: <see cref="System.Decimal" /><para>Echoed from the request.</para></value>
    amtTip: number,

    /// <summary>The authorisation number for the transaction.</summary>
    /// <value>Type: <see cref="System.Int32"/></value>
    /// <remarks>This property is required for a <see cref="TransactionType.Completion"></see> transaction type.</remarks>
    authCode: number,

    /// <summary>The reference number to attach to the transaction. This will appear on the receipt.</summary>
    /// <value>Type: <see cref="System.String"/></value>
    /// <remarks>This property is optional but it usually populated by a unique transaction identifier that can be used for retrieval.</remarks>
    txnRef: string,

    /// <summary>The card number to use when pan source of POS keyed is used.</summary>
    /// <value>Type: <see cref="System.String"/></value>
    /// <remarks>Use this property in conjunction with <see cref="PanSource"></see>.</remarks>
    pan: string,

    /// <summary>The expiry date of the card when of POS keyed is used.</summary>
    /// <value>Type: <see cref="System.String"/><para>In MMYY format.</para></value>
    /// <remarks>Use this property in conjunction with <see cref="PanSource"></see> when passing the card expiry date to PC-EFTPOS.</remarks>
    dateExpiry: string,

    /// <summary>The track 2 data on the magnetic stripe of the card.</summary>
    /// <value>Type: <see cref="System.String" /><para>This property contains the partial track 2 data from the card used in this transaction.</para></value>
    track2: string,

    /// <summary>The account to use for this transaction.</summary>
    /// <value>Type: <see cref="AccountType"/><para>Default is <see cref="AccountType.Default"></see>. Use default to prompt user to enter the account type.</para></value>
    /// <remarks>Use this property in conjunction with <see cref="PanSource"></see> when passing the account type to PC-EFTPOS.</remarks>
    accountType: AccountType,

    /// <summary>Flags that indicate how the transaction was processed.</summary>
    /// <value>Type: <see cref="TxnFlags" /></value>
    txnFlags: TxnFlags,

    /// <summary>Indicates if an available balance is present in the response.</summary>
    /// <value>Type: <see cref="System.Boolean" /></value>
    balanceReceived: boolean,

    /// <summary>Balance available on the processed account.</summary>
    /// <value>Type: <see cref="System.Decimal" /></value>
    availableBalance: number,

    /// <summary>Cleared balance on the processed account.</summary>
    /// <value>Type: <see cref="System.Decimal" /></value>
    clearedFundsBalance: number,

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
	/// <summary>A PC-EFTPOS terminal transaction response object.</summary>
	export const defaultEFTTransactionResponse: EFTTransactionResponse = {
        ...defaultEFTResponse,
        responseType: IPClientResponseType.Transaction,
		txnType : TransactionType.PurchaseCash, 
		merchant : "00", 
		cardType : "", 
		cardName : 0, 
		RRN : "", 
        dateSettlement : new Date(minEpoc), 
        amtCash : 0, 
		amtPurchase : 0, 
		amtTip : 0, 
		authCode : 0, 
		txnRef : "", 
		pan : "", 
		dateExpiry : "", 
		track2 : "", 
        accountType : AccountType.Default, 
        txnFlags : {flags: []}, 
		balanceReceived : false, 
		availableBalance : 0, 
		clearedFundsBalance : 0, 
		success : false, 
		responseCode : "", 
		responseText : "", 
		date : new Date(minEpoc), 
		catid : "", 
		caid : "",
		stan : 0,
		purchaseAnalysisData : defaultPadField,
	}