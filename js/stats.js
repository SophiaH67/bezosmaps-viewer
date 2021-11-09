import * as THREE from 'three';

export function initStats(camera, scene) {
  // Looking at
  let lookingAt = null
  const lookingAtElement = document.getElementById('lookingat')
  lookingAtElement.innerText = "minecraft:air"
  const raycaster = new THREE.Raycaster()

  // Coords
  const coordsElement = document.getElementById('coords')

  return function updateStats() {
    // Update looking at
    raycaster.setFromCamera( {x: 0, y:0 }, camera );
    const intersects = raycaster.intersectObjects( scene.children );
    lookingAt = intersects.length > 0 ? intersects[0] : null
    const newLookingAtText = lookingAt ? lookingAt.object.name : "minecraft:air"
    if ( lookingAtElement.innerText !== newLookingAtText ) lookingAtElement.innerText = newLookingAtText

    // Update coords
    const newCoordsText = `x: ${camera.position.x.toFixed(2)}, y: ${camera.position.y.toFixed(2)}, z: ${camera.position.z.toFixed(2)}`
    if ( coordsElement.innerText !== newCoordsText ) coordsElement.innerText = newCoordsText
  }
}