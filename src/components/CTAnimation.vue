<template>
  <transition :css="false" appear @after-enter="afterEnter" @leave="leave">
    <div ref="animationContainer"></div>
  </transition>
</template>

<script lang="ts">
import Vue from "vue";
import lottie, { AnimationItem } from "lottie-web";

export default Vue.extend({
  name: "CtAnimation",
  props: {
    data: {
      type: Object,
      required: true
    },
    renderer: {
      type: String,
      default: "svg"
    },
    loop: {
      type: Boolean,
      default: false
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    rendererSettings: {
      type: Object,
      default: () => ({})
    },
    frames: {
      type: Object,
      default: () => ({})
    },
    playing: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      animation: {} as AnimationItem
    };
  },
  computed: {},
  watch: {
    playing(playing: string) {
      if (this.frames[playing]) {
        this.animation.playSegments(this.frames[playing], true);
      }
    }
  },
  mounted() {
    const container = this.$refs.animationContainer as HTMLElement;

    this.animation = lottie.loadAnimation({
      container,
      renderer: this.renderer as any,
      loop: this.loop,
      autoplay: this.autoplay,
      animationData: this.data,
      rendererSettings: this.rendererSettings
    });

    if (this.$listeners.ready) {
      this.$emit("ready", this.animation);
    }
  },
  methods: {
    afterEnter(_el: Element) {
      this.$nextTick(() => {
        if (this.frames.enter) {
          this.animation.playSegments(this.frames.enter, true);
        }
      });
    },
    leave(_el: Element, done: () => void) {
      if (this.frames.leave) {
        const eventListener = () => {
          done();
          this.animation.removeEventListener("complete", eventListener);
        };
        this.animation.addEventListener("complete", eventListener);
        this.animation.playSegments(this.frames.leave, true);
      } else {
        done();
      }
    }
  }
});
</script>
