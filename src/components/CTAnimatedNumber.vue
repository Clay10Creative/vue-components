<template>
  <span ref="numberElement"></span>
</template>

<script lang="ts">
import Vue from "vue";
import { CountUp } from "countup.js";
import { debounce } from "ts-debounce";
import { Formatter } from "../types";

export default Vue.extend({
  name: "CtAnimatedNumber",
  props: {
    value: {
      required: true,
      type: Number
    },
    startAt: {
      type: Number,
      default: 0
    },
    precision: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 1000
    },
    formatter: {
      type: Object,
      default: (): Formatter<number> => {
        return {
          to(value: number) {
            return value.toString();
          },
          from(value: string) {
            return parseInt(value, 10);
          }
        };
      }
    }
  },
  data() {
    return {
      counter: {} as CountUp
    };
  },
  watch: {
    value(value) {
      this.update(value);
    }
  },
  async mounted() {
    await this.$nextTick();
    const element = this.$refs.numberElement as HTMLElement;

    this.counter = new CountUp(element, this.value, {
      startVal: this.startAt,
      decimalPlaces: this.precision,
      duration: this.duration / 1000,
      formattingFn: this.formatter.to
    });
  },
  methods: {
    update: debounce(function(this: any, value) {
      this.counter.update(value);
    }, 250)
  }
});
</script>
