import { format } from 'date-fns'

// Format file size into human-readable format
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  
  return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`
}

// Format date to readable format
export const formatDate = (dateString) => {
  try {
    const date = new Date(dateString)
    return format(date, 'MMM d, yyyy')
  } catch (error) {
    return 'Invalid date'
  }
}

// Get file icon based on type
export const getFileIcon = (type, extension) => {
  switch (type) {
    case 'image':
      return 'image'
    case 'document':
      return 'document'
    case 'spreadsheet':
      return 'spreadsheet'
    case 'presentation':
      return 'presentation'
    case 'pdf':
      return 'pdf'
    case 'text':
      return 'text'
    default:
      switch (extension) {
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
          return 'image'
        case 'doc':
        case 'docx':
          return 'document'
        case 'xls':
        case 'xlsx':
          return 'spreadsheet'
        case 'ppt':
        case 'pptx':
          return 'presentation'
        case 'pdf':
          return 'pdf'
        case 'txt':
          return 'text'
        default:
          return 'generic'
      }
  }
}

// Check if file is previewable
export const isPreviewable = (file) => {
  const previewableTypes = ['image', 'text', 'pdf']
  const previewableExtensions = ['jpg', 'jpeg', 'png', 'gif', 'txt', 'pdf']
  
  return previewableTypes.includes(file.type) || 
    previewableExtensions.includes(file.extension)
}

// Simulate file download
export const downloadFile = (file) => {
  console.log(`Downloading file: ${file.name}`)
  
  // Create a fake download notification
  const notification = document.createElement('div')
  notification.className = 'fixed bottom-4 right-4 bg-primary-500 text-white px-4 py-2 rounded-md shadow-lg z-50'
  notification.textContent = `Downloading ${file.name}...`
  document.body.appendChild(notification)
  
  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.remove()
  }, 3000)

  return true
}