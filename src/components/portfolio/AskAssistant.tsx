import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { MessageCircleQuestion, X } from "lucide-react";
import { Conversation, ConversationContent, ConversationEmptyState, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { PromptInput, PromptInputTextarea, PromptInputFooter, PromptInputSubmit, type PromptInputMessage } from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";

const suggestions = ["What did Sarguna do at Nexila?", "Tell me about the disease prediction project", "Which BI tools does she use?"];

function Monogram({ small }: { small?: boolean }) {
  return <span className={`inline-flex shrink-0 items-center justify-center rounded-lg bg-brand font-mono font-bold text-primary-foreground ${small ? "h-7 w-7 text-[10px]" : "h-12 w-12 text-sm"}`} aria-hidden="true">SE</span>;
}

export function AskAssistant() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    onError: (e) => {
      const m = e.message || "";
      setError(m.includes("429") ? "Too many questions right now — please wait a moment." : m.includes("402") ? "The assistant is temporarily unavailable." : "Something went wrong. Please try again.");
    },
  });
  const busy = status === "submitted" || status === "streaming";

  const ask = (text: string) => {
    if (!text.trim() || busy) return;
    setError(null);
    sendMessage({ text });
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={open ? "Close assistant" : "Ask about Sarguna"}
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
      >
        {open ? <X className="h-4 w-4" /> : <MessageCircleQuestion className="h-4 w-4" />}
        <span className="hidden sm:inline">{open ? "Close" : "Ask about me"}</span>
      </button>
      {open && (
        <div role="dialog" aria-label="Portfolio assistant" className="fixed inset-x-3 bottom-20 z-50 flex h-[min(560px,75vh)] flex-col overflow-hidden rounded-2xl border border-border bg-popover shadow-glow sm:left-auto sm:right-5 sm:w-[400px]">
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <Monogram small />
            <div>
              <p className="text-sm font-semibold">Ask about Sarguna</p>
              <p className="text-xs text-muted-foreground">AI answers from this portfolio</p>
            </div>
          </div>
          <Conversation className="flex-1">
            <ConversationContent>
              {messages.length === 0 ? (
                <ConversationEmptyState icon={<Monogram />} title="Hi! Ask me anything" description="About Sarguna's experience, projects, skills or education.">
                  <Monogram />
                  <p className="mt-3 text-sm font-medium">Hi! Ask me anything</p>
                  <p className="text-xs text-muted-foreground">About Sarguna's experience, projects, skills or education.</p>
                  <div className="mt-4 flex flex-col gap-2">
                    {suggestions.map((s) => (
                      <button key={s} onClick={() => ask(s)} className="rounded-lg border border-border bg-secondary px-3 py-2 text-left text-xs hover:border-accent">{s}</button>
                    ))}
                  </div>
                </ConversationEmptyState>
              ) : (
                messages.map((m) => (
                  <Message key={m.id} from={m.role}>
                    <MessageContent className={m.role === "user" ? "group-[.is-user]:bg-primary group-[.is-user]:text-primary-foreground" : ""}>
                      {m.parts.map((p, i) => (p.type === "text" ? <MessageResponse key={i}>{p.text}</MessageResponse> : null))}
                    </MessageContent>
                  </Message>
                ))
              )}
              {status === "submitted" && <Shimmer className="text-sm">Thinking...</Shimmer>}
              {error && <p role="alert" className="text-xs text-destructive">{error}</p>}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>
          <div className="border-t border-border p-3">
            <PromptInput onSubmit={(msg: PromptInputMessage) => ask(msg.text ?? "")}>
              <PromptInputTextarea placeholder="Ask about projects, skills…" autoFocus />
              <PromptInputFooter className="justify-end">
                <PromptInputSubmit status={status} onStop={stop} />
              </PromptInputFooter>
            </PromptInput>
          </div>
        </div>
      )}
    </>
  );
}
