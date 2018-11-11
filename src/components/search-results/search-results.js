
import { LitElement } from '@polymer/lit-element'
import { html } from 'lit-html'
import css from './search-results.styl'

class SearchResults extends LitElement {

    constructor() {
        super()

        this.results = []
        this.open = false
    }

    static get properties() {
        return {
            open: Boolean,
            results: Array
        }
    }

    render() {
        return html`
        <style>
        ${css}
        </style>
        <div class="wrapper">
            <div class="search-container">
                <ul>
                    ${this.results.map(result => html`<li> ${result.label} </li>`)}
                </ul>
            </div>            
        </div>
        `
    }    
}

customElements.define('search-results', SearchResults)