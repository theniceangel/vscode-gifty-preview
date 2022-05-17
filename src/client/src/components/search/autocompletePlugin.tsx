import { AutocompletePlugin } from "@algolia/autocomplete-js";
import { reactive } from "vue";
import fuzzysort from "fuzzysort";

let imgList: ImageMetaData[] = [];

type ImageMetaData = {
  remoteUrl: string;
  size: string;
  width: number;
  height: number;
  name: string;
  resourceKey: string;
  highlight?: string;
};

type GetProcessDataProps = {
  accept?: string;
  sort?: "stars" | "forks" | "help-wanted-issues" | "updated"; // 按照xx排序
  order?: "asc" | "desc"; // 正序倒序
  perPage?: number; // 一页展示多少条数据
  data?: ImageMetaData[];
  page?: number;
  params?: {};
  submitFn?: Function;
};

// 存储搜索词 和 搜索结果
const searchData = reactive({
  query: "",
  searchRes: imgList,
});

// 修改 搜索信息
const changeSearchData = (query: string, res: ImageMetaData[]) => {
  searchData.query = query;
  searchData.searchRes = res;
};

// 创建 AutocompletePlugin：处理 autocomplate 的 source 数据及钩子函数
const createAutocompletePlugin = (
  options: GetProcessDataProps = {}
): AutocompletePlugin<ImageMetaData, ImageMetaData[]> => {
  imgList = options.data || []
  return {
    getSources() {
      return [
        {
          sourceId: "links",
          getItems({ query }) {
            const items = imgList.map(item=>{
              return {
                ...item,
                width: JSON.stringify(item.width),
                height: JSON.stringify(item.height),
              }
            })
            let results = fuzzysort.go(query, items, {
              keys: ["name", "remoteUrl", "width", "height"],
              // keys: ["name", "remoteUrl"],
              // Create a custom combined score to sort by. -100 to the desc score makes it a worse match
              scoreFn: (a) =>
                Math.max(
                  a[0] ? a[0].score : -1000,
                  a[1] ? a[1].score - 100 : -1000
                ),
            });
            let arr1 = results.map((result) => {
              let finded = false
              for (let i = 0; i <= 3; i++) {
                if(!!fuzzysort.highlight(result[i])) {
                  finded = true
                }
              }
              let highlightName = fuzzysort.highlight(result[0]) || finded && result.obj.name
              let highlightUrl = fuzzysort.highlight(result[1]) || finded && result.obj.remoteUrl
              let highlightWidth = fuzzysort.highlight(result[2]) || finded && result.obj.width
              let highlightHeight = fuzzysort.highlight(result[3]) || finded && result.obj.height
              return {
                ...result.obj,
                finded,
                highlight: `
                <span class="title-text"> ${highlightName} </span>
                <span class="title-size"> （${highlightWidth} x ${highlightHeight}）</span>
                <br>
                <span class="url-text"> ${highlightUrl} </span>
                `,
              };
            });
            let arr2 = arr1.filter((item) => item.finded)
            return arr2
            // return (
            //   (arr2.length &&
            //     arr2.filter(({ name, remoteUrl, width, height }) =>
            //       name.toLowerCase().includes(query.toLowerCase()) ||
            //       remoteUrl.toLowerCase().includes(query.toLowerCase()) ||
            //       width.includes(query.toLowerCase()) ||
            //       height.includes(query.toLowerCase())
            //     )) ||
            //   []
            // );
          },
          getItemUrl({ item }) {
            return item.remoteUrl;
          },
          templates: {
            item({ item }) {
              return (
                <div>
                  <img src={item.remoteUrl}></img>
                  <span v-html={item.highlight}></span>
                </div>
              )
            },
          },
        },
      ];
    },
    onSubmit(e) {
      // console.log("onSubmit query", e.state.query);
      // console.log("onSubmit items", e.state.collections[0].items);

      const query = e.state.query;
      const res = e.state.collections[0].items;
      if(query && res.length) {
        changeSearchData(query, res);
        options.submitFn && options.submitFn(query, res); // 触发搜索弹窗关闭的回调
      }
    },
  };
};

export {
  createAutocompletePlugin,
  searchData,
  changeSearchData,
  ImageMetaData,
};
