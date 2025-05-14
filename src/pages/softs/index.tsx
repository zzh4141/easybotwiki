import Layout from "@theme/Layout";
import { Title } from "..";
import { ReactNode } from "react";

interface FeatureProps {
    name: string,
    description: string
    icon: ReactNode
    link: string
}
function Feature({ name, description, icon, link }: FeatureProps) {
    return (
        <a href={link} style={{ textDecoration: "none" }}>
            <div className="text-black/90 dark:text-white">
                <div className="rounded-lg p-6 hover:bg-gray-300/30 dark:hover:bg-black/20 cursor-pointer gap-2 transition-colors" style={{
                    transitionProperty: "background-color",
                }}>
                    <div className="flex gap-4 flex-col">
                        <div className="flex items-center gap-2">
                            {icon}
                            <div className="text-2xl">{name}</div>
                        </div>
                        <div>
                            <div>{description}</div>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    )
}

const FeatureList: FeatureProps[] = [
    {
        name: "EasyBot",
        description: "这是一款集消息同步、自定义命令、绑定管理、高级权限控制、群组互动、自定义模板支持以及自定义插件支持等全方位功能于一体的服务器管理工具，全方位优化游戏社区体验!",
        icon: <img draggable="false" className="w-16 h-16 select-none" src="/icon/easybot.png"></img>,
        link: "/docs/easybot/intor"
    },
    {
        name: "EZOfflinePAPI",
        description: "本插件专为解决 PAPI 变量离线查询痛点设计的轻量化解决方案，通过数据库缓存机制实现变量数据全时域调用，完美突破传统变量插件的在线依赖限制。",
        icon: <img draggable="false" className="w-16 h-16 select-none" src="/icon/offlinepapi.png"></img>,
        link: "/docs/ezofflinepapi/intro"
    }
]

export default function Softs() {
    return (
        <Layout
            title={`应用目录`}
            description="应用目录">
            <div className="p-10 max-w-[1200px] mx-auto flex items-center flex-col">
                <Title colorChange></Title>
                <div className="my-10 h-[2px] bg-gray-500/20 w-full"></div>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    {FeatureList.map(item => (
                        <Feature {...item} />
                    ))}
                </div>
            </div>
        </Layout>
    );
}