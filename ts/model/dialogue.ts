import { EFTRequest, EFTResponse, defaultEFTRequest, defaultEFTResponse, IPClientResponseType } from "./general";

/// <summary>The style of PC-EFTPOS dialog.</summary>
export enum DialogType {
    /// <summary>The standard PC-EFTPOS dialog.</summary>
    Standard = '0',
    /// <summary>The PC-EFTPOS dialog for touch screens. Has larger buttons.</summary>
    TouchScreen = '1',
    /// <summary>Do not show the PC-EFTPOS dialogs.</summary>
    Hidden = '2'
}

/// <summary>The position of the PC-EFTPOS dialog.</summary>
/// <remarks>Currently not supported.</remarks>
export enum DialogPosition {
    /// <summary>The top left position of the screen.</summary>
    TopLeft,
    /// <summary>The top centre position of the screen.</summary>
    TopCentre,
    /// <summary>The top right position of the screen.</summary>
    TopRight,
    /// <summary>The middle left position of the screen.</summary>
    MiddleLeft,
    /// <summary>The centre position of the screen.</summary>
    Centre,
    /// <summary>The middle right position of the screen.</summary>
    MiddleRight,
    /// <summary>The bottom left position of the screen.</summary>
    BottomLeft,
    /// <summary>The bottom centre position of the screen.</summary>
    BottomCentre,
    /// <summary>The bottom right position of the screen.</summary>
    BottomRight
}

/// <summary>A PC-EFTPOS set dialog request object.</summary>
export interface SetDialogRequest extends EFTRequest {
    /// <summary>Indicates the type of PC-EFTPOS dialog to use.</summary>
    /// <value>Type: <see cref="DialogType" /><para>The default is <see cref="DialogType.Standard" />.</para></value>
    dialogType: DialogType,

    /// <summary>Indicates the X position of the PC-EFTPOS dialog.</summary>
    /// <value>Type: <see cref="System.Int32" /></value>
    dialogX: number,

    /// <summary>Indicates the Y position of the PC-EFTPOS dialog.</summary>
    /// <value>Type: <see cref="System.Int32" /></value>
    dialogY: number,

    /// <summary>Indicates the position of the PC-EFTPOS dialog.</summary>
    /// <value>Type: <see cref="DialogPosition" /><para>The default is <see cref="DialogPosition.Centre" />.</para></value>
    dialogPosition: DialogPosition,

    /// <summary>Indicates if the PC-EFTPOS dialog is to be on top.</summary>
    /// <value>Type: <see cref="System.Boolean" /><para>The default is TRUE.</para></value>
    enableTopmost: boolean,

    /// <summary>Set the title of the PC-EFTPOS dialog.</summary>
    /// <value>Type: <see cref="System.String" /></value>
    dialogTitle: string,

    /// <summary>Disable all future display events to the POS</summary>
    /// <value>Type: <see cref="System.Boolean" /><para>The default is FALSE.</para></value>
    disableDisplayEvents: boolean,
}

export const defaultSetDialogRequest: SetDialogRequest = {
    ...defaultEFTRequest,
    dialogType: DialogType.Standard,
    dialogX: 0,
    dialogY: 0,
    dialogPosition: DialogPosition.Centre,
    enableTopmost: true,
    dialogTitle: "",
    disableDisplayEvents: false,
}

/// <summary>A PC-EFTPOS set dialog response object.</summary>
export interface SetDialogResponse extends EFTResponse {
    /// <summary>Indicates if the set dialog request was successful.</summary>
    /// <value>Type: <see cref="System.Boolean" /></value>
    success: boolean
}

export const defaultSetDialogResponse: SetDialogResponse = {
    ...defaultEFTResponse,
    responseType: IPClientResponseType.SetDialog,
    success: true
}