import Vue, { VueConstructor } from "vue";
import accounting from "accounting";

import CTAnimatedNumber from "./components/CTAnimatedNumber.vue";
import CTAnimation from "./components/CTAnimation.vue";
import CTInput from "./components/CTInput.vue";
import CTPaginate from "./components/CTPaginate.vue";
import CTSelect from "./components/CTSelect.vue";
import CTSlider from "./components/CTSlider.vue";
import CTTooltip from "./components/CTTooltip.vue";
import { IComponents, Formatters, Formatter } from "./types";

export * from "./types";

export const formatters: Formatters = {
  number(precision: number = 0): Formatter<number> {
    return {
      to(value) {
        return accounting.formatNumber(value, value > 10000 ? 0 : precision);
      },
      from(value) {
        return accounting.unformat(value);
      }
    };
  },
  currency(precision: number = 0, currency: string = '£'): Formatter<number> {
    return {
      to(value) {
        return accounting.formatMoney(value, currency, value > 10000 ? 0 : precision);
      },
      from(value) {
        return accounting.unformat(value);
      }
    };
  }
};

export const Components: IComponents = {
  "ct-animated-number": CTAnimatedNumber,
  "ct-animation": CTAnimation,
  "ct-input": CTInput,
  "ct-paginate": CTPaginate,
  "ct-select": CTSelect,
  "ct-slider": CTSlider,
  "ct-tooltip": CTTooltip
};

export default {
  install(Vue: VueConstructor<any>) {
    Vue.filter('ctNumber', (value: number, precision: number = 0) => formatters.number(precision).to(value));
    Vue.filter('ctCurrency', (value: number, precision: number = 0, currency: string = '£') => formatters.currency(precision, currency).to(value));

    Object.keys(Components).forEach((name: string) => {
      Vue.component(name, Components[name]);
    });
  }
};
