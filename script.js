// Import Three.js and GLTFLoader from a CDN
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.136.0/build/three.module.min.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.136.0/examples/jsm/loaders/GLTFLoader.js";

// Initialize scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lighting
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);

// Function to get URL parameters (for Power BI integration)
function getParameterByName(name) {
    let url = new URL(window.location.href);
    return url.searchParams.get(name);
}

// Default model URL (loads this if no Power BI data is passed)
let modelURL = getParameterByName("model") || "models/sample.glb";

// Load the 3D model
const loader = new GLTFLoader();
loader.load(modelURL, function (gltf) {
    const model = gltf.scene;
    model.position.set(0, -50, 0); // Adjust model position
    model.scale.set(1, 1, 1); // Adjust model scale if needed
    scene.add(model);
    console.log("✅ Model Loaded:", modelURL);
}, undefined, function (error) {
    console.error("❌ Error loading model:", error);
});

// Set up camera position
camera.position.set(0, 100, 300);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Handle window resizing
window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
