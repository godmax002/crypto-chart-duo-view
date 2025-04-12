
import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface TradingViewWidgetProps {
  symbol: string;
  autosize?: boolean;
  interval?: string;
}

declare global {
  interface Window {
    TradingView: any;
  }
}

const TradingViewWidget: React.FC<TradingViewWidgetProps> = ({
  symbol = 'BINANCE:BTCUSDT',
  autosize = true,
  interval = '15' // Changed default from '1D' to '15' (15 minutes)
}) => {
  const container = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const { theme } = useTheme();
  
  // Determine if we should use dark theme
  const isDarkTheme = theme !== 'light-theme';

  useEffect(() => {
    if (container.current) {
      // Create script element if it doesn't exist
      if (!scriptRef.current) {
        scriptRef.current = document.createElement('script');
        scriptRef.current.src = 'https://s3.tradingview.com/tv.js';
        scriptRef.current.async = true;
        scriptRef.current.onload = initWidget;
        document.head.appendChild(scriptRef.current);
      } else {
        // If script already exists, just initialize the widget
        initWidget();
      }
    }

    function initWidget() {
      if (container.current && window.TradingView) {
        container.current.innerHTML = '';
        new window.TradingView.widget({
          autosize,
          symbol,
          interval,
          timezone: "Etc/UTC",
          theme: isDarkTheme ? 'dark' : 'light',
          style: "1",
          locale: "en",
          toolbar_bg: isDarkTheme ? "#151924" : "#f1f3f6",
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: container.current.id,
          hide_side_toolbar: false,
          studies: ["RSI@tv-basicstudies", "MAExp@tv-basicstudies"],
          save_image: false
        });
      }
    }

    return () => {
      if (container.current) {
        container.current.innerHTML = '';
      }
    };
  }, [symbol, isDarkTheme, autosize, interval]);

  return (
    <div 
      id={`tradingview_${symbol.replace(/[^a-zA-Z0-9]/g, '_')}`} 
      ref={container} 
      className="tradingview-widget-container h-full w-full"
    />
  );
};

export default TradingViewWidget;
