<script>
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import mixin from './model-mixin.vue';
import { AxesHelper } from 'three';
export default {
  name: 'model-gltf',
  mixins: [mixin],
  props: {
    lights: {
      type: Array,
      default() {
        return [
          {
            type: 'AmbientLight',
            color: 0xaaaaaa,
          },
          {
            type: 'DirectionalLight',
            position: { x: 1, y: 1, z: 1 },
            color: 0xffffff,
            intensity: 0.8,
          },
        ];
      },
    },
    gammaOutput: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    const loader = new GLTFLoader();
    loader.setCrossOrigin(this.crossOrigin);

    return {
      loader,
      
    };
  },
  methods: {
    load() {
      if (!this.src) return;
      
      if (this.object) {
        this.wrapper.remove(this.object);
      }

      this.loader.load(this.src, (data) => {
        this.addObject(data.scene);
        //this.scene.add(this.Axes)
        //this.object.rotation.set(this.rotation.x,this.rotation.y,this.rotation.z)
        //this.camera.rotation.set(this.rotation.x,this.rotation.y,this.rotation.z)
        this.$emit('on-load');
      }, (xhr) => {
        this.$emit('on-progress', xhr);
      }, (err) => {
        console.log(err);

        this.$emit('on-error', err);
      });
      
    },
  },
};
</script>
