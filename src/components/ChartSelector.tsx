
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronDown } from 'lucide-react';

interface ChartSelectorProps {
  index: number;
  symbol: string;
  onSymbolChange: (symbol: string) => void;
}

const popularSymbols = [
  { label: 'BTC/USDT', value: 'BINANCE:BTCUSDT' },
  { label: 'ETH/USDT', value: 'BINANCE:ETHUSDT' },
  { label: 'BNB/USDT', value: 'BINANCE:BNBUSDT' },
  { label: 'SOL/USDT', value: 'BINANCE:SOLUSDT' },
  { label: 'XRP/USDT', value: 'BINANCE:XRPUSDT' },
  { label: 'ADA/USDT', value: 'BINANCE:ADAUSDT' },
  { label: 'DOGE/USDT', value: 'BINANCE:DOGEUSDT' },
  { label: 'SHIB/USDT', value: 'BINANCE:SHIBUSDT' },
  { label: 'FART/USDT', value: 'BINANCE:FARTUSDT' },
];

const ChartSelector: React.FC<ChartSelectorProps> = ({ index, symbol, onSymbolChange }) => {
  return (
    <div className="flex items-center space-x-2 bg-card p-2 rounded-md">
      <span className="text-muted-foreground">Chart {index + 1}:</span>
      <Select value={symbol} onValueChange={onSymbolChange}>
        <SelectTrigger className="w-[180px] bg-secondary">
          <SelectValue placeholder="Select symbol" />
        </SelectTrigger>
        <SelectContent>
          {popularSymbols.map((sym) => (
            <SelectItem key={sym.value} value={sym.value}>
              {sym.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ChartSelector;
