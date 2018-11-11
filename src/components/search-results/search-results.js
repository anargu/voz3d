
import { LitElement } from '@polymer/lit-element'
import { html } from 'lit-html'
import css from './search-results.styl'
import { when } from 'lit-html/directives/when'
import {selectWord} from '../../logic/words.js'

class SearchResults extends LitElement {

    constructor() {
        super()

        this.results = []
        this.open = false
    }

    static get properties() {
        return {
            open: Boolean,
            results: Array,
            search: String
        }
    }

    render() {
        return html`
        <style>
        ${css}
        </style>
        <div class="wrapper" .hidden=${!this.open}>
            <div class="search-container">
                <div class="title">Resultados de <span class="string">${this.search}</span></div>
                ${when(this.results.length === 0, 
                    () => html`
                        <div class="no-results">No hay resultados para esta palabra. Intenta con otra.</div>
                    `,
                    () => html`
                        <ul>
                            ${this.results.map(
                                result => html`<li @click=${() => this.selectWord(result)}> ${result.label} </li>`
                            )}
                        </ul>                    
                    `)}
            </div>            
        </div>
        `
    }

    selectWord(word) {
        selectWord(word)
        
        this.open = false
        let ev = new CustomEvent('onCollapse', {detail: {open: this.open}})
        this.dispatchEvent(ev)
    }
}

customElements.define('search-results', SearchResults)