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
                <input type="text" placeholder="Buscar palabra">
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
}

customElements.define('search-bar', SearchBar)