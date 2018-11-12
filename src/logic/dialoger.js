import { BehaviorSubject } from 'rxjs'

export const HELP_US_STATE = 'HELP_US_STATE'
export const HOW_IT_WORK_STATE = 'HOW_IT_WORK_STATE'
export const SHARE_STATE = 'SHARE_STATE'
export const CHANGE_AVATAR_STATE = 'CHANGE_AVATAR_STATE'

let dialog = {
    text: null
}

export const dialogSubject = new BehaviorSubject(dialog)

export const openDialog = (state) => {
    dialog.text = state
    dialogSubject.next(dialog)
}