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
