import { BehaviorSubject } from 'rxjs'

let notification = {
    text: null
}

export const notificationSubject = new BehaviorSubject(notification)

export const sendNotification = (text) => {
    let _text = ''
    if (typeof text === 'string') {
        _text = text
    } else if (text === null || text === undefined) {
        _text = 'message is null or undefined'
    } else {
        _text = text.toString()
    }
    notification.text = _text
    notificationSubject.next(notification)
}