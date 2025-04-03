
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Vendor } from "@/types";
import { Search, MessageCircle } from "lucide-react";
import ChatInterface from "@/components/ChatInterface";

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
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [mockVendors, setMockVendors] = useState<Vendor[]>([]);
  const user = useSelector((state: RootState) => state.vendor.user);

  // Mock data for conversations
  useEffect(() => {
    // In a real app, this would be fetched from an API
    const mockConversations: Conversation[] = [
      {
        id: "1",
        vendorId: "v1",
        vendorName: "Elegant Events Photography",
        lastMessage: "Thanks for your message! I'll get back to you as soon as possible.",
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
        unread: true,
      },
      {
        id: "2",
        vendorId: "v2",
        vendorName: "Delightful Catering",
        lastMessage: "We'd be happy to discuss menu options for your event.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
        unread: false,
      },
      {
        id: "3",
        vendorId: "v3",
        vendorName: "Grand Ballroom Venue",
        lastMessage: "Yes, we have availability on that date. Would you like to schedule a visit?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        unread: false,
      },
    ];

    const mockVendorData: Vendor[] = [
      {
        id: "v1",
        name: "Elegant Events Photography",
        description: "Professional wedding and event photography",
        category: "Photographer",
        location: "Downtown",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000",
        contactEmail: "contact@elegantphotos.com",
        contactPhone: "123-456-7890",
        pricing: "$$$",
        rating: 4.8
      },
      {
        id: "v2",
        name: "Delightful Catering",
        description: "Gourmet catering for all occasions",
        category: "Caterer",
        location: "Midtown",
        image: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1000",
        contactEmail: "info@delightfulcatering.com",
        contactPhone: "123-456-7891",
        pricing: "$$",
        rating: 4.6
      },
      {
        id: "v3",
        name: "Grand Ballroom Venue",
        description: "Elegant venue for weddings and corporate events",
        category: "Venue",
        location: "Uptown",
        image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1000",
        contactEmail: "bookings@grandballroom.com",
        contactPhone: "123-456-7892",
        pricing: "$$$$",
        rating: 4.9
      }
    ];

    setConversations(mockConversations);
    setMockVendors(mockVendorData);
  }, []);

  const filteredConversations = conversations.filter(
    (conversation) =>
      conversation.vendorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-gray-800 mb-2">
              Please log in to view your messages
            </h2>
            <p className="text-gray-500">
              You need to be logged in to access your conversations with vendors.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Messages</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversations List Panel */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow-sm">
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

            <Tabs defaultValue="all" className="w-full">
              <div className="px-4 pt-2">
                <TabsList className="w-full">
                  <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                  <TabsTrigger value="unread" className="flex-1">Unread</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="mt-0">
                <div className="divide-y max-h-[calc(100vh-250px)] overflow-y-auto">
                  {filteredConversations.length > 0 ? (
                    filteredConversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        className={`p-4 hover:bg-gray-50 cursor-pointer ${
                          selectedConversation?.id === conversation.id ? "bg-gray-50" : ""
                        }`}
                        onClick={() => setSelectedConversation(conversation)}
                      >
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {conversation.vendorName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium truncate">
                                {conversation.vendorName}
                              </h3>
                              <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                                {conversation.timestamp.toLocaleTimeString([], { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 truncate">
                              {conversation.lastMessage}
                            </p>
                          </div>
                        </div>
                        {conversation.unread && (
                          <div className="w-2 h-2 bg-primary rounded-full absolute right-4 mt-1"></div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-gray-500">
                      No conversations found
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="unread" className="mt-0">
                <div className="divide-y max-h-[calc(100vh-250px)] overflow-y-auto">
                  {filteredConversations.filter(c => c.unread).length > 0 ? (
                    filteredConversations
                      .filter(c => c.unread)
                      .map((conversation) => (
                        <div
                          key={conversation.id}
                          className={`p-4 hover:bg-gray-50 cursor-pointer ${
                            selectedConversation?.id === conversation.id ? "bg-gray-50" : ""
                          }`}
                          onClick={() => setSelectedConversation(conversation)}
                        >
                          <div className="flex items-start gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                {conversation.vendorName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start">
                                <h3 className="font-medium truncate">
                                  {conversation.vendorName}
                                </h3>
                                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                                  {conversation.timestamp.toLocaleTimeString([], { 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                  })}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 truncate">
                                {conversation.lastMessage}
                              </p>
                            </div>
                          </div>
                          <div className="w-2 h-2 bg-primary rounded-full absolute right-4 mt-1"></div>
                        </div>
                      ))
                  ) : (
                    <div className="p-6 text-center text-gray-500">
                      No unread messages
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            {selectedConversation ? (
              <ChatInterface
                vendorId={selectedConversation.vendorId}
                vendorName={selectedConversation.vendorName}
              />
            ) : (
              <Card className="h-[500px] flex items-center justify-center">
                <CardContent className="text-center p-6">
                  <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h2 className="text-xl font-medium text-gray-800 mb-2">
                    No conversation selected
                  </h2>
                  <p className="text-gray-500 mb-4">
                    Select a conversation from the list to view messages
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Messages;
