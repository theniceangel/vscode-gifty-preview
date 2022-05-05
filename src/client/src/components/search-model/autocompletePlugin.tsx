/** @jsx h */
import { AutocompletePlugin } from '@algolia/autocomplete-js';
import mocData from '../../common/ts/mock';
import { reactive } from "vue";

const imgList = mocData;

type ImageMetaData = {
  remoteUrl: string
  size: string,
  width: number,
  height: number,
  name: string,
  resourceKey: string
};

type GetProcessDataProps = {
  accept?: string;
  sort?: 'stars' | 'forks' | 'help-wanted-issues' | 'updated'; // 按照xx排序
  order?: 'asc' | 'desc'; // 正序倒序
  perPage?: number; // 一页展示多少条数据
  page?: number;
  params?: {},
  submitFn?: Function;
};

// 存储搜索词 和 搜索结果
const searchData = reactive({
  query: '',
  searchRes: mocData
});

// 修改 搜索信息
const changeSearchData = (query: string, res: ImageMetaData[]) => {
  searchData.query = query;
  searchData.searchRes = res;
};

// 创建 AutocompletePlugin：处理 autocomplate 的 source 数据及钩子函数
const createAutocompletePlugin = (
  options: GetProcessDataProps = {}
): AutocompletePlugin<ImageMetaData, undefined> => {
  return {
    getSources() {
      return [
        {
          sourceId: 'links',
          getItems({ query }) {
            const items = imgList;
            return items.filter(({ name }) =>
              name.toLowerCase().includes(query.toLowerCase())
            );
          },
          getItemUrl({ item }) {
            return item.remoteUrl;
          },
          templates: {
            item({ item }) {
              return item.name;
            },
          },
        },
      ];
    },
    onSubmit(e) {
      console.log('onSubmit query', e.state.query);
      console.log('onSubmit items', e.state.collections[0].items);

      const query = e.state.query;
      const res = e.state.collections[0].items;
      changeSearchData(query, res);
      options.submitFn && options.submitFn(query, res); // 触发搜索弹窗关闭的回调
    },
  };
};

export {
  createAutocompletePlugin,
  searchData,
  changeSearchData,
  ImageMetaData
};
