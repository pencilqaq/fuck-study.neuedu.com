/**
 * Rollup 基础配置模块
 * 
 * 本模块定义了Rollup打包工具的基础配置，包括必要的插件加载。
 */

// 引入Rollup插件：typescript、resolve、commonjs和json
import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { RollupOptions } from "rollup";

// 定义Rollup的基础配置
/**
 * @type {RollupOptions} rollup配置
 */
const baseConfig: RollupOptions = {
    // 配置插件
    plugins: [typescript(), resolve(), commonjs(), json()],
};

// 导出基础配置
export default baseConfig;
