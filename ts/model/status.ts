import { TerminalApplication } from './transaction'
import { EFTRequest, EFTResponse, defaultEFTRequest, defaultEFTResponse, IPClientResponseType } from './general';

/// <summary>Indicates the requested status type.</summary>
export enum StatusType {
    /// <summary>Request the EFT status from the PIN pad.</summary>
    Standard = '0',
    /// <summary>Not supported by all PIN pads.</summary>
    TerminalAppInfo = '1',
    /// <summary>Not supported by all PIN pads.</summary>
    AppCPAT = '2',
    /// <summary>Not supported by all PIN pads.</summary>
    AppNameTable = '3',
    /// <summary>Undefined</summary>
    Undefined = '4',
    /// <summary>Not supported by all PIN pads.</summary>
    PreSwipe = '5'
}

/// <summary>Indicates the EFT terminal hardware type.</summary>
export enum EFTTerminalType {
    /// <summary>Ingenico NPT 710 PIN pad terminal.</summary>
    IngenicoNPT710,
    /// <summary>Ingenico NPT PX328 PIN pad terminal.</summary>
    IngenicoPX328,
    /// <summary>Ingenico NPT i5110 PIN pad terminal.</summary>
    Ingenicoi5110,
    /// <summary>Ingenico NPT i3070 PIN pad terminal.</summary>
    Ingenicoi3070,
    /// <summary>Sagem PIN pad terminal.</summary>
    Sagem,
    /// <summary>Verifone PIN pad terminal.</summary>
    Verifone,
    /// <summary>Keycorp PIN pad terminal.</summary>
    Keycorp,
    /// <summary>Unknown PIN pad terminal.</summary>
    Unknown
}

/// <summary>PIN pad terminal supported options.</summary>
export enum PINPadOptionFlags {
    /// <summary>Tipping enabled flag.</summary>
    Tipping = 0x0001,
    /// <summary>Pre-athourization enabled flag.</summary>
    PreAuth = 0x0002,
    /// <summary>Completions enabled flag.</summary>
    Completions = 0x0004,
    /// <summary>Cash-out enabled flag.</summary>
    CashOut = 0x0008,
    /// <summary>Refund enabled flag.</summary>
    Refund = 0x0010,
    /// <summary>Balance enquiry enabled flag.</summary>
    Balance = 0x0020,
    /// <summary>Deposit enabled flag.</summary>
    Deposit = 0x0040,
    /// <summary>Manual voucher enabled flag.</summary>
    Voucher = 0x0080,
    /// <summary>Mail-order/Telephone-order enabled flag.</summary>
    MOTO = 0x0100,
    /// <summary>Auto-completions enabled flag.</summary>
    AutoCompletion = 0x0200,
    /// <summary>Electronic Fallback enabled flag.</summary>
    EFB = 0x0400,
    /// <summary>EMV enabled flag.</summary>
    EMV = 0x0800,
    /// <summary>Training mode enabled flag.</summary>
    Training = 0x1000,
    /// <summary>Withdrawal enabled flag.</summary>
    Withdrawal = 0x2000,
    /// <summary>Funds transfer enabled flag.</summary>
    Transfer = 0x4000,
    /// <summary>Start cash enabled flag.</summary>
    StartCash = 0x8000
}

/// <summary>PIN pad terminal key handling scheme.</summary>
export enum KeyHandlingType {
    /// <summary>Single-DES encryption standard.</summary>
    SingleDES = '0',
    /// <summary>Triple-DES encryption standard.</summary>
    TripleDES = '1',
    /// <summary>Unknown encryption standard.</summary>
    Unknown = 'Unknown'
}

/// <summary>PIN pad terminal network option.</summary>
export enum NetworkType {
    /// <summary>Leased line bank connection.</summary>
    Leased = '1',
    /// <summary>Dial-up bank connection.</summary>
    Dialup = '2',
    /// <summary>Unknown bank connection.</summary>
    Unknown = 'Unknown'
}

