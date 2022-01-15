import { LitElement } from 'lit'
import { html } from 'lit'

import css from './box-card.styl'

class BoxCard extends LitElement {

    static get properties() {
        return {
            title: String
        }
    }

    render() {
        return html`
        <style>
        ${css}
        </style>
        <div class="title">${this.title}</div>
        
        <slot></slot>
        
        `
    }
}

window.customElements.define('box-card', BoxCard)
