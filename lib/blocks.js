import * as THREE from 'three'

export const getBlocks = () =>
  fetch("https://bezosmaps.marnixah.com/block").then(res => res.json())

const stringToColour = function(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = '#';
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xFF;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}

const sphereBlocks = [
  "minecraft:wall_torch",
  "minecraft:torch",
  "minecraft:oak_wall_sign",
  "minecraft:stone_pressure_plate"
]

export const getBlockMesh = (block) => {
  const blockMesh = new THREE.Mesh(
    sphereBlocks.includes(block.name) ?
      new THREE.SphereGeometry(0.5, 32, 16) :
      new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
      // Generate a random color with block.name as a seed
      color: new THREE.Color(stringToColour(block.name)),
    })
  )
  blockMesh.name = block.name
  blockMesh.position.set(block.x, block.y, block.z)
  return blockMesh
}
export const getBlockMeshes = () => 
  getBlocks().then(blocks => blocks.map(getBlockMesh))