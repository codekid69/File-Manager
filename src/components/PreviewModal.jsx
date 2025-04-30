import { useEffect } from 'react'
import { formatFileSize, formatDate } from '../utils/fileUtils'
import { FiX, FiDownload, FiShare2 } from 'react-icons/fi'
import { downloadFile } from '../utils/fileUtils'

const PreviewModal = ({ file, onClose }) => {
  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  // Prevent body scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  // Render file preview based on type
  const renderPreview = () => {
    switch (file.type) {
      case 'image':
        return (
          <div className="flex items-center justify-center h-full">
            <img 
              src={file.thumbnail} 
              alt={file.name} 
              className="max-w-full max-h-full object-contain"
            />
          </div>
        )
      case 'text':
        return (
          <div className="bg-white p-6 rounded overflow-auto max-h-full">
            <pre className="whitespace-pre-wrap">{file.content || 'No content available for preview.'}</pre>
          </div>
        )
      case 'pdf':
        return (
          <div className="bg-white p-6 rounded h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl mb-4 text-red-500">PDF</div>
              <p className="text-gray-500">PDF preview is not available in this demo.</p>
              <button 
                className="mt-4 px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
                onClick={() => downloadFile(file)}
              >
                Download to view
              </button>
            </div>
          </div>
        )
      default:
        return (
          <div className="bg-white p-6 rounded h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl mb-4 text-gray-400">
                {file.extension.toUpperCase()}
              </div>
              <p className="text-gray-500">Preview not available for this file type.</p>
              <button 
                className="mt-4 px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
                onClick={() => downloadFile(file)}
              >
                Download to view
              </button>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-gray-100 rounded-lg shadow-xl w-full max-w-5xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 truncate" title={file.name}>
            {file.name}
          </h2>
          <div className="flex items-center space-x-2">
            <button 
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-full"
              onClick={() => downloadFile(file)}
              title="Download"
            >
              <FiDownload size={20} />
            </button>
            <button 
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-full"
              title="Share"
            >
              <FiShare2 size={20} />
            </button>
            <button 
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-full"
              onClick={onClose}
              title="Close"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-hidden p-4">
          {renderPreview()}
        </div>
        
        {/* Footer with file info */}
        <div className="bg-white p-4 border-t border-gray-200 text-sm text-gray-600">
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <div>
              <span className="font-medium">Type:</span> {file.type}
            </div>
            <div>
              <span className="font-medium">Size:</span> {formatFileSize(file.size)}
            </div>
            <div>
              <span className="font-medium">Created:</span> {formatDate(file.created)}
            </div>
            <div>
              <span className="font-medium">Modified:</span> {formatDate(file.modified)}
            </div>
            <div>
              <span className="font-medium">Owner:</span> {file.owner === 'me' ? 'You' : file.owner}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreviewModal