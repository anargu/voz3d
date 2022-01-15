import { LitElement } from 'lit'
import { html } from 'lit'
import '../search-bar/search-bar.js'
import '../search-results/search-results.js'
import {filter} from '../../logic/words.js'

class SearchElement extends LitElement {

    constructor() {
        super()
        this.results = []
        this.showResults = false
    }

    static get properties() {
        return {
            search: String,
            results: Array,
            showResults: Boolean
        }
    }

    render() {
        return html`
        <search-bar @ontype=${(e) => this.filter(e.detail) }>
        </search-bar>

        <search-results
            @onCollapse=${(e) => this.updateProps(e)}
            .open=${this.showResults}
            .search=${this.search}
            .results=${[...this.results]}>
        </search-results>
        `
    }

    filter(string) {
        this.string = string
        if (string.length > 0) {
            if (this.showResults === false) {
                this.showResults = true
            }
            const results = filter(string)
            this.results = results
        } else {
            this.showResults = false
        }
    }

    updateProps(e) {
        this.showResults = e.detail.open
    }
}

window.customElements.define('search-element', SearchElement)
