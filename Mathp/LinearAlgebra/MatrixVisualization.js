import * as THREE from "../../src/Three.js";
import * as Mathvi from "../../Mathp/Mathvi.js";

export class MatrixVisualization{

    renderer;
    camera;
    scene;
    geometry;

    width;
    height;

    mi;
    mj;
    mk;

    _grid;
    _M4;


    constructor(w,h) {
        this.width = w;
        this.height = h;
        this.mi = new THREE.Vector3(1,0,0);
        this.mj = new THREE.Vector3(0,1,0);
        this.mk = new THREE.Vector3(0,0,1);

        this._M4 = new THREE.Matrix4().set(
            1,0,0,0,
            0,1,0,0,
            0,0,1,0,
            0,0,0,1
        );

        // let M4Input = {
        //     n11 : 1, n12 : 0,
        //     n21 : 0, n22 : 1
        // }


        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(w, h);
        document.body.appendChild(this.renderer.domElement);

        this.camera = new THREE.PerspectiveCamera(45, w / h, 1, 2000);
        this.camera.position.set(0, 0, 40);
        this.camera.lookAt(0, 0, 0);

        this.scene = new THREE.Scene();

        let grid = new Mathvi.Grid(new THREE.Vector3(20,20,0), 1, 0x333333);
        this.scene.add(grid);

        this._grid = new Mathvi.Grid(new THREE.Vector3(20,20,0), 1, 0x0a9096);
        this._grid.setMatrix4(this._M4);

        var geometry = new THREE.BoxGeometry( 4, 4, 4 );
        var material = new THREE.MeshBasicMaterial( {color: 0xAA3300} );
        var sphere = new THREE.Mesh( geometry, material );
        sphere.position.x = 2;
        sphere.position.y = 2;
        sphere.position.z = 2;
        this._grid.add( sphere );

        this.scene.add(this._grid);

        let axis2d = new Mathvi.Axis2d(20);
        this.scene.add(axis2d);

    }

    UpdateIJK(){
        let array = this._M4.toArray();
        array[0] = this.mi.x;
        array[1] = this.mi.y;
        array[2] = this.mi.z;

        array[4] = this.mj.x;
        array[5] = this.mj.y;
        array[6] = this.mj.z;

        array[8] = this.mk.x;
        array[9] = this.mk.y;
        array[10] = this.mk.z;

        this._M4.fromArray(array);
        this._grid.setMatrix4(this._M4)
    }






    Update(){
        this.renderer.render( this.scene, this.camera );
    }

    Resize(width,height){
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( width, height);
    }

}