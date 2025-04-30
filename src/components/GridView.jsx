import { useFileContext } from '../context/FileContext'
import FileCard from './FileCard'
import FolderCard from './FolderCard'
import EmptyState from './EmptyState'

const GridView = () => {
  const { folders, files } = useFileContext()
  
  const isEmpty = folders.length === 0 && files.length === 0
  
  return (
    <div>
      {isEmpty ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {/* Folders first */}
          {folders.map(folder => (
            <FolderCard key={folder.id} folder={folder} />
          ))}
          
          {/* Then files */}
          {files.map(file => (
            <FileCard key={file.id} file={file} />
          ))}
        </div>
      )}
    </div>
  )
}

export default GridView