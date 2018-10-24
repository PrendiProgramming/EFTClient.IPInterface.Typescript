import * as net from 'net'
import { createReceiptAckRequest } from './request_parser'
import { stringToEFTResponse } from './response_parser';
import * as _ from 'lodash'
import { IPClientResponseType } from './model/general';
import { EFTClientOptions } from '.';

export function tcpSocket(options: EFTClientOptions) {
    let client  = new net.Socket();
    client.connect({
        port: Number(options.port),
        host: options.hostName
    })
    
    client.on('connect', () => {
        options.onConnect()
    })

    client.on('data', (data) => {
        let responseObj = stringToEFTResponse(data.toString())
        if (_.isObject(responseObj)) {
            if (responseObj.responseType === IPClientResponseType.Receipt) {
                client.write(createReceiptAckRequest())
            }
            options.onResponse(responseObj)
        } else {
            options.onResponse({
                responseType: 'Not Implemented',
                response: data.toString()
            })
        }
    })

    client.on('close', () => {
        options.onClose()
        client.removeAllListeners()
    })
    client.on('end', () => {
        options.onClose()
        client.removeAllListeners()
    })

    client.on('error', (e) => {
        options.onError(e)
    })
    return client
}
