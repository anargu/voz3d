import { LitElement } from 'lit'
import { html } from 'lit'
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

        <div
          class="dialog-container"
          @click=${(e) => this.onClickDialogContainer(e)}
        >
          <div class="dialog-body">
            <div class="dialog-header">
              <span class="times" @click=${(e) => this.closeDialog(e)}>&times;</span>
            </div>
            ${this.renderContent()}
          </div>
        </div>

        `
    }

    get dialogBody () {
      return this.shadowRoot.querySelector('.dialog-body');
    }

    renderContent() {
        switch (this.stateContent) {
            case HELP_US_STATE:
                return html`
                  <style>
                  ${css}
                  </style>
                  <div>
                    <div>Help us to improve</div>
                    <div>We are working on this content... but thanks for the intention</div>
                    <div>You can contact to us by email <a class="link-icon" href="mailto:jp.tincopa@gmail.com?">${svg(mailSVG)}</a></div>
                  </div>
                `
            case HOW_IT_WORK_STATE:
                return html`
                  <style>
                  ${css}
                  </style>
                  <div>
                    <div>[EN]</div>
                    <div>Go to the search bar and write a word that you want to learn its sign e.g. "Amigos" (which means friend) or "bien" (which means good)</div>
                    <div>You can delete words selected by clicking on the X next to the word</div>
                    <div>For demo purpose we added some words to keep very concise and avoiding increase the size of the project.</div>

                    <div>[ES]</div>
                    <div>Vaya a la barra de búsqueda y escriba una palabra cuyo signo desee aprender, por ejemplo "Amigos" o "bien"</div>
                    <div>Puede eliminar las palabras seleccionadas haciendo clic en la X junto a la palabra</div>
                    <div>Para fines de demostración, agregamos algunas palabras para mantener la concisión y evitar aumentar el tamaño del proyecto.</div>
                  </div>
                `                
            case SHARE_STATE:
                return html`
                  <style>
                  ${css}
                  </style>
                  <div>
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
                  </div>
                `
            default:
                return html`
                  <style>
                  ${css}
                  </style>
                  <div>EASTER EGG: No deberias estar aqui!</div>
                `
        }
    }

    closeDialog() {
      this.shadowRoot.querySelector('.dialog-container').classList.remove('opened')
    }

    onClickDialogContainer(e) {
      const rect = this.dialogBody.getBoundingClientRect()

      const isInDialog=(rect.top <= e.clientY && e.clientY <= rect.top + rect.height
        && rect.left <= e.clientX && e.clientX <= rect.left + rect.width)

      if (!isInDialog) {
          this.closeDialog()
      }
    }

    firstUpdated() {
        dialogSubject.subscribe(state => {
            if (state.text !== null) {
                this.stateContent = state.text
                this.updateComplete.then(_ => {
                    this.shadowRoot.querySelector('.dialog-container').classList.add('opened')
                })
            }
        })
    }
}

window.customElements.define('voz-dialog', VozDialog)
