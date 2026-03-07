// // import React, { useState, useRef } from 'react';
// // import axios from 'axios';
// // import { Send, Mic, Image as ImageIcon, FileText, Loader2 } from 'lucide-react';

// // const ChatApp = () => {
// //   const [messages, setMessages] = useState([]);
// //   const [input, setInput] = useState('');
// //   const [loading, setLoading] = useState(false);
// //   const [file, setFile] = useState(null);
// //   const [inputType, setInputType] = useState('text'); // 'text', 'audio', 'image'
  
// //   const fileInputRef = useRef(null);

// //   const handleSend = async () => {
// //     if (!input && !file) return;
    
// //     setLoading(true);
// //     const formData = new FormData();
    
// //     if (file) {
// //       formData.append('file', file);
// //       formData.append('input_type', inputType);
// //     } else {
// //       formData.append('message', input);
// //       formData.append('input_type', 'text');
// //     }

// //     // Update UI with user message
// //     const userMsg = { role: 'user', content: input || `Uploaded ${inputType}` };
// //     setMessages(prev => [...prev, userMsg]);

// //     try {
// //       const response = await axios.post('http://localhost:8000/chat', formData);
// //       const botMsg = { 
// //         role: 'assistant', 
// //         content: response.data.answer, 
// //         sources: response.data.sources 
// //       };
// //       setMessages(prev => [...prev, botMsg]);
// //     } catch (error) {
// //       console.error("Error sending message:", error);
// //     } finally {
// //       setLoading(false);
// //       setInput('');
// //       setFile(null);
// //     }
// //   };

// //   return (
// //     <div className="flex flex-col h-screen bg-gray-900 text-white font-sans">
// //       {/* Header */}
// //       <header className="p-4 border-b border-gray-700 flex justify-between items-center bg-gray-800">
// //         <h1 className="text-xl font-bold flex items-center gap-2">
// //           <FileText className="text-blue-400" /> Multimodal RAG Chat
// //         </h1>
// //         <span className="text-xs text-green-400">● Local Llama 3 Active</span>
// //       </header>

// //       {/* Chat Area */}
// //       <div className="flex-1 overflow-y-auto p-4 space-y-4">
// //         {messages.map((m, i) => (
// //           <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
// //             <div className={`max-w-[80%] p-3 rounded-lg ${m.role === 'user' ? 'bg-blue-600' : 'bg-gray-800 border border-gray-700'}`}>
// //               <p className="text-sm">{m.content}</p>
// //               {m.sources && m.sources.length > 0 && (
// //                 <div className="mt-2 pt-2 border-t border-gray-600 text-[10px] text-gray-400">
// //                   Sources: {m.sources.join(", ")}
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         ))}
// //         {loading && <Loader2 className="animate-spin text-blue-500 mx-auto" />}
// //       </div>

// //       {/* Input Bar */}
// //       <div className="p-4 bg-gray-800 border-t border-gray-700">
// //         <div className="flex items-center gap-2 bg-gray-700 p-2 rounded-xl">
// //           <button onClick={() => { setInputType('image'); fileInputRef.current.click(); }} 
// //                   className={`p-2 rounded-lg hover:bg-gray-600 ${inputType === 'image' ? 'text-blue-400' : ''}`}>
// //             <ImageIcon size={20} />
// //           </button>
          
// //           <button onClick={() => { setInputType('audio'); fileInputRef.current.click(); }}
// //                   className={`p-2 rounded-lg hover:bg-gray-600 ${inputType === 'audio' ? 'text-red-400' : ''}`}>
// //             <Mic size={20} />
// //           </button>

// //           <input 
// //             type="text" 
// //             className="flex-1 bg-transparent border-none outline-none text-sm p-2"
// //             placeholder={file ? `File attached: ${file.name}` : "Ask your PDFs anything..."}
// //             value={input}
// //             onChange={(e) => setInput(e.target.value)}
// //             onKeyPress={(e) => e.key === 'Enter' && handleSend()}
// //           />

// //           <input 
// //             type="file" 
// //             ref={fileInputRef} 
// //             className="hidden" 
// //             onChange={(e) => setFile(e.target.files[0])} 
// //           />

// //           <button onClick={handleSend} className="bg-blue-600 p-2 rounded-lg hover:bg-blue-500 transition">
// //             <Send size={20} />
// //           </button>
// //         </div>
// //         <p className="text-[10px] text-gray-500 mt-2 text-center">Powered by LangChain, Ollama & Whisper Local</p>
// //       </div>
// //     </div>
// //   );
// // };


// // export default ChatApp;




// import React, { useState, useRef } from 'react';
// import axios from 'axios';
// import { Send, Mic, Image as ImageIcon, FileText, Loader2 } from 'lucide-react';

// const ChatApp = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [file, setFile] = useState(null);
//   const [inputType, setInputType] = useState('text');

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
//     <div className="min-h-screen bg-blue-50 flex flex-col items-center">

//       {/* Header */}
//       <header className="w-full bg-white shadow-md p-4 flex justify-between items-center px-10">
//         <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
//           <FileText /> Multimodal RAG Chat
//         </h1>

