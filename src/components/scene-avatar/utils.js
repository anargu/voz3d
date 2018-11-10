import * as THREE from 'three'
import data from '../../assets/acercarme_0001.json'

export const initializeModel = (urls, onProgress) => {
    return new Promise((resolve, reject) => {
        let character = {}, mixer = {}

        if (urls.length < 2) {
            reject(new Error('no urls(2) provided'))
        }

        let loader = new THREE.JSONLoader()
        // loading BODY
        loader.load(urls[0],
            // onLoad
            (geometry, materials) => {
                console.log('loading body object done')
                materials.forEach(material => { material.skinning = true })
                character.body = new THREE.SkinnedMesh(geometry, materials)
                mixer.body=new THREE.AnimationMixer(character.body)

                loader.load(urls[1],
                    // onLoad
                    (_geometry, _materials) => {
                        console.log('loading head object done')
                        _materials.forEach(material => { material.skinning = true })
                        character.head = new THREE.SkinnedMesh(_geometry, _materials)
                        mixer.head = new THREE.AnimationMixer(character.head)
        
                        resolve({character, mixer})
                    },
                    // onProgress
                    (ev) => {
                        onProgress(ev)
                    },
                    // onError
                    (ev) => {
                        console.log('*** error', ev)
                        reject(ev)
                    }
                )
    
            },
            // onProgress
            (ev) => {
                onProgress(ev)
            },
            // onError
            (ev) => {
                console.log('=== error body', ev)
                reject(ev)
            }
        )
    })
}

export const loadAnimation = (animation, geometry) => {
    return THREE.AnimationClip.parseAnimation( animation, geometry.bones)
}

export const playAnimation = (mixer, clips, name) => {
    let clip = THREE.AnimationClip.findByName( clips, name )
    if (clip === null) {
        console.log('not found')
    } else {
        let action = mixer.clipAction(clip)
        action.play()    
    }
}

export const parseAnimation = (url, assets = true) => {
    if (assets) {
        return data
    } else {
        // TODO
        return null
    }
}