import { BaseItem } from "@algolia/autocomplete-core";
import { autocomplete, AutocompleteOptions } from "@algolia/autocomplete-js";
import "@algolia/autocomplete-theme-classic";

import { h, Fragment, render } from "vue";

const createAutocomplate = (options: AutocompleteOptions<BaseItem>) => {
  autocomplete({
    ...options,
    autoFocus: true,
    openOnFocus: true,
    // @ts-ignore
    renderer: { createElement: h, Fragment, render },
  });
};
export { createAutocomplate };
