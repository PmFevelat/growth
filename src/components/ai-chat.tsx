"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus,
  Minus,
  X,
  ChevronDown,
  ArrowUp,
  Mail,
  User,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatProps {
  className?: string;
  onSendMessage?: () => void;
}

interface ContextItem {
  id: string;
  name: string;
  type: 'email' | 'contact' | 'document';
  icon: typeof Mail | typeof User | typeof FileText;
}

const availableContext: ContextItem[] = [
  { id: 'email-outreach', name: 'Pierre-Marie - Outreach', type: 'email', icon: Mail },
  { id: 'email-followup1', name: 'Pierre-Marie - Follow-up 1', type: 'email', icon: Mail },
  { id: 'email-followup2', name: 'Pierre-Marie - Follow-up 2', type: 'email', icon: Mail },
  { id: 'contact-pm', name: 'Pierre-Marie (Slice)', type: 'contact', icon: User },
  { id: 'doc-linkedin', name: 'LinkedIn Profile', type: 'document', icon: FileText },
  { id: 'doc-company', name: 'Company Website', type: 'document', icon: FileText },
  { id: 'doc-reviews', name: 'G2 Reviews', type: 'document', icon: FileText },
];

export function AiChat({ className, onSendMessage }: ChatProps) {
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [hasConversation, setHasConversation] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [selectedContext, setSelectedContext] = useState<ContextItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const addContextRef = useRef<HTMLSpanElement>(null);

  const handleSendMessage = () => {
    if (message.trim()) {
      setUserMessage(message);
      setHasConversation(true);
      setMessage("");
      onSendMessage?.();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const shouldShowPlaceholder = !isFocused && message.trim() === "";

  const handleAddContext = () => {
    setShowContextMenu(!showContextMenu);
  };

  const handleSelectContext = (item: ContextItem) => {
    if (!selectedContext.find(ctx => ctx.id === item.id)) {
      setSelectedContext(prev => [...prev, item]);
    }
    setShowContextMenu(false);
    setSearchQuery("");
  };

  const handleRemoveContext = (itemId: string) => {
    setSelectedContext(prev => prev.filter(ctx => ctx.id !== itemId));
  };

  // Close context menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(event.target as Node) &&
          addContextRef.current && !addContextRef.current.contains(event.target as Node)) {
        setShowContextMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderContextChips = () => {
    return (
      <div className="flex items-center gap-1 flex-wrap">
        <span 
          ref={addContextRef}
          onClick={handleAddContext}
          className="inline-flex items-center gap-0.5 px-1 py-0.5 bg-gray-100 text-gray-600 rounded text-xs cursor-pointer hover:bg-gray-200 transition-colors"
        >
          <span>@</span>
          {selectedContext.length === 0 && <span>Add Context</span>}
        </span>
        {selectedContext.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className="group inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs transition-colors"
              style={{ 
                backgroundColor: '#F3E8FF', 
                color: '#7C3AED',
                border: '0.5px solid #E9D5FF'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#E9D5FF';
                e.currentTarget.style.borderColor = '#DDD6FE';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#F3E8FF';
                e.currentTarget.style.borderColor = '#E9D5FF';
              }}
            >
              <IconComponent className="w-2.5 h-2.5" />
              <span>{item.name}</span>
              <button
                onClick={() => handleRemoveContext(item.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-purple-800"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  const renderContextMenu = () => {
    if (!showContextMenu) return null;

    // Determine if we should show menu above or below based on conversation state
    const menuPosition = hasConversation ? "bottom-full mb-1" : "top-full mt-1";

    const filteredItems = availableContext
      .filter(item => !selectedContext.find(ctx => ctx.id === item.id))
      .filter(item => 
        searchQuery === "" || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return (
      <div 
        ref={contextMenuRef}
        className={`absolute left-0 ${menuPosition} bg-white border border-gray-200 rounded shadow-lg z-50 min-w-[250px]`}
      >
        <div className="p-2 border-b border-gray-100">
          <input
            type="text"
            placeholder="Add files, folders, docs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            autoFocus
          />
        </div>
        <div className="py-1 max-h-48 overflow-y-auto">
          {filteredItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectContext(item)}
                className="w-full px-3 py-1.5 text-left text-xs text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              >
                <IconComponent className="w-3 h-3 text-gray-500" />
                <span>{item.name}</span>
              </button>
            );
          })}
          {filteredItems.length === 0 && (
            <div className="px-3 py-2 text-xs text-gray-500">
              No matching items found
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={cn("h-full bg-gray-50 border-l border-gray-200 flex flex-col", className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-3 border-b border-gray-200 bg-gray-50 h-[42px]">
        <h2 className="text-sm font-medium text-gray-900">New Chat</h2>
        <div className="flex items-center gap-1">
          <Button size="icon" variant="ghost" className="h-5 w-5">
            <Plus className="w-3 h-3" />
          </Button>
          <Button size="icon" variant="ghost" className="h-5 w-5">
            <Minus className="w-3 h-3" />
          </Button>
          <Button size="icon" variant="ghost" className="h-5 w-5">
            <X className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Conversation Content */}
      {hasConversation ? (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-4">
            {/* User Message */}
            <div className="w-full">
              <div className="border border-gray-200 rounded bg-white p-2 text-xs text-gray-600">
                {userMessage}
              </div>
            </div>

            {/* AI Response */}
            <div className="w-full">
              <div className="p-2">
                <h3 className="font-semibold text-sm text-gray-900 mb-3">Enrichment Flow Summary</h3>
                
                <div className="space-y-3 text-xs text-gray-600">
                  <div>
                    <span className="font-medium">Context:</span> Automatic data enrichment for uploaded B2B lead list
                  </div>
                  <div>
                    <span className="font-medium">Objective:</span> Collect key attributes (role, company, signals, tech, contact indicators) to prepare qualified outreach
                  </div>

                  <div className="mt-4">
                    <h4 className="font-medium text-gray-900 mb-2">1. Strategy & Flow Used</h4>
                    
                    <div className="mb-3">
                      <div className="font-medium text-gray-800 mb-1">LinkedIn Parsing</div>
                      <div className="text-gray-600 mb-2">For each lead, attempted match by firstName + lastName + company</div>
                      <div className="font-medium text-gray-800">Extracted:</div>
                      <ul className="list-disc list-inside ml-2 text-gray-600 space-y-0.5">
                        <li>Current title</li>
                        <li>Location</li>
                        <li>Education (when public)</li>
                        <li>Last activity (e.g. post, job change)</li>
                      </ul>
                    </div>

                    <div className="mb-3">
                      <div className="font-medium text-gray-800 mb-1">Company Matching</div>
                      <div className="text-gray-600 mb-2">Used company names to resolve websites (via Clearbit & domain inference)</div>
                      <div className="text-gray-600 mb-2">Scraped home + about + careers pages</div>
                      <div className="font-medium text-gray-800">Extracted:</div>
                      <ul className="list-disc list-inside ml-2 text-gray-600 space-y-0.5">
                        <li>Company size</li>
                        <li>Industry</li>
                        <li>Tech stack (via JS tag detection)</li>
                        <li>Hiring signals (open roles)</li>
                      </ul>
                    </div>

                    <div>
                      <div className="font-medium text-gray-800 mb-1">Signals Detection</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Input at Bottom */}
          <div className="px-3 pt-3 pb-6 border-t border-gray-200">
            <div className="border border-gray-200 rounded bg-white p-2 relative">
              <div className="mb-1.5">
                {renderContextChips()}
                {renderContextMenu()}
              </div>
              <div>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder={shouldShowPlaceholder ? "Plan, search, build anything" : ""}
                  className="w-full min-h-[28px] text-xs border-none focus:ring-0 bg-transparent resize-none p-0 text-gray-600 leading-snug placeholder:text-gray-400 placeholder:text-xs"
                />
                <div className="flex items-center justify-between text-xs mt-0.5">
                  <div className="flex items-center gap-1 text-gray-600">
                    <div className="w-2 h-2 rounded bg-gray-300"></div>
                    <span>OpenAI</span>
                    <ChevronDown className="w-2.5 h-2.5" />
                  </div>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-4 w-4"
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                  >
                    <ArrowUp className="w-2 h-2 text-gray-500" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Initial Chat Input */
        <>
          <div className="px-3 pt-3 pb-6">
            <div className="border border-gray-200 rounded bg-white p-2 relative">
              <div className="mb-1.5">
                {renderContextChips()}
                {renderContextMenu()}
              </div>
              <div>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder={shouldShowPlaceholder ? "Plan, search, build anything" : ""}
                  className="w-full min-h-[28px] text-xs border-none focus:ring-0 bg-transparent resize-none p-0 text-gray-600 leading-snug placeholder:text-gray-400 placeholder:text-xs"
                />
                <div className="flex items-center justify-between text-xs mt-0.5">
                  <div className="flex items-center gap-1 text-gray-600">
                    <div className="w-2 h-2 rounded bg-gray-300"></div>
                    <span>OpenAI</span>
                    <ChevronDown className="w-2.5 h-2.5" />
                  </div>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-4 w-4"
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                  >
                    <ArrowUp className="w-2 h-2 text-gray-500" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1"></div>
        </>
      )}
    </div>
  );
} 