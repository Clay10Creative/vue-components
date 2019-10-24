import { VueConstructor } from "vue";

import CTAnimatedNumber from "./components/CTAnimatedNumber.vue";
import CTAnimation from "./components/CTAnimation.vue";
import CTInput from "./components/CTInput.vue";
import CTPaginate from "./components/CTPaginate.vue";
import CTSelect from "./components/CTSelect.vue";
import CTSlider from "./components/CTSlider.vue";
import CTTooltip from "./components/CTTooltip.vue";
import { IComponents } from "./types";

export * from "./types";

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
    Object.keys(Components).forEach((name: string) => {
      Vue.component(name, Components[name]);
    });
  }
};
