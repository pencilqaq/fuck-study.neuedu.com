/**
 * Rollup 配置模块
 *
 * 本模块负责定义Rollup打包工具的配置，用于处理业务代码、热重载客户端代码以及UserScript的构建流程。
 */

// 导入路径模块，用于文件路径操作
import path from "path";
// 导入Rollup的配置类型，用于定义插件配置
import { RollupOptions } from "rollup";
// 导入JSON插件，使Rollup能够打包JSON文件
import json from "@rollup/plugin-json";
// 导入基础配置，用于共享的一些默认配置
import baseConfig from "./rollup.config.base";
// 导入UserScript头部信息，包含脚本的元数据
import userScriptHeader from "./userscript-header";
// 导入用户脚本生成器用于生成UserScript注释,，导入安装用户脚本函数
import {
    generateUserScriptComments,
    installUserScript,
} from "./build-utils/userscript-generator";
// 导入启动WebSocket服务器的函数，用于开发工具中的实时重加载功能
import { startWebSocketServer } from "./build-utils/server";

// 是否已require过业务代码入口文件
let hasRequiredFiles = false;
// 标记UserScript是否已经安装过
let hasInstalledUserScript = false;

// 业务代码入口文件
const indexInputFile = "src/index.ts";
// 业务代码输出文件
const indexOutputFile = "dist/index.bundle.js";

// 热重载客户端入口文件
const clientInputFile = "build-utils/client.ts";
// 热重载客户端输出文件
const clientOutputFile = "dist/client.bundle.js";

// UserScript 入口文件
const userScriptInputFile = "build-utils/userscript-header-container.ts";
// UserScript 输出文件
const userScriptOutputFile = "dist/header.bundle.user.js";

/**
 * 创建业务代码配置
 * @returns {RollupOptions}
 */
function createIndexConfig(): RollupOptions {
    return {
        ...baseConfig, // 继承基础配置
        input: indexInputFile, // 入口文件
        output: {
            file: indexOutputFile, // 输出文件名
            format: "iife", // 输出格式
        },
        plugins: [
            json(), // 使用JSON插件处理JSON文件
            {
                name: "websocket-update-notifier", // 自定义插件名称
                buildEnd: notifyClientsUpdate, // 打包后通知客户端更新
            },
        ],
    };
}

/**
 * 创建热重载客户端配置
 * @returns {RollupOptions}
 */
function createClientConfig(): RollupOptions {
    return {
        ...baseConfig, // 继承基础配置
        input: clientInputFile, // 入口文件
        output: {
            file: clientOutputFile, // 输出文件名
            format: "iife", // 输出格式
        },
        plugins: [
            json(), // 使用JSON插件处理JSON文件
            {
                name: "websocket-update-notifier", // 自定义插件名称
                buildEnd: notifyClientsUpdate, // 打包后通知客户端更新
            },
        ],
    };
}

/**
 * 通知客户端更新
 */
function notifyClientsUpdate() {
    // 获取WebSocket服务器实例
    const wss = startWebSocketServer();

    // 发送更新通知
    if (!wss) {
        throw new Error("WebSocket服务器未启动");
    }

    wss.clients.forEach((client) => {
        if (client.readyState === client.OPEN) {
            // 发送脚本更新消息
            client.send("update");
            console.log("脚本已更新");
        }
    });
}

/**
 * 创建UserScript配置
 * @returns {RollupOptions}
 */
function createUserScriptConfig(): RollupOptions {
    return {
        ...baseConfig, // 继承基础配置
        input: userScriptInputFile,
        output: {
            file: userScriptOutputFile, // 输出文件名
            format: "iife", // 输出格式
            banner: generateUserscriptBanner(), // 生成UserScript注释
        },
        plugins: [
            json(), // 使用JSON插件处理JSON文件
            {
                name: "userscript-installer", // 自定义插件名称
                buildEnd: () => {
                    // 首次打包时,安装UserScript
                    if (!hasInstalledUserScript) {
                        installUserScript(userScriptOutputFile);
                        hasInstalledUserScript = true;
                    }
                },
            },
        ],
    };
}

/**
 * 生成UserScript注释
 * @returns {string} - UserScript注释
 */
function generateUserscriptBanner(): string {
    // 修改UserScript名称,设置开发版标志
    userScriptHeader.name = `${userScriptHeader.name}.dev`;
    // 修改UserScript版本号为当前时间字符串
    userScriptHeader.version = new Date().toLocaleString();

    // 如果尚未添加UserScript依赖,则添加依赖
    if (!hasRequiredFiles) {
        const indexOutputUri =
            "file://" + path.resolve(process.cwd(), indexOutputFile);
        const clientOutputUri =
            "file://" + path.resolve(process.cwd(), clientOutputFile);
        userScriptHeader.require.push(...[indexOutputUri, clientOutputUri]);
        hasRequiredFiles = true;
    }

    // 生成UserScript注释
    return generateUserScriptComments(userScriptHeader);
}

// 导出开发环境配置
export default [
    createIndexConfig(),
    createClientConfig(),
    createUserScriptConfig(),
];
