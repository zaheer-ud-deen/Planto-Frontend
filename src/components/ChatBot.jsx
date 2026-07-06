// src/components/ChatBot.jsx
import { useState } from "react";
import { FiMessageSquare, FiX, FiSend, FiTrash2, FiCheckCircle } from "react-icons/fi";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm Planto's plant assistant. How can I help you today? 🌿", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Plant knowledge base
  const plantResponses = {
    "watering": "Most plants need watering once a week. Succulents need less, ferns need more! 💧",
    "sunlight": "Succulents love bright sun. Snake plants and ZZ plants do well in low light. ☀️",
    "fertilizer": "Fertilize monthly during growing season (spring-summer). Use balanced plant food. 🌱",
    "price": "Our plants range from $20 to $150. Check our Products page for current prices! 💰",
    "shipping": "We ship within 3-5 business days. Free shipping on orders over $50! 📦",
    "return": "30-day return policy. Plant must be in original condition. 🔄",
    "default": "Thanks for your question! Our team will respond shortly. 🌿"
  };

  const getBotResponse = (userMessage) => {
    
    
    const lowerMsg = userMessage.toLowerCase();
    
    if (lowerMsg.includes("water")) return plantResponses.watering;
    if (lowerMsg.includes("sun") || lowerMsg.includes("light")) return plantResponses.sunlight;
    if (lowerMsg.includes("fertilizer") || lowerMsg.includes("feed")) return plantResponses.fertilizer;
    if (lowerMsg.includes("price") || lowerMsg.includes("cost")) return plantResponses.price;
    if (lowerMsg.includes("ship") || lowerMsg.includes("delivery")) return plantResponses.shipping;
    if (lowerMsg.includes("return")) return plantResponses.return;
    if (lowerMsg.includes("hello") || lowerMsg.includes("hi")) return "Hello! 🌿 How can I help with your plant needs?";
    if (lowerMsg.includes("thank")) return "You're welcome! Happy planting! 🪴";
    if (lowerMsg.includes("clear") || lowerMsg.includes("reset")) return "You can click the clear button 🧹 to start a new conversation!";
    
    return plantResponses.default;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: input, sender: "user" }]);
    setInput("");
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      const reply = getBotResponse(input);
      setMessages(prev => [...prev, { text: reply, sender: "bot" }]);
      setIsTyping(false);
    }, 500);
  };

  const clearChat = () => {
    setMessages([
      { text: "Chat cleared! How can I help you today? 🌿", sender: "bot" }
    ]);
    setShowClearConfirm(false);
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all z-50 flex items-center justify-center cursor-pointer"
        >
          <FiMessageSquare size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[550px] bg-[#1a2a1a] rounded-2xl border border-white/20 shadow-2xl flex flex-col overflow-hidden z-50">
          {/* Header */}
          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-500 to-emerald-600">
            <div>
              <h3 className="font-semibold text-white">Planto Assistant</h3>
              <p className="text-white/70 text-xs">Online 🌿</p>
            </div>
            <div className="flex gap-2">
              {/* Clear Chat Button */}
              <button 
                onClick={() => setShowClearConfirm(true)}
                className="text-white hover:text-white/80 cursor-pointer transition-colors"
                title="Clear chat"
              >
                <FiTrash2 size={18} />
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-white/80 cursor-pointer"
              >
                <FiX size={20} />
              </button>
            </div>
          </div>

          {/* Clear Confirmation Modal */}
          {showClearConfirm && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10">
              <div className="bg-[#1a2a1a] rounded-2xl p-6 mx-4 text-center border border-white/20">
                <FiCheckCircle className="text-yellow-400 text-4xl mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Clear Chat?</h3>
                <p className="text-white/50 text-sm mb-4">All messages will be deleted.</p>
                <div className="flex gap-3">
                  <button
                    onClick={clearChat}
                    className="flex-1 px-4 py-2 bg-green-500 rounded-xl text-white hover:bg-green-600 transition cursor-pointer"
                  >
                    Yes, Clear
                  </button>
                  <button
                    onClick={() => setShowClearConfirm(false)}
                    className="flex-1 px-4 py-2 bg-white/10 rounded-xl text-white/70 hover:bg-white/20 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.sender === "user"
                      ? "bg-green-500 text-white rounded-br-sm"
                      : "bg-white/10 text-white/80 rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/10 p-3 rounded-2xl rounded-bl-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce delay-75" />
                    <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce delay-150" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask me about plants..."
                className="flex-1 px-4 py-2 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-green-500"
              />
              <button
                onClick={handleSend}
                className="w-10 h-10 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white flex items-center justify-center cursor-pointer hover:shadow-lg transition"
              >
                <FiSend size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;