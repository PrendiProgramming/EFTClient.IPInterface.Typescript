import { EFTRequest, EFTResponse, defaultEFTRequest, defaultEFTResponse } from './general'
export interface EFTClientListRequest extends EFTRequest {
}

export const defaultEFTClientListRequest: EFTClientListRequest = {
    ...defaultEFTRequest
}

export enum EFTClientState {
    Available,
    Unavailable
}

export interface EFTClient {
    name: string,
    IPAddress: string,
    port: number,
    state: EFTClientState
}


/// <summary>A PC-EFTPOS terminal logon response object.</summary>
export interface EFTClientListResponse extends EFTResponse {
    success: boolean,
    EFTClients: EFTClient[]
}
    
export const defaultEFTClientListResponse: EFTClientListResponse = {
    ...defaultEFTResponse,
    success: false,
    EFTClients: []
}
