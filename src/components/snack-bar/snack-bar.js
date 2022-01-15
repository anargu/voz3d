import { LitElement } from 'lit'
import { html } from 'lit'

import 'lit-toast/lit-toast.js';

import css from './snack-bar.styl'

import { notificationSubject } from '../../logic/notificator'

class SnackBar extends LitElement {

    constructor(){
        super()
    }

    static get properties() {
        return {
            text: String
        }
    }

    get litToast () {
      return this.shadowRoot.querySelector('lit-toast')
    }

    render() {
        return html`
            <style>
            ${css}
            </style>
            <lit-toast text=${this.text} duration="5000" .opened=${this.open}></lit-toast>
        `
    }

    firstUpdated() {
        notificationSubject.subscribe(notification => {
            if (notification.text !== null) {
                this.litToast.show(notification.text, 5000)
            }
        })
    }
}

window.customElements.define('snack-bar', SnackBar)
