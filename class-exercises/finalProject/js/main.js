
//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';

// Import add-ons
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models

let cube, capsule;
let scene, camera, renderer, desk, computer, robot, chair, sign, room, vanity, fan, drawer, chandelier, toys, wardrobe, ball, beach, mixer;
let actionSpin;

function init(){
    // ~~~~~~~~~~~~~~~~Create scene here~~~~~~~~~~~~~~~~
 scene = new THREE.Scene();
 camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

 renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
 renderer.setClearColor(0x00ff00, 0);
 renderer.setSize(window.innerWidth, window.innerHeight);
 document.body.appendChild(renderer.domElement);


    // ~~~~~~ Add Lights ~~~~~~
    // Add helpers to debug the lights' position - COMMENT OUT WHEN DONE placing the light! https://threejs.org/docs/#api/en/helpers/DirectionalLightHelper

    // ~~ add directional light 
    const lightRight = new THREE.DirectionalLight(0xff81be, 3);
    lightRight.position.set(3, 4, 5);
    scene.add(lightRight);

    const helperRight = new THREE.DirectionalLightHelper(lightRight, 5);
    // scene.add(helperRight); // comment out when done placing light


    // ~~ add directional light 
    const lightLeft = new THREE.DirectionalLight(0xf4ccea, 3);
    lightLeft.position.set(-3, 4, 5);
    scene.add(lightLeft);

    const helperLeft = new THREE.DirectionalLightHelper(lightLeft, 5);
    // scene.add(helperLeft); // comment out when done placing light

    // ~~~~~~ Initiate add-ons ~~~~~~

    const controls = new OrbitControls(camera, renderer.domElement);
    const loader = new GLTFLoader(); // to load 3d models

const geometry = new THREE.BoxGeometry( 2, 2, 2 );
const shape = new THREE.CapsuleGeometry( 1, 2, 4, 8 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

 const texture = new THREE.TextureLoader().load('textures/grass.jpg');
 const material = new THREE.MeshBasicMaterial( { map: texture } );
 cube = new THREE.Mesh( geometry, material );
//  scene.add( cube );
 capsule = new THREE.Mesh( shape, material );
//  scene.add( capsule );


// Load 3D Models Here

//room
loader.load('assets/3d_room_model/scene.gltf', function (gltf) {
    room = gltf.scene;
    scene.add(room);
    room.scale.set(0.5, 0.5, 0.5); // scale your model
    room.position.y = -2.2; // set initial position
    room.position.z = 3.5;
});

//table
 loader.load('assets/table.gltf', function (gltf) {
    desk = gltf.scene;
    scene.add(desk);
    desk.scale.set(3, 3, 3); // scale your model
    desk.position.y = -2; // set initial position
    desk.position.z = -1;
});

//fan
loader.load('assets/table_fan/scene.gltf', function (gltf){
    fan = gltf.scene;
    scene.add(fan);
    fan.scale.set(.2, .2, .2);
    fan.position.y = 0.3;
    fan.position.z = -1.5;
    fan.position.x = 1.5;
    fan.rotation.y = 4;

    mixer = new THREE.AnimationMixer(fan);
    const clips = gltf.animations;
    const clip = THREE.AnimationClip.findByName(clips, 'spin');
    const action = mixer.clipAction(clip);
    action.play();
})

//computer
loader.load('assets/pink_computer/scene.gltf', function (gltf){
    computer = gltf.scene;
    scene.add(computer);
    computer.scale.set(20, 20, 20);
    computer.position.y = 0.25;
    computer.position.z = -0.8;
})

//robot
loader.load('assets/little_cute_robot/scene.gltf', function (gltf){
    robot = gltf.scene;
    scene.add(robot);
    robot.scale.set(1, 1, 1);
    robot.position.y = 1.47;
    robot.position.z = -0.8;
    robot.position.x = -1.8;
    robot.rotation.y = 10;

    mixer = new THREE.AnimationMixer(robot);
    const clips = gltf.animations;
    const clip = THREE.AnimationClip.findByName(clips, 'sway');
    const action = mixer.clipAction(clip);
    action.play();
})

//chair
loader.load('assets/desk_chair/scene.gltf', function (gltf){
    chair = gltf.scene;
    scene.add(chair);
    chair.scale.set(3.5, 3.5, 3.5);
    chair.position.y = -0.8;
    chair.position.z = 2;
    chair.rotation.y = 2;
})

//sign
loader.load('assets/love_neon_sign_-_wall/scene.gltf', function (gltf){
    sign = gltf.scene;
    scene.add(sign);
    sign.scale.set(3.5, 3.5, 3.5);
    sign.position.y = 3;
    sign.position.z = -2;
    sign.position.x = 0.4;
    sign.rotation.y = 1.5;
})

//drawer
loader.load('assets/drawer_-_white_and_pink/scene.gltf', function (gltf){
    drawer = gltf.scene;
    scene.add(drawer);
    drawer.scale.set(4, 4, 4);
    drawer.position.y = 0;
    drawer.position.z = -1;
    drawer.position.x = 3.2;

})

//toys
loader.load('assets/toys_kuromi_melody_and_hello_kitty/scene.gltf', function (gltf){
    toys = gltf.scene;
    scene.add(toys);
    toys.scale.set(.1, .1, .1);
    toys.position.y = 0.06;
    toys.position.z = -1;
    toys.position.x = 3.2;

})

//wardrobe
loader.load('assets/pink_wardrobe/scene.gltf', function (gltf){
    wardrobe = gltf.scene;
    scene.add(wardrobe);
    wardrobe.scale.set(.03, .03, .03);
    wardrobe.position.y = -2.5;
    wardrobe.position.z = 3;
    wardrobe.position.x = -4.9;
})

//chandelier
loader.load('assets/hearts_chandelier/scene.gltf', function (gltf){
    chandelier = gltf.scene;
    scene.add(chandelier);
    chandelier.scale.set(3.8, 3.8, 3.8);
    chandelier.position.y = -0.8;
    chandelier.position.z = 2;
})

//vanity
loader.load('assets/vanity_sink/scene.gltf', function (gltf){
    vanity = gltf.scene;
    scene.add(vanity);
    vanity.scale.set(2.5, 2.5, 2.5);
    vanity.position.y = 0.5;
    vanity.position.z = 4;
    vanity.position.x = 4.8;
    vanity.rotation.y = 1.55;
})

camera.position.z = 1.95;
camera.position.y = 1.8;
}

const clock = new THREE.Clock();
function animate() {
	requestAnimationFrame( animate );

	chandelier.rotation.y += 0.01;

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

init();
animate();

