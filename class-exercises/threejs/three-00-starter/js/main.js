// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene

//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';

// Import add-ons
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
// import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models

let scene, camera, renderer, cube, capsule;

function init(){
    // ~~~~~~~~~~~~~~~~Create scene here~~~~~~~~~~~~~~~~
 scene = new THREE.Scene();
 camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

 renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
 renderer.setSize(window.innerWidth, window.innerHeight);
 document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry( 2, 2, 2 );
const shape = new THREE.CapsuleGeometry( 1, 2, 4, 8 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

 const texture = new THREE.TextureLoader().load('textures/grass.jpg');
 const material = new THREE.MeshBasicMaterial( { map: texture } );
 cube = new THREE.Mesh( geometry, material );
 scene.add( cube );
 capsule = new THREE.Mesh( shape, material );
 scene.add( capsule );

camera.position.z = 5;
}

function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
     capsule.rotation.x += 0.02;
     capsule.rotation.y += 0.02;

	renderer.render( scene, camera );
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();

// ~~~~~~~~~~~~~~~~ Initiate add-ons ~~~~~~~~~~~~~~~~
const controls = new OrbitControls(camera, renderer.domElement);
// const loader = new GLTFLoader(); // to load 3d models


// →→→→→→ Follow next steps in tutorial: // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


