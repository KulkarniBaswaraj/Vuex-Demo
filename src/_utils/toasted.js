import Vue from 'vue';
import VueToasted from 'vue-toasted';

Vue.use(VueToasted, {
    iconPack : 'custom-class',
    duration: 2000,
    position: 'top-right',
    action : {
      text : '',
      onClick : (e, toastObject) => {
          toastObject.goAway(0);
      }
    }
});

