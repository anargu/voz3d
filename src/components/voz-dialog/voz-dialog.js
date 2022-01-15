
import { LitElement } from '@polymer/lit-element'
import { html } from 'lit-html'
import '@vaadin/vaadin-dialog/vaadin-dialog.js'
import { dialogSubject, HELP_US_STATE, HOW_IT_WORK_STATE, SHARE_STATE } from '../../logic/dialoger';
import twitterSVG from '../../assets/twitter.svg'
import facebookSVG from '../../assets/facebook.svg'
import mailSVG from '../../assets/mail.svg'
import svg from '../../utils/inlinesvg'

import css from './voz-dialog.styl'


class VozDialog extends LitElement {

    static get properties() {
        return {
            stateContent: String
        }
    }

    render() {
        return html`
        <style>
        ${css}
        </style>
        <vaadin-dialog id="dialog-box">
            ${this.renderContent()}
        </vaadin-dialog>
        `
    }

    renderContent() {
        switch (this.stateContent) {
            case HELP_US_STATE:
                return html`
                <template>
                <div>Help us to improve</div>
                <div>We are working on this content... but thanks for the intention</div>
                <div>You can contact to us by email <a class="link-icon" href="mailto:jp.tincopa@gmail.com?">${svg(mailSVG)}</a></div>
                </template>
                `
            case HOW_IT_WORK_STATE:
                return html`
                <template>
                  <div>[EN]</div>
                  <div>Go to the search bar and write a word that you want to learn its sign e.g. "Amigos" (which means friend) or "bien" (which means good)</div>
                  <div>You can delete words selected by clicking on the X next to the word</div>
                  <div>For demo purpose we added some words to keep very concise and avoiding increase the size of the project.</div>

                  <div>[ES]</div>
                  <div>Vaya a la barra de búsqueda y escriba una palabra cuyo signo desee aprender, por ejemplo "Amigos" o "bien"</div>
                  <div>Puede eliminar las palabras seleccionadas haciendo clic en la X junto a la palabra</div>
                  <div>Para fines de demostración, agregamos algunas palabras para mantener la concisión y evitar aumentar el tamaño del proyecto.</div>
                </template>
                `                
            case SHARE_STATE:
                return html`
                <template>
                <div>Share the Voz3D.com website</div>
                <div class="link-container">
                    <a class="link-icon facebbok-link" href="https://www.facebook.com/sharer/sharer.php?u=https%3A//voz3d.com/">
                    ${svg(facebookSVG)}
                    </a>
                    <a class="link-icon twitter-link" href="https://twitter.com/home?status=https%3A//voz3d.com/">
                    ${svg(twitterSVG)}
                    </a>
                    <!-- <a href="mailto:anthony.arostegui@gmail.com?">Send Email</a> -->
                </div>
                </template>
                `
            default:
                return html`
                <template>
                <div>EASTER EGG: No deberias estar aqui!</div>
                </template>
                `
        }
    }

    firstUpdated() {

        dialogSubject.subscribe(state => {
            if (state.text !== null) {
                this.stateContent = state.text
                this.updateComplete.then(_ => {
                    this.shadowRoot.getElementById('dialog-box').opened = true
                })
            }
        })
    }
}

customElements.define('voz-dialog', VozDialog)
