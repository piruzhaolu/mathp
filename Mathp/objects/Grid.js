import * as THREE  from '../../src/Three.js';

export class Grid extends THREE.Group{
    geometry;
    line;

    constructor(endPos, gap, color = 0x999999) {
        super();
        this._draw(endPos, gap,color);


    }


    setMatrix4(m4){
        this.matrix = m4;
        this.matrixAutoUpdate = false;
    }

    _draw(endPos, gap, color){
        let material = new THREE.LineBasicMaterial({
            color: color
        });

        this.geometry = this._createGeometry(endPos,gap);


        this.line = new THREE.LineSegments( this.geometry, material );
        this.add( this.line );
    }

    _createGeometry(endPos, gap){
        let points = [];

        let x = Math.trunc(endPos.x/gap) * gap;
        let y = Math.trunc(endPos.y/gap) * gap;
        let z = Math.trunc(endPos.z/gap) * gap;

        if (x != 0 && y != 0) {
            for(let i = -y; i <= y;i+=gap){
                points.push( -x, i, 0 );
                points.push( x, i, 0 );
            }
            for(let i = -x; i <= x;i+=gap){
                points.push( i, -y, 0 );
                points.push( i, y, 0 );
            }
        }

        if (x != 0 && z != 0) {
            for(let i = -z; i <= z;i+=gap){
                points.push( -x, 0, i );
                points.push( x, 0, i );
            }
            for(let i = -x; i <= x;i+=gap){
                points.push( i, 0, -z );
                points.push( i, 0, z );
            }
        }

        if (y != 0 && z != 0) {
            for(let i = -z; i <= z;i+=gap){
                points.push( 0, -y, i );
                points.push( 0, y, i );
            }
            for(let i = -y; i <= y;i+=gap){
                points.push( 0, i, -z );
                points.push( 0, i, z );
            }
        }
        let geometry = new THREE.BufferGeometry();
        geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( points, 3 ) );
        return geometry;
    }


}