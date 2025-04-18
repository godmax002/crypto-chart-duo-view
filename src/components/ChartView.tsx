
import { useState } from 'react';
import TradingViewWidget from './TradingViewWidget';
import ChartSelector from './ChartSelector';
import ThemeSwitcher from './ThemeSwitcher';
import { Button } from '@/components/ui/button';
import { LayoutGrid, Columns } from 'lucide-react';

const ChartView = () => {
  const [isDualMode, setIsDualMode] = useState(true); // Default to dual mode
  const [symbol1, setSymbol1] = useState('BINANCE:BTCUSDT');
  const [symbol2, setSymbol2] = useState('BINANCE:FARTCOINUSDT.P'); // Updated FARTCOIN symbol

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
            {isDualMode ? <LayoutGrid className="h-4 w-4" /> : <Columns className="h-4 w-4" />}
          </Button>
          <ThemeSwitcher />
        </div>
      </div>

      <div className="flex-1 overflow-hidden grid gap-2 p-2" 
           style={{ gridTemplateRows: isDualMode ? '1fr 1fr' : '1fr' }}>
        <div className="min-h-0 bg-card rounded-md overflow-hidden shadow-lg">
          <TradingViewWidget symbol={symbol1} interval="15" />
        </div>
        
        {isDualMode && (
          <div className="min-h-0 bg-card rounded-md overflow-hidden shadow-lg">
            <TradingViewWidget symbol={symbol2} interval="15" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartView;
