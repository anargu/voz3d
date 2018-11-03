import {LitElement} from '@polymer/lit-element'
import {html} from 'lit-html'

import css from './fab-group.styl'

import ellipsisHSVG from '../../assets/elipsis-h.svg'
import githubAltSVG from '../../assets/github-alt.svg'
import coffeeSVG from '../../assets/coffee.svg'
import shareSVG from '../../assets/share.svg'
import smileSVG from '../../assets/smile.svg'
import questionSVG from '../../assets/question.svg'
import svg from '../../utils/inlinesvg'

class FabGroup extends LitElement {

    static get properties() {
        return {
            showFabBar: Boolean
        }
    }

    render() {
        return html`
        <style>
        ${css}
        </style>
        <div class="fab-bar ${this.showFabBar?'':'hidden'}">
            <button class="fab icon">
                <span class="fab-label">Source Code</span>
                ${svg(githubAltSVG)}</button>
            <button class="fab icon">
                <span class="fab-label">Help us</span>
                ${svg(coffeeSVG)}
            </button>
            <button class="fab icon">
                <span class="fab-label">Share</span>
                ${svg(shareSVG)}
            </button>
            <button class="fab icon">
                <span class="fab-label">Change Avatar</span>
                ${svg(smileSVG)}
            </button>
            <button class="fab icon">
                    <span class="fab-label">How it Works</span>
                    ${svg(questionSVG)}
            </button>
        </div>
        <button class="fab-menu" @click=${() => this.openFabBar()}>
            ${svg(ellipsisHSVG)}
        </button>`
    }

    openFabBar() {
        this.showFabBar = !this.showFabBar
    }
}

customElements.define('fab-group', FabGroup)