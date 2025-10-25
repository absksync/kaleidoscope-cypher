import { useState, useEffect, useRef } from 'react';
import { useUser } from '@clerk/clerk-react';
import EnhancedApiService from '../services/enhancedApi';

const KAIChat = () => {
  const { user } = useUser();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [aiStatus, setAiStatus] = useState('checking');
  const [systemStats, setSystemStats] = useState(null);
  const messagesEndRef = useRef(null);

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  useEffect(() => {
    // Check AI system status
    const checkAI = async () => {
      try {
        const status = await EnhancedApiService.checkAISystem();
        if (status) {
          setAiStatus('connected');
          // Load conversation history if user is signed in
          if (user) {
            const history = await EnhancedApiService.getConversationHistory(
              user.username || user.id
            );
            if (history && history.history) {
              setConversation(history.history);
            }
          }
        } else {
          setAiStatus('offline');
        }
      } catch (error) {
        setAiStatus('offline');
      }
    };

    const loadStats = async () => {
      try {
        const stats = await EnhancedApiService.getSystemStats();
        setSystemStats(stats);
      } catch (error) {
        console.error('Failed to load stats:', error);
      }
    };

    checkAI();
    loadStats();

    // Refresh stats every 30 seconds
    const interval = setInterval(loadStats, 30000);
    return () => clearInterval(interval);
  }, [user]);

  const handleSendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message.trim();
    setMessage('');
    setLoading(true);

    // Add user message to conversation
    const newConversation = [
      ...conversation,
      {
        role: 'user',
        content: userMessage,
        timestamp: new Date().toISOString(),
      },
    ];
    setConversation(newConversation);

    try {
      const userId = user ? (user.username || user.id) : 'anonymous_user';
      const response = await EnhancedApiService.chatWithKAI(userMessage, userId);

      // Add KAI's response to conversation
      setConversation([
        ...newConversation,
        {
          role: 'assistant',
          content: response.response || response.message,
          timestamp: new Date().toISOString(),
          metadata: response.metadata,
        },
      ]);

      // Refresh stats
      const stats = await EnhancedApiService.getSystemStats();
      setSystemStats(stats);
    } catch (error) {
      setConversation([
        ...newConversation,
        {
          role: 'error',
          content: `Failed to get response: ${error.message}. Make sure the AI backend is running on port 8001.`,
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleResetConversation = async () => {
    if (!user) return;

    try {
      await EnhancedApiService.resetConversation(user.username || user.id);
      setConversation([]);
    } catch (error) {
      console.error('Failed to reset conversation:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" onMouseMove={handleMouseMove}>
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black"></div>
      
      {/* Grid patterns */}
      <div className="absolute inset-0 z-0" style={{
        backgroundImage: `
          linear-gradient(to right, rgba(59, 130, 246, 0.12) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(59, 130, 246, 0.12) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px'
      }}></div>

      {/* Mouse light effect */}
      <div 
        className="absolute z-0 pointer-events-none"
        style={{
          left: mousePosition.x - 250,
          top: mousePosition.y - 250,
          width: '500px',
          height: '500px',
          background: `radial-gradient(circle, rgba(59, 130, 246, 0.18) 0%, rgba(96, 165, 250, 0.11) 20%, transparent 65%)`,
          filter: 'blur(45px)',
          transform: 'translate3d(0, 0, 0)',
          willChange: 'transform',
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 backdrop-blur-xl bg-black/70 border-b border-blue-500/30 z-50">
          <div className="px-4 py-2.5">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-8 ml-2">
                <a href="/">
                  <img 
                    src="/logo.png" 
                    alt="Kaleidoscope Logo" 
                    className="h-20 w-auto object-contain drop-shadow-2xl"
                  />
                </a>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🤖</span>
                  <div>
                    <h1 className="text-white text-lg font-semibold">KAI - Kaleidoscope AI</h1>
                    <p className="text-gray-400 text-xs">Conversational Ideation Assistant</p>
                  </div>
                </div>
              </div>
              <a href="/" className="text-sm text-gray-300 hover:text-white transition-colors">
                ← Back to Home
              </a>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="container mx-auto px-6 pt-32 pb-24 max-w-6xl">
          {/* Status Bar */}
          <div className="mb-6 bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    aiStatus === 'connected' ? 'bg-green-500' : 
                    aiStatus === 'checking' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <span className="text-sm text-gray-400">
                    {aiStatus === 'connected' ? 'KAI Online' : 
                     aiStatus === 'checking' ? 'Connecting...' : 'KAI Offline - Start port 8001'}
                  </span>
                </div>
                {systemStats && (
                  <>
                    <span className="text-gray-600">|</span>
                    <span className="text-xs text-gray-500">
                      Ideas: {systemStats.total_ideas} | Conversations: {systemStats.total_conversations}
                    </span>
                  </>
                )}
              </div>
              {user && conversation.length > 0 && (
                <button
                  onClick={handleResetConversation}
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                  Reset Conversation
                </button>
              )}
            </div>
          </div>

          {/* Chat Container */}
          <div className="bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl overflow-hidden">
            {/* Messages */}
            <div className="h-[500px] overflow-y-auto p-6 space-y-4">
              {conversation.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🌈</div>
                  <h3 className="text-white text-xl font-semibold mb-2">
                    Welcome to KAI!
                  </h3>
                  <p className="text-gray-400 text-sm max-w-md mx-auto">
                    I'm your AI ideation partner. Share your ideas, and I'll help you explore them through:
                    <br/>• Socratic questioning
                    <br/>• SWOT analysis
                    <br/>• Creative combinations
                    <br/>• Diversity insights
                  </p>
                </div>
              )}

              {conversation.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${
                    msg.role === 'user' 
                      ? 'bg-blue-600/20 border-blue-500/30' 
                      : msg.role === 'error'
                      ? 'bg-red-600/20 border-red-500/30'
                      : 'bg-gray-800/50 border-gray-700/30'
                  } border rounded-2xl p-4`}>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">
                        {msg.role === 'user' ? '👤' : msg.role === 'error' ? '⚠️' : '🤖'}
                      </span>
                      <div className="flex-1">
                        <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">
                          {msg.content}
                        </p>
                        <span className="text-xs text-gray-500 mt-2 block">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-800/50 border border-gray-700/30 rounded-2xl p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🤖</span>
                      <span className="text-gray-400 text-sm">KAI is thinking...</span>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-blue-500/30 p-4">
              <div className="flex gap-3">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Share your idea or ask KAI anything..."
                  className="flex-1 bg-gray-900/50 border border-blue-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none"
                  rows="2"
                  disabled={aiStatus !== 'connected' || loading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={aiStatus !== 'connected' || loading || !message.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </div>
            </div>
          </div>

          {/* Features Info */}
          {systemStats && systemStats.modules_active && (
            <div className="mt-6 bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
              <h3 className="text-white text-sm font-semibold mb-3">Active AI Modules:</h3>
              <div className="flex flex-wrap gap-2">
                {systemStats.modules_active.map((module, index) => (
                  <span
                    key={index}
                    className="bg-blue-500/20 border border-blue-500/30 rounded-lg px-3 py-1 text-xs text-blue-300"
                  >
                    {module}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KAIChat;
