
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
                <div>Ay&uacute;danos a mejorar</div>
                <div>Estamos trabajando en este contenido, gracias por la intenci&oacute;n!</div>
                <div>Cont&aacute;ctanos por mail <a class="link-icon" href="mailto:jp.tincopa@gmail.com?">${svg(mailSVG)}</a></div>
                </template>
                `
            case HOW_IT_WORK_STATE:
                return html`
                <template>
                <div>Escribe o pronuncia las palabras que quieres aprender su se&ntilde;a</div>
                <div>Borra las palabras que no deseas escuchar para formar tu oraci&oacute;n </div>
                <div>No tenemos todas las palabras pero estamos trabajando para darte mayor diversidad</div>
                </template>
                `                
            case SHARE_STATE:
                return html`
                <template>
                <div>Puedes ayudarnos a que m&aacute;s personas conozcan de este proyecto</div>
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
