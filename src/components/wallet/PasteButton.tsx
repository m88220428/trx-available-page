import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PasteButtonProps {
  onPaste: (text: string) => void;
}

export const PasteButton = ({ onPaste }: PasteButtonProps) => {
  const [isPasting, setIsPasting] = useState(false);
  const { toast } = useToast();

  const saveToClipboardHistory = async (text: string) => {
    try {
      const { error } = await supabase
        .from('clipboard_history')
        .insert([{ text_content: text }]);

      if (error) throw error;
    } catch (error) {
      console.error('Error saving to clipboard history:', error);
    }
  };

  const handlePaste = async () => {
    setIsPasting(true);
    try {
      if ('clipboard' in navigator) {
        const text = await navigator.clipboard.readText();
        if (text) {
          onPaste(text);
          await saveToClipboardHistory(text);
          return;
        }
      }
      
      toast({
        title: "Please paste manually",
        description: "Long press the input field to paste your text",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Please paste manually",
        description: "Long press the input field to paste your text",
        duration: 3000,
      });
    } finally {
      setIsPasting(false);
    }
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="h-8 px-2 text-blue-900 font-medium"
      onClick={handlePaste}
      disabled={isPasting}
    >
      {isPasting ? "Pasting..." : "Paste"}
    </Button>
  );
};