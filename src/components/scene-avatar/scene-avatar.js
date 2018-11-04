import {LitElement} from '@polymer/lit-element'
import {html} from 'lit-html'
import * as THREE from 'three'
import css from './scene-avatar.styl'

// let renderer, scene, camera, cube

// const animate = function () {
//     requestAnimationFrame(animate)

//     cube.rotation.x += 0.01
//     cube.rotation.y += 0.01
    
//     renderer.render(scene, camera)
// }

class SceneAvatar extends LitElement {

    constructor() {
        super()

        this.renderer = null
        this.scene = null
        this.camera = null
        this.cube = null
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
        console.log('this.shadowRoot', this.shadowRoot)
        const canvas = this.shadowRoot.querySelector('#canvas-el')
        console.log('this.shadowRoot canvas', canvas)

        this.renderer = new THREE.WebGLRenderer({canvas})
        
        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color(1,1,1)
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)


        let geometry = new THREE.CylinderBufferGeometry( 5,5,20,32 )
        let material = new THREE.MeshBasicMaterial( { color: 0xffff00 } )
        this.cube = new THREE.Mesh(geometry, material)
        this.scene.add(this.cube)
        
        this.camera.position.z = 30

        this.animate()
    }


    animate () {
        requestAnimationFrame(() => this.animate())

        this.cube.rotation.x += 0.01
        this.cube.rotation.y += 0.01
        
        this.renderer.render(this.scene, this.camera)
    }
}

customElements.define('scene-avatar', SceneAvatar)