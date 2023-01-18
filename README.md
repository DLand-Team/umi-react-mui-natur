# 开发指南


## 目录

1. [目录说明](#目录说明)
1. [开源库说明](#开源库说明)


## 安装依赖


```bash
npm i
# or
yarn
```

## 启动项目

```bash
npm run dev
# or
yarn dev
```

## 部署


### 打包
```bash
npm run build
# or
yarn build

```

## 目录说明

1. `/page` 存放页面
1. `/components` 存放组件
1. `/constants` 存放常量和枚举
1. `/plugins` 存放插件和库相关
1. `/utils` 存放工具方法
1. `/assets` 存放静态资源
1. `/http` 存放http相关如：请求入口，请求相关hook，文件上传，图片传输等
1. `global.scss` 存放全局样式
1. `app.tsx` 运行时配置，详情见umi文档


## 开源库说明

1. UI库[mui](https://mui.com/)
1. 状态管理[natur](https://www.npmjs.com/package/natur)
1. 事件管理[rxjs](https://rxjs.dev/guide/overview)
1. 基础工具函数[lodash](https://www.npmjs.com/package/lodash)
1. 表单校验组件[formik](https://www.npmjs.com/package/formik)
1. 数据校验工具[yup](https://www.npmjs.com/package/yup)
1. URL工具[qs](https://www.npmjs.com/package/qs)
1. 计算库[decimal.js](https://www.npmjs.com/package/decimal.js)
1. 颜色处理库[color](https://www.npmjs.com/package/color)
1. 时间处理库[dayjs](https://www.npmjs.com/package/dayjs)

