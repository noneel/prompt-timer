import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, FileText } from 'lucide-react';

interface FileUploaderProps {
  onFileLoaded: (content: string) => void;
  hasUploadedFile: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileLoaded, hasUploadedFile }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const csvContent = event.target?.result as string;
          if (csvContent) {
            onFileLoaded(csvContent);
          }
        };
        reader.readAsText(file);
      }
    },
    [onFileLoaded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
    },
    multiple: false,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto mb-8"
    >
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${
            isDragActive
              ? 'border-primary-500 bg-primary-50'
              : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
          }
          ${hasUploadedFile ? 'border-success-500 bg-green-50' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        {hasUploadedFile ? (
          <div className="flex flex-col items-center">
            <FileText className="w-12 h-12 text-success-500 mb-2" />
            <p className="text-success-600 font-medium">CSV file loaded successfully!</p>
            <p className="text-sm text-gray-500 mt-1">Drop another file to replace</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Upload className="w-12 h-12 text-gray-400 mb-2" />
            <p className="font-medium">
              {isDragActive ? 'Drop the CSV file here' : 'Drag & drop a CSV file here'}
            </p>
            <p className="text-sm text-gray-500 mt-1">or click to browse</p>
            <p className="text-xs text-gray-400 mt-4">
              CSV file should contain a column of prompts
            </p>
          </div>
        )}
      </div>
      
      {!hasUploadedFile && (
        <p className="text-xs text-center text-gray-500 mt-2">
          Don't have a CSV? No problem! Sample prompts are available.
        </p>
      )}
    </motion.div>
  );
};

export default FileUploader;