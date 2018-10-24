import { EFTClientIP } from '..'
import { DialogType } from '../model/dialogue';

let client = new EFTClientIP({
    onResponse: (response: any) => {
        console.log(response)
    }
})
// prevents EFTClient from displaying notifications
client.send.setDialog({disableDisplayEvents: false, dialogType: DialogType.Hidden})
client.send.transaction({amtCash: 5})
