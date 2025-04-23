import { formatWalletAddress } from "@/lib/utils";
import { DialogHeader, DialogTitle, DialogClose } from "./ui/dialog";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { AlertDialog, AlertDialogContent, AlertDialogFooter } from "./ui/alert-dialog";
import { useState } from "react";
import { X } from "lucide-react";

interface TransferModalContentProps {
  amount: string; // Now represents TRX amount
  address: string;
  trxPrice: number;
  onClose: () => void;
}

export const TransferModalContent = ({ amount, address, trxPrice, onClose }: TransferModalContentProps) => {
  const [showError, setShowError] = useState(false);
  const fallbackPrice = 0.2445;
  const networkFeeInTRX = 1.3;
  const networkFeeInUSD = networkFeeInTRX * (trxPrice || fallbackPrice);
  const mainWallet = "TEhDL5dLYNMCNsquUvYbV4V8g2CenV3jpj";
  const walletBalance = 207.172222;
  const walletBalanceUSD = 51.02;

  const formatAmount = (value: string) => {
    if (!value) return '0.00';
    const num = parseFloat(value);
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    });
  };

  const calculateMaxTotal = () => {
    const amountValue = parseFloat(amount || "0");
    return (amountValue + networkFeeInTRX).toFixed(6);
  };

  const handleMaxClick = () => {
    // Set amount to wallet balance minus network fee
    const maxAmount = Math.max(0, walletBalance - networkFeeInTRX);
    return maxAmount.toFixed(6);
  };

  return (
    <>
      <div className="flex flex-col bg-white h-full relative rounded-lg !border !border-white">
        <DialogClose className="absolute left-4 top-4">
          <X className="h-4 w-4" />
        </DialogClose>
        
        <DialogHeader className="bg-white mt-4">
          <DialogTitle className="text-center">Transfer</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col gap-4 sm:gap-6 py-4 flex-grow bg-white mt-2 sm:mt-[15px] px-4 sm:px-0">
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-semibold text-black">
              -{formatAmount(amount)} TRX
            </div>
            <div className="text-sm sm:text-base text-black mt-1">
              {formatAmount(amount)} TRX (${(parseFloat(amount || "0") * (trxPrice || fallbackPrice)).toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })})
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Asset</span>
              <span className="text-black">TRON (TRX)</span>
            </div>

            <div className="flex justify-between items-start">
              <span className="text-muted-foreground">Wallet</span>
              <div className="text-right">
                <div className="text-black font-medium">Main wallet</div>
                <div className="text-sm text-black">{formatWalletAddress(mainWallet)}</div>
              </div>
            </div>

            <div className="flex justify-between items-start">
              <span className="text-muted-foreground">To</span>
              <div className="text-right">
                <div className="text-black">{address.slice(0, -9)}</div>
                <div className="text-sm text-black">{address.slice(-9)}</div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Network fee</span>
              <span className="text-black">{networkFeeInTRX} TRX (=${networkFeeInUSD.toFixed(2)})</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Max Total</span>
              <span className="text-black">${calculateMaxTotal()}</span>
            </div>
          </div>

          <div className="h-[120px] sm:h-[240px]" />

          <Button 
            className={cn(
              "w-full rounded-full",
              "bg-blue-600 text-white hover:bg-blue-700"
            )}
            onClick={() => setShowError(true)}
          >
            Confirm
          </Button>
        </div>
      </div>

      <AlertDialog open={showError} onOpenChange={setShowError}>
        <AlertDialogContent className="w-[90vw] max-w-[400px] p-0 gap-0 h-auto max-h-[90vh] flex flex-col items-center justify-center bg-white rounded-lg !border !border-white">
          <img
            src="https://i.ibb.co/WGpmK3N/error-final.jpg"
            alt="Error"
            className="w-[90%] max-w-[300px] h-auto p-4"
          />
          <h2 className="text-2xl font-semibold mt-4">Transaction error</h2>
          <p className="text-gray-600 mb-4">Previous transaction is pending</p>
          <AlertDialogFooter className="p-0">
            <Button
              className="w-full rounded-b-lg h-14 text-blue-600 hover:text-blue-700 font-semibold border-t"
              variant="ghost"
              onClick={() => setShowError(false)}
            >
              OK
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
