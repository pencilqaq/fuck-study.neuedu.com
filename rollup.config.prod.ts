/**
 * 此模块定义了Rollup构建工具在生产环境下的配置。
 * 它扩展了基础配置并设置了特定于生产环境的选项，
 * 如入口文件、输出文件格式、以及用户脚本的生成与安装。
 */

// 导入JSON插件
import json from "@rollup/plugin-json";
// 导入基础构建配置
import baseConfig from "./rollup.config.base.js";
// 导入用户脚本头部信息
import userScriptHeader from "./userscript-header.js";
// 导入用于生成用户脚本注释和安装用户脚本的工具函数
import {
    generateUserScriptComments,
    installUserScript,
} from "./build-utils/userscript-generator.js";
// 导入Rollup配置类型
import { RollupOptions } from "rollup";

// 入口文件路径
const inputFile = "src/index.ts";
// 输出文件路径
const outputFile = "dist/prod.bundle.user.js";

/**
 * @type {RollupOptions} - Rollup构建配置对象
 */
const prodConfig: RollupOptions = {
    ...baseConfig, // 继承基础配置
    input: inputFile, // 设置入口文件
    output: {
        file: outputFile, // 设置输出文件
        format: "iife", // 使用立即执行函数表达式
        // 添加用户脚本头部注释
        banner: () => {
            // 修改UserScript版本号为当前时间字符串
            userScriptHeader.version = new Date().toLocaleString();
            return generateUserScriptComments(userScriptHeader);
        }, 
        exports: "named", // 暴露命名导出
    },
    plugins: [
        json(), // 使用JSON插件处理JSON文件
        {
            name: "userscript-installer", // 自定义插件名称
            buildEnd: () => {
                // 构建结束后安装用户脚本
                installUserScript(outputFile);
            },
        },
    ],
};

// 导出生产环境配置
export default prodConfig;
