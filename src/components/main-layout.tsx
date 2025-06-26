"use client";

import { useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Sidebar } from "./sidebar";
import { CentralArea } from "./central-area";
import { AiChat } from "./ai-chat";
import { Button } from "./ui/button";
import { Database, X, Clock, Linkedin, Globe, Star, MessageSquare, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export function MainLayout() {
  const [shouldAddTabs, setShouldAddTabs] = useState(false);
  const [shouldShowEmails, setShouldShowEmails] = useState(false);
  const [shouldShowDataTabs, setShouldShowDataTabs] = useState(false);
  const [activeDataTab, setActiveDataTab] = useState("linkedin");

  const handleChatMessage = () => {
    setShouldAddTabs(true);
    setShouldShowEmails(true);
    setShouldShowDataTabs(true);
  };

  const dataTabs = [
    { id: "linkedin", name: "LinkedIn", icon: Linkedin },
    { id: "company", name: "Company Site", icon: Globe },
    { id: "reviews", name: "G2 Reviews", icon: Star },
    { id: "news", name: "Google News", icon: MessageSquare },
    { id: "custom", name: "Custom", icon: Settings },
    { id: "custom2", name: "Custom 2", icon: Settings },
    { id: "custom3", name: "Custom 3", icon: Settings },
    { id: "custom4", name: "Custom 4", icon: Settings },
    { id: "custom5", name: "Custom 5", icon: Settings },
  ];
  return (
    <div className="h-screen bg-gray-100">
      <PanelGroup direction="horizontal">
        {/* Sidebar */}
        <Panel defaultSize={15} minSize={12} maxSize={30}>
          <Sidebar />
        </Panel>

        <PanelResizeHandle className="w-1 bg-gray-200 hover:bg-indigo-500 transition-all cursor-col-resize flex items-center justify-center group">
          <div className="w-1 h-3 bg-gray-100 group-hover:bg-white transition-colors opacity-20 group-hover:opacity-100"></div>
        </PanelResizeHandle>

        {/* Central Area with vertical split */}
        <Panel defaultSize={55} minSize={40}>
          <PanelGroup direction="vertical">
            {/* Top panel */}
            <Panel defaultSize={50} minSize={30}>
              <CentralArea shouldAddTabs={shouldAddTabs} shouldShowEmails={shouldShowEmails} />
            </Panel>

            <PanelResizeHandle className="h-1 bg-gray-200 hover:bg-indigo-500 transition-all cursor-row-resize flex items-center justify-center group">
              <div className="h-1 w-3 bg-gray-100 group-hover:bg-white transition-colors opacity-20 group-hover:opacity-100"></div>
            </PanelResizeHandle>

            {/* Bottom panel - Enrichment data */}
            <Panel defaultSize={50} minSize={20}>
              <div className="h-full bg-white flex flex-col">
                {/* Bottom Tabs */}
                <div className="flex items-center border-b border-gray-200 bg-gray-50 h-[42px]">
                  {shouldShowDataTabs ? (
                    <>
                      {/* Scrollable Data Tabs Container */}
                      <div className="flex-1 overflow-x-auto thin-horizontal-scroll">
                        <div className="flex">
                          {dataTabs.map((tab) => {
                            const IconComponent = tab.icon;
                            return (
                              <button
                                key={tab.id}
                                onClick={() => setActiveDataTab(tab.id)}
                                className={cn(
                                  "flex items-center gap-2 px-3 h-[42px] border-r border-gray-200 hover:bg-white transition-colors text-xs min-w-[100px] flex-shrink-0",
                                  activeDataTab === tab.id ? "bg-white" : "bg-gray-50"
                                )}
                              >
                                <IconComponent className="w-3 h-3 text-blue-600 flex-shrink-0" />
                                <span className="text-gray-900 font-medium text-[11px] leading-tight">{tab.name}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  ) : (
                    <button className="flex items-center gap-2 px-4 h-full border-r border-gray-200 bg-white transition-colors text-xs min-w-[140px]">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center bg-orange-100 flex-shrink-0">
                        <Clock className="w-2.5 h-2.5 text-orange-600" />
                      </div>
                      <div className="flex flex-col items-start min-w-0 flex-1">
                        <span className="text-gray-900 font-medium truncate text-[11px] leading-tight">Pending</span>
                        <span className="text-gray-500 text-[9px] leading-tight">Enrichment</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-3 w-3 hover:bg-gray-100 flex-shrink-0"
                      >
                        <X className="w-2 h-2" />
                      </Button>
                    </button>
                  )}
                </div>
                
                <div className="flex-1 min-h-0">
                  {shouldShowDataTabs ? (
                    <div className="h-full">
                                             {activeDataTab === "linkedin" && (
                         <div className="h-full bg-white overflow-y-auto thin-vertical-scroll">
                           <div className="p-2">
                             <h3 className="text-xs font-semibold text-gray-900 mb-2">LinkedIn Profile</h3>
                             
                             <div className="space-y-2">
                               <div className="bg-blue-50 rounded p-2 border border-blue-100">
                                 <div className="flex items-center gap-1">
                                   <Linkedin className="w-3 h-3 text-blue-600" />
                                   <a 
                                     href="https://www.linkedin.com/in/pierre-marie-fevelat-a111911a3/" 
                                     target="_blank" 
                                     rel="noopener noreferrer"
                                     className="text-xs text-blue-600 hover:underline font-medium"
                                   >
                                     linkedin.com/in/pierre-marie-fevelat-a111911a3
                                   </a>
                                 </div>
                               </div>
                               <div className="bg-gray-50 rounded p-2">
                                 <div className="flex items-center gap-2 mb-1">
                                   <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center">
                                     <span className="text-white text-xs font-medium">PM</span>
                                   </div>
                                   <div>
                                     <h4 className="text-xs font-medium text-gray-900">Pierre-Marie Fevelat</h4>
                                     <p className="text-xs text-gray-600">CEO & Co-founder at Slice</p>
                                   </div>
                                 </div>
                                 <p className="text-xs text-gray-500">📍 Paris, France • 500+ connections</p>
                               </div>
                               
                               <div className="bg-gray-50 rounded p-2">
                                 <h5 className="text-xs font-medium text-gray-900 mb-1">Experience</h5>
                                 <div className="text-xs text-gray-600">
                                   <div className="mb-1">CEO & Co-founder • Slice • 2019 - Present</div>
                                   <div>HEC Paris • Master in Management</div>
                                 </div>
                               </div>
                               
                               <div className="bg-gray-50 rounded p-2">
                                 <h5 className="text-xs font-medium text-gray-900 mb-1">Skills</h5>
                                 <div className="flex flex-wrap gap-1">
                                   <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded text-xs">FinTech</span>
                                   <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded text-xs">Payments</span>
                                   <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded text-xs">Strategy</span>
                                 </div>
                               </div>
                             </div>
                           </div>
                         </div>
                       )}
                                             {activeDataTab === "company" && (
                         <div className="h-full bg-white overflow-y-auto thin-vertical-scroll">
                           <div className="p-2">
                             <h3 className="text-xs font-semibold text-gray-900 mb-2">Company Website</h3>
                             
                             <div className="space-y-2">
                               <div className="bg-green-50 rounded p-2 border border-green-100">
                                 <div className="flex items-center gap-1">
                                   <Globe className="w-3 h-3 text-green-600" />
                                   <a 
                                     href="https://www.hec.edu/fr" 
                                     target="_blank" 
                                     rel="noopener noreferrer"
                                     className="text-xs text-green-600 hover:underline font-medium"
                                   >
                                     www.hec.edu/fr
                                   </a>
                                 </div>
                               </div>
                               <div className="bg-gray-50 rounded p-2">
                                 <h4 className="text-xs font-medium text-gray-900 mb-1">HEC Paris</h4>
                                 <p className="text-xs text-gray-600 mb-1">Grande École de Commerce • Business School</p>
                                 <p className="text-xs text-gray-500">📍 Jouy-en-Josas, France</p>
                               </div>
                               
                               <div className="bg-gray-50 rounded p-2">
                                 <h5 className="text-xs font-medium text-gray-900 mb-1">Programs</h5>
                                 <div className="text-xs text-gray-600 space-y-0.5">
                                   <div>• Master in Management (Grande École)</div>
                                   <div>• MBA Programs</div>
                                   <div>• Executive Education</div>
                                   <div>• PhD Program</div>
                                 </div>
                               </div>
                               
                               <div className="bg-gray-50 rounded p-2">
                                 <h5 className="text-xs font-medium text-gray-900 mb-1">Rankings</h5>
                                 <div className="flex flex-wrap gap-1">
                                   <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded text-xs">#2 Global MBA</span>
                                   <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded text-xs">#1 Europe</span>
                                   <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded text-xs">Top 5 Global</span>
                                 </div>
                               </div>
                             </div>
                           </div>
                         </div>
                       )}
                       {activeDataTab === "reviews" && (
                         <div className="h-full bg-white overflow-y-auto thin-vertical-scroll">
                           <div className="p-2">
                             <h3 className="text-xs font-semibold text-gray-900 mb-2">G2 Reviews</h3>
                             
                             <div className="space-y-2">
                               <div className="bg-yellow-50 rounded p-2 border border-yellow-100">
                                 <div className="flex items-center gap-1">
                                   <Star className="w-3 h-3 text-yellow-600" />
                                   <a 
                                     href="https://www.g2.com/products/lemlist/reviews" 
                                     target="_blank" 
                                     rel="noopener noreferrer"
                                     className="text-xs text-yellow-600 hover:underline font-medium"
                                   >
                                     www.g2.com/products/lemlist/reviews
                                   </a>
                                 </div>
                               </div>
                               <div className="bg-gray-50 rounded p-2">
                                 <div className="flex items-center justify-between mb-1">
                                   <h4 className="text-xs font-medium text-gray-900">Lemlist</h4>
                                   <div className="flex items-center gap-1">
                                     <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                     <span className="text-xs font-medium">4.4/5</span>
                                   </div>
                                 </div>
                                 <p className="text-xs text-gray-600">Cold email outreach platform</p>
                                 <p className="text-xs text-gray-500">392 reviews • Email Marketing category</p>
                               </div>
                               
                               <div className="bg-gray-50 rounded p-2">
                                 <h5 className="text-xs font-medium text-gray-900 mb-1">Top Reviews</h5>
                                 <div className="space-y-1">
                                   <div className="text-xs text-gray-600">
                                     <div className="flex items-center gap-1 mb-0.5">
                                       <div className="flex">
                                         {[...Array(5)].map((_, i) => (
                                           <Star key={i} className="w-2.5 h-2.5 text-yellow-400 fill-current" />
                                         ))}
                                       </div>
                                       <span className="font-medium">Great for personalized outreach</span>
                                     </div>
                                     <p>"Easy to use and very effective for cold email campaigns"</p>
                                   </div>
                                   <div className="text-xs text-gray-600">
                                     <div className="flex items-center gap-1 mb-0.5">
                                       <div className="flex">
                                         {[...Array(4)].map((_, i) => (
                                           <Star key={i} className="w-2.5 h-2.5 text-yellow-400 fill-current" />
                                         ))}
                                         <Star className="w-2.5 h-2.5 text-gray-300" />
                                       </div>
                                       <span className="font-medium">Good automation features</span>
                                     </div>
                                     <p>"Solid platform with good deliverability rates"</p>
                                   </div>
                                 </div>
                               </div>
                               
                               <div className="bg-gray-50 rounded p-2">
                                 <h5 className="text-xs font-medium text-gray-900 mb-1">Categories</h5>
                                 <div className="flex flex-wrap gap-1">
                                   <span className="bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded text-xs">Email Marketing</span>
                                   <span className="bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded text-xs">Lead Generation</span>
                                   <span className="bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded text-xs">Sales Automation</span>
                                 </div>
                               </div>
                             </div>
                           </div>
                         </div>
                       )}
                       {!["linkedin", "company", "reviews"].includes(activeDataTab) && (
                         <div className="h-full flex items-center justify-center">
                           <div className="text-center">
                             <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                               <Database className="w-5 h-5 text-gray-400" />
                             </div>
                             <h3 className="text-sm font-medium text-gray-900 mb-1">No data loaded yet</h3>
                             <p className="text-xs text-gray-500">Enrichment results will appear here.</p>
                           </div>
                         </div>
                       )}
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                          <Database className="w-5 h-5 text-gray-400" />
                        </div>
                        <h3 className="text-sm font-medium text-gray-900 mb-1">No data loaded yet</h3>
                        <p className="text-xs text-gray-500">Enrichment results will appear here.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Panel>
          </PanelGroup>
        </Panel>

        <PanelResizeHandle className="w-1 bg-gray-200 hover:bg-indigo-500 transition-all cursor-col-resize flex items-center justify-center group">
          <div className="w-1 h-3 bg-gray-100 group-hover:bg-white transition-colors opacity-20 group-hover:opacity-100"></div>
        </PanelResizeHandle>

        {/* AI Chat Panel */}
        <Panel defaultSize={30} minSize={20} maxSize={40}>
          <AiChat onSendMessage={handleChatMessage} />
        </Panel>
      </PanelGroup>
    </div>
  );
} 