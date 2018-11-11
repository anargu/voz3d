import { BehaviorSubject } from 'rxjs'

let words = {
    value: []
}

export const wordSubject = new BehaviorSubject(words)

export const selectWord = (word) => {
    let hasSelected = -1
    for (const w of words.value) {
        if (w.label !== undefined) {
            hasSelected = w.label.indexOf(word.label)
            break
        }
    }
    if (hasSelected === -1) { words.value.push(word) }
    else { words.value.splice(hasSelected, 1) }

    wordSubject.next(words)
}

export const removeWord = (word) => {
    words.value.forEach((w, i) => {
        if (w.label !== undefined) {
            if (w.label === word.label) {
                words.value.splice(i,1)
            }            
        }
    })

    wordSubject.next(words)
}