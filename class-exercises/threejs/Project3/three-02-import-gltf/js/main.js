/* 
glTF import:
- glTF loader imported + enabled
-Global variable added to store girl gltf
-Two directional lights added to view glTF
- Added HELPERS to debug light position (disable after you place them)
-glTF imported from blender (not it is an *embedded* .glTF file, not .glb)
-Changed material on ball from BASIC to STANDARD so that the geometry catches light
*/


//~~~~~~~Import Three.js (also linked to as an import map in the HTML)~~~~~~
import * as THREE from 'three';


// Import add-ons
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models



// ~~~~~~~~~~~~~~~~ Declare Global Variables~~~~~~~~~~~~~~~~
let scene, camera, renderer, ball, girl, beach, mixer;
let actionRumba;




// ~~~~~~~~~~~~~~~~ Initialize Scene in init() ~~~~~~~~~~~~~~~~
function init() {

    // ~~~~~~Set up scene, camera, + renderer ~~~~~~

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x118788);
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);


    // ~~~~~~ Add Lights ~~~~~~
    // Add helpers to debug the lights' position - COMMENT OUT WHEN DONE placing the light! https://threejs.org/docs/#api/en/helpers/DirectionalLightHelper

    // ~~ add directional light 
    const lightRight = new THREE.DirectionalLight(0xffffff, 3);
    lightRight.position.set(3, 4, 5);
    scene.add(lightRight);

    const helperRight = new THREE.DirectionalLightHelper(lightRight, 5);
    // scene.add(helperRight); // comment out when done placing light


    // ~~ add directional light 
    const lightLeft = new THREE.DirectionalLight(0xffff000, 3);
    lightLeft.position.set(-3, 4, 5);
    scene.add(lightLeft);

    const helperLeft = new THREE.DirectionalLightHelper(lightLeft, 5);
    // scene.add(helperLeft); // comment out when done placing light






    // ~~~~~~ Initiate add-ons ~~~~~~

    const controls = new OrbitControls(camera, renderer.domElement);
    const loader = new GLTFLoader(); // to load 3d models



    // ~~~~~~ Create Geometry ~~~~~~

    // ---> create ball
    const geometry = new THREE.SphereGeometry(.8, 32, 16);

    // -> change material from Basic to standard for geometry to capture lights
    // const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });

    const texture = new THREE.TextureLoader().load('textures/multicolor.jpg');

    const material = new THREE.MeshStandardMaterial({ map: texture });
    // texture.minFilter = THREE.LinearFilter; // makes image sharper but aliased

    ball = new THREE.Mesh(geometry, material);
    scene.add(ball);

    // --> Load glTF

    // load models
    // loader.load('assets/beachScene.gltf', function (gltf){
    //     beach = gltf.scene;
    //     scene.add(beach);
    //     beach.scale.set(2, 2, 2);
    //     beach.position.y = -2;
    // });

    loader.load('assets/scene.gltf', function (gltf) {
        const girl = gltf.scene;
        scene.add(girl);
        girl.scale.set(1, 1, 1); // scale your model
        girl.position.y = -2; // set initial position

        //animations
        mixer = new THREE.AnimationMixer(girl);
        const clips = gltf.animations;
        const clip = THREE.AnimationClip.findByName(clips, 'metarig|rumba');
        const action = mixer.clipAction(clip);
        action.play();
        //clips
        // const clipRumba = THREE.AnimationClip.findByName(clips, 'metarig|rumba');
        // actionRumba = mixer.clipAction(clipRumba);
        // actionRumba.play();
    }, undefined, function(error) {
        console.error(error);
    
    });
    // loader.load('assets/beachScene.gltf', function (gltf){
    //     const beach = gltf.scene;
    //     scene.add(beach);
    // });



    // ~~~~~~Position Camera~~~~~~
    camera.position.z = 5;


}



// ~~~~~~~~~~~~~~~~ Animation Loop ~~~~~~~~~~~~~~~~
// (similar to draw loop in p5.js, updates every frame)
const clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate); // start loop by with frame update

    // →→→→→→ add your animation here ↓↓↓↓

    ball.rotation.x += 0.007;
    ball.rotation.y += 0.007;


    ball.position.x = Math.sin(Date.now() / 5000)* 2;
    ball.position.y = Math.sin(Date.now() / 3000)* 2;
    ball.position.z = Math.sin(Date.now() / 4000)* 2;

    if (girl) {
        // girl.rotation.x += 0.007;
        // girl.rotation.y += 0.007;
        girl.rotation.y = Math.sin(Date.now() / 500)* .5;
    }

    if(mixer){
        mixer.update(clock.getDelta());
    // always end animation loop with renderer
    renderer.render(scene, camera);
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}

window.addEventListener('resize', onWindowResize, false);

init(); // execute initialize function
animate(); // execute animation function

