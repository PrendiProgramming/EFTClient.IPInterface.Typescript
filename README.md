
**NOTE: This library has only been tested on a virtual pin pad so far - use at your own risk!**

This a semi-implemented PC-EFTPOS library for interacting with Eftpos pinpads via a node.js/electron application.
This was adapted from the official PC-EFTPOS C# library https://github.com/pceftpos/EFTClient.IPInterface.CSharp

> PC-EFTPOS is used to handle the communication between EFTPOS pin pads and banking networks. In order to use this library you will need to have PC-EFTPOS installed and a pinpad connected (virtual or otherwise).

Because development is still in flux, it is not yet available as an NPM package.

## Examples
Transaction to pinpad typescript example
`npm install && npm run example`

```
import { EFTClientIP } from '../index'

let client = new EFTClientIP({
    host: '127.0.0.1', // PC-EFTPOS host address
    port: 2011, // PC-EFTPOS port
    onResponse: (response: any) => {
        console.log(response)
    }
})

client.send.transaction({
    amtCash: 5
})
```
Check the examples folder for other examples.

## Requests

Requests are sent over a proprietary PC-EFTPOS TCP-based protocol. This library takes a human-readable request object and converts it into this protocol. (Each request has a typescript interface that establishes accepted ). The below requests are currently supported:

Implemented Requests:
    - `client.send.transaction(transaction: Partial<EFTTransactionRequest>)` - Send a transaction to a pinpad.
    
    - `client.send.logon(logon: Partial<EFTLogonRequest>)` - Send a logon request to the bank from the pinpad.
    
    - `client.send.key(key: Partial<EFTSendKeyRequest>)` - Send a key press action to the pinpad.
    
    - `client.send.setDialog(dialog: Partial<SetDialogRequest>)` - Set the EFTClient dialogue popup configuration.
    
    - `client.send.status(status: Partial<EFTStatusRequest>)` - Send a request for information about the connected pinpad.
    
    - `client.send.getClientList()` - Send a request for information about the connected EFTClients.

## Responses

Responses are received over a proprietary PC-EFTPOS TCP-based protocol. This library takes the protocol and converts it to a human readable object. Responses are sent through a callback provided when creating a new EFTClientIP. All responses have a `responseType: IPClientResponseType | "Not Implemented"` which indicates what type of response has been received.

```
let client = new EFTClientIP({
    onResponse: (response: any) => {
        // handle all responses here
    }
})
```

Implemented Response types:
    - `type: IPClientResponseType.Display, interface: EFTDisplayResponse`
    
    - `type: IPClientResponseType.Receipt, interface: EFTReceiptResponse`
    
    - `type: IPClientResponseType.Logon, interface: EFTLogonResponse`
    
    - `type: IPClientResponseType.Transaction, interface: EFTTransactionResponse`
    
    - `type: IPClientResponseType.SetDialog, interface: SetDialogResponse`
    
    - `type: IPClientResponseType.Status, interface: SetStatusResponse`
    
    - `type: 'Not Implemented', interface: {response: any} // emits messages that did not match one of the above types.`

## Want to contribute

Feel free to put up a pull request.
* Test coverage is currently lacking - feel free to add to it in the tests folder.
* There are still request/responses that are yet to be implemented (refer to c# project). 
* SSL support is not in place (which is required when PC-EFTPOS is not running on the same computer as this library).  
* This has only been lightly tested on a virtual pin pad. More thorough testing on other pin pads would be great. 
