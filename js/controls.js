import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'

export function initControls(camera, renderer) {
	const controls = new PointerLockControls(camera, renderer.domElement)
	const movementSpeed = 4.3

	renderer.domElement.addEventListener(
		'click',
		function () {
			controls.lock()
		},
		false
	)

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


	let lt = new Date().getTime()
	return function updateControls() {
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
	}
}