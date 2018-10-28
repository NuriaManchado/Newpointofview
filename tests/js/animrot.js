AFRAME.registerComponent('animrot', {
    schema: {
        rotX: {type: 'number'},
        rotY: {type: 'number'},
        rotZ: {type: 'number'}
    },

    init: function() {
    },

    update: function() {
    },

    tick: function(time, timeDelta) {
        var rot = this.el.getAttribute("rotation");
        rot.x += this.data.rotX * timeDelta * 0.001;
        rot.y += this.data.rotY * timeDelta * 0.001;
        rot.z += this.data.rotZ * timeDelta * 0.001;
        if (rot.x > 180) rot.x -= 360;
        if (rot.y > 180) rot.y -= 360;
        if (rot.z > 180) rot.z -= 360;
        if (rot.x < -180) rot.x += 360;
        if (rot.y < -180) rot.y += 360;
        if (rot.z < -180) rot.z += 360;
        this.el.setAttribute("rotation", rot);
    }
});
