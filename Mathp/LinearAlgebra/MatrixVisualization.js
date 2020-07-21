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

    _grid;
    _M4;


    constructor(w,h) {
        this.width = w;
        this.height = h;
        this.mi = new THREE.Vector3(1,0,0);
        this.mj = new THREE.Vector3(0,1,0);

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
        // grid2.matrix = M4;
        // grid2.matrixAutoUpdate = false;
        this._grid.setMatrix4(this._M4);
        // grid2._AAA();
        this.scene.add(this._grid);

        let axis2d = new Mathvi.Axis2d(20);
        this.scene.add(axis2d);


        //window.addEventListener( 'resize', onWindowResize, false );



        // function ValueChange(newValue) {
        //     let array = M4.toArray();
        //     array[0] = M4Input.n11;
        //     array[1] = M4Input.n12;
        //     array[4] = M4Input.n21;
        //     array[5] = M4Input.n22;
        //     M4.fromArray(array);
        //     grid2.setMatrix4(M4)
        //     console.log(M4)
        // }
        //
        // //创建dat.GUI，传递并设置属性
        // let gui = new dat.GUI();
        // gui.add(M4Input, 'n11',-5,5).onChange(ValueChange);
        // gui.add(M4Input, 'n12',-5,5).onChange(ValueChange);
        // gui.add(M4Input, 'n21',-5,5).onChange(ValueChange);
        // gui.add(M4Input, 'n22',-5,5).onChange(ValueChange);
    }

    UpdateIJK(){
        let array = this._M4.toArray();
        array[0] = this.mi.x;
        array[1] = this.mi.y;
        array[4] = this.mj.x;
        array[5] = this.mj.y;
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