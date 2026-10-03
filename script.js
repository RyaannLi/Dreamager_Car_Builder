import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Find our HTML elements.
const preview = document.querySelector("#paint-preview");
const paintPicker = document.querySelector("#paint-color");
const resetButton = document.querySelector("#reset-paint");

const defaultColor = "#ffffff";

// Create the space that holds our 3D objects.
const scene = new THREE.Scene();
scene.background = new THREE.Color("#24242c");

// Create the camera we look through.
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
camera.position.set(3, 2, 4);

// Create the drawing surface and put it inside the preview.
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
preview.appendChild(renderer.domElement);

// Create a cube: its shape, surface, and finished object.
const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
const material = new THREE.MeshStandardMaterial({
  color: paintPicker.value,
  roughness: 0.35,
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Add lights so we can see the surface.
const ambientLight = new THREE.HemisphereLight(
  "#ffffff",
  "#444455",
  2
);
scene.add(ambientLight);

const light = new THREE.DirectionalLight("#ffffff", 3);
light.position.set(3, 4, 5);
scene.add(light);

// Let the user drag to orbit and scroll to zoom.
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 2;
controls.maxDistance = 10;

// Change the cube's paint when the picker changes.
paintPicker.addEventListener("input", () => {
  material.color.set(paintPicker.value);
});

// Reset the picker and cube to white.
resetButton.addEventListener("click", () => {
  paintPicker.value = defaultColor;
  material.color.set(defaultColor);
});

// Keep the drawing matched to the preview's size.
const resizeObserver = new ResizeObserver(() => {
  const width = preview.clientWidth;
  const height = preview.clientHeight;

  if (width === 0 || height === 0) return;

  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

resizeObserver.observe(preview);

// Keep drawing the scene as the camera moves.
renderer.setAnimationLoop(() => {
  controls.update();
  renderer.render(scene, camera);
});