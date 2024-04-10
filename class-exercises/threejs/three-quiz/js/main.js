// importing the three library
import * as THREE from 'three';

// import add ons
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';


import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// declare global variables
let camera, scene, renderer, startTime, object, stats;

//call initialize and annimate functions
init();
animate();

// initialize scene
function init() {

// implementing camera aspect ratios
 camera = new THREE.PerspectiveCamera(36, window.innerWidth / window.innerHeight, 0.25, 16);


 camera.position.set(0, 1.3, 3);

// set up for where you put objects, lights, and cameras
 scene = new THREE.Scene();


 // Lights


 scene.add(new THREE.AmbientLight(0xcccccc));

// adding spotlight to scene, using exact positioning and parameters of each factor
 const spotLight = new THREE.SpotLight(0xffffff, 60);
 spotLight.angle = Math.PI / 5;
 spotLight.penumbra = 0.2;
 spotLight.position.set(2, 3, 3);
 spotLight.castShadow = true;
 spotLight.shadow.camera.near = 3;
 spotLight.shadow.camera.far = 10;
 spotLight.shadow.mapSize.width = 1024;
 spotLight.shadow.mapSize.height = 1024;
 scene.add(spotLight);

//adding a new light type (directional) as well as calculating its shadows into the scene
 const dirLight = new THREE.DirectionalLight(0x55505a, 3);
 dirLight.position.set(0, 3, 0);
 dirLight.castShadow = true;
 dirLight.shadow.camera.near = 1;
 dirLight.shadow.camera.far = 10;


 dirLight.shadow.camera.right = 1;
 dirLight.shadow.camera.left = - 1;
 dirLight.shadow.camera.top = 1;
 dirLight.shadow.camera.bottom = - 1;


 dirLight.shadow.mapSize.width = 1024;
 dirLight.shadow.mapSize.height = 1024;
 scene.add(dirLight);


 // ***** Clipping planes: *****

// vector 3 is a constructor defining the plane, localPlane applies to specific objects while globalPlane applies to the whole scene
 const localPlane = new THREE.Plane(new THREE.Vector3(0, - 1, 0), 0.8);
 const globalPlane = new THREE.Plane(new THREE.Vector3(- 1, 0, 0), 0.1);


 // Geometry

//creating a shiny surface material for the object in real time and where it renders (DoubleSide)
 const material = new THREE.MeshPhongMaterial({
   color: 0x80ee10,
   shininess: 100,
   side: THREE.DoubleSide,


   // ***** Clipping setup (material): *****
   clippingPlanes: [localPlane],
   clipShadows: true,

// boolean property used with antialiasing when true
   alphaToCoverage: true,


 });

//defines the TorusKnot into the scene with the material and shadow
 const geometry = new THREE.TorusKnotGeometry(0.4, 0.08, 95, 20);


 object = new THREE.Mesh(geometry, material);
 object.castShadow = true;
 scene.add(object);

//establishing a ground on the plane with that shiny material and shadows
 const ground = new THREE.Mesh(
   new THREE.PlaneGeometry(9, 9, 1, 1),
   new THREE.MeshPhongMaterial({ color: 0xa0adaf, shininess: 150 })
 );


 ground.rotation.x = - Math.PI / 2; // rotates X/Y to X/Z
 ground.receiveShadow = true;
 scene.add(ground);


 // Stats

//data from the scene on the left hand corner being appended to the body (parent)
 stats = new Stats();
 document.body.appendChild(stats.dom);


 // Renderer

//displays the objects within the scene, resizes the window when enteracted with
 renderer = new THREE.WebGLRenderer({ antialias: true });
 renderer.shadowMap.enabled = true;
 renderer.setPixelRatio(window.devicePixelRatio);
 renderer.setSize(window.innerWidth, window.innerHeight);
 //calls window resize function below
 window.addEventListener('resize', onWindowResize);
 document.body.appendChild(renderer.domElement);

//----I stopped here in class ----
 // ***** Clipping setup (renderer): *****
 const globalPlanes = [globalPlane],
   Empty = Object.freeze([]);
 renderer.clippingPlanes = Empty; // GUI sets it to globalPlanes
 renderer.localClippingEnabled = true;


 // Controls


 const controls = new OrbitControls(camera, renderer.domElement);
 controls.target.set(0, 1, 0);
 controls.update();




 // Start


 startTime = Date.now();


}


function onWindowResize() {


 camera.aspect = window.innerWidth / window.innerHeight;
 camera.updateProjectionMatrix();


 renderer.setSize(window.innerWidth, window.innerHeight);


}


function animate() {


 const currentTime = Date.now();
 const time = (currentTime - startTime) / 1000;


 requestAnimationFrame(animate);


 object.position.y = 0.8;
 object.rotation.x = time * 0.5;
 object.rotation.y = time * 0.2;
 object.scale.setScalar(Math.cos(time) * 0.125 + 0.875);


 stats.begin();
 renderer.render(scene, camera);
 stats.end();


}
