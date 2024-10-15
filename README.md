# tampermonkey-mod

tampermonkey-mod 是一个专为 Tampermonkey 设计的模块化 TypeScript 开发框架，旨在简化复杂脚本项目的开发流程。

## 项目背景

本项目的诞生源于对现有解决方案的思考和改进：

1. [userscript-template](https://github.com/JSREI/userscript-template)：
   - 优点：结构精简，易上手
   - 局限：仅支持 JavaScript，不能实时热重载

2. [vite-plugin-monkey](https://github.com/lisonge/vite-plugin-monkey)：
   - 优点：功能完善，支持脚本自动安装、代码热重载，兼容多种 monkey 脚本
   - 局限：配置较为复杂，不易上手

Tampermonkey-mod 旨在提供一个平衡的解决方案，既保留了 TypeScript 开发的优势，又避免了不必要的复杂性。

## 特性

-   模块化开发结构
-   TypeScript 支持
-   开发时热重载
-   自动生成 UserScript 头部信息
-   生产和开发环境构建配置

## 安装

1. 使用 GitHub 模板:

    - 访问 [tampermonkey-mod 模板](https://github.com/314432150/tampermonkey-mod/generate)
    - 输入 "Repository name" 填写存储库名称
    - 点击 "Create repository" 按钮创建你的仓库

2. 克隆你的新仓库:

    ```
    git clone https://github.com/你的用户名/你的仓库名.git
    ```

3. 安装依赖:
    ```
    npm install --registry=https://registry.npmmirror.com
    ```

## 使用

### 开发

1. 配置 Tampermonkey 扩展以允许访问文件 URL：

    - Chrome 浏览器：

        1. 访问扩展管理页面 (chrome://extensions/)
        2. 找到 Tampermonkey 扩展并点击"详情"
        3. 启用"允许访问文件网址"选项

    - Edge 浏览器：
        1. 打开扩展管理页面 (edge://extensions/)
        2. 定位 Tampermonkey 扩展并点击"详细信息"
        3. 开启"允许访问文件 URL"选项

2. 启动带有热重载功能的开发服务器：

    ```
    npm run dev
    ```

### 生产

构建生产环境用户脚本

```
npm run build
```

## 配置

### Tampermonkey UserScriptHeader

编辑 `userscript-header.ts` 文件以自定义你的 [UserScript](https://www.tampermonkey.net/documentation.php) 元数据：

-   添加多个同名 header 需要传入一个数组
-   "空字符串 /空数组 /false" 表示不添加该 header

| 属性        | 描述                                                               | 类型     | 示例值                                                             |
| ----------- | ------------------------------------------------------------------ | -------- | ------------------------------------------------------------------ |
| name        | 用户脚本名称,默认使用 package.json 的 name                         | string   | packageJson.name \| "My Awesome Script"                            |
| namespace   | 用户脚本命名空间                                                   | string   | "http://tampermonkey.net/"                                         |
| copyright   | 版权声明                                                           | string   | "Copyright © 2024 YourName. All rights reserved."                  |
| version     | 用户脚本版本号,默认使用 package.json 的 version                    | string   | packageJson.version \| "1.0.0"                                     |
| description | 用户脚本描述,默认使用 package.json 的 description                  | string   | packageJson.description \| "My Awesome Script"                     |
| icon        | 用户脚本图标,传入域名自动生成图标链接                              | string   | generateIcon("tampermonkey.net")                                   |
| icon64      | 用户脚本高分辨率图标,传入域名自动生成图标链接                      | string   | generateIcon("tampermonkey.net")                                   |
| grant       | 授予脚本的权限                                                     | string[] | []                                                                 |
| author      | 用户脚本作者,默认使用 package.json 的 author                       | string   | packageJson.author \| "Your Name"                                  |
| license     | 用户脚本许可类型,默认使用 package.json 的 license                  | string   | packageJson.license \| "MIT"                                       |
| homepage    | 用户脚本主页,默认使用 package.json 的 homepage                     | string   | packageJson.homepage \| "https://github.com/YourUsername/YourRepo" |
| antifeature | 揭示脚本是否包含广告、追踪等特性                                   | string[] | []                                                                 |
| require     | 脚本依赖的外部资源,这里只传入包名/包名@版本号，会自动生成 CDN 链接 | string[] | [...generateCdnRequires(["jquery"])]                               |
| resource    | 预加载的资源                                                       | string[] | []                                                                 |
| include     | 用户脚本的应用范围                                                 | string[] | []                                                                 |
| match       | 用户脚本的匹配规则                                                 | string[] | `["*://*/*"]`                                                      |
| exclude     | 用户脚本的排除规则                                                 | string[] | []                                                                 |
| run-at      | 用户脚本的运行时机                                                 | string   | "document-start"                                                   |
| sandbox     | 指定沙箱环境                                                       | string   | ""                                                                 |
| connect     | 允许脚本连接的域名                                                 | string[] | []                                                                 |
| noframes    | 禁止在 iframe 中运行脚本                                           | boolean  | false                                                              |
| updateURL   | 更新检查的 URL                                                     | string   | ""                                                                 |
| downloadURL | 下载更新的 URL                                                     | string   | ""                                                                 |
| supportURL  | 支持和反馈的 URL                                                   | string   | ""                                                                 |
| webRequest  | 使用 webRequest 规则                                               | string   | ""                                                                 |
| unwrap      | 是否解除包装直接注入脚本                                           | boolean  | false                                                              |

### Tampermonkey API 类型定义

本项目为 Tampermonkey 的应用程序接口（API）添加了全局类型定义，这使得在开发过程中可以享受到更好的代码补全和类型检查。

#### 使用方法

在你的 TypeScript 文件中，你可以直接使用 Tampermonkey 的 API，无需额外的导入。例如：

```typescript
// 使用GM_setValue存储数据
GM_setValue("myKey", "myValue");
// 使用GM_getValue获取数据
const value = GM_getValue("myKey", "defaultValue");
// 使用GM_addStyle添加样式
GM_addStyle("body { background-color: #f0f0f0; }");
```

#### 可用的 API

包括 DOM 操作、样式添加、文件下载、资源管理、通知、标签页操作、菜单命令、剪贴板操作、数据存储、XHR 请求、Web 请求拦截和 Cookie 管理等：

| API                            | 功能                      | 示例                                                                                                                                  |
| ------------------------------ | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `GM_addElement`                | 向页面添加新的 HTML 元素  | `const div = GM_addElement('div', { id: 'myDiv', textContent: '新元素' });`                                                           |
| `GM_addStyle`                  | 向页面添加新的 CSS 样式   | `GM_addStyle('body { background-color: #f0f0f0; }');`                                                                                 |
| `GM_download`                  | 下载文件                  | `GM_download({ url: 'https://example.com/file.pdf', name: 'document.pdf' });`                                                         |
| `GM_getResourceText`           | 获取预定义资源的文本内容  | `const text = GM_getResourceText('myResource');`                                                                                      |
| `GM_getResourceURL`            | 获取预定义资源的 URL      | `const url = GM_getResourceURL('myImage');`                                                                                           |
| `GM_log`                       | 向控制台输出日志          | `GM_log('这是一条日志消息');`                                                                                                         |
| `GM_notification`              | 显示桌面通知              | `GM_notification({ text: '你好！', title: '通知', onclick: () => console.log('点击了通知') });`                                       |
| `GM_openInTab`                 | 在新标签页中打开 URL      | `const tab = GM_openInTab('https://example.com', { active: true });`                                                                  |
| `GM_registerMenuCommand`       | 注册用户脚本命令          | `const commandId = GM_registerMenuCommand('我的命令', () => console.log('执行了命令'), { accessKey: 'M' });`                          |
| `GM_unregisterMenuCommand`     | 注销用户脚本命令          | `GM_unregisterMenuCommand(commandId);`                                                                                                |
| `GM_setClipboard`              | 设置剪贴板内容            | `GM_setClipboard('复制的文本', 'text', () => console.log('已复制到剪贴板'));`                                                         |
| `GM_getTab`                    | 获取当前标签页的持久数据  | `GM_getTab(tab => console.log('标签页数据:', tab));`                                                                                  |
| `GM_saveTab`                   | 保存当前标签页的持久数据  | `GM_saveTab({ key: 'value' }, () => console.log('标签页数据已保存'));`                                                                |
| `GM_getTabs`                   | 获取所有标签页的持久数据  | `GM_getTabs(tabs => console.log('所有标签页:', tabs));`                                                                               |
| `GM_setValue`                  | 存储数据                  | `GM_setValue('myKey', 'myValue');`                                                                                                    |
| `GM_getValue`                  | 获取存储的数据            | `const value = GM_getValue('myKey', 'defaultValue');`                                                                                 |
| `GM_deleteValue`               | 删除存储的数据            | `GM_deleteValue('myKey');`                                                                                                            |
| `GM_listValues`                | 列出所有存储的数据键      | `const keys = GM_listValues();`                                                                                                       |
| `GM_addValueChangeListener`    | 添加数据变化监听器        | `const listenerId = GM_addValueChangeListener('myKey', (key, oldValue, newValue, remote) => console.log('数据已变化'));`              |
| `GM_removeValueChangeListener` | 移除数据变化监听器        | `GM_removeValueChangeListener(listenerId);`                                                                                           |
| `GM_xmlhttpRequest`            | 发送 XMLHttpRequest 请求  | `GM_xmlhttpRequest({ method: 'GET', url: 'https://api.example.com', onload: response => console.log(response.responseText) });`       |
| `GM_webRequest`                | 注册 Web 请求规则和监听器 | `GM_webRequest([{ selector: 'https://example.com/*', action: 'cancel' }], (info, message, details) => console.log('Web请求被拦截'));` |
| `GM_cookie.list`               | 列出符合条件的 cookie     | `GM_cookie.list({ domain: 'example.com' }, (cookies, error) => console.log('Cookies:', cookies));`                                    |
| `GM_cookie.set`                | 设置 cookie               | `GM_cookie.set({ name: 'myCookie', value: 'myValue', domain: 'example.com' }, error => console.log('Cookie已设置'));`                 |

#### 类型定义文件

完整的类型定义可以在 `build-utils/types/userscript.d.ts` 文件中找到。这个文件定义了所有可用的 Tampermonkey API，以及一些相关的接口和类型。

通过使用这些类型定义，你可以在开发过程中获得更好的代码提示和错误检查，从而提高开发效率和代码质量。

## 构建流程

### 开发环境 `rollup.config.dev.ts`

1. **多文件构建策略**：

    - 业务逻辑代码 (`dist/index.bundle.js`)
    - 热重载客户端代码 (`dist/client.bundle.js`)
    - Tampermonkey 脚本 (`dist/header.bundle.user.js`)

2. **智能 Tampermonkey 脚本生成**：

    - 仅包含必要的 UserScript 元数据
    - 通过`@require`指令动态引入业务逻辑和热重载客户端代码
    - 自动为脚本名称添加`.dev`后缀，便于区分开发版本
    - 使用当前时间戳作为版本号，确保每次构建都是最新版

3. **自动化开发环境配置**：

    - 启动本地 Web 服务器
    - 首次构建时自动打开浏览器并安装开发版脚本

4. **实时热重载机制**：

    - 利用 WebSocket 技术实现服务器与客户端的实时通信
    - 代码变更时自动通知客户端并触发页面刷新

5. **高效的代码更新策略**：

    - 采用 File 协议引用业务逻辑，确保每次刷新都加载最新代码
    - 绕过浏览器缓存机制，保证开发过程中的即时反馈

6. **模块化设计理念**：
    - 将热重载逻辑与业务代码解耦，提高代码清晰度和可维护性
    - 充分利用 Rollup 插件系统实现自定义构建逻辑


### 生产环境 `rollup.config.dev.ts` ：

1. **单一输出文件**：

    - 生成单一的生产版本用户脚本 `dist/prod.bundle.user.js`。
    - 该脚本集成了必要的 UserScript 元信息和完整的业务逻辑代码。

2. **动态版本号**：

    - 每次构建时，自动将 UserScript 的版本号更新为当前时间。

3. **代码打包**：

    - 使用 Rollup 将所有源代码和依赖打包成一个独立执行的脚本。
    - 采用 IIFE（立即执行函数表达式）格式，确保代码在隔离环境中运行。

4. **自动安装**：
    - 构建完成后，自动启动 Web 服务器。
    - 通过 URL 访问，自动打开浏览器并提示安装生产版本的用户脚本。

## 项目结构

```
tampermonkey-mod/
├── src/
│ └── index.ts # 主要业务逻辑入口文件
├── build-utils/
│ ├── types/
│ │ └── userscript.d.ts # Tampermonkey API 类型定义文件
│ ├── client.ts # 热重载客户端代码
│ ├── server.ts # 开发服务器和 WebSocket 服务器
│ ├── tool-config.json # 工具配置文件
│ ├── userscript-generator.ts # UserScript 生成器工具函数
│ └── userscript-header-container.ts # UserScript 元信息容器
├── dist/
│ ├── index.bundle.js # 打包后的主要业务逻辑（开发环境）
│ ├── client.bundle.js # 打包后的热重载客户端代码（开发环境）
│ ├── header.bundle.user.js # 生成的 UserScript 头部文件（开发环境）
│ └── prod.bundle.user.js # 打包后的完整 UserScript（生产环境）
├── rollup.config.base.ts # Rollup 基础配置
├── rollup.config.dev.ts # Rollup 开发环境配置
├── rollup.config.prod.ts # Rollup 生产环境配置
├── userscript-header.ts # UserScript 头部配置
├── package.json # 项目依赖和脚本配置
├── tsconfig.json # TypeScript 配置
└── README.md # 项目说明文档
```

## 许可证

本项目采用 MIT 许可证。详情请见 [LICENSE](LICENSE) 文件。

## 贡献

欢迎贡献！请随时提交 Pull Request。

## 支持

如果你遇到任何问题或有任何疑问，请在 [GitHub 仓库](https://github.com/314432150/tampermonkey-mod/issues) 上开一个 issue。
