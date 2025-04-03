import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, MessageCircle } from "lucide-react";
import ChatInterface from "@/components/ChatInterface";
import { Card } from "@/components/ui/card";

interface Conversation {
  id: string;
  vendorId: string;
  vendorName: string;
  lastMessage: string;
  timestamp: Date;
  unread: boolean;
}

const Messages = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [chatWidth, setChatWidth] = useState(400); // Initial width of the sidebar

  const user = useSelector((state: RootState) => state.vendor.user);

  useEffect(() => {
    const mockConversations: Conversation[] = [
      {
        id: "1",
        vendorId: "v1",
        vendorName: "Elegant Events Photography",
        lastMessage: "Thanks for your message! I'll get back to you soon.",
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        unread: true,
      },
      {
        id: "2",
        vendorId: "v2",
        vendorName: "Delightful Catering",
        lastMessage: "We'd be happy to discuss menu options for your event.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
        unread: false,
      },
    ];
    setConversations(mockConversations);
  }, []);

  const filteredConversations = conversations.filter((conversation) =>
    conversation.vendorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleResize = (e: React.MouseEvent) => {
    document.addEventListener("mousemove", resizePanel);
    document.addEventListener("mouseup", stopResize);
  };

  const resizePanel = (e: MouseEvent) => {
    const newWidth = Math.max(250, Math.min(e.clientX, 600));
    setChatWidth(newWidth);
  };

  const stopResize = () => {
    document.removeEventListener("mousemove", resizePanel);
    document.removeEventListener("mouseup", stopResize);
  };

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <MessageCircle className="h-12 w-12 text-gray-300 mb-4" />
        <h2 className="text-xl font-medium text-gray-800">
          Please log in to view messages
        </h2>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Card
          className="bg-white m-2 flex flex-col border-r"
          style={{ width: `${chatWidth}px` }}
        >
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search conversations..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <Tabs defaultValue="all" className="flex-1 p-2 overflow-hidden">
            <TabsList className="flex w-full">
              <TabsTrigger value="all" className="flex-1">
                All
              </TabsTrigger>
              <TabsTrigger value="unread" className="flex-1">
                Unread
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="overflow-auto flex-1">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 cursor-pointer ${
                    selectedConversation?.id === conversation.id
                      ? "bg-gray-100"
                      : ""
                  }`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {conversation.vendorName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">
                        {conversation.vendorName}
                      </h3>
                      <p className="text-sm text-gray-600 truncate">
                        {conversation.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </Card>

        <div className="w-1 cursor-col-resize" onMouseDown={handleResize} />

        <div className="flex-1 p-2 flex flex-col">
          {selectedConversation ? (
            <ChatInterface
              vendorId={selectedConversation.vendorId}
              vendorName={selectedConversation.vendorName}
            />
          ) : (
            <div className="h-full flex items-center justify-center bg-gray-100">
              <MessageCircle className="h-12 w-12 text-gray-300" />
              <h2 className="text-xl font-medium text-gray-800 ml-2">
                Select a conversation
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
