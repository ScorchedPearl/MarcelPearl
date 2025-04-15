import React, { useState, useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-java';
import 'prismjs/themes/prism-tomorrow.css';
import { Copy, Check, Download, Upload, Maximize2, Minimize2, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { languages, getLanguageByExtension } from '../../../../../lib/editorLanguage';
import { getCodeInfo, highlightCode } from '../../../../../lib/editorutils';

interface CodeEditorProps {
  initialValue?: string;
  onChange?: (value: string) => void;
  initialLanguage?: string;
  onLanguageChange?: (language: string) => void;
  onClear:React.Dispatch<React.SetStateAction<string>>
  onExecution:()=>void; 
}

const CodeEditor: React.FC<CodeEditorProps> = ({ 
  initialValue = '// Start coding here...',
  onChange,
  initialLanguage = 'javascript',
  onLanguageChange,
  onClear,
  onExecution
}) => {
  const [code, setCode] = useState(initialValue);
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [language, setLanguage] = useState<string>(initialLanguage);
  const [isEditorReady, setIsEditorReady] = useState(false);

  useEffect(() => {
    // Apply animation after mount
    setIsEditorReady(true);
  }, []);

  // Handle code change
  const handleCodeChange = (value: string) => {
    setCode(value);
    if (onChange) {
      onChange(value);
    }
  };

  // Handle language change
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    if (onLanguageChange) {
      onLanguageChange(newLanguage);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
  
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const extensions = languages.reduce((acc, lang) => ({
      ...acc,
      [lang.value]: lang.extension
    }), {} as Record<string, string>);
    
    const extension = extensions[language] || 'txt';
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${extension}`;
    a.click();
    URL.revokeObjectURL(url);
   
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setCode(content);
        
        // Set language based on file extension
        const extension = file.name.split('.').pop()?.toLowerCase() || '';
        const newLanguage = getLanguageByExtension(extension);
        
        if (newLanguage) {
          setLanguage(newLanguage);
          if (onLanguageChange) {
            onLanguageChange(newLanguage);
          }
        }
        
        if (onChange) {
          onChange(content);
        }
        
      
      };
      reader.readAsText(file);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
   
  };

  return (
    <div 
      className={`transition-all duration-500 ease-in-out transform opacity-100
      ${isEditorReady ? 'animate-fade-in' : 'opacity-0'}
      ${isFullscreen ? 'fixed inset-0 z-50 bg-background p-2' : ''}`}
    >
      <div className="bg-[#000000] rounded-t-lg p-2 flex items-center justify-between hover-scale">
        <div className="flex space-x-2 items-center">
        <Button 
            onClick={()=>onExecution()}
            disabled={language !== 'javascript'}
            title={language !== 'javascript' ? "Only JavaScript can be executed" : "Execute code"}
            className="hover-scale text-white bg-cyan-500"
          >
            Execute Code
          </Button>
          <Button 
            onClick={() => onClear('')}
            variant="outline"
            className="hover-scale text-cyan-300"
          >
            Clear Editor
          </Button>
          <div className="ml-4 flex items-center">
            <Languages size={16} className="mr-2 text-gray-400 animate-pulse" />
            <select 
              value={language}
              onChange={handleLanguageChange}
              className="bg-[#282a36] text-gray-300 px-2 py-1 rounded text-xs border-none outline-none transition-transform hover:bg-[#343746] focus:ring-2 ring-blue-500"
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="text-gray-400 hover:text-white transition-all hover:scale-110"
            title={copied ? 'Copied!' : 'Copy code'}
          >
            {copied ? <Check size={18} className="animate-scale-in" /> : <Copy size={18} />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDownload}
            className="text-gray-400 hover:text-white transition-all hover:scale-110"
            title="Download code"
          >
            <Download size={18} />
          </Button>
          <label className="cursor-pointer">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white transition-all hover:scale-110"
              title="Upload file"
              asChild
            >
              <span>
                <Upload size={18} />
              </span>
            </Button>
            <input
              type="file"
              accept=".js,.ts,.py,.cpp,.c,.java"
              onChange={handleUpload}
              className="hidden"
            />
          </label>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            className="text-gray-400 hover:text-white transition-all hover:scale-110"
            title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </Button>
        </div>
      </div>
      
      <div className={`bg-cyan-300/100 border border-cyan-300 rounded-b-lg overflow-hidden transition-all duration-300 ${isFullscreen ? 'shadow-2xl' : 'shadow-lg'}`}>
        <Editor
          value={code}
          onValueChange={handleCodeChange}
          highlight={code => highlightCode(code, language)}
          padding={15}
          style={{
            fontFamily: 'monospace',
            fontSize: '14px',
            height: isFullscreen ? 'calc(100vh - 140px)' : '500px',
            overflow: 'auto',
            color: '#f8f8f2',
            backgroundColor: '#1D3443',
            transition: 'all 0.3s ease',
          }}
          className="min-h-[500px]"
        />
      </div>
      
      <div className="mt-2 text-xs text-gray-500 text-right animate-fade-in">
        {getCodeInfo(code)}
      </div>
    </div>
  );
};

export default CodeEditor;
