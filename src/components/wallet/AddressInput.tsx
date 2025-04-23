import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScanLine, X } from "lucide-react";
import { PasteButton } from "./PasteButton";

interface AddressInputProps {
  address: string;
  isValid: boolean | null;
  onAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPaste: () => void;
  onScan: () => void;
  onClear: () => void;
}

export const AddressInput = ({
  address,
  isValid,
  onAddressChange,
  onScan,
  onClear,
}: AddressInputProps) => {
  const handlePaste = (text: string) => {
    const event = {
      target: { value: text },
    } as React.ChangeEvent<HTMLInputElement>;
    onAddressChange(event);
  };

  return (
    <div className="w-full space-y-1.5">
      <div className="w-full px-1 text-sm text-muted-foreground">
        Address or Domain Name
      </div>
      <div className="relative w-full max-w-full border border-transparent hover:border-blue-800 bg-gray-50">
        <Input
          id="wallet-address"
          type="text"
          placeholder="Search or Enter"
          value={address.length > 16 ? `${address.substring(0, 8)}...${address.substring(address.length - 8)}` : address}
          onChange={onAddressChange}
          className="transition-all duration-200 outline-none focus:outline-none pr-28 w-full bg-white border border-transparent hover:border-blue-800 focus:border-blue-800"
        />
        <div className="absolute right-1 top-1/2 -translate-y-1/2 flex gap-1">
          {address && (
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
          <PasteButton onPaste={handlePaste} />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-9 w-9 sm:h-8 sm:w-8 text-blue-900"
            onClick={onScan}
          >
            <ScanLine className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {isValid === false && (
        <div className="px-3 text-sm text-red-600">
          Invalid Address
        </div>
      )}
    </div>
  );
};
