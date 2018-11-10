import {LitElement} from '@polymer/lit-element'
import {html} from 'lit-html'
import * as THREE from 'three'
let OrbitControls = require('three-orbit-controls')(THREE)
import css from './scene-avatar.styl'
import { initializeModel, loadAnimation, playAnimation, parseAnimation } from './utils'

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
    }

    static get properties() {
        return {}
    }

    render() {
        console.log('render')
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
        
        // loading scene with avatars
        // let character = null, mixer = null
        initializeModel(
            ['../../assets/body.json', '../../assets/head.json'],
            () => { console.log('on pregress...')}
        )
        .then(({character, mixer}) => {
            this.scene.add(character.head)
            this.scene.add(character.body)
            this.mixer = mixer
            this.geometry = {
                head: character.head.geometry,
                body: character.body.geometry
            }
            // mixer.body.addEventListener('finished', function(e) {
            //     console.log('on finished')
            // })

            setTimeout(() => {
                let animation = parseAnimation('../../assets/acercarme_0001.json')
                console.log('animations', animation)
                // let clip = this.loadAnimation(animations[0] /* ... */ )
                let clip = THREE.AnimationClip.parseAnimation( animation, this.geometry.body.bones)
                console.log('root', this.mixer.body.getRoot())
                let action = this.mixer.body.clipAction(clip)
                action.play()
                console.log('done?')
                // playAnimation(this.mixer.body, [clip], 'acercarme_0001')
            }, 2000);
        })
        .catch(err => {
            console.log('err', err)
        })

        window.addEventListener('resize', () => {
            this.onWindowResize()
        }, false)
        this.animate()
    }

    loadAnimation(animation) {
        // let geometry = new THREE.Geometry()
        console.log('geometry', this.geometry.body.bones)
        loadAnimation(animation, this.geometry.body)
    }

    onWindowResize() {
        console.log('window resize')
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
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