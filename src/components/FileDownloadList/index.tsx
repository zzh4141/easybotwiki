import { ReactNode, useEffect, useState } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import { AlistFile, compileDownloadFileUrl, compileFilePath, compilePath, getFileList } from "@site/src/utils/alist";
import Layout from "@theme/Layout";

interface FileDownloadListProps {
    icon: ReactNode;
    alistPath: string;
    title: ReactNode;
    desc: ReactNode;
    extra?: ReactNode;
}

export function FileDownloadList({ icon, alistPath, title, desc, extra }: FileDownloadListProps) {
    const [releases, setReleases] = useState<AlistFile[]>([]);
    const [latestRelease, setLatestRelease] = useState<AlistFile>(null);
    const [latestReleaseVersion, setLatestReleaseVersion] = useState<string>("1.0.0");
    const [buildVersion, setBuildVersion] = useState<number>(0);
    const [latestError, setLatestError] = useState<string>(null);
    const [newDownloadUrl, setNewDownloadUrl] = useState<string>("#");

    function getVersion(filename: string): string | null {
        const regex = /.*-((?:[vb]?)\d+(?:\.\d+)*)(?:-.*|\.jar|\..*)$/i;
        const match = filename.match(regex);
        return match ? match[1] : null;
    }

    function formatTimeAgo(date: Date): string {
        const now = Date.now();
        const diff = now - date.getTime();
        if (diff < 0) return '刚刚';

        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days >= 7) {
            return date.toLocaleString();
        } else if (days > 0) {
            return `${days}天前`;
        } else if (hours > 0) {
            return `${hours}小时前`;
        } else if (minutes > 0) {
            return `${minutes}分钟前`;
        } else {
            return '刚刚';
        }
    }

    useEffect(() => {
        async function fetchLatestRelease() {
            try {
                const files = await getFileList(alistPath);
                const sortedList = files
                    .filter((file) => !file.is_dir)
                    .filter((file) => file.name.toLocaleLowerCase() !== "readme.md")
                    .sort((a, b) => b.created.getTime() - a.created.getTime());

                if (sortedList.length === 0) {
                    setLatestError("没有找到任何文件");
                    return;
                }

                setLatestRelease(sortedList[0]);
                setLatestReleaseVersion(getVersion(sortedList[0].name) ?? "error");
                setBuildVersion(sortedList.length);
                setReleases(sortedList);

                setNewDownloadUrl(await compileDownloadFileUrl(alistPath, sortedList[0]))
            } catch (error) {
                setLatestError("获取文件列表失败");
            }
        }
        fetchLatestRelease();
    }, [alistPath]);

    return (
        <div className="max-w-[1200px] mx-auto items-start justify-center flex flex-col h-full gap-3 p-4 mt-20 mb-20">
            <div className="flex items-center gap-2">
                {icon}
                <div className="text-2xl">下载</div>
            </div>

            <div className="flex flex-rol gap-1 text-4xl md:text-5xl mt-5">
                下载 {title} <div className="ml-2 text-blue-400">{latestReleaseVersion}</div>
            </div>
            <div className="text-2xl">
                {desc}
            </div>

            {extra}

            {/* 剩余布局保持原有结构 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                {latestRelease ? (
                    <a href={newDownloadUrl} style={{
                        textDecoration: "none"
                    }}>
                        <div className="w-auto select-none bg-blue-500 rounded-lg text-white text-2xl p-4 flex gap-4 items-center cursor-pointer
              hover:bg-blue-600 hover:scale-[101%] active:scale-95 transition-all duration-100 ease-in-out">
                            <Icon icon="eva:attach-2-fill" className="text-4xl" />
                            <div>
                                <div>
                                    {title} {latestReleaseVersion}
                                </div>
                                <div className="text-sm flex items-center">
                                    第 <div className="ml-1 mr-1 font-bold flex items-center">#{buildVersion}</div> 个版本
                                </div>
                            </div>
                            <div className="bg-white/50 h-12 rounded-full w-[1px]" />
                            <div>
                                <Icon icon="material-symbols:download" />
                            </div>
                        </div>
                    </a>
                ) : (
                    <div className="w-auto select-none bg-blue-500 rounded-lg text-white text-2xl p-4 flex gap-4 items-center cursor-pointer
              hover:bg-blue-600 hover:scale-[101%] active:scale-95 transition-all duration-100 ease-in-out">
                        {latestError || "加载中..."}
                    </div>
                )}


                <a href={compilePath(alistPath)} target="_blank" className="select-none block" style={{
                    textDecoration: "none"
                }}>
                    <div className="w-[288px] select-none bg-blue-400 rounded-lg text-white text-2xl p-4 flex gap-4 items-center cursor-pointer
        hover:bg-blue-500 hover:scale-[101%] active:scale-95 transition-all duration-100 ease-in-out">
                        <Icon icon="clarity:storage-solid" className="text-3xl ml-2" />
                        <div>
                            <div>
                                原始节点
                            </div>
                            <div className="text-sm">
                                您可以下载较旧的版本
                            </div>
                        </div>
                        <div className="bg-white/50 h-12 rounded-full w-[1px]" />
                        <div>
                            <Icon icon="hugeicons:link-square-01" />
                        </div>
                    </div>
                </a>
            </div>

            <div className="text-center w-full text-2xl mt-10">
                历史版本
            </div>
            <div className="w-full flex flex-col gap-2">
                {
                    releases.map((release, index) => (
                        <div key={index} className="flex justify-between w-full items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-auto select-none bg-blue-500 text-white flex items-center p-1 pl-2 pr-4 rounded-full">
                                    <Icon icon="tabler:hash" className="text-xl" /> {releases.length - index}
                                </div>
                                {release.name}
                                <a href={compileFilePath(alistPath, release)} target="_blank">
                                    <Icon className="select-none text-xl hover:scale-[120%] cursor-pointer active:scale-95 transition-all duration-100 ease-in-out" icon="material-symbols:download" />
                                </a>
                            </div>
                            <div className="select-none hidden md:block">
                                {formatTimeAgo(release.created)}
                            </div>
                        </div>

                    ))
                }
            </div>
        </div>
    );
}

interface FileDownloadCardProps {
    alistPath: string;
    title: string;
    detailHref: string;
    className?: string;
}

export function FileDownloadCard({ alistPath, title, detailHref, className }: FileDownloadCardProps) {
    const [latestRelease, setLatestRelease] = useState<AlistFile>(null);
    const [downloadUrl, setDownloadUrl] = useState("");
    const [latestVersion, setLatestVersion] = useState("0.0.0");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 获取文件列表
                const files = await getFileList(alistPath);
                const sorted = files
                    .filter(f => !f.is_dir)
                    .sort((a, b) => b.created.getTime() - a.created.getTime());

                if (sorted.length === 0) {
                    setError("未找到发布文件");
                    return;
                }

                const latest = sorted[0];

                // 同步获取下载URL
                const url = await compileDownloadFileUrl(alistPath, latest);

                // 统一更新状态
                setLatestRelease(latest);
                setDownloadUrl(url);

                // 解析版本号
                const versionMatch = latest.name.match(/(\d+\.\d+\.\d+)/);
                setLatestVersion(versionMatch?.[1] || "0.0.0");
            } catch (e) {
                setError("加载失败");
                console.error("文件加载错误:", e);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [alistPath]);

    return (
        <div className={`rounded-xl transition-shadow ${className} mt-5 mb-5`}>
            <div className="flex items-center gap-3">
                <h2 className="text-2xl font-semibold dark:text-gray-100">
                    {title}
                    <span className="ml-2 text-blue-500 dark:text-blue-400">v{latestVersion}</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {latestRelease && (
                    <a
                        href={downloadUrl}
                        className="flex items-center justify-center gap-2 p-3 
                            bg-blue-500 dark:bg-blue-600 text-white 
                            rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 
                            transition-colors no-underline
                            shadow-md hover:shadow-lg"
                    >
                        <Icon icon="material-symbols:download" className="text-xl text-white " />
                        <span className="font-medium text-white ">立即下载</span>
                    </a>
                )}

                <a
                    href={compilePath(alistPath)}
                    target="_blank"
                    className="flex items-center justify-center gap-2 p-3 
                        bg-gray-100 dark:bg-gray-800
                        rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 
                        transition-colors no-underline
                        shadow-sm hover:shadow-md"
                >
                    <Icon icon="ri:node-tree" className="text-xl text-gray-700 dark:text-gray-200" />
                    <span className="font-medium text-gray-700 dark:text-gray-200">原始节点</span>
                </a>


                <a
                    href={detailHref}
                    className="flex items-center justify-center gap-2 p-3 
                        bg-purple-400 dark:bg-purple-500 text-white 
                        rounded-lg hover:bg-purple-500 dark:hover:bg-purple-600 
                        transition-colors no-underline
                        shadow-md hover:shadow-lg"
                >
                    <Icon icon="mdi:file-document-outline" className="text-xl text-white " />
                    <span className="font-medium text-white ">版本详情</span>
                </a>
            </div>
        </div>
    );
}


