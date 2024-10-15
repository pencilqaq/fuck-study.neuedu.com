import express from "express";
import http from "http";
import serveStatic from "serve-static";
import { WebSocketServer } from "ws";
import toolConfig from "./tool-config.json" assert { type: "json" };

class ServerManager {
    #httpServer: http.Server | null;
    #wss: WebSocketServer | null;

    constructor() {
        this.#httpServer = null;
        this.#wss = null;
    }

    /**
     * 创建HTTP服务器
     * @returns {http.Server} HTTP服务器实例
     */
    setupHttpServer(): http.Server {
        if (!this.#httpServer) {
            const app = express();
            app.use("/", serveStatic(process.cwd()));
            const { host, port } = toolConfig.server;
            this.#httpServer = http.createServer(app);
            this.#httpServer.listen(port, host, () => {
                console.log(`HTTP 服务器已在 http://${host}:${port} 上运行`);
            });
        }
        return this.#httpServer;
    }

    /**
     * 创建WebSocket服务器
     * @returns {WebSocketServer} WebSocket服务器实例
     */
    setupWebSocketServer(): WebSocketServer {
        if (!this.#wss) {
            // 启动HTTP服务器,然后启动WebSocket服务器
            this.setupHttpServer();
            if (this.#httpServer) {
                this.#wss = new WebSocketServer({ server: this.#httpServer });
            } else {
                throw new Error("HTTP服务器未初始化");
            }

            // 监听WebSocket连接事件
            this.#wss.on("connection", (ws) => {
                console.log("WebSocket 连接已建立。");
                ws.on("message", (message) => {
                    console.log("收到: %s", message);
                });
            });
            const { host, port } = toolConfig.server;
            console.log(`WebSocket 服务器已在 ws://${host}:${port} 上运行`);
        }
        return this.#wss;
    }
}

// 创建ServerManager的单例实例
const serverManager = new ServerManager();

/**
 * 启动HTTP服务器实例
 * @returns {http.Server} HTTP服务器实例
 */
export function startHttpServer(): http.Server {
    return serverManager.setupHttpServer();
}

/**
 * 启动WebSocket服务器实例
 * @returns {WebSocketServer} WebSocket服务器实例
 */
export function startWebSocketServer(): WebSocketServer {
    return serverManager.setupWebSocketServer();
}
