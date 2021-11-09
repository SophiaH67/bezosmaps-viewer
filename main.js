import './style.css'

import { getBlockMeshes } from './lib/blocks'
import { scene } from './js/renderer.js'

getBlockMeshes().then( meshes => 
	meshes.forEach( mesh => {
		scene.add( mesh );
	})
);