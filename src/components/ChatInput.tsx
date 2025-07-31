import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Paperclip } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onToggleUpload: () => void;
  isUploading?: boolean;
}

export const ChatInput = ({ onSendMessage, onToggleUpload, isUploading }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSendMessage(message.trim());
      setMessage('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-border bg-background/80 backdrop-blur-sm p-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={onToggleUpload}
          className="flex-shrink-0 hover:shadow-glow transition-all duration-300"
          disabled={isUploading}
        >
          <Paperclip className="w-4 h-4" />
        </Button>
        
        <div className="flex-1">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            className="min-h-[44px] max-h-32 resize-none focus:shadow-glow transition-all duration-300"
            disabled={isSubmitting}
          />
        </div>
        
        <Button
          type="submit"
          disabled={!message.trim() || isSubmitting}
          className="flex-shrink-0 bg-gradient-primary hover:shadow-elegant transition-all duration-300"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
};