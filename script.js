import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/jsm/loaders/GLTFLoader.js";

// Initialize Scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add light
var light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// Function to get URL parameter (for Power BI integration)
function getParameterByName(name) {
    let url = new URL(window.location.href);
    return url.searchParams.get(name);
}

// Get Model URL from Power BI
let modelURL = getParameterByName("model") || "models/default.glb"; // Default if no URL is provided

// Load 3D Model
var loader = new GLTFLoader();
loader.load(modelURL, function (gltf) {
    scene.add(gltf.scene);
}, undefined, function (error) {
    console.error("Error loading model:", error);
});

// Set Camera Position
camera.position.z = 3;

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Handle Window Resizing
window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
