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

## Render

### page router 渲染方式

- CSR 传统的 React 项目，Next.js 页面如果使用了 useEffect 等在客户端调用接口或者其他导致页面变化的功能都是 CSR
- SSR 在服务端获取接口数据，page 路由下，使用 getServerSideProps（每次请求调用） 调用接口，结果当成属性传递给页面组件
- SSG 静态站点生成，Next.js 页面不获取数据时默认使用的就是 SSG，需要获取数据时通过 getStaticProps（构建时调用）和 getStaticPaths 构建时生成页面，缓存分发
- ISR 增量静态再生，在静态站点的基础上加上 revalidate 验证
- 混合使用，SSG + CSR，或者 SSR + CSR，静态页面或者服务端渲染的页面作为首页，提高首屏加载速度，然后 CSR 提供交互功能（给普通 CSR 页面加上 getServerSideProps 或者 getStaticProps 函数）

getServerSideProps 只能在 pages 目录下的页面直接使用，不能在普通组件中使用，如果页面不是被直接调用也不会生效

更改老项目，可以考虑使用 Next.js 14 page router 模式

### RSC & SSR

SSR 的缺点
SSR 通过 getServerSideProps 和 getStaticProps 在顶层获取数据在服务端渲染整个页面，生成的 HTML 是无法交互的 non-interactive UI，客户端渲染后还需要等待 JS 下载执行完，被赋予交互性，这个阶段被称为水合（Hydration），之后内容才可以交互，这些步骤是连续且阻塞的
SSR 只作用于页面初始化加载，对于后续的交互更新并没有作用

RSC 提供了更细粒度的组件渲染方式，组件直接获取数据，然后更新到页面，并且不会影响页面现有状态和交互性（要实现 SSR 效果也很简单，在最外层的服务端组件获取数据即可）

**Next.js 的服务端组件实际上是融合了 RSC 和 SSR 技术的**

### Suspense & Streaming

`<Suspense>` 允许推迟渲染里面的内容，在 Next.js 中使用可以达到流式渲染的效果，在 html 文档中可以看到一些 B1 S2 之类的文案，应该是代表第几个 Suspense 第几个 Block，请求 Transfer-Encoding 也会是 

Next.js 会等待 gennerateMetadata 内的数据请求完毕后再将 UI 流式传输到客户端，保证响应的第一部分就包含 head 标签
因为 Streaming 是流式渲染，HTML 中会包含最终渲染的内容，所以不会影响 SEO

如果希望按照顺序渲染多个 Suspense 中的内容，那么可以嵌套使用 Suspense，但是不同层级的异步请求还是同时发送的，不会叠加等待时间

Suspense 背后的技术被称为 Streaming，可以有效阻止耗时长的请求阻塞整个页面加载，减少 TTFB 和 FCP，缩短 TTI

Next.js 中实现 Streaming 的方式有两种，页面上使用 loading.tsx ，组件中使用 Suspense

将先获取数据再进行水合的传统 SSR 改为渐进式水合
存在缺点：用户下载的 JavaScript 代码没有减少，不需要交互的组件也必须在客户端进行水合，RSC 方案会解决这些问题（服务端组件的 js 不会打包发送到客户端，而是直接发送 RSC Payload）

RSC 结合 Suspense 可以带来更好的性能体验

### 服务端组件和客户端组件

- 服务端组件的限制
  - 不能添加交互和事件监听
  - 不能使用状态和生命周期（useState, useEffect, useReducer 等）
  - 不能使用浏览器 API
  - 不能使用 React 类组件
- 服务端组件优势
  - 可以直接获取数据
  - 可以直接访问后端资源
  - 在服务端使用依赖包，减少客户端 JS 包大小
  - 在服务端保留敏感信息（token 等）

服务端组件只会在服务端渲染，客户端组件会在服务端渲染一次，然后在客户端渲染

服务端组件运行在 构建时和服务端
客户端组件运行在 构建时、服务端（生成初始的 HTML，比如 useState 的初始值直接代入 HTML）、客户端（管理 DOM）

**服务端组件可以直接导入客户端组件，客户端组件不能直接导入服务端组件，但是可以将服务端组件以 props 的形式传给客户端组件**


## 数据获取与缓存

fetch 缓存
cache 缓存

在不同布局和页面之间使用相同数据，可以直接多次 fetch，利用其缓存机制？



### Server Actions

模块级别的 server action 在服务端组件和客户端组件都可以使用
函数级别的只能在服务端使用

Server Actions 的参数和返回值都需要是可序列化的





TODO
状态管理
form 交互
导出功能
虚拟表格和排序