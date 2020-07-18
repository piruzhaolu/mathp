import {Axis2d} from './Axis2d.js';
import * as THREE from "./../src/Three.js";

export class Axis3d extends Axis2d {

    constructor(size, hex = 0xFFFFFF) {
        super(size, hex);
        this._draw(new THREE.Vector3( 0, 0, -size ),new THREE.Vector3( 0, 0, size ));
    }
}