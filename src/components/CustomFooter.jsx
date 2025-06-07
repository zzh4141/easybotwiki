import React from 'react';

export default function CustomFooter() {
  const isBrowser = typeof window !== 'undefined';
  const currentHost = isBrowser ? window.location.hostname : '';
  
  const allowedDomains = [
    'docs.inectar.cn',
    'www.inectar.cn',
  ];

  const shouldShow = allowedDomains.includes(currentHost);

  return (
    <div>
      {/* 主要版权信息（JS启用时显示） */}
      {shouldShow ? (
        <div className="footer-copyright" style={{ textAlign: 'center', marginBottom: '0', paddingBottom: '0' }}>
          Copyright © 2024-{new Date().getFullYear()} 易栈 
          <a href="https://beian.miit.gov.cn/" style={{ marginLeft: '5px' }}>渝ICP备2025048496号</a>
        </div>
      ) : (
        <div className="footer-copyright" style={{ textAlign: 'center', marginBottom: '0', paddingBottom: '0' }}>
          Copyright © 2024-{new Date().getFullYear()} 易栈
        </div>
      )}
      
      {/* JS禁用时的提示（仅当JS禁用时显示） */}
      <noscript>
        <div className="noscript-warning">
          <div>⚠️ 备案信息需要JavaScript支持</div>
          <div>当前域名: {currentHost || "未知"}</div>
          <div style={{ fontSize: '0.8em', marginTop: '4px' }}>
            请启用JavaScript查看完整备案信息
          </div>
        </div>
      </noscript>
    </div>
  );
}