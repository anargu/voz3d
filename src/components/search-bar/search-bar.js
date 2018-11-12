import { LitElement } from '@polymer/lit-element'
import { html } from 'lit-html'
import css from './search-bar.styl'
import searchIcon from '../../assets/search.svg'
import micIcon from '../../assets/mic.svg'
import svg from '../../utils/inlinesvg'
import { filterStrict, selectWord } from '../../logic/words';

const DEFAULT_PLACEHOLDER_TEXT = 'Buscar palabra'

class SearchBar extends LitElement {

    constructor() {
        super()

        this.recognition = null
        this.placeholder = DEFAULT_PLACEHOLDER_TEXT
        this.recognizing = false
    }

    static get properties () {
        return {
            placeholder: String,
            recognizing: Boolean
        }
    }

    render() {
        return html`
        <style>
        ${css}
        </style>
        <div class="wrapper">
            <div class="search-bar">
                <input id="search-input" type="text" placeholder="${this.placeholder}" @input=${(e) => { this.onInput(e) }}>
            </div>
            <div class="search-icon">
                <span class="icon">
                ${html`${svg(searchIcon)}`}
                </span>
            </div>
            <div class="mic-icon" @click=${(e) => this.startSpeak(e)}>
                <div class="${this.recognizing?'mic-recording-active':'mic-recording'}"></div>
                <span class="icon">
                ${html`${svg(micIcon)}`}
                </span>
            </div>
        </div>
        `
    }

    firstUpdated() {
        if (('webkitSpeechRecognition' in window)) {
            
            this.recognition = new webkitSpeechRecognition()
            this.recognition.continuous = false
            this.recognition.interimResults = false
            this.recognition.lang = 'es-PE'

            this.recognition.onstart = () => {
                console.log("onstart")
                this.recognizing = true
                this.placeholder = 'Hable ahora...'
            }
            this.recognition.onresult = (ev) => {
                let message = ev.results[0][0].transcript

                const results = message.toLowerCase().split(' ')
                console.log('results', results)
                this.shadowRoot.getElementById('search-input').value = message
                results.forEach(string => {
                    let foundWords = filterStrict(string)
                    if (foundWords.length > 0) {
                        selectWord(foundWords[0])
                    }
                })
            }
            this.recognition.onerror = (event) => {
                console.log('onerror')
                console.log(event)
                this.recognizing = false
            }
            this.recognition.onend = () => {
                console.log("onend")
                this.recognizing = false
                this.placeholder = DEFAULT_PLACEHOLDER_TEXT
            }
      
        }
    }

    startSpeak (ev) {
        if (!('webkitSpeechRecognition' in window)) {
            this.placeholder = 'Web Speech API is not supported by this browser. Upgrade to Chrome version 25 or later.'
            setTimeout(() => {
                this.placeholder = DEFAULT_PLACEHOLDER_TEXT
            }, 5000)
            return
        }
        if (this.recognition != null) {
            if (!this.recognizing) {
                this.recognition.start()                
            }
        } else {
            console.log('recognition is not setted')
        }
    }

    stopSpeak (ev) {
        if (this.recognizing) {
            this.recognition.stop()
            this.recognizing = false
        }
    }

    onInput(e) {
        const value = this.shadowRoot.getElementById('search-input').value

        let event = new CustomEvent('ontype', { 'detail': value })
        this.dispatchEvent(event)
    }
}

customElements.define('search-bar', SearchBar)