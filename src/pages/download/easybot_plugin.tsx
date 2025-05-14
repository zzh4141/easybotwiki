import { FileDownloadList } from "@site/src/components/FileDownloadList";
import Layout from "@theme/Layout";
import { useState } from "react";

export default function DownloadPage() {
    const [currentState, setState] = useState<"bukkit" | "be" | "mcdr">("bukkit");

    return (
        <Layout
            title={`下载 | EasyBot插件`}
            description="用于对接EasyBot主程序的机器人插件">
            <div className="container mx-auto px-4">
                <div className="mt-10">
                    <div className="flex justify-center relative">
                        <div className="flex gap-8 border-b border-gray-200 dark:border-gray-700">
                            {/* Java版按钮 */}
                            <button
                                onClick={() => setState("bukkit")}
                                className={`relative pb-4 px-2 text-lg font-medium transition-colors duration-300 select-none ${currentState === "bukkit"
                                    ? "text-blue-500 dark:text-blue-400"
                                    : "text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-200"
                                    }`}
                            >
                                JAVA版
                                {/* 下划线指示器 */}
                                {currentState === "bukkit" && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 dark:bg-blue-400 transition-all duration-300" />
                                )}
                            </button>

                            {/* 基岩版按钮 */}
                            <button
                                onClick={() => setState("be")}
                                className={`relative pb-4 px-2 text-lg font-medium transition-colors duration-300 select-none ${currentState === "be"
                                    ? "text-blue-500 dark:text-blue-400"
                                    : "text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-200"
                                    }`}
                            >
                                基岩版
                                {/* 下划线指示器 */}
                                {currentState === "be" && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 dark:bg-blue-400 transition-all duration-300" />
                                )}
                            </button>

                            {/* MCDR按钮 */}
                            <button
                                onClick={() => setState("mcdr")}
                                className={`relative pb-4 px-2 text-lg font-medium transition-colors duration-300 select-none ${currentState === "mcdr"
                                    ? "text-blue-500 dark:text-blue-400"
                                    : "text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-200"
                                    }`}
                            >
                                MCDR
                                {/* 下划线指示器 */}
                                {currentState === "mcdr" && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 dark:bg-blue-400 transition-all duration-300" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* 内容区域 */}
                <div className="mt-8 transition-opacity duration-300 ease-in-out">
                    {currentState === "bukkit" ? (
                        <FileDownloadList
                            icon={<img src="/icon/easybot.png" className="w-20 h-20" />}
                            alistPath="/easybot_bukkit"
                            title={<>EasyBot Bukkit</>}
                            desc="用于对接EasyBot主程序的机器人插件"
                        />
                    ) : currentState === "be" ? (
                        (
                            <FileDownloadList
                                icon={<img src="/icon/easybot.png" className="w-20 h-20" />}
                                alistPath="/easybot_be"
                                title={<>EasyBot 基岩版</>}
                                desc="用于对接EasyBot主程序的机器人插件"
                            />
                        )
                    ) : (
                        (
                            <FileDownloadList
                                icon={<img src="/icon/easybot.png" className="w-20 h-20" />}
                                alistPath="/easybot_mcdr"
                                title={<>EasyBot MCDR</>}
                                desc="通的EasyBot MCDR插件!"
                            />
                        )
                    )}
                </div>
            </div>
        </Layout>
    );
}
