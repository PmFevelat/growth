"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Bold,
  Italic,
  Underline,
  Link,
  Image,
  Type,
  Palette,
  Send,
  Save,
  MoreHorizontal,
  Eye,
  TestTube,
  Copy,
  Sparkles,
  Wand2,
  RefreshCw,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface EmailTemplate {
  subject: string;
  body: string;
  personalization: string[];
}

interface EmailEditorProps {
  className?: string;
}

const emailTemplates: EmailTemplate[] = [
  {
    subject: "Bonjour {{firstName}}, augmentons vos ventes de {{companyType}}",
    body: `Bonjour {{firstName}},

J'ai remarqué que {{companyName}} propose des solutions {{companyType}} innovantes. Votre approche de {{businessFocus}} m'a particulièrement intéressé.

Chez Growth, nous aidons des entreprises comme la vôtre à augmenter leurs revenus de 40% en moyenne grâce à notre plateforme d'automatisation des ventes.

{{caseStudy}}

Seriez-vous disponible pour un appel de 15 minutes cette semaine pour discuter de comment nous pourrions vous aider à {{specificGoal}} ?

Cordialement,
{{senderName}}`,
    personalization: ["firstName", "companyName", "companyType", "businessFocus", "caseStudy", "specificGoal", "senderName"]
  }
];

export function EmailEditor({ className }: EmailEditorProps) {
  const [template, setTemplate] = useState<EmailTemplate>(emailTemplates[0]);
  const [isPreview, setIsPreview] = useState(false);
  const [emailStatus, setEmailStatus] = useState<"draft" | "ready" | "sending" | "sent">("draft");

  const handlePersonalizationInsert = (variable: string) => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (textarea) {
      const cursorPos = textarea.selectionStart;
      const textBefore = template.body.substring(0, cursorPos);
      const textAfter = template.body.substring(cursorPos);
      const newBody = textBefore + `{{${variable}}}` + textAfter;
      setTemplate(prev => ({ ...prev, body: newBody }));
    }
  };

  const getStatusIcon = () => {
    switch (emailStatus) {
      case "draft": return <Clock className="w-4 h-4 text-orange-500" />;
      case "ready": return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "sending": return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />;
      case "sent": return <CheckCircle className="w-4 h-4 text-green-600" />;
    }
  };

  const getStatusText = () => {
    switch (emailStatus) {
      case "draft": return "Brouillon";
      case "ready": return "Prêt à envoyer";
      case "sending": return "Envoi en cours...";
      case "sent": return "Envoyé";
    }
  };

  return (
    <div className={cn("bg-background border border-border rounded-lg overflow-hidden", className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <span className="text-sm font-medium">{getStatusText()}</span>
          </div>
          <Separator orientation="vertical" className="h-4" />
          <Badge variant="secondary" className="text-xs">
            Template 1
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="ghost" onClick={() => setIsPreview(!isPreview)}>
                  <Eye className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Prévisualiser</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="ghost">
                  <TestTube className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Test A/B</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Save className="w-4 h-4 mr-2" />
                Sauvegarder
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="w-4 h-4 mr-2" />
                Dupliquer
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <AlertCircle className="w-4 h-4 mr-2" />
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Toolbar */}
      {!isPreview && (
        <div className="flex items-center gap-2 p-3 border-b border-border bg-background">
          <div className="flex items-center gap-1">
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <Bold className="w-3.5 h-3.5" />
            </Button>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <Italic className="w-3.5 h-3.5" />
            </Button>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <Underline className="w-3.5 h-3.5" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-5" />

          <div className="flex items-center gap-1">
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <Link className="w-3.5 h-3.5" />
            </Button>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <Image className="w-3.5 h-3.5" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-5" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost" className="gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                Personnalisation
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {template.personalization.map((variable) => (
                <DropdownMenuItem
                  key={variable}
                  onClick={() => handlePersonalizationInsert(variable)}
                >
                  <span className="font-mono text-xs">
                    {`{{${variable}}}`}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button size="sm" variant="ghost" className="gap-2 ml-auto">
            <Wand2 className="w-3.5 h-3.5" />
            IA Assistant
          </Button>
        </div>
      )}

      {/* Email Content */}
      <div className="p-4 space-y-4">
        {/* Subject Line */}
        <div className="space-y-2">
          <Label htmlFor="subject" className="text-sm font-medium">Objet</Label>
          <Input
            id="subject"
            value={template.subject}
            onChange={(e) => setTemplate(prev => ({ ...prev, subject: e.target.value }))}
            placeholder="Objet de votre email..."
            className="font-medium"
          />
        </div>

        {/* Email Body */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="body" className="text-sm font-medium">Corps du message</Label>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{template.body.length} caractères</span>
              <Separator orientation="vertical" className="h-3" />
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {template.personalization.length} variables
              </span>
            </div>
          </div>
          
          {isPreview ? (
            <div className="min-h-[300px] p-4 border border-border rounded-md bg-muted/30">
              <div className="space-y-4">
                <div className="text-sm">
                  <strong>À:</strong> example@company.com
                </div>
                <div className="text-sm">
                  <strong>Objet:</strong> {template.subject}
                </div>
                <Separator />
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-sm">
                    {template.body}
                  </pre>
                </div>
              </div>
            </div>
          ) : (
            <Textarea
              id="body"
              value={template.body}
              onChange={(e) => setTemplate(prev => ({ ...prev, body: e.target.value }))}
              placeholder="Rédigez votre message..."
              className="min-h-[300px] font-mono text-sm leading-relaxed resize-none"
            />
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <Select defaultValue="campaign1">
              <SelectTrigger className="w-[200px] h-9">
                <SelectValue placeholder="Choisir une séquence" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="campaign1">Séquence Cold Outreach</SelectItem>
                <SelectItem value="campaign2">Follow-up Sequence</SelectItem>
                <SelectItem value="campaign3">Warm Leads</SelectItem>
              </SelectContent>
            </Select>
            
            <Badge variant="outline" className="text-xs">
              892 leads sélectionnés
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Save className="w-4 h-4 mr-2" />
              Sauvegarder
            </Button>
            
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <Send className="w-4 h-4 mr-2" />
              Ajouter à la séquence
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 