<template>
  <span>{{ formattedNumber }}</span>
</template>

<script lang="ts">
import Vue from "vue";
import { TweenLite } from "gsap";
import { Formatter } from "../types";

export default Vue.extend({
  props: {
    value: {
      default: 0,
      type: [Number, String]
    },
    start: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 500
    },
    formatter: {
      type: Object,
      default: (): Formatter<string> => {
        return {
          to(value: string) {
            return value;
          },
          from(value: string) {
            return value;
          }
        };
      }
    }
  },
  data() {
    return {
      tweenedNumber: 0
    };
  },
  created() {
    this.tweenedNumber = this.start;
  },
  computed: {
    formattedNumber(): number {
      return this.formatter.to(this.tweenedNumber);
    }
  },
  methods: {
    getNumber(value: any) {
      return +value;
    }
  },
  watch: {
    value(tweenedNumber) {
      const vm = this;
      TweenLite.to(this.$data, this.duration / 1000, {
        tweenedNumber: this.getNumber(tweenedNumber),
        onComplete(args: any) {
          if (vm.$listeners.complete) {
            vm.$emit("complete", args);
          }
        },
        onStart(args: any) {
          if (vm.$listeners.start) {
            vm.$emit("start", args);
          }
        },
        onUpdate(args: any) {
          if (vm.$listeners.update) {
            vm.$emit("update", args);
          }
        }
      });
    }
  }
});
</script>