//         <span className="text-sm text-green-500 font-medium">
//           ● Local Llama 3 Active
//         </span>
//       </header>


//       {/* Chat Container */}
//       <div className="flex flex-col w-full max-w-4xl flex-1">

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto p-6 space-y-6">

//           {messages.map((m, i) => (
//             <div
//               key={i}
//               className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
//             >

//               <div
//                 className={`max-w-[70%] px-5 py-3 rounded-2xl shadow-sm text-sm leading-relaxed
//                 ${m.role === 'user'
//                     ? 'bg-blue-600 text-white'
//                     : 'bg-white text-gray-800 border'
//                   }`}
//               >
//                 {m.content}

//                 {m.sources && m.sources.length > 0 && (
//                   <div className="mt-3 text-xs text-gray-500 border-t pt-2">
//                     Sources: {m.sources.join(", ")}
//                   </div>
//                 )}
//               </div>

//             </div>
//           ))}

//           {loading && (
//             <div className="flex justify-center">
//               <Loader2 className="animate-spin text-blue-600" />
//             </div>
//           )}

//         </div>


//         {/* Input Bar */}
//         <div className="p-5 bg-white border-t shadow-inner">

//           <div className="flex items-center gap-3 bg-blue-50 rounded-xl px-4 py-3 border">

//             <button
//               onClick={() => { setInputType('image'); fileInputRef.current.click(); }}
//               className={`p-2 rounded-lg hover:bg-blue-100 transition 
//               ${inputType === 'image' ? 'text-blue-600' : 'text-gray-500'}`}
//             >
//               <ImageIcon size={20} />
//             </button>

//             <button
//               onClick={() => { setInputType('audio'); fileInputRef.current.click(); }}
//               className={`p-2 rounded-lg hover:bg-blue-100 transition
//               ${inputType === 'audio' ? 'text-red-500' : 'text-gray-500'}`}
//             >
//               <Mic size={20} />
//             </button>

//             <input
//               type="text"
//               className="flex-1 bg-transparent outline-none text-sm px-2"
//               placeholder={file ? `File attached: ${file.name}` : "Ask your PDFs anything..."}
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyPress={(e) => e.key === 'Enter' && handleSend()}
//             />

//             <input
//               type="file"
//               ref={fileInputRef}
//               className="hidden"
//               onChange={(e) => setFile(e.target.files[0])}
//             />

//             <button
//               onClick={handleSend}
//               className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-lg transition"
//             >
//               <Send size={18} />
//             </button>

//           </div>

//           <p className="text-xs text-gray-400 text-center mt-3">
//             Powered by LangChain, Ollama & Whisper Local
//           </p>

//         </div>

//       </div>
//     </div>
//   );
// };

// export default ChatApp;


