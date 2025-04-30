import { useState, useEffect } from 'react'
import { useFileContext } from '../context/FileContext'
import Sidebar from './Sidebar'
import Breadcrumbs from './Breadcrumbs'
import GridView from './GridView'
import ListView from './ListView'
import PreviewModal from './PreviewModal'

const FileManager = ({ isMenuOpen }) => {
  const { 
    viewMode, 
    preview, 
    closePreview
  } = useFileContext()

  // Responsive state for mobile view
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  // Update mobile state on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="flex h-full">
      {/* Sidebar (hide on mobile when menu is closed) */}
      <Sidebar isVisible={!isMobile || isMenuOpen} />
      
      {/* Main content */}
      <div className={`flex-1 ${isMobile && isMenuOpen ? 'hidden' : 'block'}`}>
        {/* Breadcrumbs */}
        <Breadcrumbs />
        
        {/* File/Folder Grid or List */}
        <div className="mt-4">
          {viewMode === 'grid' ? <GridView /> : <ListView />}
        </div>
      </div>
      
      {/* Preview Modal */}
      {preview && (
        <PreviewModal file={preview} onClose={closePreview} />
      )}
    </div>
  )
}

export default FileManager