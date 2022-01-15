import {LitElement} from '@polymer/lit-element'
import {html} from 'lit-html'
// import {html} from 'lit-html/directives/repeat'
import '~/components/word-chip/word-chip.js'
import css from '~/components/phrase-player/phrase-player.styl'
import { wordSubject, removeWord } from '../../logic/words.js'
import getElement from '~/utils/inlinesvg.js'
import playSVGstring from '~/assets/play.svg'

const playSVG = getElement(playSVGstring);

class PhrasePlayer extends LitElement {

    constructor() {
        super()

        this.wordsSize = 0
        this.words = []

        wordSubject.subscribe(state => {
            this.words = [...state.value]
        })
    }

    static get properties() {
        return {
            wordsSize: Number,
            words: Array
        }
    }

    render() {
        return html`
        <style>
        ${css}
        </style>
        <div class="words-container">
            <div class="words-inner-container">
                ${
                    this.words.map((word, i) => html`
                        <word-chip text="${word.label}"
                            @onClick=${(e) => this.play(word, i)}
                            @onDelete=${(e) => this.deleteWord(i)}>
                        </word-chip>`)
                }
            </div>
        </div><div class="actions-container">
            <span class="play-icon" @click=${() => this.play()}>${playSVG}</span>
        </div>
        `
    }

    play(word = null) {
        const payload = { detail: word === null? [...this.words]:[word]}
        let ev = new CustomEvent('onPlay', payload)
        this.dispatchEvent(ev)
    }

    deleteWord(i) {
        removeWord(this.words[i])
    }
}

customElements.define('phrase-player', PhrasePlayer)
