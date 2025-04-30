import { useState, useRef, useEffect } from 'react'
import { useFileContext } from '../context/FileContext'
import { 
  FiSearch, FiGrid, FiList, FiUpload, 
  FiPlus, FiFolder, FiX, FiMenu, FiChevronDown 
} from 'react-icons/fi'

const Header = ({ isMenuOpen, setIsMenuOpen }) => {
  const { 
    viewMode, setViewMode, 
    searchQuery, setSearchQuery,
    addFolder, addFile
  } = useFileContext()
  
  const [showUploadMenu, setShowUploadMenu] = useState(false)
  const uploadMenuRef = useRef(null)
  const uploadButtonRef = useRef(null)

  // Close upload menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        uploadMenuRef.current && 
        !uploadMenuRef.current.contains(event.target) &&
        !uploadButtonRef.current.contains(event.target)
      ) {
        setShowUploadMenu(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Handle file input change
  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files)
    
    files.forEach(file => {
      const fileExt = file.name.split('.').pop()
      
      // Determine file type from extension
      let fileType = 'generic'
      if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExt)) {
        fileType = 'image'
      } else if (['doc', 'docx'].includes(fileExt)) {
        fileType = 'document'
      } else if (['xls', 'xlsx'].includes(fileExt)) {
        fileType = 'spreadsheet'
      } else if (['ppt', 'pptx'].includes(fileExt)) {
        fileType = 'presentation'
      } else if (fileExt === 'pdf') {
        fileType = 'pdf'
      } else if (fileExt === 'txt') {
        fileType = 'text'
      }
      
      // Create a thumbnail URL for images
      let thumbnail = `https://via.placeholder.com/100?text=${fileExt.toUpperCase()}`
      
      if (fileType === 'image') {
        thumbnail = URL.createObjectURL(file)
      }
      
      // Add the file to our state
      addFile({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: fileType,
        extension: fileExt,
        size: file.size,
        created: new Date().toISOString(),
        modified: new Date().toISOString(),
        owner: 'me',
        shared: false,
        starred: false,
        thumbnail
      })
    })
    
    // Reset the file input
    e.target.value = ''
    setShowUploadMenu(false)
  }

  // Handle create new folder
  const handleCreateFolder = () => {
    const folderName = prompt('Enter folder name:')
    
    if (folderName && folderName.trim() !== '') {
      addFolder({
        id: Math.random().toString(36).substr(2, 9),
        name: folderName.trim(),
        created: new Date().toISOString(),
        modified: new Date().toISOString(),
        owner: 'me',
        shared: false,
        starred: false,
        isFolder: true,
        color: '#' + Math.floor(Math.random()*16777215).toString(16) // Random color
      })
    }
    
    setShowUploadMenu(false)
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          {/* Logo and App Name */}
          <div className="flex items-center mb-4 sm:mb-0">
            <button 
              className="mr-4 p-2 rounded-full hover:bg-gray-100 sm:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <FiMenu size={20} />
            </button>
            <div className="bg-primary-500 text-white p-2 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="ml-3 text-xl font-semibold">File Manager</h1>
          </div>
          
          {/* Search bar */}
          <div className="relative w-full sm:w-auto sm:flex-1 sm:mx-6 mb-4 sm:mb-0">
            <div className="flex items-center w-full sm:max-w-md mx-auto">
              <div className="relative flex-1">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search files and folders..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setSearchQuery('')}
                  >
                    <FiX size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex items-center space-x-2 w-full sm:w-auto justify-between">
            <div className="bg-gray-100 rounded-lg p-1 flex items-center">
              <button 
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow' : 'hover:bg-gray-200'}`} 
                onClick={() => setViewMode('grid')}
                title="Grid view"
              >
                <FiGrid size={20} className={viewMode === 'grid' ? 'text-primary-500' : 'text-gray-600'} />
              </button>
              <button 
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow' : 'hover:bg-gray-200'}`} 
                onClick={() => setViewMode('list')}
                title="List view"
              >
                <FiList size={20} className={viewMode === 'list' ? 'text-primary-500' : 'text-gray-600'} />
              </button>
            </div>
            
            <div className="relative">
              <button 
                ref={uploadButtonRef}
                className="flex items-center px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg shadow transition-colors"
                onClick={() => setShowUploadMenu(!showUploadMenu)}
              >
                <FiUpload className="mr-2" />
                <span className="mr-1">Upload</span>
                <FiChevronDown size={16} />
              </button>
              
              {showUploadMenu && (
                <div 
                  ref={uploadMenuRef}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 animate-fade-in"
                >
                  <div className="py-1">
                    <label className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer">
                      <FiUpload className="mr-3 text-gray-600" />
                      <span>Upload files</span>
                      <input 
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleFileInputChange}
                      />
                    </label>
                    <button 
                      className="w-full flex items-center px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
                      onClick={handleCreateFolder}
                    >
                      <FiFolder className="mr-3 text-gray-600" />
                      <span>Create folder</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header