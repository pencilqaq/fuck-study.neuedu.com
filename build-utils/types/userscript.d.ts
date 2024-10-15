// tampermonkey.d.ts

declare global {
    /**
     * 定义一个 UserScript 对象，用于描述用户脚本的元数据。
     */
    interface UserScriptHeader {
        /** 用户脚本名称 */
        name: string;
        /** 用户脚本命名空间 */
        namespace: string;
        /** 版权声明 */
        copyright: string;
        /** 用户脚本版本号 */
        version: string;
        /** 用户脚本描述 */
        description: string;
        /** 用户脚本图标 */
        icon: string;
        /** 用户脚本高分辨率图标 */
        icon64: string;
        /** 授予脚本的权限 */
        grant: string[];
        /** 用户脚本作者 */
        author: string;
        /** 用户脚本许可类型 */
        license: string;
        /** 用户脚本主页 */
        homepage: string;
        /** 揭示脚本是否包含广告、追踪等特性 */
        antifeature: string[];
        /** 用户脚本的应用范围 */
        include: string[];
        /** 用户脚本的匹配规则 */
        match: string[];
        /** 用户脚本的排除规则 */
        exclude: string[];
        /** 用户脚本的运行时机 */
        "run-at": string;
        /** 指定沙箱环境 */
        sandbox: "js" | "raw" | "dom" | "";
        /** 用户脚本依赖的外部资源 */
        require: string[];
        /** 预加载的资源 */
        resource: string[];
        /** 允许脚本连接的域名 */
        connect: string[];
        /** 禁止在 iframe 中运行脚本 */
        noframes: boolean;
        /** 更新检查的 URL */
        updateURL: string;
        /** 下载更新的 URL */
        downloadURL: string;
        /** 支持和反馈的 URL */
        supportURL: string;
        /** 使用 webRequest 规则 */
        webRequest: string;
        /** 是否解除包装直接注入脚本 */
        unwrap: boolean;
    }

    /**
     * 提供对页面 window 对象的访问，而不是 Tampermonkey 扩展的 window 对象
     */
    const unsafeWindow: Window & typeof globalThis;

    /**
     * 向页面添加新的 HTML 元素
     * @param tag_name 要创建的 HTML 元素标签名
     * @param attributes 元素的属性
     * @returns 创建的 HTML 元素
     */
    function GM_addElement(
        tag_name: string,
        attributes: Record<string, any>
    ): HTMLElement;
    function GM_addElement(
        parent_node: Node,
        tag_name: string,
        attributes: Record<string, any>
    ): HTMLElement;

    /**
     * 向页面添加新的样式
     * @param css CSS 样式字符串
     * @returns 注入的 style 元素
     */
    function GM_addStyle(css: string): HTMLStyleElement;

    interface DownloadDetails {
        url: string;
        name: string;
        headers?: Record<string, string>;
        saveAs?: boolean;
        conflictAction?: "uniquify" | "overwrite" | "prompt";
        onload?: () => void;
        onerror?: (download: { error: string; details: string }) => void;
        onprogress?: (progress: ProgressEvent) => void;
        ontimeout?: () => void;
    }

    interface DownloadResult {
        abort: () => void;
    }

    /**
     * 下载文件
     * @param details 下载详情
     * @returns 下载结果对象，包含中止下载的方法
     */
    function GM_download(details: DownloadDetails): DownloadResult;
    function GM_download(url: string, name: string): DownloadResult;

    /**
     * 获取资源文本内容
     * @param name 资源名称
     * @returns 资源文本内容
     */
    function GM_getResourceText(name: string): string;

    /**
     * 获取资源 URL
     * @param name 资源名称
     * @returns 资源 URL
     */
    function GM_getResourceURL(name: string): string;

    /**
     * 获取脚本和 Tampermonkey 的相关信息
     */
    const GM_info: {
        downloadMode: string;
        isFirstPartyIsolation?: boolean;
        isIncognito: boolean;
        sandboxMode: "js" | "raw" | "dom";
        scriptHandler: string;
        scriptMetaStr: string | null;
        scriptUpdateURL: string | null;
        scriptWillUpdate: boolean;
        version?: string;
        script: {
            antifeatures: {
                [antifeature: string]: { [locale: string]: string };
            };
            author: string | null;
            blockers: string[];
            connects: string[];
            copyright: string | null;
            deleted?: number;
            description_i18n: { [locale: string]: string } | null;
            description: string;
            downloadURL: string | null;
            excludes: string[];
            fileURL: string | null;
            grant: string[];
            header: string | null;
            homepage: string | null;
            icon: string | null;
            icon64: string | null;
            includes: string[];
            lastModified: number;
            matches: string[];
            name_i18n: { [locale: string]: string } | null;
            name: string;
            namespace: string | null;
            position: number;
            resources: {
                name: string;
                url: string;
                error?: string;
                content?: string;
                meta?: string;
            }[];
            supportURL: string | null;
            system?: boolean;
            "run-at": string | null;
            unwrap: boolean | null;
            updateURL: string | null;
            version: string;
            webRequest:
                | {
                      selector:
                          | {
                                include?: string | string[];
                                match?: string | string[];
                                exclude?: string | string[];
                            }
                          | string;
                      action:
                          | string
                          | {
                                cancel?: boolean;
                                redirect?:
                                    | {
                                          url: string;
                                          from?: string;
                                          to?: string;
                                      }
                                    | string;
                            };
                  }[]
                | null;
            options: {
                check_for_updates: boolean;
                comment: string | null;
                compatopts_for_requires: boolean;
                compat_wrappedjsobject: boolean;
                compat_metadata: boolean;
                compat_foreach: boolean;
                compat_powerful_this: boolean | null;
                sandbox: string | null;
                noframes: boolean | null;
                unwrap: boolean | null;
                run_at: string | null;
                tab_types: string | null;
                override: {
                    use_includes: string[];
                    orig_includes: string[];
                    merge_includes: boolean;
                    use_matches: string[];
                    orig_matches: string[];
                    merge_matches: boolean;
                    use_excludes: string[];
                    orig_excludes: string[];
                    merge_excludes: boolean;
                    use_connects: string[];
                    orig_connects: string[];
                    merge_connects: boolean;
                    use_blockers: string[];
                    orig_run_at: string | null;
                    orig_noframes: boolean | null;
                };
            };
        };
    };

    /**
     * 向控制台输出日志
     * @param message 日志消息
     */
    function GM_log(message: string): void;

    interface NotificationDetails {
        text?: string;
        title?: string;
        image?: string;
        highlight?: boolean;
        silent?: boolean;
        timeout?: number;
        onclick?: (event: MouseEvent) => void;
        ondone?: () => void;
    }

    /**
     * 显示桌面通知
     * @param details 通知详情
     * @param ondone 通知关闭后的回调函数
     */
    function GM_notification(
        details: NotificationDetails,
        ondone?: () => void
    ): void;
    function GM_notification(
        text: string,
        title: string,
        image: string,
        onclick: () => void
    ): void;

    interface OpenInTabOptions {
        active?: boolean;
        insert?: boolean;
        setParent?: boolean;
        incognito?: boolean;
        loadInBackground?: boolean;
    }

    interface TabObject {
        close: () => void;
        onclose: () => void;
        closed: boolean;
    }

    /**
     * 在新标签页中打开 URL
     * @param url 要打开的 URL
     * @param options 打开选项
     * @returns 标签页对象
     */
    function GM_openInTab(url: string, options?: OpenInTabOptions): TabObject;
    function GM_openInTab(url: string, loadInBackground: boolean): TabObject;

    interface MenuCommandOptions {
        accessKey?: string;
        autoClose?: boolean;
        title?: string;
    }

    /**
     * 注册用户脚本命令
     * @param name 命令名称
     * @param callback 点击命令时的回调函数
     * @param options 命令选项
     * @returns 命令 ID
     */
    function GM_registerMenuCommand(
        name: string,
        callback: (event: MouseEvent | KeyboardEvent) => void,
        options?: MenuCommandOptions
    ): number;

    /**
     * 注销用户脚本命令
     * @param menuCmdId 要注销的命令 ID
     */
    function GM_unregisterMenuCommand(menuCmdId: number): void;

    type ClipboardInfoType = "text" | "html";

    interface ClipboardInfo {
        type: ClipboardInfoType;
        mimetype: string;
    }

    /**
     * 设置剪贴板内容
     * @param data 要设置的数据
     * @param info 数据类型信息
     * @param cb 操作完成后的回调函数
     */
    function GM_setClipboard(
        data: string,
        info: ClipboardInfoType | ClipboardInfo,
        cb?: () => void
    ): void;

    /**
     * 获取当前标签页的持久数据
     * @param callback 获取数据后的回调函数
     */
    function GM_getTab(callback: (tab: object) => void): void;

    /**
     * 保存当前标签页的持久数据
     * @param tab 要保存的数据
     * @param cb 保存完成后的回调函数
     */
    function GM_saveTab(tab: object, cb?: () => void): void;

    /**
     * 获取所有标签页的持久数据
     * @param callback 获取数据后的回调函数
     */
    function GM_getTabs(
        callback: (tabs: { [tabId: string]: object }) => void
    ): void;

    /**
     * 存储数据
     * @param key 键名
     * @param value 要存储的值
     */
    function GM_setValue(key: string, value: any): void;

    /**
     * 获取存储的数据
     * @param key 键名
     * @param defaultValue 默认值
     * @returns 存储的值或默认值
     */
    function GM_getValue(key: string, defaultValue?: any): any;

    /**
     * 删除存储的数据
     * @param key 要删除的键名
     */
    function GM_deleteValue(key: string): void;

    /**
     * 列出所有存储的键名
     * @returns 键名列表
     */
    function GM_listValues(): string[];

    /**
     * 批量存储数据
     * @param values 要存储的键值对
     */
    function GM_setValues(values: Record<string, any>): void;

    /**
     * 批量获取存储的数据
     * @param keysOrDefaults 键名列表或默认值对象
     * @returns 存储的值或默认值
     */
    function GM_getValues(
        keysOrDefaults: string[] | Record<string, any>
    ): Record<string, any>;

    /**
     * 批量删除存储的数据
     * @param keys 要删除的键名列表
     */
    function GM_deleteValues(keys: string[]): void;

    type ValueChangeListener = (
        key: string,
        oldValue: any,
        newValue: any,
        remote: boolean
    ) => void;

    /**
     * 添加值变化监听器
     * @param key 要监听的键名
     * @param listener 值变化时的回调函数
     * @returns 监听器 ID
     */
    function GM_addValueChangeListener(
        key: string,
        listener: ValueChangeListener
    ): number;

    /**
     * 移除值变化监听器
     * @param listenerId 要移除的监听器 ID
     */
    function GM_removeValueChangeListener(listenerId: number): void;

    interface XHRDetails {
        method?: "GET" | "HEAD" | "POST";
        url: string;
        headers?: Record<string, string>;
        data?: string | Blob | FormData;
        responseType?: "arraybuffer" | "blob" | "json" | "stream";
        onabort?: () => void;
        onerror?: (response: XHRResponse) => void;
        onload?: (response: XHRResponse) => void;
        onprogress?: (response: XHRResponse) => void;
        onreadystatechange?: (response: XHRResponse) => void;
        ontimeout?: (response: XHRResponse) => void;
    }

    interface XHRResponse {
        finalUrl: string;
        readyState: number;
        status: number;
        statusText: string;
        responseHeaders: string;
        response: any;
        responseXML: Document | null;
        responseText: string;
    }

    interface XHRResult {
        abort: () => void;
    }

    /**
     * 发送 XMLHttpRequest 请求
     * @param details 请求详情
     * @returns 请求结果对象，包含中止请求的方法
     */
    function GM_xmlhttpRequest(details: XHRDetails): XHRResult;

    interface WebRequestRule {
        selector:
            | string
            | {
                  include?: string | string[];
                  match?: string | string[];
                  exclude?: string | string[];
              };
        action:
            | string
            | {
                  cancel?: boolean;
                  redirect?:
                      | { url: string; from?: string; to?: string }
                      | string;
              };
    }

    type WebRequestListener = (
        info: string,
        message: string,
        details: {
            rule: WebRequestRule;
            url: string;
            redirect_url?: string;
            description?: string;
        }
    ) => void;

    /**
     * 注册 Web 请求规则和监听器
     * @param rules Web 请求规则数组
     * @param listener 规则触发时的回调函数
     */
    function GM_webRequest(
        rules: WebRequestRule[],
        listener: WebRequestListener
    ): void;

    namespace GM_cookie {
        interface CookieDetails {
            url?: string;
            domain?: string;
            name?: string;
            path?: string;
            partitionKey?: object;
            topLevelSite?: string;
        }

        interface Cookie {
            domain: string;
            hostOnly: boolean;
            httpOnly: boolean;
            name: string;
            path: string;
            sameSite: string;
            secure: boolean;
            session: boolean;
            value: string;
            firstPartyDomain?: string;
            partitionKey?: object;
            topLevelSite?: string;
        }

        /**
         * 列出符合条件的 cookie
         * @param details cookie 查询条件
         * @param callback 获取 cookie 后的回调函数
         */
        function list(
            details: CookieDetails,
            callback?: (cookies: Cookie[], error?: string) => void
        ): void;

        interface SetCookieDetails extends CookieDetails {
            value: string;
            secure?: boolean;
            httpOnly?: boolean;
            expirationDate?: number;
        }

        /**
         * 设置 cookie
         * @param details 要设置的 cookie 详情
         * @param callback 设置完成后的回调函数
         */
        function set(
            details: SetCookieDetails,
            callback?: (error?: string) => void
        ): void;

        //   /**
        //    * 删除 cookie
        //    * @param details 要删除的 cookie 详情
        //    * @param callback 删除完成后的回调函数
        //    */
        //   function delete (details: CookieDetails, callback?: (error?: string) => void): void;
    }

    interface Window {
        /**
         * URL 变化事件处理器
         */
        onurlchange: ((this: Window, ev: Event) => any) | null;

        /**
         * 关闭当前窗口或标签页
         * 注意：出于安全原因，不允许关闭窗口的最后一个标签页
         */
        close(): void;

        /**
         * 将窗口带到前台
         */
        focus(): void;
    }

    // 可选：如果需要在全局范围内使用这些方法，可以添加以下声明
    declare function close(): void;
    declare function focus(): void;
}

export {};
