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

### 动态路由 路由组 平行路由 拦截路由

- 动态路由
  folder 会被作为 params 的 prop 传给布局、页面、路由处理程序、generateMetadata 函数
  `/user/[folder]` 只会匹配一级，有精准路由存在时优先匹配精准路由 `/user/a` `{folder: 'a'}`
  `/user/[...folder]` 会匹配后面所有，参数是数组，和 `[folder]` 同时存在时优先匹配 `[folder]` `/user/a/b` `{folder: ['a', 'b']}`
  `/user/[[...folder]]` 会匹配后面所有路由，包括没有子路由的情况即子路由可选，和 `[...folder]` 不可以同时使用, `/user` `{}`
  `/user/[[...folder]]` `/user/page.tsx` 同时出现会渲染 `page.tsx` 但是会发出告警，不建议同时使用

  **页面的 params 目前可以直接使用，但是 Next.js 15 之后是异步的，直接使用能读取到但是会爆出警告，手动加上 await 使用**

- 路由组
  `(routearr)` 将文件夹标记为路由组，阻止文件夹名称被映射到 url 中，但是可以用于将路由按照需求分组，使用不同的布局等内容
  多个路由组不要解析为相同路径，否则会报错

  如果使用路由组来实现多个根布局，使用 `not-fount.tsx` 会有问题，需要单独处理
  参考 (多个根布局时的 404 页面)[https://juejin.cn/post/7351321244125265930]

- 平行路由
  `@route` 可以在一个布局中同时或者有条件地渲染一个或多个页面，类似 Vue 的插槽功能
  平行路由可以为每个路由独立定义错误和 loading 页面
  软路由导航时，如果一个插槽和 URL 不匹配，Next.js 会继续保持该插槽之前的状态，硬路由导航时则会渲染 404 报错
  `default.tsx` 会在 URL 没有匹配内容时展示，所有平行路由和平行路由所在目录都要加上 default.tsx 否则硬导航会出现 not-found

- 拦截路由
  允许在当前路由拦截其他路由地址，并在当前路由中展示内容
  `(.)photo` 同级目录下的 photo
  `(..)photo` 上一级目录下的 photo
  `(..)(..)photo` 上两级目录下的 photo
  `(...)photo` 根目录下的 photo

  **显示拦截路由后用 router.back() 回到之前的路由(回到历史快照)，用 Link 不行**

  **遇到无法生效的情况或者无法解决的报错，尝试清除 .next 文件，重新运行项目**

### 路由处理程序 API

在前后端分离架构中，客户端与服务端通过 API 接口来交互，这个 API 接口在 Next.js 中被称呼为 路由处理程序

`route.js` 文件，支持 `GET` `POST` `PUT` `DELETE` `HEAD` `OPTIONS` 传入了不支持的方法则返回 `405 Method Not Allowed`

每个请求方法会被传入两个参数，`request` `context`，两个参数都是可选的

用 `NextResponse` 返回消息比直接用 `Response` 更方便
用 `NextRequest` 快捷读取请求和 cookie 等

默认情况下使用 Response 和 NextResponse 的 GET 请求会被缓存（开发模式不会）
Next.js 15 不再默认缓存了

- 以下情况会退出缓存
  - GET 请求使用了 Request 对象
  - 添加了非 GET 请求
  - 使用了 cookies, headers 等动态函数
  - 路由段配置项手动声明为动态模式 `export const dynamic = 'force-dynamic'`

- 设置缓存时效
  - 路由段配置重新验证 `export const revalidate = 10` 超过设置时间的首次访问会先返回上次缓存再更新缓存
  - 配置 `next.revalidate`，Next.js 拓展了原生的 fetch 方法，会自动缓存结果

其他
  - 获取 url `request.nextUrl.searchParams`
  - 获取 cookie `request.cookies.get('token')` `import {cookies} from 'next/headers'`，新版本推荐第二种方法，此方法改变 cookies 的值后会自动携带响应头 `Set-Cookie`
  - 处理 headers  `new Headers(request.headers)` `import {headers} from 'next/headers'` 同样推荐第二种，更方便，类型更友好
  - 重定向 `import { redirect } from 'next/navigation'`
  - 获取请求体内容 `request.json()` `request.formData()` 等
  - 设置 CORS
  - 响应无 UI 内容

### 中间件

`middleware.ts|js` 文件应该放在根目录下，有 `src` 时放在 `src` 下，否则不生效

可以导出一个 config 对象，里面可以包括匹配规则 matcher 

链式调用多个中间件，按照顺序执行
可以通过配置给每个中间件添加匹配条件吗，还是需要每个中间件逻辑里自行添加



