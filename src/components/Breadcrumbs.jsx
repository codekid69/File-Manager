import { useFileContext } from '../context/FileContext'
import { FiChevronRight } from 'react-icons/fi'

const Breadcrumbs = () => {
  const { currentPath, navigateToFolder } = useFileContext()

  return (
    <nav className="mb-4">
      <ol className="flex flex-wrap items-center text-sm text-gray-600">
        {currentPath.map((item, index) => {
          const isLast = index === currentPath.length - 1
          
          return (
            <li key={item.id || 'root'} className="flex items-center">
              {index > 0 && (
                <FiChevronRight className="mx-2 text-gray-400" size={16} />
              )}
              
              {isLast ? (
                <span className="font-medium text-gray-800">{item.name}</span>
              ) : (
                <button
                  className="hover:text-primary-600 transition-colors truncate max-w-[150px]"
                  onClick={() => navigateToFolder(item.id)}
                >
                  {item.name}
                </button>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumbs