import { autocomplete, AutocompletePlugin } from "@algolia/autocomplete-js";
import "@algolia/autocomplete-theme-classic";

import { h, Fragment, render } from 'vue';

type OptionsType = {
  container: string | HTMLElement;
  placeholder: string;
  plugins: AutocompletePlugin<any, any>[] | undefined;
};

const createAutocomplate = (options: OptionsType) => {
  autocomplete({
    ...options,
    // @ts-ignore
    renderer: { createElement: h, Fragment, render }
  });
};
export { createAutocomplate };
