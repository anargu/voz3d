
import { LitElement } from 'lit'
import { html } from 'lit'
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

        <span class="label" @click=${() => this.clickWord()}>${this.text}</span>
        <span class="delete-icon" @click=${() => this.deleteWord()}>&times;</span>
        `
    }

    clickWord() {
        let ev = new CustomEvent('onClick', {detail: null})
        this.dispatchEvent(ev)
    }

    deleteWord() {
        let ev = new CustomEvent('onDelete', {detail: null})
        this.dispatchEvent(ev)
    }
}

window.customElements.define('word-chip', WordChip)