import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, Mic, Image as ImageIcon, FileText, Loader2, X, Terminal, Cpu } from 'lucide-react';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [inputType, setInputType] = useState('text');

  const fileInputRef = useRef(null);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => setFilePreview(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const clearFile = () => {
    setFile(null);
    setFilePreview(null);
    setInputType('text');
  };

  const handleSend = async () => {
    if (!input && !file) return;

    setLoading(true);
    const formData = new FormData();
    const currentFilePreview = filePreview;
    const currentFileType = inputType;

    if (file) {
      formData.append('file', file);
      formData.append('input_type', inputType);
    } else {
      formData.append('message', input);
      formData.append('input_type', 'text');
    }

    // Modern message object including media
    const userMsg = { 
      role: 'user', 
      content: input,
      media: currentFilePreview,
      mediaType: currentFileType 
    };
    
    setMessages(prev => [...prev, userMsg]);
    clearFile(); // Reset input area immediately for UX

    try {
      // Updated to your Render URL once deployed, currently using localhost
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
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#0B0F1A] text-slate-200 font-sans selection:bg-cyan-500/30">
      
      {/* Techy Header */}
      <header className="flex items-center justify-between px-8 py-4 border-b border-cyan-500/20 bg-[#111827]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Cpu className="text-cyan-400 w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white uppercase">MultiModal <span className="text-cyan-400">RAG-BOT</span></h1>
            <p className="text-[10px] text-slate-500 font-mono">VISION • AUDIO • TEXT</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end">
             <span className="text-[10px] text-slate-400 font-mono">GROQ-LLAMA3.1-8B</span>
             <span className="text-[10px] text-green-400 flex items-center gap-1">
               <span className="animate-pulse">●</span> SYSTEM ONLINE
             </span>
          </div>
        </div>
      </header>

      {/* Main Chat Interface */}
      <main ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 custom-scrollbar">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
            <Terminal size={48} className="mb-4 text-cyan-500" />
            <p className="text-xl font-light italic">Waiting for input sequence...</p>
            <p className="text-sm font-mono mt-2 text-cyan-400/60">Initialize chat via text, image, or audio</p>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
            <div className={`group relative max-w-[85%] md:max-w-[70%] rounded-2xl transition-all duration-300 ${
              m.role === 'user' 
                ? 'bg-gradient-to-br from-cyan-600 to-blue-700 text-white shadow-lg shadow-cyan-900/20 p-4' 
                : 'bg-[#1A2333] border border-slate-700/50 p-5'
            }`}>
              
              {/* Media Preview inside the chat bubble */}
              {m.media && (
                <div className="mb-3 rounded-xl overflow-hidden border border-white/10 shadow-inner bg-black/20">
                  {m.mediaType === 'image' ? (
                    <img src={m.media} alt="Uploaded" className="max-h-64 object-contain w-full" />
                  ) : (
                    <div className="p-4 flex items-center gap-3 bg-slate-900/40">
                      <Mic className="text-red-400 animate-pulse" size={24} />
                      <div className="h-4 flex-1 bg-gradient-to-r from-cyan-500/20 via-cyan-500 to-cyan-500/20 rounded-full" />
                    </div>
                  )}
                </div>
              )}

              <p className={`text-sm md:text-base leading-relaxed ${m.role === 'assistant' ? 'text-slate-300' : 'text-white'}`}>
                {m.content}
              </p>

              {m.sources && (
                <div className="mt-4 pt-3 border-t border-slate-700 flex flex-wrap gap-2">
                  {m.sources.map((s, idx) => (
                    <span key={idx} className="px-2 py-1 bg-cyan-500/10 text-cyan-400 text-[10px] font-mono rounded border border-cyan-500/20 italic">
                      [src_{idx + 1}: {s}]
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-[#1A2333] border border-cyan-500/30 p-4 rounded-2xl flex items-center gap-3">
              <Loader2 className="animate-spin text-cyan-400" size={18} />
              <span className="text-xs font-mono text-cyan-400/80">GENERATING RESPONSE....</span>
            </div>
          </div>
        )}
      </main>

      {/* Floating Modern Input Bar */}
      <footer className="p-4 md:p-6 bg-gradient-to-t from-[#0B0F1A] via-[#0B0F1A] to-transparent">
        <div className="max-w-4xl mx-auto relative group">
          
          {/* File Preview Toast above input */}
          {filePreview && (
            <div className="absolute -top-24 left-0 right-0 p-3 bg-[#1A2333] border border-cyan-500/40 rounded-xl flex items-center justify-between animate-in slide-in-from-bottom-2 shadow-2xl backdrop-blur-lg">
              <div className="flex items-center gap-3">
                {inputType === 'image' ? (
                  <img src={filePreview} className="w-12 h-12 rounded-lg object-cover border border-cyan-500/20" alt="preview" />
                ) : (
                  <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center text-red-400">
                    <Mic size={20} />
                  </div>
                )}
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-white truncate max-w-[150px]">{file.name}</p>
                  <p className="text-[10px] text-cyan-400 uppercase tracking-widest">{inputType} ready</p>
                </div>
              </div>
              <button onClick={clearFile} className="p-2 hover:bg-white/5 rounded-full transition text-slate-400">
                <X size={18} />
              </button>
            </div>
          )}

          {/* Main Input Field */}
          <div className="relative flex items-center gap-2 bg-[#161D2C] border border-slate-700 p-2 pl-4 rounded-2xl focus-within:border-cyan-500/50 focus-within:ring-1 focus-within:ring-cyan-500/20 transition-all shadow-xl">
            
            <div className="flex items-center gap-1 border-r border-slate-700 pr-2 mr-2">
              <button
                onClick={() => { setInputType('image'); fileInputRef.current.click(); }}
                className={`p-2 rounded-xl transition duration-200 ${inputType === 'image' ? 'bg-cyan-500 text-white' : 'text-slate-500 hover:bg-slate-800'}`}
                title="Attach Image"
              >
                <ImageIcon size={20} />
              </button>

              <button
                onClick={() => { setInputType('audio'); fileInputRef.current.click(); }}
                className={`p-2 rounded-xl transition duration-200 ${inputType === 'audio' ? 'bg-red-500 text-white' : 'text-slate-500 hover:bg-slate-800'}`}
                title="Attach Audio"
              >
                <Mic size={20} />
              </button>
            </div>

            <input
              type="text"
              className="flex-1 bg-transparent border-none outline-none text-sm text-slate-200 placeholder:text-slate-600 py-3"
              placeholder={file ? "Type message or just hit send..." : "Query the Multimodal RAG Database..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
              accept={inputType === 'image' ? "image/*" : "audio/*"}
            />

            <button
              onClick={handleSend}
              disabled={loading || (!input && !file)}
              className={`p-3 rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0)] hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] ${
                loading || (!input && !file) 
                ? 'bg-slate-800 text-slate-600' 
                : 'bg-cyan-500 hover:bg-cyan-400 text-white'
              }`}
            >
              <Send size={20} />
            </button>
          </div>
          
          <div className="mt-3 flex justify-center gap-6 opacity-30">
             <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-mono tracking-widest uppercase italic">Whisper</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse delay-75"></div>
                <span className="text-[10px] font-mono tracking-widest uppercase italic">LangChain</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse delay-75"></div>
                <span className="text-[10px] font-mono tracking-widest uppercase italic">Tesseract OCR</span>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChatApp;