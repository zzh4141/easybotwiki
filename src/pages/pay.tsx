import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
// 移除以下两行
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

const afdianButtonStyle: React.CSSProperties = {
  display: 'inline-block',
  padding: '14px 28px',
  backgroundColor: '#946ce6',
  color: 'white',
  borderRadius: '8px',
  textDecoration: 'none',
  fontSize: '1.1rem',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  marginTop: '1.5rem'
};

const PayPage: React.FC = () => {
  // 使用 state 来跟踪主题
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.getAttribute('data-theme') === 'dark');

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.getAttribute('data-theme') === 'dark');
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  // 根据 state 生成样式
  const mainStyle = {
    padding: '2rem',
    textAlign: 'center',
    color: isDarkMode ? '#ffffff' : '#1a1a1a',
    '--platform-bg': isDarkMode ? '#000000' : '#ffffff',
    '--border-color': isDarkMode ? '#404040' : '#e0e0e0',
    '--text-color': isDarkMode ? '#ffffff' : '#1a1a1a'
  } as any;
  
  const platformsStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '2rem',
    marginTop: '2rem'
  };

  const platformStyle: React.CSSProperties = {
    backgroundColor: 'var(--platform-bg)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    padding: '1.5rem',
    width: '100%',
    maxWidth: '400px',
    minHeight: '420px', // 固定最小高度
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'all 0.3s ease'
  };
  
  // 删除重复的 darkMainStyle 和 mainStyle 声明

  const qrCodeStyle: React.CSSProperties = {
    width: '100%',  // 改为百分比宽度
    height: 'auto',  // 高度自适应
    marginTop: '1rem'
  };

  // 移除未使用的 sliderSettings 配置
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = ['/img/wx1.png', '/img/wx2.png'];
  // 使用 useState 声明 mouseStartX 和 touchStartX
  const [mouseStartX, setMouseStartX] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // 设置轮播时间为 5 秒
    return () => clearInterval(timer);
  }, []);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    } else {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  return (
    <Layout title="赞助作者">
      <main style={mainStyle}>
        {/* 修改所有标题样式 */}
        <h1 style={{ color: 'var(--text-color)' }}>感谢您的支持！</h1>
        <div style={platformsStyle}>
          {/* 微信支付区块 */}
          <div style={platformStyle}>
            <h2 style={{ color: 'var(--text-color)' }}>微信支付</h2>
            <div 
              style={{ 
                position: 'relative',
                overflow: 'hidden',
                width: '100%',
                height: '300px',
                flexGrow: 1
              }}
              onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
              onTouchEnd={(e) => {
                const touchEndX = e.changedTouches[0].clientX;
                const diffX = touchStartX - touchEndX;
                if (diffX > 50) {
                  handleSwipe('left');
                } else if (diffX < -50) {
                  handleSwipe('right');
                }
              }}
              onMouseDown={(e) => setMouseStartX(e.clientX)}
              onMouseUp={(e) => {
                const mouseEndX = e.clientX;
                const diffX = mouseStartX - mouseEndX;
                if (diffX > 50) {
                  handleSwipe('left');
                } else if (diffX < -50) {
                  handleSwipe('right');
                }
              }}
            >
              {slides.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`微信收款码${index + 1}`}
                  style={{ 
                    ...qrCodeStyle,
                    position: 'absolute',
                    opacity: index === currentSlide ? 1 : 0,
                    transition: 'opacity 0.5s ease',
                    height: '100%',
                    objectFit: 'contain'
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* 支付宝区块 */}
          <div style={platformStyle}>
            <h2 style={{ color: 'var(--text-color)' }}>支付宝</h2>
            <img
              src="/img/zfb.png"
              alt="支付宝二维码"
              style={qrCodeStyle}
            />
          </div>

          {/* 爱发电区块 */}
          <div style={platformStyle}>
            <h2 style={{ color: 'var(--text-color)' }}>爱发电</h2>
            <img
              src="/img/MiuxuE.jpg"
              alt="作者图片"
              style={{
                ...qrCodeStyle,
                maxWidth: '200px', // 设置图片最大宽度
                margin: '0 auto' // 图片居中显示
              }}
            />
            <a
              href="https://afdian.com/a/MiuxuE"
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...afdianButtonStyle }}
            >
              前往爱发电赞助
            </a>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default PayPage;