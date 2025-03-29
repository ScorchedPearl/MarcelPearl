import React, { useState } from 'react';
import { Code2, Copy, Check, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// import { useDraggable, useDroppable } from '@dnd-kit/core';

interface CodeProps {
  initialCode?: string;
  className?: string;
}

const Code: React.FC<CodeProps> = ({ 
  initialCode = `function twoSum(nums, target) {\n  const map = new Map();\n\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    \n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    \n    map.set(nums[i], i);\n  }\n  \n  return [];\n}`,
  className ,
}) => {
  //  const { setNodeRef: setDroppableNodeRef } = useDroppable({
  //     id: id,
  //   });
  const [code, setCode] = useState(initialCode);
  const [copied, setCopied] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'darker'>('darker');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      
      const newText = code.substring(0, start) + '  ' + code.substring(end);
      setCode(newText);
      
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      }, 0);
    }
  };

  const lineNumbers = code.split('\n').map((_, i) => i + 1);
  // const { attributes, listeners, setNodeRef, transform } = useDraggable({
  //   id: itemId,
  // });

  // const style = transform
  //   ? {
  //       transform: `translate(${transform.x}px, ${transform.y}px)`,
  //     }
  //   : undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`h-8/12 flex flex-col backdrop-blur-sm bg-black/40 border border-orange-500 rounded-xl  ${className}`}
    >
      {/* <div ref={setDroppableNodeRef} className='h-full w-full'>
        <div   ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={style}
        className='h-full w-full'> */}
      <div className="bg-black/60 px-6 py-4 flex items-center justify-between border-b border-orange-500 shadow-[0_0_10px_rgba(255,165,0,0.4)]" 
      >
        
        <div className="flex items-center gap-3">
          <Code2 className="w-5 h-5 text-white glow" />
          <span className="text-white font-medium glow">Solution</span>
        </div>
        
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTheme(theme === 'dark' ? 'darker' : 'dark')}
            className="px-3 py-1.5 rounded-lg flex items-center gap-2 bg-orange-600/20 border border-orange-500 text-white hover:bg-orange-600/30 transition-colors shadow-[0_0_10px_rgba(255,165,0,0.4)]"
          >
            <Terminal className="w-4 h-4" />
            <span>Theme</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg flex items-center gap-2 bg-orange-600/20 border border-orange-500 text-white hover:bg-orange-600/30 transition-colors shadow-[0_0_10px_rgba(255,165,0,0.4)]"
          >
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </motion.button>
        </div>
      </div>

      {/* Code Editor */}
      <div className="relative flex-grow overflow-hidden">
        {/* Line Numbers */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-black/40 border-r border-orange-500 flex flex-col items-center pt-4 text-orange-500/80 shadow-[0_0_10px_rgba(255,165,0,0.4)]">
          {lineNumbers.map((num) => (
            <div key={num} className="text-xs w-full text-center pb-[3.3px]">
              {num}
            </div>
          ))}
        </div>
        
        {/* Text Area */}
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`w-full h-full min-h-[300px] font-mono text-sm p-4 pl-16 outline-none resize-none ${
            theme === 'dark' 
              ? 'bg-black/20 text-orange-300' 
              : 'bg-black/40 text-orange-200'
          } shadow-[0_0_10px_rgba(255,165,0,0.4)]`}
          spellCheck="false"
          style={{
            lineHeight: '1.6',
            tabSize: 2,
          }}
        />
      </div>

      {/* Footer */}
      <div className="bg-black/60 px-4 py-2 text-xs text-white border-t border-orange-500 flex justify-between shadow-[0_0_10px_rgba(255,165,0,0.4)]">
        <span>Press Tab for indentation (2 spaces)</span>
        <AnimatePresence>
          {copied && (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-green-400"
            >
              Code copied to clipboard
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      {/* </div>
      </div> */}
    </motion.div>
  );
};

export default Code;
