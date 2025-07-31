import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DocumentUpload } from "./DocumentUpload";
import { MessageSquare, Files, X } from "lucide-react";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: Date;
}

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  uploadedFiles: UploadedFile[];
  onFileUpload: (files: UploadedFile[]) => void;
  onRemoveFile: (fileId: string) => void;
}

export const ChatSidebar = ({ 
  isOpen, 
  onClose, 
  uploadedFiles, 
  onFileUpload, 
  onRemoveFile 
}: ChatSidebarProps) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'files'>('files');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:relative lg:inset-auto">
      {/* Overlay for mobile */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm lg:hidden"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <Card className="absolute right-0 top-0 h-full w-80 bg-gradient-chat border-l shadow-elegant lg:relative lg:w-full animate-fade-in-up">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex gap-2">
              <Button
                variant={activeTab === 'chat' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('chat')}
                className="flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Chat
              </Button>
              <Button
                variant={activeTab === 'files' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('files')}
                className="flex items-center gap-2"
              >
                <Files className="w-4 h-4" />
                Files
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="lg:hidden"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 overflow-y-auto">
            {activeTab === 'files' && (
              <DocumentUpload
                uploadedFiles={uploadedFiles}
                onFileUpload={onFileUpload}
                onRemoveFile={onRemoveFile}
              />
            )}
            
            {activeTab === 'chat' && (
              <div className="text-center text-muted-foreground">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-sm">Chat history and settings coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};