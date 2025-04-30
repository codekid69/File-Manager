import { useState, useRef, useEffect } from 'react'
import { useFileContext } from '../context/FileContext'
import { downloadFile } from '../utils/fileUtils'
import { 
  FiMoreVertical, 
  FiDownload, 
  FiTrash2, 
  FiEdit, 
  FiEye,
  FiShare2
} from 'react-icons/fi'

const ActionMenu = ({ item, isCompact = false }) => {
  const { previewFile, deleteItems } = useFileContext()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Handle actions
  const handleAction = (action, e) => {
    e.stopPropagation()
    setIsOpen(false)
    
    switch (action) {
      case 'preview':
        if (!item.isFolder) {
          previewFile(item)
        }
        break
      case 'download':
        if (!item.isFolder) {
          downloadFile(item)
        }
        break
      case 'delete':
        deleteItems([item])
        break
      default:
        break
    }
  }

  return (
    <div className="relative" ref={menuRef}>
      <button 
        className={`p-1 rounded-full hover:bg-gray-200 focus:outline-none ${
          isCompact ? 'text-white bg-black bg-opacity-40 hover:bg-opacity-60' : 'text-gray-500'
        }`}
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
        aria-label="File actions"
      >
        <FiMoreVertical size={isCompact ? 16 : 20} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-50 animate-fade-in">
          <div className="py-1">
            {!item.isFolder && (
              <button 
                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={(e) => handleAction('preview', e)}
              >
                <FiEye className="mr-3 text-gray-500" />
                Preview
              </button>
            )}
            
            <button 
              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={(e) => handleAction('download', e)}
            >
              <FiDownload className="mr-3 text-gray-500" />
              Download
            </button>
            
            <button 
              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={(e) => handleAction('share', e)}
            >
              <FiShare2 className="mr-3 text-gray-500" />
              Share
            </button>
            
            <button 
              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={(e) => handleAction('rename', e)}
            >
              <FiEdit className="mr-3 text-gray-500" />
              Rename
            </button>
            
            <button 
              className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              onClick={(e) => handleAction('delete', e)}
            >
              <FiTrash2 className="mr-3 text-red-500" />
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ActionMenu