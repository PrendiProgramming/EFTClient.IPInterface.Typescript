import { padStart } from 'lodash'
export function formatEftRequest(eftRequest: string) {
    var len = eftRequest.length + 5;
    return "#" + padStart(String(len), 4, '0') +  eftRequest
}