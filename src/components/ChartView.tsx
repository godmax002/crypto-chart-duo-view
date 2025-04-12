
import { useState } from 'react';
import TradingViewWidget from './TradingViewWidget';
import ChartSelector from './ChartSelector';
import { Button } from '@/components/ui/button';
import { SplitHorizontal, Layout } from 'lucide-react';

const ChartView = () => {
  const [isDualMode, setIsDualMode] = useState(false);
  const [symbol1, setSymbol1] = useState('BINANCE:BTCUSDT');
  const [symbol2, setSymbol2] = useState('BINANCE:ETHUSDT');

  const toggleViewMode = () => {
    setIsDualMode(!isDualMode);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 bg-card border-b flex justify-between items-center">
        <h1 className="text-xl font-bold">Crypto Chart Viewer</h1>
        <div className="flex items-center space-x-4">
          <ChartSelector index={0} symbol={symbol1} onSymbolChange={setSymbol1} />
          {isDualMode && (
            <ChartSelector index={1} symbol={symbol2} onSymbolChange={setSymbol2} />
          )}
          <Button 
            variant="outline" 
            size="icon"
            onClick={toggleViewMode}
            title={isDualMode ? "Switch to Single View" : "Switch to Dual View"}
          >
            {isDualMode ? <Layout className="h-4 w-4" /> : <SplitHorizontal className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden grid gap-2 p-2" 
           style={{ gridTemplateRows: isDualMode ? '1fr 1fr' : '1fr' }}>
        <div className="min-h-0 bg-card rounded-md overflow-hidden shadow-lg">
          <TradingViewWidget symbol={symbol1} />
        </div>
        
        {isDualMode && (
          <div className="min-h-0 bg-card rounded-md overflow-hidden shadow-lg">
            <TradingViewWidget symbol={symbol2} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartView;
