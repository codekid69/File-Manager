import { useState } from 'react'
import { useFileContext } from '../context/FileContext'
import { formatDate } from '../utils/fileUtils'
import ActionMenu from './ActionMenu'
import { FiFolder } from 'react-icons/fi'

const FolderCard = ({ folder }) => {
  const { navigateToFolder, toggleSelectItem, selectedItems } = useFileContext()
  const [isHovering, setIsHovering] = useState(false)
  
  const isSelected = selectedItems.some(item => item.id === folder.id && item.isFolder)
  
  const handleCardClick = (e) => {
    // If the user clicked on the checkbox or the action menu, don't trigger card click
    if (e.target.closest('.checkbox-container') || e.target.closest('.action-menu-container')) {
      return
    }
    
    navigateToFolder(folder.id)
  }
  
  return (
    <div 
      className={`file-card bg-white rounded-lg shadow-sm border overflow-hidden cursor-pointer ${
        isSelected ? 'ring-2 ring-primary-500 border-primary-500' : 'border-gray-200 hover:border-gray-300'
      }`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleCardClick}
    >
      {/* Folder Icon */}
      <div 
        className="relative aspect-video flex items-center justify-center" 
        style={{ backgroundColor: `${folder.color}10` }}
      >
        <div 
          className="p-4 rounded-full" 
          style={{ backgroundColor: `${folder.color}30` }}
        >
          <FiFolder size={40} style={{ color: folder.color }} />
        </div>
        
        {/* Selection checkbox (visible on hover or when selected) */}
        <div 
          className={`checkbox-container absolute top-2 left-2 transition-opacity ${
            isHovering || isSelected ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <input 
            type="checkbox" 
            checked={isSelected}
            onChange={() => toggleSelectItem(folder)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
        </div>
        
        {/* Action menu (visible on hover) */}
        <div 
          className={`action-menu-container absolute top-2 right-2 transition-opacity ${
            isHovering ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <ActionMenu item={folder} isCompact />
        </div>
      </div>
      
      {/* Folder Info */}
      <div className="p-3">
        <h3 className="font-medium text-gray-900 truncate" title={folder.name}>
          {folder.name}
        </h3>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-xs text-gray-500">
            Folder
          </span>
          <span className="text-xs text-gray-500">
            {formatDate(folder.modified)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default FolderCard