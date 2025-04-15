
import Prism from 'prismjs';

export const getCodeInfo = (code: string): string => {
  const lines = code.split('\n').length;
  const chars = code.length;
  return `${lines} lines, ${chars} characters`;
};

export const highlightCode = (code: string, language: string): string => {
  if (!Prism.languages[language]) {
    return code;
  }
  return Prism.highlight(code, Prism.languages[language], language);
};
