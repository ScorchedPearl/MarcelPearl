
export type ProgrammingLanguage = {
 value: string;
 label: string;
 extension: string;
 fileType?: string;
};

export const languages: ProgrammingLanguage[] = [
 { value: 'javascript', label: 'JavaScript', extension: 'js' },
 { value: 'typescript', label: 'TypeScript', extension: 'ts' },
 { value: 'python', label: 'Python', extension: 'py' },
 { value: 'cpp', label: 'C++', extension: 'cpp', fileType: 'text/x-c++src' },
 { value: 'c', label: 'C', extension: 'c', fileType: 'text/x-csrc' },
 { value: 'java', label: 'Java', extension: 'java' }
];

export const getLanguageByExtension = (extension: string): string => {
 const extensionMap: Record<string, string> = {
   'js': 'javascript',
   'ts': 'typescript',
   'py': 'python',
   'cpp': 'cpp',
   'c': 'c',
   'java': 'java'
 };
 
 return extensionMap[extension] || 'javascript';
};
