import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { ReactNode } from "react";
import HomepageFeatures from "../components/HomepageFeatures";
import { Icon } from "@iconify/react/dist/iconify.js";
import clsx from "clsx";

export interface TitleProps {
  colorChange: boolean
}

export function Title({ colorChange }: TitleProps) {
  const { siteConfig } = useDocusaurusContext();
  return (
    <div className='flex flex-row gap-5 items-center transform transition-all duration-500 hover:scale-105'>

      {/* 无法拖拽 */}
      <div className='w-32 h-32 relative group select-none'>
        {/* 选中后旋转 */}
        <div className="absolute inset-0" style={{ animation: 'float 6s ease-in-out infinite' }}>
          <div
            style={{ animation: 'ani-spin 12s linear infinite' }}
            className='absolute inset-0 border-5 border-black/10 dark:border-white/30 
        animate-ping-slow opacity-0 group-hover:opacity-100'/>
        </div>

        {/* 变小一点反着转 需要居中 */}
        <div className="absolute inset-0 scale-90" style={{ animation: 'float 6s ease-in-out infinite' }}>
          <div
            style={{ animation: 'ani-spin-reverse 12s linear infinite' }}
            className='absolute inset-0 border-5 border-black/10 dark:border-white/30
        animate-ping-slow opacity-0 group-hover:opacity-100'/>
        </div>
        <img
          draggable="false"
          className='dark:hidden animate-float'
          src="/icon/icon_1.gif"
          style={{ animation: 'float 6s ease-in-out infinite' }}
        />
        <img
          draggable="false"
          className='hidden dark:block animate-float'
          src="/icon/icon_2.gif"
          style={{ animation: 'float 6s ease-in-out infinite' }}
        />

      </div>

      <div className='space-y-4 relative select-none'>
        <div className={clsx(
          'text-5xl font-bold drop-shadow-3d animate-text-pop-up',
          colorChange ? 'text-gray-800 dark:text-white' : 'text-white'
        )}>
          {siteConfig.title}
        </div>
        <div className={clsx(
          'text-2xl font-medium animate-text-fade-in',
          colorChange ? 'text-gray-800 dark:text-white/90' : 'text-white/90'
        )}>
          {siteConfig.tagline}
        </div>
      </div>
    </div>
  )
}
function HomepageHeader() {
  return (
    <div className='w-full gap-10 flex flex-col justify-center items-center text-center 
      p-20 relative overflow-hidden'>
      {Title({
        colorChange: true
      })}

      {/* 增强版按钮动画 */}
      <div className="flex gap-5">
        <a href="/softs">
          <div className='group relative select-none transform transition-all 
        hover:scale-105 active:scale-95 bg-blue-500 text-white rounded-xl'>
            <div className='flex flex-row items-center bg-white/10 
          p-4 '>
              <div className='transition-all duration-300 group-hover:pr-4 
            font-semibold text-lg'>
                应用目录
              </div>
              <Icon
                className='text-2xl transition-all duration-300 
              group-hover:rotate-90 group-hover:scale-125'
                icon="mingcute:right-line"
              />
            </div>
          </div>
        </a>
      </div>
    </div >
  );
}

function HotProjects() {
  return (
    <div className="bg-gray-100 dark:bg-black/8 w-full">

    </div>
  )
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <HotProjects />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
