import { expect } from 'chai'
import { createEFTTransactionRequest, createEFTStatusRequest, createEFTLogonRequest, createSendKeyRequest, createSetDialogRequest } from '../request_parser'
import { StatusType } from '../model/status';
import { LogonType } from '../model/logon';
import { EFTPOSKey } from '../model/key';
import { DialogType } from '../model/dialogue';

describe('Request parser', () => {
    describe('Transaction', () => {
        it('converts a purchase transaction to the correct tcp protocol', async () => {
            let request = createEFTTransactionRequest({amtCash: 5})
            let expectedRequest = '#0161M000P00000000500000000000000000                00                                                                  00               P                    000'
            expect(request).to.eql(expectedRequest)
        })
    })
    describe('Login', () => {
        it('converts a login request obj to the correct tcp protocol', async () => {
            let request = createEFTLogonRequest({logonType: LogonType.Logoff})
            let expectedRequest = '#0016G8000000000'
            expect(request).to.eql(expectedRequest)
        })
    })
    describe('Send Key', () => {
        it('converts a send key request obj to the correct tcp protocol', async () => {
            let request = createSendKeyRequest({key: EFTPOSKey.OkCancel})
            let expectedRequest = '#0008Y00'
            expect(request).to.eql(expectedRequest)
        })
    })
    describe('Dialogue', () => {
        it('converts a set dialogue request obj to the correct tcp protocol', async () => {
            let request = createSetDialogRequest({dialogType: DialogType.Hidden})
            let expectedRequest = '#00612 2000000004           1                                '
            expect(request).to.eql(expectedRequest)
        })
    })
    describe('Status', () => {
        it('converts a status request obj to the correct tcp protocol', async () => {
            let request = createEFTStatusRequest({statusType: StatusType.TerminalAppInfo})
            let expectedRequest = '#0011K10000'
            expect(request).to.eql(expectedRequest)
        })
    })
})


