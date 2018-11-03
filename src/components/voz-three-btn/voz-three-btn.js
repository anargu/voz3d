import { LitElement } from '@polymer/lit-element'
import { html } from 'lit-html'
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
        <a href="https://voz3d.com">
            <img src="../../assets/logo.png" alt="">
        </a>
        `
    }
}

customElements.define('voz-three-btn', VozThreeBtn)