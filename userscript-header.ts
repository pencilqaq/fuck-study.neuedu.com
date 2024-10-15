/**
 * 用户脚本配置模块
 *
 * 本模块定义了用户脚本的各种配置选项，用于在Tampermonkey等浏览器扩展中部署和管理脚本。
 */

// 导入当前项目的package.json配置文件
import packageJson from "./package.json" assert { type: "json" };
// 导入用户脚本生成器中的工具函数
import {
    generateIcon, // 生成图标链接
    generateCdnRequires, // 生成CDN依赖
} from "./build-utils/userscript-generator";

/**
 * UserScript 配置
 * tampermonkey官方文档: https://www.tampermonkey.net/documentation.php
 * 添加多个同名header需要传入一个数组
 * "空字符串 /空数组 /false" 表示不添加该header
 */
const userScriptHeader: UserScriptHeader = {
    // 用户脚本名称
    name: packageJson.name,
    // 用户脚本命名空间
    namespace: "http://tampermonkey.net/",
    // 版权声明
    copyright: "Copyright © 2024 YourName. All rights reserved.",
    // 用户脚本版本号
    version: packageJson.version,
    // 用户脚本描述
    description: packageJson.description,
    // 用户脚本图标,传入域名自动生成图标链接
    icon: generateIcon("tampermonkey.net"),
    // 用户脚本高分辨率图标,传入域名自动生成图标链接
    icon64: generateIcon("tampermonkey.net"),
    // 授予脚本的权限
    grant: [],
    // 用户脚本作者
    author: packageJson.author,
    // 用户脚本许可类型
    license: packageJson.license,
    // 用户脚本主页
    homepage: packageJson.homepage,
    // 揭示脚本是否包含广告、追踪等特性
    antifeature: [],
    // 脚本依赖的外部资源,这里只传入包名/包名@版本号，会自动生成CDN链接
    require: [...generateCdnRequires(["jquery"])],
    // 预加载的资源
    resource: [],
    // 用户脚本的应用范围
    include: [],
    // 用户脚本的匹配规则
    match: ["*://*/*"],
    // 用户脚本的排除规则
    exclude: [],
    // 用户脚本的运行时机
    "run-at": "document-start",
    // 指定沙箱环境
    sandbox: "",
    // 允许脚本连接的域名
    connect: [],
    // 禁止在 iframe 中运行脚本
    noframes: false,
    // 更新检查的 URL
    updateURL: "",
    // 下载更新的 URL
    downloadURL: "",
    // 支持和反馈的 URL
    supportURL: "",
    // 使用 webRequest 规则
    webRequest: "",
    // 是否解除包装直接注入脚本
    unwrap: false,
};

export default userScriptHeader;
