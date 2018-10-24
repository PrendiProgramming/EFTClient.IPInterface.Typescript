import { EFTRequest, defaultEFTRequest } from './general'
/// <summary>PC-EFTPOS key types.</summary>
export enum EFTPOSKey {
    /// <summary>The OK/CANCEL key.</summary>
    OkCancel = '0',
    /// <summary>The YES/ACCEPT key.</summary>
    YesAccept = '1',
    /// <summary>The NO/DECLINE key.</summary>
    NoDecline = '2',
    /// <summary>The AUTH key.</summary>
    Authorise = '3'
}

/// <summary>A PC-EFTPOS client list request object.</summary>
export interface EFTSendKeyRequest extends EFTRequest {
    /// <summary> The type of key to send </summary>
    key: EFTPOSKey,

    /// <summary> Data entered by the POS (e.g. for an 'input entry' dialog type) </summary>
    data: string
}

export const defaultEFTSendKeyRequest: EFTSendKeyRequest = {
    ...defaultEFTRequest,
    isStartOfTransactionRequest: false,
    key: EFTPOSKey.OkCancel,
    data: ""
}