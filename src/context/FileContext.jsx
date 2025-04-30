import { createContext, useContext, useState, useEffect } from 'react'
import { sampleFiles, sampleFolders } from '../data/sampleData'

const FileContext = createContext()

export const useFileContext = () => useContext(FileContext)

export const FileProvider = ({ children }) => {
  const [files, setFiles] = useState([])
  const [folders, setFolders] = useState([])
  const [currentFolder, setCurrentFolder] = useState(null) // null means root
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('name') // 'name', 'type', 'modified'
  const [sortDirection, setSortDirection] = useState('asc') // 'asc' or 'desc'
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedItems, setSelectedItems] = useState([])
  const [preview, setPreview] = useState(null) // file to preview

  // Load sample data
  useEffect(() => {
    setFiles(sampleFiles)
    setFolders(sampleFolders)
  }, [])

  // Get current folder path (breadcrumbs)
  const getCurrentPath = () => {
    if (!currentFolder) return [{ id: null, name: 'Home' }]
    
    const findPath = (folderId, path = []) => {
      const folder = folders.find(f => f.id === folderId)
      if (!folder) return path
      
      path.unshift(folder)
      if (folder.parent === null) return path
      
      return findPath(folder.parent, path)
    }
    
    const path = findPath(currentFolder)
    return [{ id: null, name: 'Home' }, ...path]
  }

  // Filter files and folders based on current folder and search query
  const filteredFiles = files.filter(file => 
    file.parent === currentFolder && 
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  const filteredFolders = folders.filter(folder => 
    folder.parent === currentFolder && 
    folder.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Sort items
  const sortItems = (items) => {
    return [...items].sort((a, b) => {
      // Always put folders before files when in the same list
      if ('isFolder' in a && 'isFolder' in b && a.isFolder !== b.isFolder) {
        return a.isFolder ? -1 : 1
      }
      
      let valA, valB
      switch (sortBy) {
        case 'name':
          valA = a.name.toLowerCase()
          valB = b.name.toLowerCase()
          break
        case 'type':
          valA = a.type?.toLowerCase() || ''
          valB = b.type?.toLowerCase() || ''
          break
        case 'modified':
          valA = new Date(a.modified)
          valB = new Date(b.modified)
          break
        default:
          valA = a.name.toLowerCase()
          valB = b.name.toLowerCase()
      }

      if (sortDirection === 'asc') {
        return valA < valB ? -1 : valA > valB ? 1 : 0
      } else {
        return valA > valB ? -1 : valA < valB ? 1 : 0
      }
    })
  }

  // Add new file
  const addFile = (file) => {
    setFiles(prev => [...prev, { ...file, parent: currentFolder }])
  }

  // Add new folder
  const addFolder = (folder) => {
    setFolders(prev => [...prev, { ...folder, parent: currentFolder }])
  }

  // Navigate to folder
  const navigateToFolder = (folderId) => {
    setCurrentFolder(folderId)
    setSelectedItems([])
    setSearchQuery('')
  }

  // Select item
  const toggleSelectItem = (item) => {
    setSelectedItems(prev => {
      const isSelected = prev.some(i => i.id === item.id && i.isFolder === item.isFolder)
      if (isSelected) {
        return prev.filter(i => !(i.id === item.id && i.isFolder === item.isFolder))
      } else {
        return [...prev, item]
      }
    })
  }

  // Clear selection
  const clearSelection = () => {
    setSelectedItems([])
  }

  // Toggle sort direction
  const toggleSort = (key) => {
    if (sortBy === key) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(key)
      setSortDirection('asc')
    }
  }

  // Preview a file
  const previewFile = (file) => {
    setPreview(file)
  }

  // Close preview
  const closePreview = () => {
    setPreview(null)
  }

  // Delete items
  const deleteItems = (items) => {
    const fileIds = items.filter(item => !item.isFolder).map(item => item.id)
    const folderIds = items.filter(item => item.isFolder).map(item => item.id)
    
    setFiles(prev => prev.filter(file => !fileIds.includes(file.id)))
    setFolders(prev => prev.filter(folder => !folderIds.includes(folder.id)))
    setSelectedItems([])
  }

  const value = {
    files: sortItems(filteredFiles),
    folders: sortItems(filteredFolders),
    currentFolder,
    viewMode,
    sortBy,
    sortDirection,
    searchQuery,
    selectedItems,
    preview,
    currentPath: getCurrentPath(),
    setViewMode,
    setSortBy,
    setSortDirection,
    setSearchQuery,
    addFile,
    addFolder,
    navigateToFolder,
    toggleSelectItem,
    clearSelection,
    toggleSort,
    previewFile,
    closePreview,
    deleteItems
  }

  return (
    <FileContext.Provider value={value}>
      {children}
    </FileContext.Provider>
  )
}