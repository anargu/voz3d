import { LitElement } from '@polymer/lit-element'
import { html } from 'lit-html'
import css from './search-bar.styl'
import searchIcon from '../../assets/search.svg'
import micIcon from '../../assets/mic.svg'
import svg from '../../utils/inlinesvg'

class SearchBar extends LitElement {
    render() {
        return html`
        <style>
        ${css}
        </style>
        <div class="wrapper">
            <div class="search-bar">
                <input id="search-input" type="text" placeholder="Buscar palabra" @input=${(e) => { this.onInput(e) }}>
            </div>
            <div class="search-icon">
                <span class="icon">
                ${html`${svg(searchIcon)}`}
                </span>
            </div>
            <div class="mic-icon">
                <span class="icon">
                ${html`${svg(micIcon)}`}
                </span>
            </div>
        </div>
        `
    }

    onInput(e) {
        const value = this.shadowRoot.getElementById('search-input').value

        let event = new CustomEvent('ontype', { 'detail': value })
        this.dispatchEvent(event)
    }
}

customElements.define('search-bar', SearchBar)