/// <summary>PIN pad terminal communication option.</summary>
export enum TerminalCommsType {
    /// <summary>Cable link communications.</summary>
    Cable = '0',
    /// <summary>Intrared link communications.</summary>
    Infrared = '1',
    /// <summary>Unknown link communications.</summary>
    Unknown = 'Unknown'
}

	/// <summary>A PC-EFTPOS terminal status request object.</summary>
	export interface EFTStatusRequest extends EFTRequest {

        /// <summary>Two digit merchant code</summary>
        /// <value>Type: <see cref="string"/><para>The default is "00"</para></value>
        merchant: string,

        /// <summary>Type of status to perform.</summary>
        /// <value>Type: <see cref="StatusType"/><para>The default is <see cref="StatusType.Standard" />.</para></value>
        statusType: StatusType,

        /// <summary>Indicates where the request is to be sent to. Should normally be EFTPOS.</summary>
        /// <value>Type: <see cref="TerminalApplication"/><para>The default is <see cref="TerminalApplication.EFTPOS"/>.</para></value>
        application: TerminalApplication,
    }

    export const defaultEFTStatusRequest: EFTStatusRequest = {
        ...defaultEFTRequest,
        merchant: '00',
        statusType: StatusType.Standard,
        application: TerminalApplication.EFTPOS,
    }

	/// <summary>A PC-EFTPOS terminal status response object.</summary>
	export interface EFTStatusResponse extends EFTResponse {

        /// <summary>Two digit merchant code</summary>
        /// <value>Type: <see cref="string"/><para>The default is "00"</para></value>
        merchant: string,

        /// <summary>The AIIC that is configured in the terminal.</summary>
        /// <value>Type: <see cref="System.String" /></value>
        AIIC: string,

        /// <summary>The NII that is configured in the terminal.</summary>
        /// <value>Type: <see cref="System.Int32" /></value>
        NII: number,

        /// <summary>Terminal ID configured in the PIN pad.</summary>
        /// <value>Type: <see cref="System.String" /></value>
        catid : string,

        /// <summary>Merchant ID configured in the PIN pad.</summary>
        /// <value>Type: <see cref="System.String" /></value>
        caid : string,

        /// <summary>The bank response timeout that is configured in the terminal.</summary>
        /// <value>Type: <see cref="System.Int32" /></value>
        timeout : number,

        /// <summary>Indicates if the PIN pad is currently logged on.</summary>
        /// <value>Type: <see cref="System.Boolean" /></value>
        loggedOn : boolean,

        /// <summary>The serial number of the terminal.</summary>
        /// <value>Type: <see cref="System.String" /></value>
        pinPadSerialNumber : string,

        /// <summary>PIN pad software version.</summary>
        /// <value>Type: <see cref="System.String" /></value>
        pinPadVersion : string,

        /// <summary>The bank acquirer code.</summary>
        /// <value>Type: <see cref="System.Char" /></value>
        bankCode : string,

        /// <summary>The bank description.</summary>
        /// <value>Type: <see cref="System.String" /></value>
        bankDescription : string,

        /// <summary>Key verification code.</summary>
        /// <value>Type: <see cref="System.String" /></value>
        KVC : string,

        /// <summary>Current number of stored transactions.</summary>
        /// <value>Type: <see cref="System.Int32" /></value>
        SAFCount : number,

        /// <summary>The acquirer communications type.</summary>
        /// <value>Type: <see cref="NetworkType" /></value>
        networkType: NetworkType,

        /// <summary>The hardware serial number.</summary>
        /// <value>Type: <see cref="System.String" /></value>
        hardwareSerial : string,

        /// <summary>The merchant retailer name.</summary>
        /// <value>Type: <see cref="System.String" /></value>
        retailerName : string,

        /// <summary>PIN pad terminal supported options flags.</summary>
        /// <value>Type: <see cref="PINPadOptionFlags" /></value>
        optionsFlags : PINPadOptionFlags[],

        /// <summary>Store-and forward credit limit.</summary>
        /// <value>Type: <see cref="System.Decimal" /></value>
        SAFCreditLimit : number,

        /// <summary>Store-and-forward debit limit.</summary>
        /// <value>Type: <see cref="System.Decimal" /></value>
        SAFDebitLimit : number,

        /// <summary>The maximum number of store transactions.</summary>
        /// <value>Type: <see cref="System.Int32" /></value>
        maxSAF : number,

        /// <summary>The terminal key handling scheme.</summary>
        /// <value>Type: <see cref="KeyHandlingType" /></value>
         keyHandlingScheme: KeyHandlingType,

        /// <summary>The maximum cash out limit.</summary>
        /// <value>Type: <see cref="System.Decimal" /></value>
         cashoutLimit : number,

        /// <summary>The maximum refund limit.</summary>
        /// <value>Type: <see cref="System.Decimal" /></value>
        refundLimit : number,

        /// <summary>Card prefix table version.</summary>
        /// <value>Type: <see cref="System.String" /></value>
         CPATVersion : string,

		/// <summary>Card name table version.</summary>
		/// <value>Type: <see cref="System.String" /></value>
		 nameTableVersion : string,

        /// <summary>The terminal to PC communication type.</summary>
        /// <value>Type: <see cref="TerminalCommsType" /></value>
         terminalCommsType : TerminalCommsType,

		/// <summary>Number of card mis-reads.</summary>
		/// <value>Type: <see cref="System.Int32" /></value>
		 cardMisreadCount : number,
		
		/// <summary>Number of memory pages in the PIN pad terminal.</summary>
		/// <value>Type: <see cref="System.Int32" /></value>
		 totalMemoryInTerminal : number,

		/// <summary>Number of free memory pages in the PIN pad terminal.</summary>
		/// <value>Type: <see cref="System.Int32" /></value>
		 freeMemoryInTerminal : number,

		/// <summary>The type of PIN pad terminal.</summary>
		/// <value>Type: <see cref="EFTTerminalType" /></value>
		 EFTTerminalType : EFTTerminalType,

		/// <summary>Number of applications in the terminal.</summary>
		/// <value>Type: <see cref="System.Int32" /></value>
		 numAppsInTerminal : number,

		/// <summary>Number of available display line on the terminal.</summary>
		/// <value>Type: <see cref="System.Int32" /></value>
		numLinesOnDisplay : number,

		/// <summary>The date the hardware was incepted.</summary>
		/// <value>Type: <see cref="System.DateTime" /></value>
		 hardwareInceptionDate : Date,

        /// <summary>Indicates if the request was successful.</summary>
        /// <value>Type: <see cref="System.Boolean"/></value>
         success : boolean,

        /// <summary>The response code of the request.</summary>
        /// <value>Type: <see cref="System.String"/><para>A 2 character response code. "00" indicates a successful response.</para></value>
         responseCode : string,

        /// <summary>The response text for the response code.</summary>
        /// <value>Type: <see cref="System.String"/></value>
         responseText : string,
    }

    const minEpoc = -8640000000000000

    

    export const defaultEFTStatusResponse: EFTStatusResponse = {
        ...defaultEFTResponse,
        responseType: IPClientResponseType.Status,
        merchant: '00',
        AIIC: '', 
		NII: 0, 
        catid  : '', 
        caid  : '', 
        timeout  : 0, 
        loggedOn  : false, 
        pinPadSerialNumber  : "", 
        pinPadVersion  : "", 
        bankCode  : ' ', 
        bankDescription  : "", 
        KVC  : "", 
        SAFCount  : 0, 
        networkType  : NetworkType.Unknown, 
        hardwareSerial  : "", 
        retailerName  : "", 
        optionsFlags  : [], 
        SAFCreditLimit  : 0, 
        SAFDebitLimit  : 0, 
        maxSAF  : 0, 
        keyHandlingScheme  : KeyHandlingType.Unknown, 
        cashoutLimit  : 0, 
        refundLimit  : 0, 
        CPATVersion  : "", 
		nameTableVersion  : "", 
        terminalCommsType  : TerminalCommsType.Unknown, 
		cardMisreadCount  : 0, 
		totalMemoryInTerminal  : 0, 
		freeMemoryInTerminal  : 0, 
		EFTTerminalType  : EFTTerminalType.Unknown, 
		numAppsInTerminal  : 0, 
		numLinesOnDisplay  : 0, 
		hardwareInceptionDate  : new Date(minEpoc), 
        success  : false, 
        responseCode  : "", 
        responseText  : "", 
    }