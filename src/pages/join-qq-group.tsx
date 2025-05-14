// src/pages/join-qq-group.tsx
import React from 'react';
import Layout from '@theme/Layout';
import { Icon } from '@iconify/react/dist/iconify.js';

export default function JoinQQGroup() {

  const groups = [
    {
      'name': "一群",
      'img': '/img/qq-group-1-qrcode.png',
      'img_white': '/img/qq-group-1-qrcode-white.png',
      'id': "247773970",
      'link': 'https://qm.qq.com/q/692tw1MJwI'
    },
    {
      'name': "二群",
      'img': '/img/qq-group-2-qrcode.png',
      'img_white': '/img/qq-group-2-qrcode-white.png',
      'id': '594297715',
      'link': 'https://qm.qq.com/q/OySUYaXmcW'
    }
  ]

  return (
    <Layout title="加入我们的 QQ 群" description="如何加入我们的 QQ 群">
      <div className='flex flex-col items-center mt-15 font-bold text-2xl'>
        <div>
          加入EasyBot用户群
        </div>
        <div className='text-lg font-normal'>
          加入用户群，和其他群友一起殴打群主
        </div>
      </div>

      <div className='mt-15 mb-15 flex flex-col sm:flex-row items-center justify-center gap-15'>
        {
          groups.map((group, index) => (
            <div key={index} className='flex flex-col font-bold text-2xl'>
              <div className='flex justify-between items-center dark:bg-[#171c20] p-5 rounded-md rounded-b-none'>
                <div className='flex items-center gap-5'>
                  <Icon icon="material-symbols:groups" className='text-4xl' />
                  <div>{group.name}</div>
                </div>
                <div>
                  <div className='text-lg font-normal'>{group.id}</div>
                </div>
              </div>
              <div className='flex flex-row items-center rounded-t-none select-none'>
                <img draggable={false} src={group.img} alt={group.name} className='h-[720px] hidden dark:block' />
                <img draggable={false} src={group.img_white} alt={group.name} className='h-[720px] block dark:hidden' />
              </div>
              <div className='dark:bg-[#171c20]  p-5 flex justify-center rounded-b-md'>
                <div onClick={() => window.open(group.link)} className='flex select-none underline cursor-pointer items-center gap-2 dark:text-[#e3e3e3] text-[#666666]'><Icon icon="tabler:click" /> 点我加入</div>
              </div>
            </div>
          ))
        }
      </div>

    </Layout>
  );
}