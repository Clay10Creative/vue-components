<template>
  <input
    :value="showInternal ? internal : formatted"
    :type="inputType"
    :class="{ empty }"
    v-on="listeners"
  />
</template>

<script lang="ts">
import Vue from "vue";
import { Formatter } from "../types";

export default Vue.extend({
  props: {
    value: {
      default: ""
    },
    type: {
      default: "text"
    },
    formattedOnly: {
      default: false,
      type: Boolean
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
      focused: false,
      internal: null
    };
  },
  computed: {
    showInternal(): boolean {
      return this.focused;
    },
    formatted(): any {
      if (this.showInternal) {
        return this.internal;
      }

      return this.formattedOnly
        ? this.internal
        : this.formatter.to(this.internal);
    },
    empty(): boolean {
      return this.formatted ? this.formatted.toString().length === 0 : true;
    },
    inputType(): string {
      return this.showInternal ? this.type : "text";
    },
    listeners(): any {
      var vm = this as any;
      return Object.assign(
        {},
        {
          input(event: any) {
            vm.internal = event.target.value;
            if (vm.$listeners.input) {
              vm.$emit("input", event.target.value);
            }
          },
          change(event: any) {
            vm.internal = event.target.value;
            if (vm.$listeners.change) {
              vm.$emit("change", vm.formatter.from(event.target.value));
            }
          },
          focus(event: any) {
            vm.focused = true;
            if (vm.$listeners.focus) {
              vm.$emit("focus", event);
            }
          },
          blur(event: any) {
            vm.focused = false;
            if (vm.$listeners.focus) {
              vm.$emit("blur", event);
            }
          }
        }
      );
    }
  },
  watch: {
    value: {
      handler(value) {
        this.internal = this.formattedOnly
          ? this.formatter.to(this.value)
          : this.value;
      },
      immediate: true
    }
  }
});
</script>
