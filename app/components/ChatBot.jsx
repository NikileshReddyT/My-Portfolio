'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane, FaChevronLeft } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import useChat from '../hooks/useChat';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputMessage, setInputMessage] = useState('');
    const [showInitialButton, setShowInitialButton] = useState(true);
    const [isPillExpanded, setIsPillExpanded] = useState(false);
    const [dragStartX, setDragStartX] = useState(null);
    const [messageTimestamps, setMessageTimestamps] = useState({});
    const messagesEndRef = useRef(null);
    const chatContainerRef = useRef(null);
    const { messages, isLoading, error, sendMessage } = useChat();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Track timestamps when new messages are added
    useEffect(() => {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage && !messageTimestamps[messages.length - 1]) {
            setMessageTimestamps(prev => ({
                ...prev,
                [messages.length - 1]: new Date().toLocaleTimeString()
            }));
        }
    }, [messages]);

    // Initial visibility timer
    useEffect(() => {
        const checkScreenSize = () => {
            return window.innerWidth >= 768; // md breakpoint
        };

        const timeoutDuration = checkScreenSize() ? 3000 : 1400;
        
        const timer = setTimeout(() => {
            setShowInitialButton(false);
        }, timeoutDuration);

        return () => clearTimeout(timer);
    }, []);

    const handleDragStart = (e) => {
        const touch = e.touches?.[0] || e;
        setDragStartX(touch.clientX);
    };

    const handleDragMove = (e) => {
        if (dragStartX === null) return;

        const touch = e.touches?.[0] || e;
        const diff = dragStartX - touch.clientX;

        if (diff > 50) { // Dragged left
            setIsPillExpanded(true);
            setDragStartX(null);
        }
    };

    const handleDragEnd = () => {
        setDragStartX(null);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputMessage.trim() || isLoading) return;

        try {
            await sendMessage(inputMessage);
            setInputMessage('');
        } catch (err) {
            console.error('Failed to send message:', err);
        }
    };

    const handleChatOpen = () => {
        setIsOpen(true);
        setIsPillExpanded(false);
    };

    return (
        <>
            {/* Initial Button */}
            <AnimatePresence>
                {showInitialButton && (
                    <motion.button
                        onClick={handleChatOpen}
                        className="fixed bottom-4 md:bottom-10 right-4 md:right-10 z-50 p-3 md:p-4 bg-[var(--card-bg)]/80 backdrop-blur-sm border border-[var(--neon-color)] rounded-full text-[var(--neon-color)] hover:scale-110 hover:rotate-[360deg] hover:shadow-[0_0_15px_rgba(var(--neon-rgb),0.3)] transition-all duration-500"
                        initial={{ x: "200%", rotate: -180, scale: 0 }}
                        animate={{ 
                            x: 0, 
                            rotate: 0,
                            scale: 1,
                            transition: { 
                                type: "spring",
                                stiffness: 100,
                                damping: 20,
                                duration: window.innerWidth >= 768 ? 3 : 1.5,
                                delay: 0.3
                            }
                        }}
                        exit={{ 
                            x: "200%", 
                            rotate: 180,
                            scale: 0,
                            transition: { 
                                type: "spring",
                                stiffness: 80,
                                damping: 15,
                                duration: window.innerWidth >= 768 ? 2 : 1
                            }
                        }}
                        whileHover={{ 
                            scale: 1.1,
                            rotate: [0, -10, 10, -10, 0],
                            transition: { 
                                rotate: {
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: "easeInOut"
                                },
                                scale: {
                                    duration: 1,
                                    ease: "easeOut"
                                }
                            }
                        }}
                        whileTap={{ scale: 0.9, transition: { duration: 0.3 } }}
                    >
                        <FaRobot className="w-6 h-6" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Side Pill */}
            <AnimatePresence>
                {!showInitialButton && !isOpen && (
                    <motion.div
                        className="fixed bottom-4 md:bottom-10 right-0 z-50 select-none touch-none"
                        initial={{ x: "100%" }}
                        animate={{ x: isPillExpanded ? "0%" : "calc(100% - 16px)" }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        onAnimationComplete={() => {
                            if (isPillExpanded) {
                                setTimeout(() => {
                                    setIsPillExpanded(false);
                                }, 5000);
                            }
                        }}
                    >
                        <div
                            className="relative flex items-center"
                            onMouseEnter={() => setIsPillExpanded(true)}
                            onMouseLeave={() => setIsPillExpanded(false)}
                            onTouchStart={handleDragStart}
                            onTouchMove={handleDragMove}
                            onTouchEnd={handleDragEnd}
                            onMouseDown={handleDragStart}
                            onMouseMove={handleDragMove}
                            onMouseUp={handleDragEnd}
                        >
                            <motion.div
                                className="absolute left-0 top-0 bottom-0 flex items-center -translate-x-full px-1 opacity-50"
                                animate={{ opacity: isPillExpanded ? 0 : 0.5 }}
                            >
                                <FaChevronLeft className="w-3 h-3 text-[var(--text-color)]" />
                            </motion.div>
                            <motion.button
                                onClick={handleChatOpen}
                                className="flex items-center gap-1 px-3 py-1 md:px-4 md:py-2 bg-[var(--card-bg)]/80 backdrop-blur-sm border border-[var(--neon-color)] rounded-l-full text-[var(--text-color)]/80 hover:text-[var(--neon-color)] hover:border-[var(--neon-color)] hover:shadow-[0_0_10px_rgba(var(--neon-rgb),0.2)] transition-all duration-300"
                            >
                                <FaRobot className="w-4 h-4" />
                                <span className="whitespace-nowrap text-xs font-medium">Chat with AI</span>
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Chat Interface */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0,transition:{duration:.8} }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ x: '100%',y:'100%', opacity: 0 }}
                            animate={{ x: 0,y:0, opacity: 1 }}
                            transition={{ 
                                type: "tween",
                                duration: 0.4,
                                ease: [0.25, 0.1, 0.25, 1],
                            }}
                            exit={{ 
                                x: '100%',
                                y:'100%',
                                opacity: 0,
                                transition: {
                                    type: "tween",
                                    duration: 0.3,
                                    ease: [0.25, 0.1, 0.25, 1],
                                }
                            }}
                            className="w-full max-w-2xl h-[80vh] bg-[var(--card-bg)]/95 rounded-2xl shadow-xl border border-[var(--neon-color)] backdrop-blur-md flex flex-col overflow-hidden"
                        >
                            {/* Chat Header */}
                            <div className="p-4 border-b border-[var(--neon-color)] flex items-center justify-between bg-[var(--card-bg)] backdrop-blur-md">
                                <div className="flex items-center gap-3 w-full justify-center">
                                    <FaRobot className="w-5 h-5 text-[var(--neon-color)]" />
                                    <h3 className="text-lg font-medium text-[var(--text-color)] text-center">Chat with <span className="text-[var(--neon-color)] font-bold">JARVIS</span><span className='hidden ml-2 sm:inline-block'>My <span className="text-[var(--neon-color)] font-bold">Personal AI Assistance</span></span></h3>
                                </div>
                                <motion.button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-[var(--neon-color)]/10 rounded-full text-[var(--text-color)]/50 hover:text-[var(--text-color)] transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <FaTimes className="w-5 h-5" />
                                </motion.button>
                            </div>

                            {/* Messages Area */}
                            <div
                                ref={chatContainerRef}
                                className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[var(--neon-color)]/30 scrollbar-track-transparent"
                            >
                                {messages.length === 0 ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex flex-col items-center justify-start h-full text-left space-y-6 p-4"
                                    >
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.1, 1],
                                                rotate: [0, -5, 5, -5, 0],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                repeatType: "reverse",
                                            }}
                                            className="text-[var(--neon-color)] text-6xl"
                                        >
                                            <FaRobot />
                                        </motion.div>
                                        <h2 className="text-2xl font-bold text-[var(--text-color)]">
                                            Hey there! 👋
                                        </h2>
                                        <p className="text-[var(--text-color)]/80 max-w-md">
                                            I'm <span className="text-[var(--neon-color)] font-bold">Nikilesh's</span> AI assistant <span className="text-[var(--neon-color)] font-bold">JARVIS</span>, ready to help you learn more about him! Feel free to ask me anything about:
                                        </p>
                                        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                                            {[
                                                { icon: "👨‍💻", text: "His skills & expertise" },
                                                { icon: "🎓", text: "Education background" },
                                                { icon: "💼", text: "Work experience" },
                                                { icon: "🚀", text: "Projects & achievements" },
                                                { icon: "💡", text: "Interests & hobbies" },
                                                { icon: "📧", text: "Contact information" },
                                            ].map((item, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.1 * index }}
                                                    className="bg-[var(--card-bg)] border border-[var(--neon-color)] p-3 rounded-xl flex flex-col md:flex-row items-center gap-3 hover:shadow-[0_0_10px_rgba(var(--neon-rgb),0.2)] transition-shadow cursor-pointer"
                                                    onClick={() => {
                                                        const questions = [
                                                            "What are your technical skills?",
                                                            "Tell me about your education",
                                                            "What's your work experience?",
                                                            "What projects have you worked on?",
                                                            "What are your interests?",
                                                            "How can I contact you?",
                                                        ];
                                                        setInputMessage(questions[index]);
                                                    }}
                                                >
                                                    <span className="text-2xl">{item.icon}</span>
                                                    <span className="text-sm text-[var(--text-color)]/80 text-center">{item.text}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                        <p className="text-[var(--text-color)]/60 text-sm text-center p-4 ">
                                            Click on any topic or type your own question below! 💬
                                        </p>
                                    </motion.div>
                                ) : (
                                    <>
                                        {messages.map((message, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div
                                                    className={`max-w-[80%] p-3 rounded-2xl ${message.role === 'user'
                                                        ? 'bg-[var(--neon-color)] text-[var(--button-text)] rounded-tr-none'
                                                        : 'bg-[var(--card-bg)] border border-[var(--neon-color)] p-3 rounded-2xl text-[var(--text-color)] rounded-tl-none'
                                                        }`}
                                                >
                                                    <ReactMarkdown
                                                        components={{
                                                            code({ node, inline, className, children, ...props }) {
                                                                const match = /language-(\w+)/.exec(className || '')
                                                                return !inline && match ? (
                                                                    <SyntaxHighlighter
                                                                        {...props}
                                                                        style={dracula}
                                                                        language={match[1]}
                                                                        PreTag="div"
                                                                        className="rounded-lg my-2 text-xs md:text-sm max-h-[300px] overflow-auto"
                                                                        customStyle={{
                                                                            maxWidth: '100%',
                                                                            overflowX: 'auto',
                                                                        }}
                                                                    >
                                                                        {String(children).replace(/\n$/, '')}
                                                                    </SyntaxHighlighter>
                                                                ) : (
                                                                    <code {...props} className={`${className} bg-black/20 px-1 py-0.5 rounded text-xs md:text-sm break-all`}>
                                                                        {children}
                                                                    </code>
                                                                )
                                                            },
                                                            p: ({ children }) => <p className="whitespace-pre-wrap mb-2 text-xs md:text-sm break-words">{children}</p>,
                                                            ul: ({ children }) => <ul className="list-disc ml-4 mb-2 text-xs md:text-sm">{children}</ul>,
                                                            ol: ({ children }) => <ol className="list-decimal ml-4 mb-2 text-xs md:text-sm">{children}</ol>,
                                                            li: ({ children }) => <li className="mb-1">{children}</li>,
                                                            a: ({ href, children }) => (
                                                                <a
                                                                    href={href}
                                                                    className="text-blue-400 hover:underline break-all text-xs md:text-sm"
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                >
                                                                    {children}
                                                                </a>
                                                            )
                                                        }}
                                                        className="text-sm break-words"
                                                    >
                                                        {message.parts[0].text}
                                                    </ReactMarkdown>
                                                    <span className="text-[10px] md:text-xs opacity-70 mt-1 block">
                                                        {messageTimestamps[index] || ''}
                                                    </span>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </>
                                )}
                                {isLoading && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex justify-start"
                                    >
                                        <div className="bg-[var(--card-bg)] border border-[var(--neon-color)] p-3 rounded-2xl rounded-tl-none">
                                            <BsThreeDots className="w-5 h-5 text-[var(--neon-color)] animate-pulse" />
                                        </div>
                                    </motion.div>
                                )}
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex justify-center"
                                    >
                                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg">
                                            {error}
                                        </div>
                                    </motion.div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Chat Input */}
                            <form onSubmit={handleSendMessage} className="p-4 border-t border-[var(--neon-color)] bg-[var(--card-bg)] backdrop-blur-md">
                                <div className="relative flex items-center gap-2 min-w-0">
                                    <input
                                        type="text"
                                        value={inputMessage}
                                        onChange={(e) => setInputMessage(e.target.value)}
                                        placeholder="Type your message..."
                                        disabled={isLoading}
                                        className="w-full min-w-0 bg-[var(--input-bg)] text-[var(--text-color)] placeholder-[var(--text-color)]/50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--neon-color)] disabled:opacity-50"
                                    />
                                    <motion.button
                                        type="submit"
                                        disabled={!inputMessage.trim() || isLoading}
                                        className={`flex-shrink-0 p-2 rounded-lg ${inputMessage.trim() && !isLoading
                                            ? 'bg-[var(--neon-color)] text-[var(--button-text)]'
                                            : 'bg-[var(--card-bg)] text-[var(--text-color)] opacity-50'
                                            }`}
                                        whileHover={inputMessage.trim() && !isLoading ? { scale: 1.05 } : {}}
                                        whileTap={inputMessage.trim() && !isLoading ? { scale: 0.95 } : {}}
                                    >
                                        <FaPaperPlane className="w-5 h-5" />
                                    </motion.button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatBot;