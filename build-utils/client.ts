/**
 * 热重载客户端,用于动态更新脚本
 */
import toolConfig from "./tool-config.json" assert { type: "json" };

// 创建WebSocket客户端
const { host, port } = toolConfig.server;
const ws = new WebSocket(`ws://${host}:${port}`);

// 监听WebSocket打开事件
ws.onopen = () => {
    console.log("WebSocket connection opened!");
};

// 监听WebSocket消息事件
ws.onmessage = (message) => {
    console.log("received: %s", message.data);
    if (message.data === "update") {
        // 重新加载脚本的逻辑
        location.reload();
    }
};


// 监听WebSocket关闭事件
ws.onclose = () => {
    console.log("WebSocket connection closed!");
};
