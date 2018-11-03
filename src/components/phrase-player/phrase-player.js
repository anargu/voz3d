import {LitElement} from '@polymer/lit-element'
import {html} from 'lit-html'
// import {html} from 'lit-html/directives/repeat'
import '../word-chip/word-chip.js'
import css from './phrase-player.styl'

class PhrasePlayer extends LitElement {

    constructor() {
        super()

        this.wordsSize = 0
        this.words = [2]
    }

    static get properties() {
        return {
            wordsSize: Number,
            words: Array
        }
    }

    render() {
        console.log('this.words', this.words)
        return html`
        <style>
        ${css}
        </style>
        <div class="words-container">
            <div class="words-inner-container">
                ${
                    this.words.map((word, i) => html`<word-chip text="word ${i}"></word-chip>`)
                }
            </div>
        </div><div class="actions-container">
            <img src="../../assets/play.svg" alt="" class="play-icon">
        </div>
        `
    }
}

customElements.define('phrase-player', PhrasePlayer)