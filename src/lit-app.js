import { LitElement } from "@polymer/lit-element";
import { html /*, render*/ } from 'lit-html'

import { when } from 'lit-html/directives/when'
// import { until } from 'lit-html/directives/until'
// import { guard } from 'lit-html/directives/guard'
// import { ifDefined } from 'lit-html/directives/if-defined'
// import { asyncAppend } from 'lit-html/directives/async-append'
// import { asyncReplace } from 'lit-html/directives/async-replace'

import appCss from './lit-app.styl'
// import './components/box-card/box-card.js'
import './components/search-element/search-element.js'
import './components/voz-three-btn/voz-three-btn.js'
import './components/word-chip/word-chip.js'
import './components/phrase-player/phrase-player.js'
import './components/fab-group/fab-group.js'
import './components/scene-avatar/scene-avatar.js'
import './components/snack-bar/snack-bar.js'
import './components/voz-dialog/voz-dialog.js'

import { offlineWatcher } from './helpers/network'

const wait = (t) => new Promise((resolve) => setTimeout(resolve, t))
async function* countUp() {
    let i = 0;
    while (i < 10) {
        yield i++;
        await wait(1000);
    }
}

class LitApp extends LitElement {

    constructor() {
        super()

        this.whenCheckbox = false
        this.openPostDetail = false
        this.guardItems = ['blue', 'red', 'green']

        this.setOfflineWatcher()
    }

    static get properties() {
        return {
            whenCheckbox: Boolean,
            guardItems: Array,
            offline: Boolean
        }
    }

    setOfflineWatcher() {
        this.offline = false
        offlineWatcher((isOffline) => {
            this.offline = isOffline
        })
    }

    render() {
        console.log('render lit-app')
        return html`
        <style>
        ${appCss}
        </style>
        
        ${when(this.offline, () => html`
            <div class="offline-mode">Offline mode. Please check your connection</div>
        `, () => {})}

        <search-element></search-element>
        <phrase-player @onPlay=${(e) => this.onPlay(e)}></phrase-player>

        <div class="page-container">
            <!-- <h2>Lit-html with States</h2>
            <div>
            <word-chip text="hola"></word-chip>
            </div> -->
            <scene-avatar id="scene"></scene-avatar>
        </div>

        <voz-dialog></voz-dialog>

        <snack-bar></snack-bar>
        <fab-group></fab-group>
        <voz-three-btn></voz-three-btn>
        `
    }

    onPlay(e) {
        const sceneAvatar = this.shadowRoot.getElementById('scene')
        if (sceneAvatar !== null) {
            sceneAvatar.onPlayAnimations(e.detail)
        }
    }
}

customElements.define('lit-app', LitApp)