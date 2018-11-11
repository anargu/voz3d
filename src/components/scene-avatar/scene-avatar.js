import {LitElement} from '@polymer/lit-element'
import {html} from 'lit-html'
import axios from 'axios'
import * as THREE from 'three'
let OrbitControls = require('three-orbit-controls')(THREE)

import { initializeModel } from './utils'
import playlist from './playlist.js'

import css from './scene-avatar.styl'

class SceneAvatar extends LitElement {

    constructor() {
        super()

        this.renderer = null
        this.scene = null
        this.camera = null
        this.clock = null
        this.cube = null
        this.controls = null
        this.mixer = null
        this.geometry = null

        this.playlist = new playlist()
    }

    static get properties() {
        return {}
    }

    render() {
        return html`
        <style>
        ${css}
        </style>
        <canvas id="canvas-el">
        </canvas>        
        `
    }

    firstUpdated() {

        // this.quickSample()

        // init scene
        console.log('this.shadowRoot', this.shadowRoot)
        const canvas = this.shadowRoot.querySelector('#canvas-el')
        console.log('this.shadowRoot canvas', canvas)

        this.clock = new THREE.Clock()

        this.renderer = new THREE.WebGLRenderer({canvas, antialias: true})
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(window.innerWidth, window.innerHeight)

        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color(1,1,1)
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
        // this.camera.rotateY(Math.PI/3)
        this.camera.position.set(0, 0, 20)


        // OrbitControls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.controls.target = new THREE.Vector3(0, 3, 0)

        // Lights
        let light = new THREE.AmbientLight(0xffffff, 1)
        this.scene.add(light)

        let light3 = new THREE.PointLight(0x939393, 1, 100)
        light3.position.set(0, 70, 0)
        this.scene.add(light3)

        window.addEventListener('resize', () => {
            this.onWindowResize()
        }, false)

        this.animate()

        // loading avatars
        initializeModel(
            ['../../assets/body.json', '../../assets/head.json']
            // ['https://voz3d.sfo2.digitaloceanspaces.com/models/body.json', 'https://voz3d.sfo2.digitaloceanspaces.com/models/head.json']
            ,
            () => { console.log('on progress...')}
        )
        .then(({character, mixer}) => {

            this.scene.add(character.head)
            this.scene.add(character.body)
            this.mixer = mixer
            this.geometry = {
                head: character.head.geometry,
                body: character.body.geometry
            }
            this.mixer.body.addEventListener('finished', (e) => {
                this.onFinishAnimation('body')
            })
            this.mixer.head.addEventListener('finished', (e) => {
                this.onFinishAnimation('name')
            })

            // setTimeout(() => {
            //     this.onPlayAnimations([
            //         {   label:"acercarme",
            //             animations: { 
            //                 head: "https://voz3d.sfo2.digitaloceanspaces.com/animations/head/0_MIEDOSO.json", 
            //                 body: "https://voz3d.sfo2.digitaloceanspaces.com/animations/body/acercarme_0001.json"
            //             }
            //         },
            //         {   label:"acercarme",
            //             animations: { 
            //                 head: "https://voz3d.sfo2.digitaloceanspaces.com/animations/head/0_MIEDOSO.json", 
            //                 body: "https://voz3d.sfo2.digitaloceanspaces.com/animations/body/acercarme_0001.json"
            //             }
            //         }
            //     ])
            // }, 2000)
        })
        .catch(err => {
            console.log('err', err)
        })
    }

    onWindowResize() {
        console.log('window resize')
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }
    
    async onPlayAnimations(words) {
        if (words.length > 0) {
            this.playlist.set([...words])
            this.playAnimation(this.playlist.first())    
        }
    }

    async playAnimation(word) {
        let clips = []

        try {
            if (word.animations.head !== null && word.animations.body !== null) {
                // BOTH
                let responseHead = await axios.get(word.animations.head)
                let responseBody = await axios.get(word.animations.body)

                console.log('async responseBody', responseBody)
                clips.push({ head: responseHead.data, body: responseBody.data })
            } else if (word.animations.head !== null && word.animations.body === null) {
                // HEAD
                let response = await axios.get(word.animations.head)
                clips.push({ head: response.data, body: null })    
            } else if (word.animations.head === null && word.animations.body !== null) {
                // BODY
                let response = await axios.get(word.animations.body)
                clips.push({ head: null, body: response.data })    
                console.log('async response', response)
            } else {
                // ALL NULL    
            }      
        } catch (err) {
            console.log('err', err)
        }

        console.log('async onPlayAnimation playlist ', clips)

        if (clips.length === 1) {
            const animation = clips[0]
            if (animation.head !== null) {
                let clip = THREE.AnimationClip.parseAnimation( animation.head, this.geometry.head.bones)
                let action = (this.mixer.head.clipAction(clip))
                action.loop = THREE.LoopOnce
                action.play()
            }
            if (animation.body !== null) {
                let clip = THREE.AnimationClip.parseAnimation( animation.body, this.geometry.body.bones)
                let action = (this.mixer.body.clipAction(clip))
                action.loop = THREE.LoopOnce
                action.play()
            }            
        }

    }

    onFinishAnimation(part) {
        if (this.playlist.animationHasFinished(part)) {
            this.nextAnimation()
        }
    }

    nextAnimation() {
        if (this.playlist.hasNext()) {
            this.playAnimation(this.playlist.first())
        }
    }

    animate () {
        // this.quickSampleAnimate()
        requestAnimationFrame(() => this.animate())
        if (this.controls) {
            this.controls.update()
        }

        let delta = this.clock.getDelta()
        if (this.mixer !== null) {
            this.mixer.body.update(delta)
            this.mixer.head.update(delta)
        }

        this.renderer.render(this.scene, this.camera)
    }
}

customElements.define('scene-avatar', SceneAvatar)