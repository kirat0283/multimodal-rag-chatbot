// import React, { useState, useRef } from 'react';
// import axios from 'axios';
// import { Send, Mic, Image as ImageIcon, FileText, Loader2 } from 'lucide-react';

// const ChatApp = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [file, setFile] = useState(null);
//   const [inputType, setInputType] = useState('text'); // 'text', 'audio', 'image'
  
//   const fileInputRef = useRef(null);

//   const handleSend = async () => {
//     if (!input && !file) return;
    
//     setLoading(true);
//     const formData = new FormData();
    
//     if (file) {
//       formData.append('file', file);
//       formData.append('input_type', inputType);
//     } else {
//       formData.append('message', input);
//       formData.append('input_type', 'text');
//     }

//     // Update UI with user message
//     const userMsg = { role: 'user', content: input || `Uploaded ${inputType}` };
//     setMessages(prev => [...prev, userMsg]);

//     try {
//       const response = await axios.post('http://localhost:8000/chat', formData);
//       const botMsg = { 
//         role: 'assistant', 
//         content: response.data.answer, 
//         sources: response.data.sources 
//       };
//       setMessages(prev => [...prev, botMsg]);
//     } catch (error) {
//       console.error("Error sending message:", error);
//     } finally {
//       setLoading(false);
//       setInput('');
//       setFile(null);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-900 text-white font-sans">
//       {/* Header */}
//       <header className="p-4 border-b border-gray-700 flex justify-between items-center bg-gray-800">
//         <h1 className="text-xl font-bold flex items-center gap-2">
//           <FileText className="text-blue-400" /> Multimodal RAG Chat
//         </h1>
//         <span className="text-xs text-green-400">● Local Llama 3 Active</span>
//       </header>

//       {/* Chat Area */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map((m, i) => (
//           <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
//             <div className={`max-w-[80%] p-3 rounded-lg ${m.role === 'user' ? 'bg-blue-600' : 'bg-gray-800 border border-gray-700'}`}>
//               <p className="text-sm">{m.content}</p>
//               {m.sources && m.sources.length > 0 && (
//                 <div className="mt-2 pt-2 border-t border-gray-600 text-[10px] text-gray-400">
//                   Sources: {m.sources.join(", ")}
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//         {loading && <Loader2 className="animate-spin text-blue-500 mx-auto" />}
//       </div>

//       {/* Input Bar */}
//       <div className="p-4 bg-gray-800 border-t border-gray-700">
//         <div className="flex items-center gap-2 bg-gray-700 p-2 rounded-xl">
//           <button onClick={() => { setInputType('image'); fileInputRef.current.click(); }} 
//                   className={`p-2 rounded-lg hover:bg-gray-600 ${inputType === 'image' ? 'text-blue-400' : ''}`}>
//             <ImageIcon size={20} />
//           </button>
          
//           <button onClick={() => { setInputType('audio'); fileInputRef.current.click(); }}
//                   className={`p-2 rounded-lg hover:bg-gray-600 ${inputType === 'audio' ? 'text-red-400' : ''}`}>
//             <Mic size={20} />
//           </button>

//           <input 
//             type="text" 
//             className="flex-1 bg-transparent border-none outline-none text-sm p-2"
//             placeholder={file ? `File attached: ${file.name}` : "Ask your PDFs anything..."}
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyPress={(e) => e.key === 'Enter' && handleSend()}
//           />

//           <input 
//             type="file" 
//             ref={fileInputRef} 
//             className="hidden" 
//             onChange={(e) => setFile(e.target.files[0])} 
//           />

//           <button onClick={handleSend} className="bg-blue-600 p-2 rounded-lg hover:bg-blue-500 transition">
//             <Send size={20} />
//           </button>
//         </div>
//         <p className="text-[10px] text-gray-500 mt-2 text-center">Powered by LangChain, Ollama & Whisper Local</p>
//       </div>
//     </div>
//   );
// };


// export default ChatApp;




import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Send, Mic, Image as ImageIcon, FileText, Loader2 } from 'lucide-react';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [inputType, setInputType] = useState('text');

  const fileInputRef = useRef(null);

  const handleSend = async () => {
    if (!input && !file) return;

    setLoading(true);
    const formData = new FormData();

    if (file) {
      formData.append('file', file);
      formData.append('input_type', inputType);
    } else {
      formData.append('message', input);
      formData.append('input_type', 'text');
    }

    const userMsg = { role: 'user', content: input || `Uploaded ${inputType}` };
    setMessages(prev => [...prev, userMsg]);

    try {
      const response = await axios.post('http://localhost:8000/chat', formData);

      const botMsg = {
        role: 'assistant',
        content: response.data.answer,
        sources: response.data.sources
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
      setInput('');
      setFile(null);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center">

      {/* Header */}
      <header className="w-full bg-white shadow-md p-4 flex justify-between items-center px-10">
        <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          <FileText /> Multimodal RAG Chat
        </h1>

        <span className="text-sm text-green-500 font-medium">
          ● Local Llama 3 Active
        </span>
      </header>


      {/* Chat Container */}
      <div className="flex flex-col w-full max-w-4xl flex-1">

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >

              <div
                className={`max-w-[70%] px-5 py-3 rounded-2xl shadow-sm text-sm leading-relaxed
                ${m.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-800 border'
                  }`}
              >
                {m.content}

                {m.sources && m.sources.length > 0 && (
                  <div className="mt-3 text-xs text-gray-500 border-t pt-2">
                    Sources: {m.sources.join(", ")}
                  </div>
                )}
              </div>

            </div>
          ))}

          {loading && (
            <div className="flex justify-center">
              <Loader2 className="animate-spin text-blue-600" />
            </div>
          )}

        </div>


        {/* Input Bar */}
        <div className="p-5 bg-white border-t shadow-inner">

          <div className="flex items-center gap-3 bg-blue-50 rounded-xl px-4 py-3 border">

            <button
              onClick={() => { setInputType('image'); fileInputRef.current.click(); }}
              className={`p-2 rounded-lg hover:bg-blue-100 transition 
              ${inputType === 'image' ? 'text-blue-600' : 'text-gray-500'}`}
            >
              <ImageIcon size={20} />
            </button>

            <button
              onClick={() => { setInputType('audio'); fileInputRef.current.click(); }}
              className={`p-2 rounded-lg hover:bg-blue-100 transition
              ${inputType === 'audio' ? 'text-red-500' : 'text-gray-500'}`}
            >
              <Mic size={20} />
            </button>

            <input
              type="text"
              className="flex-1 bg-transparent outline-none text-sm px-2"
              placeholder={file ? `File attached: ${file.name}` : "Ask your PDFs anything..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <button
              onClick={handleSend}
              className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-lg transition"
            >
              <Send size={18} />
            </button>

          </div>

          <p className="text-xs text-gray-400 text-center mt-3">
            Powered by LangChain, Ollama & Whisper Local
          </p>

        </div>

      </div>
    </div>
  );
};

export default ChatApp;
