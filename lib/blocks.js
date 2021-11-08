import * as THREE from 'three'

export const getBlocks = () =>
  fetch("https://bezosmaps.marnixah.com/block").then(res => res.json())

export const getBlockMesh = (block) => {
  const blockMesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
      // Generate a random color
      color: new THREE.Color(Math.random(), Math.random(), Math.random()),
    })
  )
  blockMesh.position.set(block.x, block.y, block.z)
  return blockMesh
}
export const getBlockMeshes = () => 
  getBlocks().then(blocks => blocks.map(getBlockMesh))