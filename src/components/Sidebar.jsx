import { useFileContext } from '../context/FileContext'
import { FiHome, FiStar, FiShare2, FiClock, FiTrash2 } from 'react-icons/fi'

const Sidebar = ({ isVisible }) => {
  const { navigateToFolder, currentFolder } = useFileContext()

  const sidebarItems = [
    { icon: <FiHome size={20} />, label: 'My Files', id: null },
    { icon: <FiStar size={20} />, label: 'Starred', id: 'starred' },
    { icon: <FiShare2 size={20} />, label: 'Shared', id: 'shared' },
    { icon: <FiClock size={20} />, label: 'Recent', id: 'recent' },
    { icon: <FiTrash2 size={20} />, label: 'Trash', id: 'trash' }
  ]

  return (
    <aside 
      className={`w-64 bg-white border-r border-gray-200 p-4 transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-x-0' : '-translate-x-full'
      } absolute md:relative z-20 md:z-0 md:translate-x-0 h-[calc(100vh-9rem)] md:h-auto`}
    >
      <div className="mb-6 flex flex-col space-y-1">
        {sidebarItems.map((item) => (
          <button
            key={item.id || 'root'}
            className={`flex items-center p-3 rounded-lg text-left transition-colors ${
              currentFolder === item.id
                ? 'bg-primary-50 text-primary-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => navigateToFolder(item.id)}
          >
            <span className={`mr-3 ${currentFolder === item.id ? 'text-primary-500' : 'text-gray-500'}`}>
              {item.icon}
            </span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="pt-4 border-t border-gray-200">
        <div className="mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Storage
        </div>
        <div className="mb-2">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">7.2 GB used</span>
            <span className="text-gray-600">15 GB</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-primary-500 h-2.5 rounded-full" style={{ width: '48%' }}></div>
          </div>
        </div>
        <button className="text-sm text-primary-600 hover:text-primary-800 font-medium">
          Upgrade Storage
        </button>
      </div>
    </aside>
  )
}

export default Sidebar