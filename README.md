# platform-next

```sh
pnpm dlx create-next-app
```

next 启动时会自动识别 `app` 或 `/src/app` 目录下的文件作为路由，如果要增加或者去掉 `src` 都需要重新启动项目

## shadcnUI

初始化 shadcnUI 的时候也会自动识别是否有 `src` 目录，重启项目，否则 tailwindcss 会失效

```sh
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button
```

增加公司提供的主题色变量
增加主题切换器
配置路由

## App Router

### 文件

- route
- page

- layout
  同一目录下的 `page.tsx` 会被当成 `children` 属性传入 `layout.tsx`
  layout 的 children 可以是子页面或子布局，可以嵌套
  根布局会应用于所有页面，app 目录必须包含根布局，根布局必须包含 html 和 body 标签，其他布局不能包含这两个标签
  可以使用路由组创建多个根布局，默认根布局是服务端组件，且不能设置为客户端组件

- template
  类似布局，但是布局会维持状态，模板不会维持状态，每次切换路由都会创建一个实例重新挂载

- loading
  `loading.tsx` 当 `page.tsx` 导出一个 `async` 函数时，会触发最近层级的 loading
  原理是，将 `page.js` 用 `<Suspense>` 包裹，`Suspense` 捕获数据加载的 `promise`，借此 ***实现了 loading 组件的关闭***
  **切换子路由是否会触发上层的 loading**
  **只有 async 标签但是没有 promise 会一直保持 loading 状态**

- error
  借助 `Error Boundary` 功能
  loading 和 error 都只替换 page 部分内容，不会影响外层的 layout 等
  要捕获 layout 和 template 里面的错误，需要在父级的 error 里面，或者最顶层的 `app/global-error.tsx` 里面
  因为要替换根布局内容，所以`global-error.tsx` 里面也要定义 html 和 body 标签

- not-found
  `notFound()` 函数手动触发则由最近的 `not-found.tsx` 来处理
  访问路由不存在则由 `app/not-found.tsx` 处理

只有服务端组件才能触发 `error` `not-found`

客户端组件不能是 async 函数，也不能用 use 同步获取数据

### 路由导航

- `<Link>` 组件
  拓展了原生的 `<a>` 标签，用来实现预获取和客户端路由导航

- `useRouter` 

- `redirect`

- 原生 History API


