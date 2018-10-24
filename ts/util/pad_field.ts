import * as _ from 'lodash'
import { PadField, PadTag } from "../model/general";

export function getPadFieldAsString(padField: PadField, lenhdr: boolean) {
    let stringedPad = _.map(padField.tags, (tag: PadTag) => {
        let name = tag.name + "   ";
        let result = ''
        result += name.slice(0, 3);
        result += _.padStart(tag.data.length.toString(), 3, '0');
        result += tag.data;
        return result
    }).join('')

    if (lenhdr) {
        return _.padStart(stringedPad.length.toString(), 3, '0') + stringedPad;
    }
    return stringedPad;
}

export function setFromString(data: string, lenhdr?: boolean): PadTag[] {
    let i, len, n, r;
    let tags: PadTag[] = []

    if (lenhdr) {

        len = Number(data.slice(0, 3)) + 3;

        if (data.length < len)
            len = data.length;
        if (len < 3)
            return tags;
        i = 3;
    }
    else {
        len = data.length;
        i = 0;
    }
    while (i < len) {
        r = len - i;
        if (r < 6) {
            // bad data - but caller may still process what has been parsed
            return tags;
        }
        n = Number(data.slice(i + 3, i + 6));
        if (n < 0 || (i + 6 + n) > len) {
            // bad length info
            return tags;
        }
        tags = [...tags, { name: data.slice(i, i + 3), data: data.slice(i + 6, n + i + 6) }];
        i += n + 6;
    }
    return tags;
}
