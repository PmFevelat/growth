"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Send, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  name: string;
  initials: string;
  type: string;
  color: string;
}

interface CentralAreaProps {
  className?: string;
  shouldAddTabs?: boolean;
  shouldShowEmails?: boolean;
}

const tabs: Tab[] = [
  { id: "pm", name: "Pierre-Marie", initials: "PM", type: "Outreach", color: "bg-indigo-600" },
];

const emailTemplates = {
  "pm": {
    subject: "Quick question about Slice's payment infrastructure",
    content: `Hi Pierre-Marie,

I hope this email finds you well. I came across your work at Slice and was impressed by how you're revolutionizing payment solutions for the restaurant industry.

I'm reaching out because we've been helping similar fintech companies like yours optimize their data enrichment processes to better understand their merchant base. Given Slice's rapid growth and focus on local restaurants, I thought this might be relevant for your team.

Would you be open to a brief 15-minute call this week to discuss how other payment platforms are leveraging enhanced merchant data to:
• Improve underwriting accuracy by 40%
• Reduce onboarding time for new restaurants
• Identify high-value merchant prospects more effectively

I understand your time is valuable, so I've prepared a brief case study specifically relevant to Slice's market position that I could share during our conversation.

Would Tuesday or Wednesday afternoon work better for you?

Best regards,
Alex Chen
Senior Solutions Consultant
DataFlow Solutions

P.S. I noticed Slice recently expanded to Chicago - congratulations on the growth!`
  },
  "pm2": {
    subject: "Follow-up: Data enrichment for Slice",
    content: `Hi Pierre-Marie,

I wanted to follow up on my previous email about data enrichment solutions for Slice. I understand you're likely busy with the recent expansion initiatives.

Since my last email, I've put together a specific analysis showing how payment platforms similar to Slice have seen measurable improvements:

• Toast increased merchant retention by 25% using enhanced data insights
• Square reduced fraud detection false positives by 35%
• A regional payment processor (similar size to Slice) improved merchant acquisition cost by 30%

I've prepared a 5-minute demo that's specifically tailored to the restaurant payment space. It would take less time than this email to show you the potential impact.

Would a quick call make sense this week? I'm flexible on timing and can work around your schedule.

Alternatively, if you'd prefer, I can send over the case study for you to review at your convenience.

Looking forward to hearing from you.

Best,
Alex Chen
DataFlow Solutions

Direct: (555) 123-4567`
  },
  "pm3": {
    subject: "Last touch base - merchant data insights for Slice",
    content: `Hi Pierre-Marie,

I hope you don't mind one final follow-up. I know your inbox is probably flooded with vendor outreach, but I wanted to share something that might be immediately valuable.

I've been tracking the restaurant industry recovery trends, and I noticed that payment volumes in Slice's key markets (NYC, LA, Chicago) are showing interesting patterns that could inform your merchant acquisition strategy.

Rather than asking for your time, I'd like to offer something useful:

I've compiled a brief market analysis specifically for Slice showing:
• Restaurant closure/opening trends in your target markets
• Payment volume recovery patterns by restaurant type
• Emerging opportunities in the ghost kitchen segment

This analysis took our team about 8 hours to compile, but I think it could provide immediate strategic value for your Q4 planning.

Would you like me to send this over? No strings attached - consider it a gesture of goodwill from one fintech professional to another.

If the insights prove valuable and you'd like to explore how we could provide ongoing market intelligence, we can discuss that separately.

Just reply with "send it" and I'll get this to you within the hour.

Best regards,
Alex Chen
DataFlow Solutions

P.S. Congrats on the Series B announcement! Excited to see how Slice continues to grow.`
  }
};

export function CentralArea({ className, shouldAddTabs, shouldShowEmails }: CentralAreaProps) {
  const [activeTab, setActiveTab] = useState("pm");
  const [currentTabs, setCurrentTabs] = useState(tabs);
  const [tabsAdded, setTabsAdded] = useState(false);

  const closeTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentTabs(prev => prev.filter(tab => tab.id !== tabId));
    if (activeTab === tabId && currentTabs.length > 1) {
      const remainingTabs = currentTabs.filter(tab => tab.id !== tabId);
      setActiveTab(remainingTabs[0]?.id || "");
    }
  };

  useEffect(() => {
    if (shouldAddTabs && !tabsAdded) {
      const newTabs = [
        { id: "pm2", name: "Pierre-Marie", initials: "PM", type: "Follow-up 1", color: "bg-indigo-600" },
        { id: "pm3", name: "Pierre-Marie", initials: "PM", type: "Follow-up 2", color: "bg-indigo-600" },
      ];
      setCurrentTabs(prev => [...prev, ...newTabs]);
      setTabsAdded(true);
    }
  }, [shouldAddTabs, tabsAdded]);

  const getCurrentEmail = () => {
    return emailTemplates[activeTab as keyof typeof emailTemplates];
  };

  return (
    <div className={cn("h-full bg-white flex flex-col", className)}>
      {/* Tabs */}
      <div className="flex items-center border-b border-gray-200 bg-gray-50 h-[42px]">
        {/* Scrollable Tabs Container */}
        <div className="flex-1 overflow-x-auto thin-horizontal-scroll">
          <div className="flex">
            {currentTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 h-[42px] border-r border-gray-200 hover:bg-white transition-colors text-xs min-w-[200px] flex-shrink-0",
                  activeTab === tab.id ? "bg-white" : "bg-gray-50"
                )}
              >
                <div className={cn("w-4 h-4 rounded-full flex items-center justify-center text-white text-[9px] font-medium flex-shrink-0", tab.color)}>
                  {tab.initials}
                </div>
                <span className="text-gray-900 font-medium text-[11px] leading-tight">{tab.name}</span>
                <span className="ml-auto bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-[9px] font-medium">{tab.type}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => closeTab(tab.id, e)}
                  className="h-3 w-3 hover:bg-gray-100 flex-shrink-0"
                >
                  <X className="w-2 h-2" />
                </Button>
              </button>
            ))}
          </div>
        </div>
        
        {/* Fixed Send Button */}
        <div className="border-l border-gray-200 px-3 h-full flex items-center bg-gray-50 flex-shrink-0">
          <Button className="bg-black hover:bg-gray-800 text-white h-6 px-3 text-xs font-medium">
            <Send className="w-2.5 h-2.5 mr-1" />
            Send
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-white overflow-y-auto min-h-0 thin-vertical-scroll">
        {shouldShowEmails && getCurrentEmail() ? (
          <div className="p-3">
            <div className="mb-3">
              <h2 className="text-sm font-semibold text-gray-900 mb-1">Subject: {getCurrentEmail().subject}</h2>
              <div className="flex items-center gap-3 text-xs text-gray-600 border-b border-gray-200 pb-2">
                <span><strong>To:</strong> pierre-marie@slice.com</span>
                <span><strong>From:</strong> alex.chen@dataflow.com</span>
              </div>
            </div>
            
            <div className="whitespace-pre-line text-xs text-gray-800 leading-relaxed">
              {getCurrentEmail().content}
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <Mail className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">No outreach message yet</h3>
              <p className="text-xs text-gray-500">Ask the assistant to start analyzing your lead list.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 