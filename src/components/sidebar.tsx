"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  ChevronDown,
  ChevronRight,
  Plus,
  MoreHorizontal,
  User,
  Building2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Contact {
  id: string;
  name: string;
  company?: string;
  type: "individual" | "company";
  status: "pending" | "contacted" | "replied";
}

interface ContactList {
  id: string;
  name: string;
  contacts: Contact[];
  expanded: boolean;
}

interface SidebarProps {
  className?: string;
}

const contactLists: ContactList[] = [
  {
    id: "fintech",
    name: "FinTech VPs",
    expanded: true,
    contacts: [
      { id: "1", name: "Pierre-Marie (Slice)", type: "individual", status: "pending" },
      { id: "2", name: "Username (company)", type: "company", status: "pending" },
      { id: "3", name: "Username (company)", type: "company", status: "pending" },
    ]
  },
  {
    id: "saas",
    name: "US SaaS Decision Makers",
    expanded: false,
    contacts: []
  },
  {
    id: "enterprise",
    name: "UK Enterprise Prospects", 
    expanded: false,
    contacts: []
  }
];

export function Sidebar({ className }: SidebarProps) {
  const [lists, setLists] = useState<ContactList[]>(contactLists);

  const toggleList = (listId: string) => {
    setLists(prev => prev.map(list => 
      list.id === listId 
        ? { ...list, expanded: !list.expanded }
        : list
    ));
  };

  const getContactIcon = (contact: Contact) => {
    return contact.type === "individual" ? 
      <User className="w-2.5 h-2.5" /> : 
      <Building2 className="w-2.5 h-2.5" />;
  };

  return (
    <div className={cn("h-full bg-white border-r border-gray-200 flex flex-col", className)}>
      {/* Header */}
      <div className="px-3 border-b border-gray-200 h-[42px] flex items-center">
        <Button className="w-full justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white h-6 font-medium text-xs">
          <Plus className="w-3 h-3" />
          Import List
        </Button>
      </div>

      {/* Contact Lists */}
      <ScrollArea className="flex-1">
        <div className="p-1 space-y-0.5">
          {lists.map((list) => (
            <div key={list.id} className="space-y-0.5">
              {/* List Header */}
              <button
                onClick={() => toggleList(list.id)}
                className="w-full flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 rounded group"
              >
                {list.expanded ? (
                  <ChevronDown className="w-3 h-3 text-gray-500" />
                ) : (
                  <ChevronRight className="w-3 h-3 text-gray-500" />
                )}
                <span className="flex-1 text-left whitespace-nowrap overflow-hidden text-ellipsis">{list.name}</span>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-4 w-4 opacity-0 group-hover:opacity-100 hover:bg-gray-100"
                >
                  <MoreHorizontal className="w-2.5 h-2.5 text-gray-500" />
                </Button>
              </button>

              {/* Contacts */}
              {list.expanded && (
                <div className="ml-4 space-y-0">
                  {list.contacts.map((contact) => (
                    <button
                      key={contact.id}
                      className="w-full flex items-center gap-1.5 px-2 py-1 text-xs rounded hover:bg-gray-50 group"
                    >
                      <div className="flex-shrink-0 w-3.5 h-3.5 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                        {getContactIcon(contact)}
                      </div>
                      
                      <span className="flex-1 text-left text-gray-700 truncate">
                        {contact.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>


    </div>
  );
} 