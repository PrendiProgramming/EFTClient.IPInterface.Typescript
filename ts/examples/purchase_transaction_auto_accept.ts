import { EFTClientIP } from '../index'
import { IPClientResponseType } from '../model/general';
import { EFTPOSKey } from '../model/key';
import { GraphicCode } from '../model/display';

let client = new EFTClientIP({
    onResponse: (response: any) => {
        if (
            response.responseType === IPClientResponseType.Display &&
            response.OKKeyFlag && 
            response.graphicCode === GraphicCode.Finished
        ) {
            client.send.key({key: EFTPOSKey.OkCancel})
        }
        console.log(response)
    }
})

client.send.transaction({
    amtCash: 5
})
