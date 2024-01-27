import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.127.0/build/three.module.js';
import { OBJLoader } from 'https://cdn.jsdelivr.net/npm/three@0.127.0/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'https://cdn.jsdelivr.net/npm/three@0.127.0/examples/jsm/loaders/MTLLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.127.0/examples/jsm/controls/OrbitControls.js';

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#myCanvas') });
renderer.setSize(window.innerWidth, window.innerHeight);

// Handle window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Increase the second parameter for more light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Increase the second parameter for more light
directionalLight.position.set(0, 1, 0);
scene.add(directionalLight);

// Material and Object Loader
const mtlLoader = new MTLLoader();
mtlLoader.load('3d-models/leaning-tower-of-pisa-cup/3DModel.mtl', (materials) => {
    materials.preload();
    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('3d-models/leaning-tower-of-pisa-cup/3DModel.obj', (object) => {
        scene.add(object);
    }, (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    }, (error) => {
        console.error('An error happened', error);
    });
});

const controls = new OrbitControls(camera, renderer.domElement);

// Optional: Configure the controls
controls.rotateSpeed = 1.0;
controls.zoomSpeed = 1.2;
controls.panSpeed = 0.8;

// Animation loop
const animate = () => {
    requestAnimationFrame(animate);

    // Optional: Add any updates to your scene or objects here
    // Update controls
    controls.update();

    renderer.render(scene, camera);
};

animate();
