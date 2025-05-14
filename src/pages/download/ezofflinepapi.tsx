import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import { FileDownloadList } from "@site/src/components/FileDownloadList";
import { AlistFile, getFileList } from "@site/src/utils/alist";
import Layout from "@theme/Layout";
import { useEffect, useState } from "react";

export default function DownloadPage() {
  const { siteConfig } = useDocusaurusContext();
  const [releases, setReleases] = useState<AlistFile[]>([]);
  const [latstRelease, setLatstRelease] = useState<AlistFile>(null);
  const [latstReleaseVersion, setLatstReleaseVersion] = useState<string>("1.0.0");
  const [buildVersion, setBuildVersion] = useState<number>(0);
  const [latstError, setLatstError] = useState<string>(null);
  function getVersion(filename: string): string | null {
    // 正则表达式说明：
    // - 从字符串末尾向前匹配
    // - 捕获以v/b开头或直接数字开头的版本号
    // - 支持x.x或x.x.x格式
    // - 忽略后续的-fix/-hotfix等后缀
    const regex = /.*-((?:[vb]?)\d+(?:\.\d+)*)(?:-.*|\.jar)$/i;
    const match = filename.match(regex);
    return match ? match[1] : null;
  }

  function formatTimeAgo(date: Date): string {
    const now = Date.now();
    const diff = now - date.getTime();

    // 处理未来时间或无效差值
    if (diff < 0) return '刚刚';

    // 时间单位换算
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    // 按时间层级判断返回结果
    if (days >= 7) {
      return date.toLocaleString(); // 返回本地化日期格式
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
      const fills = await getFileList("/EZOfflinePApi");
      console.log(fills);
      const sortedList = fills.filter((file) => !file.is_dir).sort((a, b) => b.created.getTime() - a.created.getTime());
      if (sortedList.length === 0) {
        setLatstError("没有找到任何文件");
        return;
      }
      setLatstRelease(sortedList[0]);
      setLatstReleaseVersion(getVersion(sortedList[0].name) ?? "error");
      setBuildVersion(sortedList.length);
      setReleases(sortedList);
    }
    fetchLatestRelease();
  }, []);

  return (
    <Layout
      title={`下载 | 离线变量`}
      description="在此处可以下载最新版离线变量">
      <FileDownloadList
        icon={<img src="/icon/offlinepapi.png" className="w-20 h-20" />}
        alistPath="/ezofflinepapi"
        title={<>
          离线变量
        </>}
        desc="允许你使用一些依赖在线的变量"
      />
    </Layout>
  );
}