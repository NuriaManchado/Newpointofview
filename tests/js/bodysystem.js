// quick and dirty orbital propagator for multiple bodies
// for a-frame / THREE.js
// (C) 2018 David Crespo Tascón
//

// body component
AFRAME.registerComponent('body', {
    schema: {
        mass: {type: 'number'},
        vel: {type: 'vec3'},
        acc: {type: 'vec3'},
        fixed: {type: 'boolean', default:false }

    }
});

// body system component
// element with bodysystem component must be the direct parent
// of elements with body component
AFRAME.registerComponent('bodysystem', {
    schema: {
        elems: {type:"array"},
        cosmo: {type:"number", default:1000},
    },

    init: function() {
    },

    update: function() {
        this.data.elems = [];

        var children = this.el.children;
        for (var i = 0; i < children.length; i++) {
            var elem = children[i];
            var body = elem.getAttribute("body");
            if (body != null) {
                this.data.elems.push(elem);
            }
        }
    },

    tick: function(time, timeDelta) {

        if (timeDelta > 100) return;

        var elems = this.data.elems;
        var elemcount = elems.length;
        for (var i = 0; i < elemcount; i++) {
            var elem = elems[i];
            var body = elem.getAttribute("body");
            body.acc.x = 0;
            body.acc.y = 0;
            body.acc.z = 0;
        }

        for (var i = 0; i < elemcount; i++) {
            var elem1 = elems[i];
            var body1 = elem1.getAttribute("body");
            var m1 = body1.mass;
            var p1 = elem1.getAttribute("position");
            for (var j = i+1; j < elemcount; j++) {
                var elem2 = elems[j];
                var body2 = elem2.getAttribute("body");
                var m2 = body2.mass;
                var p2 = elem2.getAttribute("position");
                var dx = p2.x - p1.x;
                var dy = p2.y - p1.y;
                var dz = p2.z - p1.z;
                var d2 = dx*dx + dy*dy + dz*dz;
                var d = Math.sqrt(d2)
                var ux = dx / d;
                var uy = dy / d;
                var uz = dz / d;
                var a0 = this.data.cosmo / d2;
                body1.acc.x += m2 * a0 * ux;
                body1.acc.y += m2 * a0 * uy;
                body1.acc.z += m2 * a0 * uz;
                body2.acc.x -= m1 * a0 * ux;
                body2.acc.y -= m1 * a0 * uy;
                body2.acc.z -= m1 * a0 * uz;
            }
        }

        for (var i = 0; i < elemcount; i++) {
            var elem = elems[i];
            var body = elem.getAttribute("body");
            if (body.fixed)
                continue;
            var acc = body.acc;
            var vel = body.vel;
            var pos = elem.getAttribute("position");
    
            var k = 1;
            vel.x += acc.x * timeDelta * 0.001*k;
            vel.y += acc.y * timeDelta * 0.001*k;
            vel.z += acc.z * timeDelta * 0.001*k;
    
            pos.x += vel.x * timeDelta * 0.001*k;
            pos.y += vel.y * timeDelta * 0.001*k;
            pos.z += vel.z * timeDelta * 0.001*k;
        }
    },
});
