import { LitElement } from 'lit'
import { html } from 'lit'
import css from './voz-three-btn.styl'

class VozThreeBtn extends LitElement {

    constructor() {
        super()
    }

    static get properties() {
        return {}
    }

    render () {
        return html`
        <style>
        ${css}
        </style>
        <a href="https://voz3d.com" target="_blank">
            <img .src="${PREFIX_PATH}/assets/logo.png" alt="">
        </a>
        `
    }
}

window.customElements.define('voz-three-btn', VozThreeBtn)
