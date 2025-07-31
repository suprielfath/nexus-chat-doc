import { useState } from 'react';
import { ChatMessage } from '@/components/ChatMessage';
import { ChatInput } from '@/components/ChatInput';
import { ChatSidebar } from '@/components/ChatSidebar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Menu, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: Date;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI assistant. I can help you analyze documents and answer questions. Upload some files to get started!',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `I understand you said: "${content}". I'm ready to help you with document analysis and questions. ${uploadedFiles.length > 0 ? `I can see you have ${uploadedFiles.length} file(s) uploaded.` : 'Feel free to upload documents for me to analyze!'}`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const handleFileUpload = (newFiles: UploadedFile[]) => {
    setUploadedFiles(prev => [...prev, ...newFiles]);
    
    // Add a message about the uploaded files
    const fileMessage: Message = {
      id: Date.now().toString(),
      content: `Great! I've received ${newFiles.length} file(s): ${newFiles.map(f => f.name).join(', ')}. I'm ready to help you analyze these documents. What would you like to know?`,
      isUser: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, fileMessage]);
  };

  const handleRemoveFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  return (
    <div className="min-h-screen bg-gradient-chat flex">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-border bg-background/80 backdrop-blur-sm p-4 shadow-glow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-primary rounded-lg shadow-elegant">
                <Bot className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold flex items-center gap-2">
                  AI Chatbot
                  <Sparkles className="w-5 h-5 text-primary animate-pulse-glow" />
                </h1>
                <p className="text-sm text-muted-foreground">
                  Document Analysis & Chat Assistant
                </p>
              </div>
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden hover:shadow-glow transition-all duration-300"
            >
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </header>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4 max-w-4xl mx-auto">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                content={message.content}
                isUser={message.isUser}
                timestamp={message.timestamp}
              />
            ))}
          </div>
        </ScrollArea>

        {/* Input */}
        <ChatInput
          onSendMessage={handleSendMessage}
          onToggleUpload={() => setIsSidebarOpen(true)}
        />
      </div>

      {/* Sidebar for desktop */}
      <div className="hidden lg:block w-80 border-l border-border">
        <ChatSidebar
          isOpen={true}
          onClose={() => {}}
          uploadedFiles={uploadedFiles}
          onFileUpload={handleFileUpload}
          onRemoveFile={handleRemoveFile}
        />
      </div>

      {/* Sidebar for mobile */}
      <ChatSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        uploadedFiles={uploadedFiles}
        onFileUpload={handleFileUpload}
        onRemoveFile={handleRemoveFile}
      />
    </div>
  );
};

export default Index;