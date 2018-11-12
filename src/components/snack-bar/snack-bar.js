
import {LitElement} from '@polymer/lit-element'
import {html} from '@polymer/lit-element'
import '@polymer/paper-toast/paper-toast.js'

import css from './snack-bar.styl'

import { notificationSubject } from '../../logic/notificator'

class SnackBar extends LitElement {

    constructor(){
        super()

        this.open = false
    }

    static get properties() {
        return {
            open: Boolean,
            text: String
        }
    }

    render() {
        return html`
            <style>
            ${css}
            </style>
            <paper-toast id="snackbar" text=${this.text} duration="5000" .opened=${this.open}></paper-toast>
        `
    }

    firstUpdated() {
        notificationSubject.subscribe(notification => {
            if (notification.text !== null) {

                if (this.open === true) {
                    this.open = false

                    setTimeout(() => {
                        this.text = notification.text
                        this.open = true
                    }, 1000);    
                } else {
                    this.text = notification.text
                    this.open = true
                }
            }
        })
    }
}

customElements.define('snack-bar', SnackBar)