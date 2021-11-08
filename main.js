import './style.css'

import * as THREE from 'three';
import { getBlockMeshes } from './lib/blocks';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'

const scene = new THREE.Scene();

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('#bg')
});

renderer.domElement.addEventListener(
	'click',
	function () {
		controls.lock()
	},
	false
)

renderer.domElement.addEventListener('contextmenu', (e) => {
	e.preventDefault();
}, false);

const controls = new PointerLockControls(camera, renderer.domElement)
const movementSpeed = 4.3

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.x = 47;
camera.position.y = 75;
camera.position.z = 121;

let keys = {
	'KeyW': false,
	'KeyA': false,
	'KeyS': false,
	'KeyD': false,
	'Space': false,
	'ShiftLeft': false
}

const onKeyDown = function (event) {
	if (event.code in keys) {
		keys[event.code] = true;
	}
}

const onKeyUp = function (event) {
	if (event.code in keys) {
		keys[event.code] = false;
	}
}

document.addEventListener('keydown', onKeyDown, false)
document.addEventListener('keyup', onKeyUp, false)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()
	renderer.setSize(window.innerWidth, window.innerHeight)
}

const light = new THREE.AmbientLight( 0xffffff );
scene.add( light );

getBlockMeshes().then( meshes => 
	meshes.forEach( mesh => {
		scene.add( mesh );
	})
);

const tooltipElement = document.querySelector('#tooltip');

function onMouseMove( event ) {
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

let lt = new Date().getTime()
function animate() {
	requestAnimationFrame( animate );
	const intersects = raycaster.intersectObjects( scene.children );

	if ( intersects.length ) {
		// Show tooltip
	}
	// Controls
	const seconds = (new Date().getTime() - lt) / 1000
	lt = new Date().getTime()
	if (keys['KeyW']) {
		controls.moveForward(seconds * movementSpeed)
	}
	if (keys['KeyS']) {
		controls.moveForward(-seconds * movementSpeed)
	}
	if (keys['KeyA']) {
		controls.moveRight(-seconds * movementSpeed)
	}
	if (keys['KeyD']) {
		controls.moveRight(seconds * movementSpeed)
	}
	if (keys['Space']) {
		camera.position.y += seconds * movementSpeed
	}
	if (keys['ShiftLeft']) {
		camera.position.y += -seconds * movementSpeed
	}

	raycaster.setFromCamera( mouse, camera );

	renderer.render( scene, camera );
}

// window.addEventListener( 'mousemove', onMouseMove, false );
animate()