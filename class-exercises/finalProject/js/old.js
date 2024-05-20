//~~~~~~~Import Three.js (also linked to as an import map in the HTML)~~~~~~
import * as THREE from 'three';


// Import add-ons
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js';


// ~~~~~~~~~~~~~~~~ Declare Global Variables~~~~~~~~~~~~~~~~
let scene, camera, renderer, desk, ball, beach, mixer;


// ~~~~~~~~~~~~~~~~ Initialize Scene in init() ~~~~~~~~~~~~~~~~
function init() {

    // ~~~~~~Set up scene, camera, + renderer ~~~~~~

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
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

    // --> Load glTF
    // ---> create ball
    const geometry = new THREE.SphereGeometry(.5, 22, 16);

    // -> change material from Basic to standard for geometry to capture lights
    // const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });

    // const texture = new THREE.TextureLoader().load('textures/multicolor.jpg');

    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    // texture.minFilter = THREE.LinearFilter; // makes image sharper but aliased

    ball = new THREE.Mesh(geometry, material);
    scene.add(ball);
    // load models

    loader.load('assets/pink_table/scene.gltf', function (gltf) {
        desk = gltf.scene;
        scene.add(desk);
        desk.scale.set(10, 10, 10); // scale your model
        desk.position.y = -2; // set initial position

    }, undefined, function(error) {
        console.error(error);
    
    });

    // loader.load('assets/at_a_beach/scene.gltf', function (gltf){
    //     beach = gltf.scene;
    //     scene.add(beach);
    //     beach.scale.set(1.2, 1.2, 1.2); // scale your model
    //     beach.position.y = -2; // set initial position
    //     beach.position.z = -4;
    // });



    // ~~~~~~Position Camera~~~~~~
    camera.position.z = 5;


}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}

window.addEventListener('resize', onWindowResize, false);

init(); // execute initialize function
// animate(); // execute animation function
