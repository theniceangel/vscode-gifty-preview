# 介绍

支持 .gifty 文件的 editor。


# 剩余功能点（待补充）



# 已完成功能点
1. autocomplete 接入
2. header-bar UI
3. fuzzysort 分词接入
4. 搜索面板打开时自动focus输入框
5. 搜索词为空时submit=>reset画廊数据
6. icons 统一管理
7. 按键搜索(兼容 windows & Mac)
8. 搜索结果不存在时不可返回画廊界面
9. 搜索展示 图片缩略图
10. 搜索支持 尺寸搜索
11. 搜索支持 直接搜索URL
12. search 放在一个模块
13. 数据响应逻辑修改：vscode文件的全部数据data -> fork(provide & inject) -> search模块维护一份响应式的searchData -> 传给gallery组件展示
