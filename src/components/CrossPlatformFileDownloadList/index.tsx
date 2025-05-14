import { ReactNode, useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { AlistFile, compileDownloadFileUrl, compileFilePath, compilePath, getFileList, readAlistFile } from "@site/src/utils/alist";
import "./index.css"

interface CrossPlatformFileDownloadList {
    icon: ReactNode;
    alistPath: string;
    title: ReactNode;
    desc: ReactNode;
}

interface CrossPlatformFileDownloadManifest {
    version: string,
    downloads: Record<string, DownloadLink>
}

interface DownloadLink {
    url: string,
    hash: string
}

export function CrossPlatformFileDownloadList({ icon, alistPath, title, desc }: CrossPlatformFileDownloadList) {
    const [releases, setReleases] = useState<AlistFile[]>([]);
    const [latestRelease, setLatestRelease] = useState<AlistFile>(null);
    const [latestReleaseVersion, setLatestReleaseVersion] = useState<string>("1.0.0");
    const [buildVersion, setBuildVersion] = useState<number>(0);
    const [latestError, setLatestError] = useState<string>(null);
    const [newDownloadUrl, setNewDownloadUrl] = useState<string>("#");

    const [showModal, setShowModal] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [latestDownloads, setLatestDownloads] = useState<CrossPlatformFileDownloadManifest>();

    const handleDownloadClick = () => {
        setShowModal(true);
        setTimeout(() => setModalVisible(true), 10);
    };

    const handleClose = () => {
        setModalVisible(false);
        setTimeout(() => setShowModal(false), 300);
    };

    /**
     * 获取系统图标
     * @param platform 
     * @returns 
     */
    function getPlatformIcon(platform: string) {
        switch (platform.split("-")[0].toLowerCase()) {
            case 'win': return 'uil:windows';
            case 'linux': return 'devicon-plain:linux';
            case 'macos': return 'mdi:apple';
            default: return 'mdi:file-download';
        }
    }

    function getPlatformName(platform: string) {
        switch (platform.split("-")[0].toLowerCase()) {
            case 'win': return 'Windows';
            case 'linux': return 'Linux';
            case 'macos': return 'MacOS';
            default: return '未知系统';
        }
    }

    // 获取架构名字
    function getArch(platform: string) {
        return platform.split("-")[1].toLowerCase()
    }


    function getVersion(filename: string): string | null {
        const regex = /.*-((?:[vb]?)\d+(?:\.\d+)*)(?:-.*|\.jar)$/i;
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
                const latestPath = files.find((file) => file.name === "latest.json")
                if (!latestPath) {
                    setLatestError("无法拉取最新版本");
                    return;
                }
                const latest = await readAlistFile(await compileDownloadFileUrl(alistPath, latestPath)) as CrossPlatformFileDownloadManifest
                // 过滤arch是arm的
                latest.downloads = Object.fromEntries(
                    Object.entries(latest.downloads).filter(([platform, link]) => {
                        return !platform.includes("arm")
                    })
                )

                // 排序latest.downloads 让install在最前面
                latest.downloads = Object.fromEntries(
                    Object.entries(latest.downloads).sort(([a, b], [c, d]) => {
                        if (a.includes("install")) return -1;
                        if (c.includes("install")) return 1;
                        return 0;
                    })
                )

                setLatestDownloads(latest)
                console.log(latest.downloads)
                latest && Object.entries(latest.downloads).map(
                    ([platform, link]) => {
                        console.log(`${platform} - ${link.url}`)
                    }
                )

                const sortedList = files
                    .filter((file) => file.is_dir)
                    .sort((a, b) => b.created.getTime() - a.created.getTime());

                if (sortedList.length === 0) {
                    setLatestError("没有找到任何文件");
                    return;
                }

                setLatestRelease(sortedList[0]);
                setLatestReleaseVersion(getVersion(sortedList[0].name) ?? sortedList[0].name);
                setBuildVersion(sortedList.length);
                setReleases(sortedList);

                setNewDownloadUrl(await compileDownloadFileUrl(alistPath, sortedList[0]))
            } catch (error) {
                console.error("Error fetching latest release:", error);
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

            {/* 剩余布局保持原有结构 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                {latestRelease ? (

                    <div
                        onClick={handleDownloadClick} // 改为新的处理函数
                        style={{
                            textDecoration: "none",
                            cursor: "pointer"
                        }}>
                        <div className="w-auto select-none bg-blue-500 rounded-lg text-white text-2xl p-4 flex gap-4 items-center
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
                    </div>
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


            {showModal && (
                <div className="fixed inset-0 flex items-start justify-center z-200">
                    {/* 遮罩层 */}
                    <div
                        className={`absolute inset-0 transition-opacity duration-300
        bg-black/70 dark:bg-black/80
        ${modalVisible ? 'opacity-100' : 'opacity-0'}`}
                        onClick={handleClose}
                    />

                    {/* 亚克力容器 */}
                    <div className={`relative mt-[320px] transform transition-all ease-out
      ${modalVisible
                            ? 'opacity-100 translate-y-0 scale-100'
                            : 'opacity-0 translate-y-4 scale-95'}`}
                    >
                        {/* 亚克力背景 */}
                        <div className="absolute inset-0 rounded-xl shadow-2xl 
        backdrop-blur-3xl backdrop-saturate-150
        bg-white/10 dark:bg-black/20
        border border-white/20 dark:border-gray-700/50
        backdrop-brightness-110 dark:backdrop-brightness-90" />

                        {/* 内容容器 */}
                        <div className="relative p-6 min-w-[400px]">
                            <div className="flex justify-center mt-5 items-center">
                                <h3 className="text-xl font-bold 
            drop-shadow-md dark:drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] ">
                                    <p className="text-white">选择系统版本</p>
                                </h3>
                            </div>

                            {/* 选项示例 */}
                            <div className="flex gap-2 flex-col">
                                {
                                    latestDownloads && Object.entries(latestDownloads.downloads).map(
                                        ([platform, link]) => {
                                            return (
                                                <a href={link.url} target="_blank" style={{
                                                    textDecoration: "none"
                                                }}>
                                                    <div className="space-y-3">
                                                        <div className="
                                                    flex items-center justify-between
                                                    p-3 rounded-lg transition-colors
                                                    backdrop-blur-sm
                                                    bg-white/5 dark:bg-black/10
                                                    hover:bg-white/20 dark:hover:bg-black/20
                                                    border border-white/10 dark:border-gray-700/30
                                                    cursor-pointer">
                                                            <div className="flex flex-row gap-1 items-center text-gray-200/80 dark:text-gray-400">
                                                                <Icon icon={getPlatformIcon(platform)} />
                                                                <div className="font-medium text-gray-200 dark:text-gray-200">
                                                                    {getPlatformName(platform)}
                                                                </div>
                                                                <div className="bg-gray-500/80 dark:bg-gray-500/10 rounded-full text-green-200 px-2 py-1 text-xs">
                                                                    {getArch(platform)}
                                                                </div>
                                                                {
                                                                    platform.includes("install") ? (
                                                                        <>
                                                                            <div className="bg-gray-500/80 dark:bg-gray-500/10 rounded-full text-purple-200 px-2 py-1 text-xs">
                                                                                安装包
                                                                            </div>
                                                                            <div className="bg-gray-500/80 dark:bg-gray-500/10 rounded-full text-green-200 px-2 py-1 text-xs">
                                                                                推荐
                                                                            </div>
                                                                        </>

                                                                    ) : (
                                                                        <div className="bg-gray-500/80 dark:bg-gray-500/10 rounded-full text-green-200 px-2 py-1 text-xs">
                                                                            压缩包
                                                                        </div>
                                                                    )
                                                                }
                                                            </div>
                                                            <div className="text-xs text-gray-200/80 dark:text-gray-400 bg-gray-500/80 dark:bg-gray-500/10 rounded-full px-2 py-1">
                                                                {latestDownloads.version}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            )
                                        }
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

interface CrossPlatformDownloadCardProps {
    alistPath: string
    title: string
    detailHref: string
    className?: string
}

export function CrossPlatformDownloadCard({
    alistPath,
    title,
    detailHref,
    className
}: CrossPlatformDownloadCardProps) {
    const [latestVersion, setLatestVersion] = useState('0.0.0')
    const [downloads, setDownloads] = useState<CrossPlatformFileDownloadManifest>()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    // 获取平台图标函数（保持原有逻辑）
    const getPlatformIcon = (platform: string) => {
        switch (platform.split('-')[0].toLowerCase()) {
            case 'win': return 'uil:windows'
            case 'linux': return 'devicon-plain:linux'
            case 'macos': return 'mdi:apple'
            default: return 'mdi:file-download'
        }
    }

    // 获取平台名称（保持原有逻辑）
    const getPlatformName = (platform: string) => {
        switch (platform.split('-')[0].toLowerCase()) {
            case 'win': return 'Windows'
            case 'linux': return 'Linux'
            case 'macos': return 'MacOS'
            default: return '未知系统'
        }
    }
    function getArch(platform: string) {
        return platform.split("-")[1].toLowerCase()
    }
    useEffect(() => {
        const fetchLatest = async () => {
            try {
                const files = await getFileList(alistPath)
                const latestPath = files.find(file => file.name === 'latest.json')

                if (!latestPath) {
                    setError('未找到版本信息')
                    return
                }

                const manifest = await readAlistFile(
                    await compileDownloadFileUrl(alistPath, latestPath)
                ) as CrossPlatformFileDownloadManifest

                // 过滤和排序逻辑（保持原有逻辑）
                manifest.downloads = Object.fromEntries(
                    Object.entries(manifest.downloads)
                        .filter(([platform]) => !platform.includes('arm'))
                        .sort(([a], [b]) =>
                            a.includes('install') ? -1 : b.includes('install') ? 1 : 0
                        )
                )

                setDownloads(manifest)
                setLatestVersion(manifest.version)
            } catch (e) {
                setError('加载失败')
                console.error('加载错误:', e)
            } finally {
                setLoading(false)
            }
        }

        fetchLatest()
    }, [alistPath])

    if (loading) {
        return (
            <div className={`bg-gray-100 dark:bg-gray-800 rounded-xl p-6 animate-pulse ${className}`}>
                <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4" />
                <div className="grid grid-cols-2 gap-3">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-10 bg-gray-300 dark:bg-gray-700 rounded-lg" />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className={`bg-white dark:bg-[#141415] rounded-xl p-6 shadow-lg ${className} mb-5 mt-5`}>
            {/* 标题区 */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Icon icon="clarity:download-cloud-line" className="text-2xl text-blue-500 dark:text-blue-400" />
                    <div className="text-xl font-semibold dark:text-gray-100">
                        <div>{title}</div>
                        <span className="ml-2 text-blue-500 dark:text-blue-400">v{latestVersion}</span>
                    </div>
                </div>
                <a
                    href={detailHref}
                    className="flex items-center gap-2 hover:underline"
                >
                    <span className="text-gray-500 dark:text-white/80">版本详情</span>
                    <Icon icon="mdi:arrow-right" className="text-lg text-gray-500 dark:text-white/80" />
                </a>
            </div>

            {/* 下载按钮区 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* 主下载按钮 */}
                {downloads?.downloads && Object.entries(downloads.downloads).map(([platform, link], index) => (
                    <a
                        key={platform}
                        href={link.url}
                        style={{
                            textDecoration: 'none',
                        }}
                        className={`group flex items-center gap-3 p-4 rounded-lg transition-all
                ${index === 0
                                ? 'bg-blue-500 dark:bg-blue-600 text-white col-span-full'
                                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'}
                hover:shadow-md no-underline`}
                    >
                        <Icon
                            icon={getPlatformIcon(platform)}
                            className={`text-2xl ${index === 0
                                ? 'text-white'
                                : 'text-gray-600 dark:text-gray-300'
                                }`}
                        />
                        <div className="flex-1 text-gray-600 dark:text-gray-300">
                            <div className="font-medium text-gray-600 dark:text-gray-300 flex gap-2">
                                {index === 0 ? (
                                    <div className="text-white">
                                        {getPlatformName(platform)}{index === 0 && ' (推荐)'}

                                        {
                                            platform.includes("install") ? (
                                                " (一键安装)"
                                            ) : <></>
                                        }
                                    </div>
                                ) : (
                                    <>
                                        {getPlatformName(platform)}
                                        {
                                            platform.includes("install") ? (
                                                <div className="bg-gray-200/80 dark:bg-gray-500/10 rounded-full text-gray-900 dark:text-green-200 px-2 py-1 text-xs">
                                                    安装包
                                                </div>
                                            ) : (
                                                <div className="bg-gray-200/80 dark:bg-gray-500/10 rounded-full text-gray-900 dark:text-green-200 px-2 py-1 text-xs">
                                                    压缩包
                                                </div>
                                            )
                                        }

                                        {
                                            <div className="bg-gray-200/80 dark:bg-gray-500/10 rounded-full text-gray-900 dark:text-green-200 px-2 py-1 text-xs">
                                                {getArch(platform)}
                                            </div>
                                        }
                                    </>
                                )}


                            </div>
                            {index === 0 && (
                                <div className="text-sm opacity-90 mt-1 text-white">
                                    版本 {latestVersion}
                                </div>
                            )}
                        </div>
                        {index !== 0 && (
                            <Icon
                                icon="material-symbols:download"
                                className="text-gray-500 dark:text-gray-400 group-hover:text-blue-500"
                            />
                        )}
                    </a>
                ))}

                {/* 原始节点按钮 */}
                <a
                    href={compilePath(alistPath)}
                    target="_blank"
                    className="flex items-center justify-center gap-2 p-4 
              bg-gray-100 dark:bg-gray-800 
              rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 
              transition-colors no-underline "
                >
                    <Icon icon="ri:node-tree" className="text-xl text-gray-700 dark:text-gray-300" />
                    <span className="text-gray-700 dark:text-gray-300">所有版本</span>
                </a>
            </div>

            {/* 错误提示 */}
            {error && (
                <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 rounded-lg">
                    {error}
                </div>
            )}
        </div>
    )
}


