import { tcpSocket } from "./tcp_socket";
import * as net from 'net'
import { createEFTTransactionRequest, createEFTLogonRequest, createSendKeyRequest, createSetDialogRequest, createEFTStatusRequest, createGetClientListRequest } from "./request_parser";
import { EFTTransactionRequest } from "./model/transaction";
import { EFTLogonRequest } from "./model/logon";
import { EFTSendKeyRequest } from "./model/key";
import { SetDialogRequest } from "./model/dialogue";
import { EFTStatusRequest } from "./model/status";

export type EFTClientOptions = {
    hostName: string,
    port: string,
    onError: Function,
    onResponse: Function,
    onConnect: Function,
    onClose: Function,
}

const defaultOptions: EFTClientOptions = {
    hostName: '127.0.0.1',
    port: '2011',
    onResponse: () => {},
    onError: () => {},
    onClose: () => {},
    onConnect: () => {},
}

export class EFTClientIP {
    options: EFTClientOptions
    connection: net.Socket
    constructor(options?: Partial<EFTClientOptions>) {
        let opts = {...defaultOptions, ...options}
        this.options = {...opts, onClose: () => {
            opts.onClose()
            // Attempt to reconnect in two seconds
            setTimeout(() => this.connection = tcpSocket(this.options), 2000)
        }}
        this.connection = tcpSocket(this.options)
        this.heartbeat()
    }

    heartbeat() {
        // Heartbeat
        setInterval(() => {
            if (this.connection) this.connection.write('')
        }, 5000)
    }

    // Not required, as it will reconnect automatically in 2 seconds.
    reconnect() {
        this.connection.destroy()
        this.connection = tcpSocket(this.options)
    }

    send = {
        transaction: (transaction: Partial<EFTTransactionRequest>) => {
            this.connection.write(createEFTTransactionRequest(transaction))
        },
        logon: (logon: Partial<EFTLogonRequest>) => {
            this.connection.write(createEFTLogonRequest(logon))
        },
        key: (key: Partial<EFTSendKeyRequest>) => {
            this.connection.write(createSendKeyRequest(key))
        },
        setDialog: (dialogue: Partial<SetDialogRequest>) => {
            this.connection.write(createSetDialogRequest(dialogue))
        },
        status: (status: Partial<EFTStatusRequest>) => {
            this.connection.write(createEFTStatusRequest(status))
        },
        getClientList: () => {
            this.connection.write(createGetClientListRequest())
        }
    }
}

