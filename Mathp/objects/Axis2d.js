import * as THREE  from '../../src/Three.js';

export class Axis2d extends THREE.Group{

    constructor(size, hex = 0xFFFFFF){
        super();
        this.hex = hex;
        this._draw(new THREE.Vector3( -size, 0, 0 ),new THREE.Vector3( size, 0, 0 ));
        this._draw(new THREE.Vector3( 0, -size, 0 ),new THREE.Vector3( 0, size, 0 ));


    }

    _draw(start, end){
        let linePoint = [];
        linePoint.push(start);
        linePoint.push(end);
        let lineGeometry = new THREE.BufferGeometry().setFromPoints( linePoint );
        let line = new THREE.Line( lineGeometry, new THREE.LineBasicMaterial( { color: this.hex } ) );
        line.position.set( 0, 0, 0);
        this.add(line);

        let dir = new THREE.Vector3();
        dir.subVectors(end, start);
        dir.normalize();

        let arrowHelper = new THREE.ArrowHelper( dir, end, 8, this.hex);
        this.add( arrowHelper );
    }


}