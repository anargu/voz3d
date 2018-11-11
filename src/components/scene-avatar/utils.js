import * as THREE from 'three'
// import data from '../../assets/acercarme_0001.json'

export const initializeModel = (urls, onProgress = null) => {
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
                        if (onProgress !== null) {
                            onProgress(ev)
                        }
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
                if (onProgress !== null) {
                    onProgress(ev)
                }
            },
            // onError
            (ev) => {
                console.log('=== error body', ev)
                reject(ev)
            }
        )
    })
}