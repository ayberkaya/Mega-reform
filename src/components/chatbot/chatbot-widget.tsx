"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChatbotStore, type ChatMessage } from "@/store/chatbot-store";
import { CHATBOT_GREETING } from "@/content/chatbot-prompts";
import { Button } from "@/components/ui/button";
import { tr } from "@/content/tr";
import { cn } from "@/lib/utils/cn";

export function ChatbotWidget() {
  const {
    isOpen,
    toggle,
    messages,
    addMessage,
    isTyping,
    setTyping,
    setMood,
    recommendedExperts,
    setRecommendedExperts,
    reset,
  } = useChatbotStore();

  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Add greeting on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addMessage({
        id: "greeting",
        role: "assistant",
        content: CHATBOT_GREETING,
        timestamp: new Date(),
      });
    }
  }, [isOpen, messages.length, addMessage]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    addMessage(userMessage);
    setInput("");
    setTyping(true);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) throw new Error("API error");

      const data = await response.json();

      // Parse analysis if present
      if (data.analysis) {
        if (data.analysis.mood) setMood(data.analysis.mood);
        if (data.analysis.recommendExperts && data.experts) {
          setRecommendedExperts(data.experts);
        }
      }

      addMessage({
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.message,
        timestamp: new Date(),
      });
    } catch {
      addMessage({
        id: `error-${Date.now()}`,
        role: "assistant",
        content:
          "Ozur dilerim, simdilik yanitlayamiyorum. Lutfen biraz sonra tekrar deneyin.",
        timestamp: new Date(),
      });
    } finally {
      setTyping(false);
    }
  };

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        type="button"
        onClick={toggle}
        className={cn(
          "fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300",
          "bg-gradient-to-r from-primary to-primary-light text-white",
          "hover:shadow-2xl hover:scale-105",
          isOpen && "scale-0 opacity-0"
        )}
        animate={{ scale: isOpen ? 0 : 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Ruhsal rehberle sohbet"
      >
        {/* Breathing ring */}
        <span className="absolute inset-0 rounded-full animate-breathe border-2 border-lavender/30" />
        <svg className="w-6 h-6" viewBox="0 0 32 32" fill="currentColor">
          <path d="M16 4c-2 4-6 8-6 12s2.7 7.3 6 8c3.3-.7 6-4 6-8s-4-8-6-12z" />
          <path d="M16 4c-4 3-10 6-12 10 2 4 6 6 10 7-2-3-3.5-8-2-13 1-2 2.5-3 4-4z" opacity="0.6" />
          <path d="M16 4c4 3 10 6 12 10-2 4-6 6-10 7 2-3 3.5-8 2-13-1-2-2.5-3-4-4z" opacity="0.6" />
        </svg>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[560px] max-h-[calc(100vh-120px)] rounded-2xl overflow-hidden shadow-2xl border border-lavender/20 bg-white/95 backdrop-blur-xl flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary-light p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 32 32" fill="currentColor">
                    <path d="M16 4c-2 4-6 8-6 12s2.7 7.3 6 8c3.3-.7 6-4 6-8s-4-8-6-12z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-heading font-semibold text-sm">
                    {tr.chatbot.title}
                  </h3>
                  <p className="text-white/60 text-xs">Mega Reform</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => reset()}
                  className="text-white/50 hover:text-white/90 transition-colors p-1"
                  title={tr.chatbot.newChat}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={toggle}
                  className="text-white/50 hover:text-white/90 transition-colors p-1"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex",
                    msg.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                      msg.role === "user"
                        ? "bg-primary text-white rounded-br-md"
                        : "bg-lavender-light/50 text-foreground rounded-bl-md"
                    )}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Expert recommendations */}
              {recommendedExperts.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs text-foreground/50 font-medium">
                    {tr.chatbot.expertRecommendation}
                  </p>
                  {recommendedExperts.map((expert) => (
                    <a
                      key={expert.slug}
                      href={`/uzmanlar/${expert.slug}`}
                      className="block p-3 rounded-xl bg-sage/10 border border-sage/20 hover:bg-sage/20 transition-colors"
                    >
                      <p className="font-heading font-semibold text-sm text-primary">
                        {expert.name}
                      </p>
                      <p className="text-xs text-foreground/50">{expert.title}</p>
                      <p className="text-xs text-sage mt-1">{expert.reason}</p>
                    </a>
                  ))}
                </div>
              )}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-lavender-light/50 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="p-3 border-t border-lavender/10 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={tr.chatbot.placeholder}
                  className="flex-1 h-10 px-4 rounded-full bg-lavender-light/30 border border-lavender/20 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-lavender/50"
                  disabled={isTyping}
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="icon"
                  disabled={!input.trim() || isTyping}
                  className="shrink-0 w-10 h-10"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
