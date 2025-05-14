import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';

type FeatureItem = {
  title: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: '专业开发',
    description: (
      <>
        专注软件、插件开发五年
      </>
    ),
  },
  {
    title: '配置简单',
    description: (
      <>
        配置简单,小白也可快速上手
      </>
    ),
  },
  {
    title: '功能全面',
    description: (
      <>
        功能全面,深得用户喜欢
      </>
    ),
  },
  {
    title: '支持多平台',
    description: (
      <>
        支持Windows、Linux、MacOS
      </>
    ),
  },
  {
    title: '更新稳定',
    description: (
      <>
        更新稳定, 持续更新
      </>
    ),

  },
  {
    title: '稳定可靠',
    description: (
      <>
        稳定可靠, 持续更新
      </>
    ),
  },
];

function Feature({ title, description }: FeatureItem) {
  return (
    <div className={clsx(
      'items-center flex flex-col p-5',
      // 添加以下悬停动画类
      'backface-visibility-hidden', // 隐藏背面
      'transform-gpu', // 强制GPU加速
      'transform transition duration-300', // 过渡设置
      'hover:text-blue-600 dark:hover:text-blue-400',
      'cursor-default' // 保持默认光标样式
    )}>
      <div className="text-center select-none">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}


export default function HomepageFeatures(): ReactNode {
  return (
    <div className="bg-gray-100/60 dark:bg-black/8 w-full">
      <div className="p-20">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 max-w-[1590px] mx-auto">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </div>
  );
}
