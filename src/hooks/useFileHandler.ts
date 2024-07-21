import { useCallback, useState } from 'react';

const useFileHandler = (initialFiles: File[] = []) => {
  const [, setFiles] = useState<File[]>(initialFiles);

  const handleFilesChange = useCallback((newFiles: File[]) => {
    setFiles(newFiles);
  }, []);

  return {
    handleFilesChange,
  };
};

export default useFileHandler;
