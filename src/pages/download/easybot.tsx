import { CrossPlatformFileDownloadList } from "@site/src/components/CrossPlatformFileDownloadList";
import Layout from "@theme/Layout";

export default function DownloadPage() {
  return (
    <Layout
      title={`下载 | EasyBot主程序`}
      description="在此处可以下载最新版EasyBot主程序">
      <div className="p-8">
        <CrossPlatformFileDownloadList
          icon={<img src="/icon/easybot.png" className="w-20 h-20" />}
          alistPath="/easybot"
          title={<>
            EasyBot主程序
          </>}
          desc="一款集消息同步、自定义命令、绑定管理、高级权限控制、群组互动、自定义模板支持以及自定义插件支持等全方位功能于一体的服务器管理工具，全方位优化游戏社区体验!"
        />
      </div>
    </Layout>
  );
}