// Initialize scene, camera, and renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("viewer").appendChild(renderer.domElement);

// Add lighting
var light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// Function to get URL parameter (Power BI will pass the .glb model URL)
function getParameterByName(name) {
    let url = new URL(window.location.href);
    return url.searchParams.get(name);
}

// Get model URL from Power BI
let modelURL = getParameterByName("model") || "models/default.glb"; // Default if no URL provided

// Load .glb model using GLTFLoader
var loader = new THREE.GLTFLoader();
loader.load(modelURL, function(gltf) {
    scene.add(gltf.scene);
}, undefined, function(error) {
    console.error("Error loading model:", error);
});

// Set camera position
camera.position.z = 3;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Handle window resizing
window.addEventListener("resize", function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
