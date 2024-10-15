import open from "open";
import { startHttpServer } from "./server";
import toolConfig from "./tool-config.json" assert { type: "json" };


/**
 * 生成UserScript元数据注释模块
 *
 * 提供了一系列用于自动生成UserScript元数据注释的方法，
 * 包括生成 [@require] 注释以引用第三方CDN库、
 * 生成 [@icon] 注释以获取favicon图标链接以及
 * 生成整个UserScript的注释部分
 */


/**
 * 根据依赖项生成 [@require] 注释, 转换为第三方cdn库链接
 * @param {string[]} requires 依赖项列表
 * @returns 生成的 [@require] 注释字符串
 */
export function generateCdnRequires(requires: string[]) {
    return requires.map((requirement) => {
        const [pkg, version] = requirement.split("@");
        const url = `https://cdn.jsdelivr.net/npm/${pkg}${
            version ? `@${version}` : ""
        }`;
        return url;
    });
}

/**
 * 根据域名生成 [@icon] 注释,转换为favicon链接
 * @param {string} domain 域名
 * @returns 生成的 [@icon] 注释字符串
 */
export function generateIcon(domain: string) {
    return `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
}

/**
 * 生成UserScript的注释部分
 * @param {UserScriptHeader} userScript - 用户脚本对象
 * @returns {string} - 返回生成的用户脚本注释字符串
 */
export function generateUserScriptComments(userScript: UserScriptHeader) {
    // 检查用户脚本对象是否初始化
    if (!userScript) {
        throw new Error("UserScript 未初始化");
    }

    // 生成注释
    let comments = "";
    // 根据最长的键长度对齐输出
    const keyLength =
        Math.max(...Object.keys(userScript).map((key) => key.length)) + 10;

    // 添加注释头
    comments += "// ==UserScript==\n";

    // 添加注释内容

    for (const [key, value] of Object.entries(userScript)) {
        // 处理非空数组
        if (Array.isArray(value) && value.length > 0) {
            // 遍历数组中的每个项
            value.forEach((item) => {
                // 如果项是字符串且非空，将其添加到注释中
                if (typeof item === "string" && item.trim() !== "") {
                    comments += `// @${key.padEnd(keyLength)} ${item}\n`;
                }
            });
        }
        // 如果value是非空字符串，直接添加到注释中
        else if (typeof value === "string" && value.trim() !== "") {
            comments += `// @${key.padEnd(keyLength)} ${value}\n`;
        }
        // 如果value是布尔值且为true，添加一个无内容的注释条目
        else if (typeof value === "boolean" && value === true) {
            comments += `// @${key.padEnd(keyLength)}\n`;
        }
    }

    // 添加注释尾
    comments += "// ==/UserScript==\n";

    // 返回注释
    return comments;
}

/**
 * 安装用户脚本
 * @param {string} file 用户脚本文件名
 */
export function installUserScript(file: string) {
    // 启动 HTTP 服务器
    startHttpServer();

    // 构建 URL
    const { host, port } = toolConfig.server;
    const url = `http://${host}:${port}/${file}`;

    // 在浏览器中打开 URL
    open(url);
    console.log(`正在打开浏览器安装: ${url}`);
}
