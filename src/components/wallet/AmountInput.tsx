import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface AmountInputProps {
  amount: string;
  maxAmount: number;
  trxPrice?: number;
  onAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMax: () => void;
  onClear: () => void;
}

export const AmountInput = ({
  amount,
  maxAmount,
  trxPrice,
  onAmountChange,
  onMax,
  onClear,
}: AmountInputProps) => {
  const isAmountExceedsMax = () => {
    const amountNum = parseFloat(amount);
    return amountNum > maxAmount;
  };

  const formatAmount = (value: string) => {
    if (!value) return '0.00';
    const num = parseFloat(value);
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    });
  };

  const getUSDValue = () => {
    const fallbackPrice = 0.2445; // Fallback TRX price
    const priceToUse = trxPrice || fallbackPrice;
    
    // Debug logging
    console.log('Current amount:', amount);
    console.log('Using TRX price:', priceToUse);
    
    const amountNum = amount ? parseFloat(amount) : 0;
    if (isNaN(amountNum)) return '$0.00';
    
    const usdValue = amountNum * priceToUse;
    console.log('Calculated USD value:', usdValue);
    
    return usdValue.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      style: 'currency',
      currency: 'USD'
    });
  };

  return (
    <div className="w-full space-y-1.5">
      <div className="w-full px-1 text-sm text-muted-foreground">
        Amount
      </div>
      <div className="relative w-full max-w-full border border-transparent hover:border-blue-800 bg-gray-50">
        <Input
          id="amount"
          type="text"
          placeholder="TRX Amount"
          value={amount}
          onChange={onAmountChange}
          className="w-full pr-24 bg-white border border-transparent hover:border-blue-800 focus:border-blue-800"
        />
        <div className="absolute right-1 top-1/2 -translate-y-1/2 flex gap-1">
          {amount && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-9 w-9 sm:h-8 sm:w-8"
              onClick={onClear}
            >
              <div className="bg-gray-200 rounded-full p-1.5">
                <X className="h-3 w-3" />
              </div>
            </Button>
          )}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-9 px-3 sm:h-8 sm:px-2 text-blue-900 font-medium"
            onClick={onMax}
          >
            <span className="text-blue-900 font-medium">MAX</span>
          </Button>
        </div>
      </div>
      <div className="px-3 text-sm text-muted-foreground">
        {isAmountExceedsMax() ? (
          <span className="text-red-600">Not enough balance</span>
        ) : (
          `= ${getUSDValue()}`
        )}
      </div>
    </div>
  );
};
