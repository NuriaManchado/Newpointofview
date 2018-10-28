// orbital trail component
// for a-frame / THREE.js
// (C) 2018 David Crespo Tascón
//
// this components draws a vanishing trail line following a target element.
AFRAME.registerComponent("orbitrail", {
    schema: {
        // id of target element to be tracked
        target: {type: "string"},
        // number of points in line
        numpoints: {type: "number", default: 225},
        // total approximate angle to be covered
        angle: {type: "number", default: 450},
        // color of trail
        color: {type:"color", default:"#fff"}
    },

    init: function() {
        // target element to be tracked for drawing trail
        this.targetElem = document.getElementById(this.data.target);
        if (null == this.targetElem)
            return;

        // target element position
        this.targetPos = this.targetElem.getAttribute("position");

        // create dynamic geometry
        var geo = this.geometry = new THREE.Geometry();
        geo.dynamic = true;

        // flag for first execution
        this.first = true;

        // temporary vertices to avoid allocating during tick
        this.v1 = new THREE.Vector3();
        this.v2 = new THREE.Vector3();
        this.p2 = new THREE.Vector3();

        // threshold angle in degrees
        var th_ang_deg = this.data.angle / this.data.numpoints;

        // we define threshold as the cosine of threshold angle
        this.threshold = Math.cos(th_ang_deg * 2 * Math.PI / 360);
    },

    // vertex shader which propagates vertex color to fragment shader
    vertexShader: `
        varying vec3 vColor;

        void main(){
            vColor = color;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,

    // fragment shader which uses uniform 'basecolor' for fragment color,
    // and green component of vertex color for alpha
    fragmentShader: `
        varying vec3 vColor;
        uniform vec3 basecolor;
        
        void main(){
            gl_FragColor = vec4( basecolor, vColor.g );
        }
    `,

    // tick: called every frame
    tick: function(time, timeDelta) {
        // exit if no target element
        if (null == this.targetElem)
            return;

        // geometry and current target position
        var geo = this.geometry;
        var p = this.targetPos;

        // to be performed only on first iteration of tick
        if (this.first) {
            this.first = false;

            // fill vertices and colors
            for (var i = 0; i < this.data.numpoints; i++) {
                // all vertices set to initial target position
                geo.vertices.push(new THREE.Vector3(p.x, p.y, p.z) );

                // colors set to gradient from (0,0,0) to (1,1,1)
                var val = i / (this.data.numpoints + 1);
                geo.colors.push(new THREE.Color( val, val, val ));
            }

            // create shader material
            var mat = new THREE.ShaderMaterial({
                uniforms: {
                    // this uniform sets the trail color
                    basecolor: {
                        value: new THREE.Color(this.data.color)
                    }
                },
                // vertex colors must be used by shader
                vertexColors: THREE.VertexColors,
                vertexShader: this.vertexShader,
                fragmentShader: this.fragmentShader,
                transparent: true
              });

            // create THREE line object and set as 3D object for this element
            this.line = new THREE.Line(geo, mat)
            this.el.setObject3D("line",this.line)

            // nothing else to be done on first iteration
            return;
        }

        // two previous vertices (should be -2 and -1 but this seems to behave better)
        var p0 = geo.vertices[geo.vertices.length - 3];
        var p1 = geo.vertices[geo.vertices.length - 2];

        // current target position
        var p2 = this.p2;
        p2.set(p.x, p.y, p.z);

        // initially, all points are equal. check for this condition...
        if (p0.equals(p1)) {
            /// ...and just add current target position
            this.shiftAndAddNewPointToGeoVertices(p);
            return;
        }

        //       P2 *       
        //          |       using the dot product,
        //          |       calculate the angle
        //          |       between the segments
        //          |       (p2-p1) and (p1-p0)
        //       P1 *       
        //         /|       actually, we dont 
        //        / |       calculate the angle
        //       /  |       but its cosine
        //      /-a-|
        //  P0 *    |
        this.v1.subVectors(p1,p0);
        this.v2.subVectors(p2,p1);
        var cosa = this.v1.dot(this.v2) / (this.v1.length() * this.v2.length());

        // compare this angle's cosine against threshold cosine
        if (cosa > this.threshold) {
            // if cosine is higher, angle is lower than threshold angle.
            // set last vertex to current target position and exit
            geo.vertices[geo.vertices.length - 1].set(p.x, p.y, p.z)
            geo.verticesNeedUpdate = true;
            return;
        }
        else {
            // cosine is lower, so threshold angle has been exceeded
            // and we must shift and add current target position to geometry.
            this.shiftAndAddNewPointToGeoVertices(p);
        }

    },

    shiftAndAddNewPointToGeoVertices: function(p) {
        var geo = this.geometry;
        // get oldest point and remove from array head
        var pp = geo.vertices.shift();
        // set point to new value
        pp.set(p.x, p.y, p.z);
        // add point to array tail
        geo.vertices.push(pp);

        // mark geometry as update needed
        geo.verticesNeedUpdate = true;
        geo.computeBoundingBox();
        geo.computeBoundingSphere();
    }
})