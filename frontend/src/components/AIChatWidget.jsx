import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, User } from 'lucide-react';

import useUIStore from '../store/uiStore';

const AIChatWidget = () => {
    const { isAIChatOpen, setAIChatOpen } = useUIStore();
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([
        { role: 'ai', content: 'Hi there! I\'m your fashion assistant. Looking for something specific or need style advice?' }
    ]);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory, isAIChatOpen]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        // Add user message
        const userMsg = { role: 'user', content: message };
        setChatHistory(prev => [...prev, userMsg]);
        setMessage('');

        // Simulate AI response (mock for now)
        setTimeout(() => {
            const aiMsg = {
                role: 'ai',
                content: "I'm processing your request... My brain isn't fully connected to the backend yet, but I think you have great taste! ✨"
            };
            setChatHistory(prev => [...prev, aiMsg]);
        }, 1000);
    };

    return (
        <>
            {/* Floating Action Button - Only show when closed */}
            {!isAIChatOpen && (
                <button
                    onClick={() => setAIChatOpen(true)}
                    className="fixed bottom-6 right-6 z-50 p-4 bg-black text-white rounded-full shadow-2xl hover:scale-110 hover:shadow-gray-500/50 transition-all duration-300 group"
                    aria-label="Open AI Chat"
                >
                    <Sparkles className="w-6 h-6 animate-pulse group-hover:rotate-12 transition-transform" />
                </button>
            )}

            {/* Slide-out Sidebar - Premium Floating Card Style */}
            <div
                className={`fixed top-24 bottom-4 right-4 z-40 w-full sm:w-[400px] bg-white rounded-3xl shadow-2xl border border-gray-100 transform transition-transform duration-300 ease-in-out flex flex-col overflow-hidden ${isAIChatOpen ? 'translate-x-0' : 'translate-x-[120%]'
                    }`}
            >
                {/* Header - Clean Premium Look */}
                <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-white/80 backdrop-blur-md">
                    <div className="flex items-center space-x-3">
                        <div className="bg-blue-50 p-2 rounded-xl">
                            <Bot className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">Fashion Assistant</h3>
                            <span className="text-xs text-green-500 font-medium flex items-center">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
                                Online
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={() => setAIChatOpen(false)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-white">
                    {chatHistory.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                        ? 'bg-black text-white rounded-br-none shadow-md'
                                        : 'bg-gray-50 text-gray-800 rounded-bl-none border border-gray-100'
                                    }`}
                            >
                                <p>{msg.content}</p>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-gray-100">
                    <form onSubmit={handleSendMessage} className="relative flex items-center">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Ask for style advice..."
                            className="w-full pl-5 pr-12 py-3.5 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/5 border-transparent transition-all text-sm font-medium"
                        />
                        <button
                            type="submit"
                            disabled={!message.trim()}
                            className="absolute right-2 p-2 bg-black text-white rounded-xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            </div>

            {/* Mobile Overlay only */}
            {isAIChatOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 transition-opacity md:hidden"
                    onClick={() => setAIChatOpen(false)}
                />
            )}
        </>
    );
};

export default AIChatWidget;
