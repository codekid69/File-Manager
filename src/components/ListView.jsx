import { useFileContext } from '../context/FileContext'
import { formatFileSize, formatDate } from '../utils/fileUtils'
import ActionMenu from './ActionMenu'
import EmptyState from './EmptyState'
import { FiFolder, FiFile, FiChevronUp, FiChevronDown } from 'react-icons/fi'

const ListView = () => {
  const { 
    folders, 
    files, 
    sortBy, 
    sortDirection, 
    toggleSort, 
    navigateToFolder, 
    toggleSelectItem,
    selectedItems,
    previewFile
  } = useFileContext()
  
  const isEmpty = folders.length === 0 && files.length === 0
  
  if (isEmpty) {
    return <EmptyState />
  }
  
  const SortIcon = ({ column }) => {
    if (sortBy !== column) return null
    return sortDirection === 'asc' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
  }
  
  return (
    <div className="file-table-container bg-white rounded-lg shadow overflow-hidden">
      <table className="file-table w-full">
        <thead>
          <tr>
            <th className="w-12 px-4">
              {/* Checkbox column */}
            </th>
            <th className="w-1/2">
              <button 
                className="flex items-center focus:outline-none"
                onClick={() => toggleSort('name')}
              >
                Name
                <SortIcon column="name" />
              </button>
            </th>
            <th className="hidden md:table-cell">
              <button 
                className="flex items-center focus:outline-none"
                onClick={() => toggleSort('modified')}
              >
                Modified
                <SortIcon column="modified" />
              </button>
            </th>
            <th className="hidden lg:table-cell">Size</th>
            <th className="hidden lg:table-cell">
              <button 
                className="flex items-center focus:outline-none"
                onClick={() => toggleSort('type')}
              >
                Type
                <SortIcon column="type" />
              </button>
            </th>
            <th className="w-10"></th> {/* Actions column */}
          </tr>
        </thead>
        <tbody>
          {/* Folders */}
          {folders.map(folder => {
            const isSelected = selectedItems.some(item => item.id === folder.id && item.isFolder)
            
            return (
              <tr 
                key={folder.id} 
                className={`hover:bg-gray-50 ${isSelected ? 'bg-blue-50' : ''}`}
              >
                <td className="px-4">
                  <input 
                    type="checkbox" 
                    checked={isSelected}
                    onChange={() => toggleSelectItem(folder)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                </td>
                <td>
                  <div 
                    className="flex items-center cursor-pointer"
                    onClick={() => navigateToFolder(folder.id)}
                  >
                    <div 
                      className="p-2 rounded mr-3 flex-shrink-0" 
                      style={{ backgroundColor: `${folder.color}20` }}
                    >
                      <FiFolder size={20} style={{ color: folder.color }} />
                    </div>
                    <span className="font-medium text-gray-900">{folder.name}</span>
                    {folder.shared && (
                      <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                        Shared
                      </span>
                    )}
                  </div>
                </td>
                <td className="hidden md:table-cell text-gray-500">
                  {formatDate(folder.modified)}
                </td>
                <td className="hidden lg:table-cell text-gray-500">
                  --
                </td>
                <td className="hidden lg:table-cell text-gray-500">
                  Folder
                </td>
                <td>
                  <ActionMenu item={folder} />
                </td>
              </tr>
            )
          })}
          
          {/* Files */}
          {files.map(file => {
            const isSelected = selectedItems.some(item => item.id === file.id && !item.isFolder)
            
            return (
              <tr 
                key={file.id} 
                className={`hover:bg-gray-50 ${isSelected ? 'bg-blue-50' : ''}`}
              >
                <td className="px-4">
                  <input 
                    type="checkbox" 
                    checked={isSelected}
                    onChange={() => toggleSelectItem(file)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                </td>
                <td>
                  <div 
                    className="flex items-center cursor-pointer"
                    onClick={() => previewFile(file)}
                  >
                    <div className="p-2 rounded mr-3 bg-gray-100 flex-shrink-0">
                      <FiFile size={20} className="text-gray-500" />
                    </div>
                    <span className="font-medium text-gray-900">{file.name}</span>
                    {file.shared && (
                      <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                        Shared
                      </span>
                    )}
                  </div>
                </td>
                <td className="hidden md:table-cell text-gray-500">
                  {formatDate(file.modified)}
                </td>
                <td className="hidden lg:table-cell text-gray-500">
                  {formatFileSize(file.size)}
                </td>
                <td className="hidden lg:table-cell text-gray-500 capitalize">
                  {file.type}
                </td>
                <td>
                  <ActionMenu item={file} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ListView