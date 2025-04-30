import { FiFolder, FiUpload } from 'react-icons/fi'
import { useFileContext } from '../context/FileContext'

const EmptyState = () => {
  const { currentFolder, currentPath } = useFileContext()
  
  // Different messages based on if we're in root or a subfolder
  const message = currentFolder === null 
    ? "Your files will appear here" 
    : `This folder is empty`
  
  const folderName = currentPath[currentPath.length - 1]?.name
  
  return (
    <div className="py-16 flex flex-col items-center justify-center bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 bg-gray-100 rounded-full mb-4">
        <FiFolder size={48} className="text-gray-400" />
      </div>
      <h3 className="text-xl font-medium text-gray-900 mb-2">
        {folderName && currentFolder !== null ? `${folderName} is empty` : 'No files yet'}
      </h3>
      <p className="text-gray-500 text-center max-w-md mb-6">
        {message}
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <label className="inline-flex items-center px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg shadow transition-colors cursor-pointer">
          <FiUpload className="mr-2" />
          Upload files
          <input type="file" multiple className="hidden" />
        </label>
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-lg shadow-sm transition-colors">
          <FiFolder className="mr-2" />
          Create folder
        </button>
      </div>
    </div>
  )
}

export default EmptyState