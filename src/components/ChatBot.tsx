
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, User, Send, Link, ExternalLink, MessageSquare, X } from "lucide-react";
import { toast } from "sonner";

type Message = {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
};

type Resource = {
  title: string;
  url: string;
  description: string;
};

const resources: Resource[] = [
  {
    title: "Report to Cyber Crime Portal",
    url: "https://cybercrime.gov.in/",
    description: "Official Indian Cyber Crime Reporting Portal"
  },
  {
    title: "FTC Identity Theft",
    url: "https://www.identitytheft.gov/",
    description: "US Federal Trade Commission identity theft resource"
  },
  {
    title: "Meta Help Center",
    url: "https://www.facebook.com/help/1216349518398524",
    description: "Report fake accounts on Facebook & Instagram"
  },
  {
    title: "Twitter Help",
    url: "https://help.twitter.com/en/safety-and-security/report-abusive-behavior",
    description: "How to report abusive behavior on Twitter"
  }
];

const helpfulReplies: Record<string, string> = {
  default: "I'm here to help you identify and report fake accounts. What would you like to know?",
  report: "You can report fake accounts to the platform directly or to cybercrime authorities. Visit https://cybercrime.gov.in/ for the official Indian Cyber Crime Reporting Portal.",
  identify: "Look for these red flags: new accounts, few posts, stock photos, unusual follower counts, generic content, and suspicious links.",
  protect: "Protect yourself by checking accounts before engaging, using strong passwords, enabling 2FA, being careful about friend requests, and reporting suspicious activity.",
  hello: "Hello! I'm your fake account detector assistant. How can I help you today?",
  hi: "Hi there! I'm here to help with fake account detection. What information do you need?",
  help: "I can help with identifying fake accounts, reporting them to authorities, or protecting yourself online. What specifically do you need assistance with?",
  thanks: "You're welcome! Is there anything else I can assist you with?",
  thank: "You're welcome! If you have any more questions, feel free to ask."
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi there! I'm your Fake Account Detective assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages, isOpen]);

  const generateResponse = (text: string): string => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes("report") || lowerText.includes("cyber") || lowerText.includes("crime")) {
      return helpfulReplies.report;
    }
    if (lowerText.includes("identify") || lowerText.includes("detect") || lowerText.includes("spot") || lowerText.includes("recognize")) {
      return helpfulReplies.identify;
    }
    if (lowerText.includes("protect") || lowerText.includes("safe") || lowerText.includes("secure")) {
      return helpfulReplies.protect;
    }
    if (lowerText.includes("hello")) {
      return helpfulReplies.hello;
    }
    if (lowerText.includes("hi ") || lowerText === "hi") {
      return helpfulReplies.hi;
    }
    if (lowerText.includes("help")) {
      return helpfulReplies.help;
    }
    if (lowerText.includes("thanks") || lowerText.includes("thank you")) {
      return helpfulReplies.thank;
    }
    
    return helpfulReplies.default;
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isBot: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    
    // Simulate bot thinking and then respond
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(inputValue),
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
    }, 600);
  };

  const toggleChat = () => {
    setIsOpen(prev => !prev);
    if (!isOpen) {
      toast.info("Chat assistant opened", {
        description: "Ask questions about fake accounts and reporting options"
      });
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <Card className="shadow-lg mb-4 w-80 md:w-96 border border-blue-100 dark:border-blue-900 animate-in zoom-in-90 fade-in-90 duration-300">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 flex flex-row items-center justify-between">
            <CardTitle className="text-sm flex items-center gap-2 font-medium">
              <Bot className="h-4 w-4" />
              Fake Account Detective
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={toggleChat} className="h-6 w-6 rounded-full hover:bg-white/20 text-white">
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="p-0">
            <ScrollArea className="h-72 px-4 py-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-2 mb-4 ${
                    message.isBot ? "justify-start" : "justify-end"
                  }`}
                >
                  {message.isBot && (
                    <Avatar className="h-8 w-8 bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                      <Bot className="h-4 w-4" />
                    </Avatar>
                  )}
                  
                  <div
                    className={`px-3 py-2 rounded-lg max-w-[85%] ${
                      message.isBot
                        ? "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  
                  {!message.isBot && (
                    <Avatar className="h-8 w-8 bg-blue-500 text-white">
                      <User className="h-4 w-4" />
                    </Avatar>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </ScrollArea>
            
            <div className="p-4 border-t">
              <h4 className="text-xs font-medium text-muted-foreground mb-2">Helpful Resources:</h4>
              <div className="grid grid-cols-2 gap-2">
                {resources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-2 py-1.5 rounded flex items-center gap-1 hover:bg-gray-100 dark:hover:bg-gray-800 text-blue-600 dark:text-blue-400"
                  >
                    <ExternalLink className="h-3 w-3" />
                    <span className="truncate">{resource.title}</span>
                  </a>
                ))}
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="p-3 border-t bg-gray-50 dark:bg-gray-900">
            <div className="flex w-full items-center gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage} 
                size="icon" 
                disabled={!inputValue.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
      
      <Button
        onClick={toggleChat}
        className={`rounded-full h-14 w-14 shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all ${
          isOpen ? "rotate-90" : "animate-bounce"
        }`}
        size="icon"
      >
        <MessageSquare className={`h-6 w-6 ${isOpen ? "opacity-0" : "opacity-100"} transition-opacity`} />
      </Button>
    </div>
  );
};

export default ChatBot;
