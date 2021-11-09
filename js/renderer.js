import * as THREE from 'three';
import { initControls } from './controls';
import { initStats } from './stats';

export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
export const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});


renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

camera.position.x = 47;
camera.position.y = 75;
camera.position.z = 121;

const light = new THREE.AmbientLight( 0xffffff );
scene.add(light);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()
	renderer.setSize(window.innerWidth, window.innerHeight)
}, false)

const updateControls = initControls(camera, renderer)
const updateStats = initStats(camera, scene)

function animate() {
  updateControls()
  updateStats()
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
}
animate()
