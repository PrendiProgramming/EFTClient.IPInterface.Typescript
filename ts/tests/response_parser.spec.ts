import { expect } from 'chai'
import moment from 'moment'
import { stringToEFTResponse } from '../response_parser'

describe('Response parser', () => {
    describe('Transaction', () => {
        it('converts a purchase transaction response string to a transaction object', async () => {
            let responseString = '#0262M0100APPROVED            00PCredit 000000500000000000000000000123456                0     1234567890123451234567849092410241018114447AMEX CARD           37601234567890      37601234567890=0949?,,S, YES, 05??????  1234567890120501S000000000000000000000000000'
            let response = stringToEFTResponse(responseString)
            response = {...response, 
                dateSettlement: response.dateSettlement.format(),
                date: response.date.format(),
            }
            let expectedResponse = {
                responseType: 'M',
                success: true,
                responseCode: '00',
                responseText: 'APPROVED            ',
                merchant: '00',
                txnType: 'P',
                accountType: 'Credit ',
                amtCash: 5,
                amtPurchase: 0,
                amtTip: 0,
                authCode: 123456,
                txnRef: '                ',
                stan: 0,
                caid: '123456789012345',
                catid: '12345678',
                dateExpiry: '4909',
                dateSettlement: moment("2018-10-24T00:00:00.000").format(),
                date: moment("2018-10-24T11:44:47.000").format(),
                cardType: 'AMEX CARD           ',
                pan: '37601234567890      ',
                track2: '37601234567890=0949?,,S, YES, 05??????  ',
                RRN: '123456789012',
                cardName: 5,
                txnFlags:
                {
                    offline: false,
                    receiptPrinted: true,
                    cardEntry: 'S',
                    commsMethod: '0',
                    currency: '0',
                    payPass: '0',
                    undefinedFlag6: '0',
                    undefinedFlag7: '0'
                },
                balanceReceived: false,
                availableBalance: 0,
                clearedFundsBalance: 0,
                purchaseAnalysisData: { tags: [] }
            }
            expect(response).to.eql(expectedResponse)
        })
    })
})


