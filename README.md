# 项目名称：
### **EWSHOPADMIN**
# 项目介绍：
```angular2html
该项目为EWShop的后台管理系统，主要实现数据的统计，和管理功能的实现
列如，浏览人数、下单人数、每日订单量、商品数量、用户量的统计；
对于用户、商品、评论、轮播图等数据的增删改查等管理操作# 
```
# 项目开发环境:
```angular2html
    node     v16.15.0
    axios    v0.27.0
    vite     v3.0.0
    pinia    v2.0.18
    naive-ui v2.32.1
```
### Vite脚手架
> Vite  是一种新型前端构建工具，能够显著提升前端开发体验。Vite 意在提供开箱即用的配置，
同时它的 插件 API 和 JavaScript API 带来了高度的可扩展性，并有完整的类型支持。
### pinia状态管理
> Pinia最初是在2019年11月左右重新设计使用Composition API的 Vue 商店外观的实验。
从那时起，最初的原则相同，但 Pinia 适用于 Vue 2 和 Vue 3 ，并且不需要你使用组合 API。
除了安装和SSR之外，还有其他的 API是一样的，并且这些针对 Vue 3 ，并在必要时提供 Vue 2
的相关注释，以便 Vue 2 和 Vue 3 的用户可以阅读！
### naive-ui
>Naive UI 是一个 Vue3 的组件库。它比较完整，主题可调，用 TypeScript 编写
Naive UI 全量使用 TypeScript 编写，和 TypeScript 项目无缝衔接。
并且你不需要导入任何 CSS 就能让组件正常工作。
# 项目运行：
```angular2html
 
    # 安装依赖
    npm install

    # 本地开发 开启服务
    npm run dev

   # 演示项目
    http://shopadmin.eduwork.cn/

```

# 项目目录：
```
├── .vscode                     // 保存的配置文件  
├── public                      // 网页图标            
├── src                         // 源代码  
│   ├── api                     // 所有请求  
│   ├── assets                  // 图片  
│   ├── components              // 全局UI组件  
│   ├── layout                  // 页面布局  
│   ├── router                  // 路由  
│   ├── store                   // 全局store管理  
│   ├── style                   // 全局样式
│   ├── utils                   // 全局公用方法   
│   ├── view                    // view界面  
│   │    ├── category           //分类组件  
│   │    ├── comment            //评论组件  
│   │    ├── dashboard          //首页组件  
│   │    ├── goods              //商品组件  
│   │    ├── links              //友情链接组件  
│   │    ├── login              //登录界面  
│   │    ├── order              //订单界面  
│   │    ├── slide              //轮播图界面  
│   │    └── user               //用户界面  
│   ├── App.vue                 // 入口页面  
│   ├── main.ts                 // 入口 加载组件 初始化等  
│   └── vite-env.d.ts           // ts 代码的智能提示使用。   
├── eslintrc.js                 // eslint 配置项  
├── .gitignore                  // git 忽略项  
├── components.d.ts             // 给编辑器做代码提示用  
├── postcss.config.cjs          // postcss使用文件
├── tailwind.config.cjs         // tailwind配置文件
├── tsconfig.json               // 指定了编译项目所需的根文件和编译器选项
├── tsconfig.node.json          // 是专门用于 vite.config.ts的 TypeScript 配置文件
├── vite.config.ts              // vite配置
├── yarn.lock                   // 存储这你的每个包的确切依赖版本
├── index.html                  // html模板
├── README.md                   // html模板
├── package.json                // package.json
└── package.lock.json           // package.json
```
# 关于作者
**作者姓名：牛鑫**  
**邮箱：Nsin12138@163.com**
# 鸣谢
该项目参考[EWShop](https://api.shop.eduwork.cn/)的后台管理系统
