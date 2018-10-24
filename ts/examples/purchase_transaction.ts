import { EFTClientIP } from '../index'

let client = new EFTClientIP({
    onResponse: (response: any) => {
        console.log(response)
    }
})

client.send.transaction({
    amtCash: 5
})
