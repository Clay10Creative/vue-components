<template>
  <input
    :value="inputValue"
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
      canBlur: true,
      internal: null
    };
  },
  computed: {
    isPasswordField(): boolean {
      return this.type.toLowerCase() === "password";
    },
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
    inputValue(): any {
      if (this.isPasswordField) {
        return this.internal;
      }

      return this.showInternal ? this.internal : this.formatted;
    },
    inputType(): string {
      if (this.isPasswordField) {
        return this.type;
      }

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
            vm.canBlur = false;
            vm.focused = true;

            if (vm.$listeners.focus) {
              vm.$emit("focus", event);
            }

            setTimeout(() => {
              vm.canBlur = true;
            }, 125);
          },
          blur(event: any) {
            if (vm.canBlur) {
              vm.focused = false;
              if (vm.$listeners.focus) {
                vm.$emit("blur", event);
              }
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
