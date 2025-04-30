import { useState } from 'react'
import { useFileContext } from '../context/FileContext'
import { formatFileSize, formatDate, isPreviewable } from '../utils/fileUtils'
import ActionMenu from './ActionMenu'
import { FiFile, FiFileText, FiImage, FiPieChart, FiBookOpen, FiFilm } from 'react-icons/fi'

const FileCard = ({ file }) => {
  const { toggleSelectItem, selectedItems, previewFile } = useFileContext()
  const [isHovering, setIsHovering] = useState(false)
  
  const isSelected = selectedItems.some(item => item.id === file.id && !item.isFolder)
  
  const getFileIcon = () => {
    switch (file.type) {
      case 'document':
        return <FiFileText size={24} className="text-blue-500" />
      case 'image':
        return <FiImage size={24} className="text-green-500" />
      case 'spreadsheet':
        return <FiPieChart size={24} className="text-emerald-500" />
      case 'presentation':
        return <FiBookOpen size={24} className="text-orange-500" />
      case 'pdf':
        return <FiFilm size={24} className="text-red-500" />
      default:
        return <FiFile size={24} className="text-gray-500" />
    }
  }
  
  const handleCardClick = (e) => {
    // If the user clicked on the checkbox or the action menu, don't trigger card click
    if (e.target.closest('.checkbox-container') || e.target.closest('.action-menu-container')) {
      return
    }
    
    // If the file is previewable, open the preview
    if (isPreviewable(file)) {
      previewFile(file)
    }
  }
  
  return (
    <div 
      className={`file-card bg-white rounded-lg shadow-sm border overflow-hidden ${
        isSelected ? 'ring-2 ring-primary-500 border-primary-500' : 'border-gray-200 hover:border-gray-300'
      }`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleCardClick}
    >
      {/* Thumbnail/Preview */}
      <div className="relative aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
        {file.type === 'image' ? (
          <img 
            src={file.thumbnail} 
            alt={file.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            {getFileIcon()}
            <span className="text-xs text-gray-500 mt-2 uppercase">{file.extension}</span>
          </div>
        )}
        
        {/* Selection checkbox (visible on hover or when selected) */}
        <div 
          className={`checkbox-container absolute top-2 left-2 transition-opacity ${
            isHovering || isSelected ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <input 
            type="checkbox" 
            checked={isSelected}
            onChange={() => toggleSelectItem(file)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
        </div>
        
        {/* Action menu (visible on hover) */}
        <div 
          className={`action-menu-container absolute top-2 right-2 transition-opacity ${
            isHovering ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <ActionMenu item={file} isCompact />
        </div>
      </div>
      
      {/* File Info */}
      <div className="p-3">
        <h3 className="font-medium text-gray-900 truncate" title={file.name}>
          {file.name}
        </h3>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {formatFileSize(file.size)}
          </span>
          <span className="text-xs text-gray-500">
            {formatDate(file.modified)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default FileCard