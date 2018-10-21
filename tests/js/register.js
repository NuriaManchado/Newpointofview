/* global AFRAME */

/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */
AFRAME.registerComponent('set-image', {
  schema: {
    on: {type: 'string'},
    target: {type: 'selector'},
    src: {type: 'string'},
    dur: {type: 'number', default: 300}
  },

  init: function () {
    var data = this.data;
    var el = this.el;
      //console.log("Funcion 1");

    el.addEventListener(data.on, function () {
      window.location.href = data.src;
      console.log("Ahora re-direcciona", data.src);
    });
  },

})


AFRAME.registerComponent('back', {
  schema: {
    on: {type: 'string'},
    target: {type: 'selector'},
    src: {type: 'string'},
    dur: {type: 'number', default: 300}
  },

  init: function () {
    var data = this.data;
    var el = this.el;
      //console.log("Back Sound");

    el.addEventListener(data.on, function () {
      window.location.href = data.src;
      console.log("Back");
    });
  },

})

AFRAME.registerComponent('audio', {
  schema: {
    on: {type: 'string'},
    target: {type: 'selector'},
    src: {type: 'string'},
    audio: {type: 'string'},
    dur: {type: 'number', default: 300}
  },

  init: function () {
    var data = this.data;
    var el = this.el;
      //console.log("Back Sound");

    el.addEventListener(data.on, function () {
      console.log(data.audio);
      var audio = new Audio(data.audio);
        audio.play();
      console.log("Back");
    });
  },

});




