// Import Three.js and GLTFLoader properly
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/jsm/loaders/GLTFLoader.js";

// Initialize the Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lighting to the scene
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// Function to get URL parameters (for Power BI integration)
function getParameterByName(name) {
    let url = new URL(window.location.href);
    return url.searchParams.get(name);
}

// Default Model URL (if Power BI does not pass a URL)
let modelURL = getParameterByName("model") || "models/sample.glb";

// Load 3D Model
const loader = new GLTFLoader();
loader.load(modelURL, function (gltf) {
    scene.add(gltf.scene);
    console.log("✅ Model Loaded:", modelURL);
}, undefined, function (error) {
    console.error("❌ Error loading model:", error);
});

// Set Camera Position
camera.position.z = 5;

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Handle Window Resize
window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
