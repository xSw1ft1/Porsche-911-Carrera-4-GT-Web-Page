
// =========== Porche 3D Show  

import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(11, 1, 0.1, 1000);

let object;
let controls;
let objToRender = 'porche';  

const loader = new GLTFLoader();

loader.load(
  `models/${objToRender}/scene.gltf`,
  function (gltf) {
    object = gltf.scene;
    object.rotation.y = Math.PI / 4;
    object.rotation.x = Math.PI / 18; 
    scene.add(object);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    console.error(error);
  }
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
document.getElementById("container3D").appendChild(renderer.domElement);

camera.position.z = objToRender === "porche" ? 25 : 500;

// Işıklar
const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);

const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.5);
hemisphereLight.position.set(0, 200, 0);
scene.add(hemisphereLight);

const pointLight1 = new THREE.PointLight(0xffffff, 1, 100);
pointLight1.position.set(50, 50, 50);
scene.add(pointLight1);

const spotLight1 = new THREE.SpotLight(0xffffff, 1);
spotLight1.position.set(100, 100, 100);
spotLight1.angle = Math.PI / 6;
spotLight1.penumbra = 0.1;
spotLight1.castShadow = true;
scene.add(spotLight1);

const spotLight2 = new THREE.SpotLight(0xffffff, 1);
spotLight2.position.set(-100, 100, 100);
spotLight2.angle = Math.PI / 6;
spotLight2.penumbra = 0.1;
spotLight2.castShadow = true;
scene.add(spotLight2);


controls = new OrbitControls(camera, renderer.domElement);
controls.enableRotate = true;
controls.enableZoom = false; 
controls.minPolarAngle = Math.PI / 2; 
controls.maxPolarAngle = Math.PI / 2;
controls.mouseButtons = {
  LEFT: THREE.MOUSE.ROTATE,
  MIDDLE: THREE.MOUSE.DOLLY,
  RIGHT: THREE.MOUSE.NONE
};


controls.enableDamping = true;
controls.dampingFactor = 0.04; 

function animate() {
  requestAnimationFrame(animate);
  controls.update(); 
  renderer.render(scene, camera);
}

function onWindowResize() {
  const container = document.getElementById("container3D");
  const width = container.clientWidth;
  const height = container.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

window.addEventListener("resize", onWindowResize);
window.addEventListener("load", onWindowResize);

animate();


// Porche 3D Show 