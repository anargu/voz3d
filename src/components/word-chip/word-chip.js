
import { LitElement } from '@polymer/lit-element'
import { html } from 'lit-html'
import css from './word-chip.styl'

class WordChip extends LitElement {

    static get properties() {
        return {
            text: String,
            id: String
        }
    }

    render() {
        return html`
        <style>
        ${css}
        </style>

        <span class="label">${this.text}</span>
        <span class="delete-icon">&times;</span>
        `
    }
}

customElements.define('word-chip', WordChip)