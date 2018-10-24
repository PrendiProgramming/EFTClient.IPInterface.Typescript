import { PadField, EFTResponse, defaultPadField, defaultEFTResponse, IPClientResponseType } from './general'
export enum InputType {
    None = '0',
    Normal = '1',
    Amount = '2',
    Decimal = '3',
    Password = '4' 
}

export enum GraphicCode {
    Processing = '0',
    Verify = '1',
    Question = '2',
    Card = '3',
    Account = '4',
    PIN = '5',
    Finished = '6',
    None = ' '
}


    /// <summary>A PC-EFTPOS display response object.</summary>
export interface EFTDisplayResponse extends EFTResponse {

    /// <summary>Number of lines to display.</summary>
    /// <value>Type: <see cref="System.Int32" /></value>
    numberOfLines: number,

    /// <summary>Number of character per display line.</summary>
    /// <value>Type: <see cref="System.Int32" /></value>
    lineLength: number,

    /// <summary>Text to be displayed. Each display line is concatenated.</summary>
    /// <value>Type: <see cref="System.String" >String array</see></value>
    displayText: string[],

    /// <summary>Indicates whether the Cancel button is to be displayed.</summary>
    /// <value>Type: <see cref="System.Boolean" /></value>
    cancelKeyFlag: boolean,

    /// <summary>Indicates whether the Accept/Yes button is to be displayed.</summary>
    /// <value>Type: <see cref="System.Boolean" /></value>
    acceptYesKeyFlag: boolean,

    /// <summary>Indicates whether the Decline/No button is to be displayed.</summary>
    /// <value>Type: <see cref="System.Boolean" /></value>
    declineNoKeyFlag: boolean,

    /// <summary>Indicates whether the Authorise button is to be displayed.</summary>
    /// <value>Type: <see cref="System.Boolean" /></value>
    authoriseKeyFlag: boolean,

    /// <summary>Indicates whether the OK button is to be displayed.</summary>
    /// <value>Type: <see cref="System.Boolean" /></value>
    OKKeyFlag: boolean,

    inputType: InputType,

    graphicCode: GraphicCode,

    purchaseAnalysisData: PadField,
}

export const defaultEFTDisplayResponse: EFTDisplayResponse = {
    ...defaultEFTResponse, 
    responseType: IPClientResponseType.Display,
    numberOfLines : 2, 
    lineLength : 20, 
    displayText : [], 
    cancelKeyFlag : false, 
    acceptYesKeyFlag : false, 
    declineNoKeyFlag : false, 
    authoriseKeyFlag : false, 
    OKKeyFlag : false, 
    inputType : InputType.None,
    graphicCode : GraphicCode.None, 
    purchaseAnalysisData : defaultPadField,
}
