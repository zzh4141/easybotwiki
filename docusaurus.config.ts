import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import postcssTailwindcssLoader from './src/postcss-tailwindcss-loader';

const config: Config = {
  title: '易栈',
  tagline: '系列插件',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN'],
  },

  plugins: [
    postcssTailwindcssLoader,
    "plugin-image-zoom"
  ],
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        // ... Your options.
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,

        // For Docs using Chinese, it is recomended to set:
        // language: ["en", "zh"],

        // If you're using `noIndex: true`, set `forceIgnoreNoIndex` to enable local index:
        // forceIgnoreNoIndex: true,
      }),
    ],
  ],
  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: '易栈',
      logo: {
        src: '/icon/icon_1.gif',
      },
      items: [
        {
          label: '应用目录',
          to: '/softs',
        },
        {
          type: 'dropdown',
          label: '文档列表',
          position: 'left',
          items: [
            {
              type: 'docSidebar',
              label: '【机器人】EasyBot',
              docId: 'easybot/intor',
              sidebarId: 'easybotSidebar',
            },
            {
              type: 'docSidebar',
              label: '【离线变量】EzOfflinePapi',
              docId: 'ezofflinepapi/intro',
              sidebarId: 'ezofflinepapiSidebar',
            },
          ],
        },
        {
          type: 'dropdown',
          label: '下载列表',
          position: 'left',
          items: [
            {
              label: '【机器人】EasyBot主程序',
              to: '/download/easybot',
            },
            {
              label: '【机器人】EasyBot服务器插件',
              to: '/download/easybot_plugin',
            },
            {
              label: '【离线变量】EzOfflinePapi',
              to: '/download/ezofflinepapi',
            },
          ],
        },
        {
          to: '/pay',
          label: '赞助',
          position: 'right',
        },
        {
          to: '/join-qq-group',
          label: '加入QQ群',
          position: 'right',
        },
        {
          type: 'dropdown',
          label: '链接',
          position: 'right',
          items: [
            {
              label: '【论坛】Minebbs主页',
              href: 'https://www.minebbs.com/resources/authors/miuxue.97563/',
            },
            {
              label: '【视频】BiliBili主页',
              href: 'https://space.bilibili.com/107913373',
            },
          ],
        }
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: '文档',
          items: [
            {
              label: '应用目录',
              to: '/softs',
            },
          ],
        },
        {
          title: '社区',
          items: [
            {
              label: 'EasyBot论坛',
              href: 'https://bbs.hualib.com',
            },
            {
              label: '交流群 一群',
              href: 'https://qm.qq.com/q/mYXYEGnXc4',
            },
          ],
        },
        {
          title: '其他',
          items: [
            {
              label: 'B站',
              href: 'https://space.bilibili.com/107913373',
            }
          ],
        },
      ],
      copyright: '<CustomFooter />',
    },
    prism: {
      theme: prismThemes.vsLight,
      darkTheme: prismThemes.vsDark,
      additionalLanguages: ['bash', 'yaml', 'batch']
    },
    imageZoom: {
      selector: '.markdown img',
      options: {
        background: '#00000080',
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;