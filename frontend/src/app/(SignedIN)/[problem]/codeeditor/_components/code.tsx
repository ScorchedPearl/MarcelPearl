import React, { useState } from 'react';
import CodeEditor from './editor';
import { Button } from '@/components/ui/button';

const CodeEditorPage = () => {
  const [code, setCode] = useState('// Start coding here...\n\n// Example function:\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet("World"));');
  const [language, setLanguage] = useState('javascript');

  const executeCode = () => {
    try {
      if (language !== 'javascript') {
      
        return;
      }
      
      // This is just a simple way to execute code - in a real app,
      // you'd want to use a more secure approach
      // eslint-disable-next-line no-new-func
      const result = new Function(code)();
      
    } catch (error) {
     
    }
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    
    // Set default code examples for different languages
    if (newLanguage !== language) {
      let newCode = '';
      
      switch (newLanguage) {
        case 'javascript':
          newCode = '// JavaScript Example\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet("World"));';
          break;
        case 'typescript':
          newCode = '// TypeScript Example\nfunction greet(name: string): string {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet("World"));';
          break;
        case 'python':
          newCode = '# Python Example\ndef greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("World"))';
          break;
        case 'cpp':
          newCode = '// C++ Example\n#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}';
          break;
        case 'c':
          newCode = '// C Example\n#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}';
          break;
        case 'java':
          newCode = '// Java Example\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}';
          break;
        default:
          newCode = '// Start coding here...';
      }
      
      setCode(newCode);
    }
    
   
  };

  return (
    <div className="container mx-auto animate-fade-in">
      <div className="mb-2">
        <CodeEditor 
          initialValue={code}
          onChange={setCode}
          initialLanguage={language}
          onLanguageChange={handleLanguageChange}
          onExecution={executeCode}
          onClear={setCode}
        />
      </div>
    </div>
  );
};

export default CodeEditorPage;
