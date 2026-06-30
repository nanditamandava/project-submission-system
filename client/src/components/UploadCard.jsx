import { useState, useRef } from 'react';
import { Upload, File as FileIcon, X, CheckCircle } from 'lucide-react';
import Button from './Button';
import { cn } from '../utils/cn';

export default function UploadCard({ 
  title, 
  description, 
  accept = "*", 
  onUpload, 
  isUploading = false,
  buttonText = "Upload File"
}) {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  const handleUploadSubmit = async () => {
    if (file && onUpload) {
      try {
        await onUpload(file);
        setFile(null);
      } catch (error) {
        // Error is handled by parent, we just prevent clearing the file
      }
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 mb-4">{description}</p>

      {!file ? (
        <div 
          className={cn(
            "relative flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg transition-colors cursor-pointer",
            dragActive ? "border-primary-500 bg-primary-50" : "border-gray-300 hover:bg-gray-50"
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={onButtonClick}
        >
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept={accept}
            onChange={handleChange}
            disabled={isUploading}
          />
          <Upload className="h-10 w-10 text-gray-400 mb-3" />
          <p className="text-sm font-medium text-gray-700">Click or drag file to this area to upload</p>
          <p className="text-xs text-gray-500 mt-1">Supported formats: {accept}</p>
        </div>
      ) : (
        <div className="flex flex-col border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3 overflow-hidden">
              <div className="p-2 bg-white rounded flex-shrink-0">
                <FileIcon className="h-6 w-6 text-primary-500" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            {!isUploading && (
              <button 
                onClick={() => setFile(null)}
                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                disabled={isUploading}
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          
          <Button 
            onClick={handleUploadSubmit} 
            isLoading={isUploading}
            disabled={isUploading}
            className="w-full"
          >
            {isUploading ? 'Uploading...' : buttonText}
          </Button>
        </div>
      )}
    </div>
  );
}
