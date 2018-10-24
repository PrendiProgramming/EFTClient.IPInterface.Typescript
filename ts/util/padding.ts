import { padEnd, padStart } from 'lodash'

export function padRightAndCut(str: string, totalWidth: number, paddingChar?: string) {
    if (str.length == totalWidth)
        return str;
    else if (str.length < totalWidth)
        return padEnd(str, totalWidth, paddingChar);
    else
        return str.slice(0, totalWidth);
}

export function padLeftAsIntFromDecimal(num: number, totalWidth: number) {
    let int = Number((num * 100).toFixed())
    return padLeftInteger(int, totalWidth)
}

export function padLeftInteger(num: number | string, totalWidth: number) {
    let stringInt = String(num)
    if (stringInt.length > totalWidth ) {
        throw new Error(`The number '${num}' cannot fit in a padded string of length:${totalWidth}`)
    }
    let paddedInt = padStart(stringInt, totalWidth, '0')
    return paddedInt
}
