import { LitElement } from 'lit'
import { html } from 'lit'

import css from './fab-group.styl'

import ellipsisHSVG from '../../assets/elipsis-h.svg'
import githubAltSVG from '../../assets/github-alt.svg'
import coffeeSVG from '../../assets/coffee.svg'
import shareSVG from '../../assets/share.svg'
import smileSVG from '../../assets/smile.svg'
import questionSVG from '../../assets/question.svg'
import svg from '../../utils/inlinesvg'
import { openDialog, HELP_US_STATE, SHARE_STATE, HOW_IT_WORK_STATE } from '../../logic/dialoger';

class FabGroup extends LitElement {

    constructor() {
        super()
        this.fabButtons = [
            // {
            //     label: 'Source Code',
            //     svg: githubAltSVG
            // },
            {
                label: 'Help us',
                svg: coffeeSVG,
                action: () => {
                    openDialog(HELP_US_STATE)
                }
            },
            {
                label: 'Share',
                svg: shareSVG,
                action: () => {
                    openDialog(SHARE_STATE)
                }
            },
            // {
            //     label: 'Change Avatar',
            //     svg: smileSVG
            // },
            {
                label: 'How it works',
                svg: questionSVG,
                action: () => {
                    openDialog(HOW_IT_WORK_STATE)
                }
            }
        ]
    }

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
        <div id="fab-bar-el" class="fab-bar ${this.showFabBar?'':'hidden'}">
            ${this.fabButtons.map(fab => html`
                <button class="fab icon" @click=${(e) => fab.action()}>
                    <span class="fab-label">${fab.label}</span>
                    ${svg(fab.svg)}
                </button>            
            `)}
        </div>
        <button class="fab-menu" @click=${(e) => this.openFabBar(e)}>
            ${svg(ellipsisHSVG)}
        </button>`
    }

    async openFabBar(e) {
        const fabBarEl = this.shadowRoot.getElementById('fab-bar-el')
        let fabBarAnim = fabBarEl.animate({
            opacity: [1, 0]
        }, {
            duration: 200
        })
        fabBarAnim.pause()

        if (this.showFabBar) {
            fabBarAnim.onfinish = () => {
                this.showFabBar = !this.showFabBar
            }
            fabBarAnim.play()
        } else {
            this.showFabBar = !this.showFabBar
            fabBarAnim.reverse()
        }
    }
}

window.customElements.define('fab-group', FabGroup)
