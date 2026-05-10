import React, { useState, useEffect } from "react";
import { Quote, RefreshCw, Share2, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Citation {
  text: string;
  author: string;
}

const App: React.FC = () => {
  const [citations, setCitations] = useState<Citation[]>([]);
  const [currentQuote, setCurrentQuote] = useState<Citation | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [rotation, setRotation] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("/citations.json")
      .then((res) => res.json())
      .then((data: Citation[]) => {
        setCitations(data);
        setCurrentQuote(data[Math.floor(Math.random() * data.length)]);
        setLoading(false);
      })
      .catch((err) => console.error("Erreur de chargement :", err));
  }, []);

  const getRandomQuote = () => {
    if (citations.length > 0) {
      setRotation((prev) => prev + 180);
      const randomIndex = Math.floor(Math.random() * citations.length);
      setCurrentQuote(citations[randomIndex]);
    }
  };

  const copyToClipboard = () => {
    if (currentQuote) {
      navigator.clipboard.writeText(
        `"${currentQuote.text}" - ${currentQuote.author}`,
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading)
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#050505]">
        <RefreshCw className="text-cyan-500 animate-spin" />
      </div>
    );

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050505] relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-900/20 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full px-6 z-10"
      >
        <div className="bg-[#111111] border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative">
          <div className="mb-10 inline-flex p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-white/5">
            <Quote className="text-cyan-400" size={32} />
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuote?.text}
              initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl font-semibold text-gray-100 leading-tight tracking-tight">
                {currentQuote?.text}
              </h1>
              <div className="mt-8 flex items-center gap-4">
                <div className="h-px w-12 bg-gradient-to-r from-cyan-500 to-transparent"></div>
                <p className="text-lg text-gray-400 font-medium tracking-wide">
                  {currentQuote?.author}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-6">
            <div className="flex gap-3">
              <button
                onClick={copyToClipboard}
                className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all border border-white/5"
              >
                {copied ? (
                  <Check size={20} className="text-green-400" />
                ) : (
                  <Copy size={20} />
                )}
              </button>
              <button className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all border border-white/5">
                <Share2 size={20} />
              </button>
            </div>
            <button
              onClick={getRandomQuote}
              className="group relative flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 overflow-hidden"
            >
              <motion.div
                animate={{ rotate: rotation }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <RefreshCw size={22} />
              </motion.div>
              <span>Suivant</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
            </button>
          </div>
        </div>
        <div className="mt-8 flex justify-center items-center gap-2 opacity-30 group hover:opacity-100 transition-opacity duration-500">
          <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
          <span className="text-xs text-white uppercase tracking-[0.3em] font-bold">
            Lumina Quotes
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default App;
