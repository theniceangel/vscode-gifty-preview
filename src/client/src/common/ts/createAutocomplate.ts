import { autocomplete, AutocompletePlugin } from '@algolia/autocomplete-js';
import '@algolia/autocomplete-theme-classic';


type BasePlugin = AutocompletePlugin<any, undefined>;
type Container = string | HTMLElement;

type ParamsType = {
  container: Container,
  basePlugin: BasePlugin
};

const createAutocomplate = (params: ParamsType) => {
    autocomplete({
        container: params.container,
        placeholder: 'Search Text',
        plugins: [params.basePlugin]
    });
};
export { createAutocomplate };

