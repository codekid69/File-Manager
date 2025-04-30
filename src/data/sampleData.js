import { v4 as uuidv4 } from '../utils/uuidHelper'

export const sampleFiles = [
  {
    id: uuidv4(),
    name: 'Project Proposal.docx',
    type: 'document',
    extension: 'docx',
    size: 245000,
    created: '2023-10-15T14:30:00Z',
    modified: '2023-10-18T09:15:00Z',
    parent: null,
    owner: 'me',
    shared: false,
    starred: true,
    thumbnail: 'https://via.placeholder.com/100?text=DOCX'
  },
  {
    id: uuidv4(),
    name: 'Budget 2023.xlsx',
    type: 'spreadsheet',
    extension: 'xlsx',
    size: 350000,
    created: '2023-09-22T10:00:00Z',
    modified: '2023-10-10T15:45:00Z',
    parent: null,
    owner: 'me',
    shared: true,
    starred: false,
    thumbnail: 'https://via.placeholder.com/100?text=XLSX'
  },
  {
    id: uuidv4(),
    name: 'Team Photo.jpg',
    type: 'image',
    extension: 'jpg',
    size: 2500000,
    created: '2023-08-05T13:20:00Z',
    modified: '2023-08-05T13:20:00Z',
    parent: null,
    owner: 'me',
    shared: true,
    starred: true,
    thumbnail: 'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: uuidv4(),
    name: 'Presentation.pptx',
    type: 'presentation',
    extension: 'pptx',
    size: 4200000,
    created: '2023-10-02T08:00:00Z',
    modified: '2023-10-19T16:30:00Z',
    parent: null,
    owner: 'me',
    shared: false,
    starred: false,
    thumbnail: 'https://via.placeholder.com/100?text=PPTX'
  },
  {
    id: uuidv4(),
    name: 'Notes.txt',
    type: 'text',
    extension: 'txt',
    size: 15000,
    created: '2023-10-12T11:45:00Z',
    modified: '2023-10-12T14:20:00Z',
    parent: null,
    owner: 'me',
    shared: false,
    starred: false,
    thumbnail: 'https://via.placeholder.com/100?text=TXT',
    content: 'These are some important notes for the upcoming meeting. Make sure to discuss the new project timeline and budget constraints.'
  },
  // Files in Projects folder
  {
    id: uuidv4(),
    name: 'Project Timeline.pdf',
    type: 'pdf',
    extension: 'pdf',
    size: 1800000,
    created: '2023-09-18T09:30:00Z',
    modified: '2023-10-05T10:15:00Z',
    parent: 'folder-1',
    owner: 'me',
    shared: true,
    starred: false,
    thumbnail: 'https://via.placeholder.com/100?text=PDF'
  },
  {
    id: uuidv4(),
    name: 'Requirements.docx',
    type: 'document',
    extension: 'docx',
    size: 180000,
    created: '2023-09-20T14:00:00Z',
    modified: '2023-10-01T08:45:00Z',
    parent: 'folder-1',
    owner: 'me',
    shared: false,
    starred: false,
    thumbnail: 'https://via.placeholder.com/100?text=DOCX'
  },
  // Files in Photos folder
  {
    id: uuidv4(),
    name: 'Vacation.jpg',
    type: 'image',
    extension: 'jpg',
    size: 3500000,
    created: '2023-07-15T10:30:00Z',
    modified: '2023-07-15T10:30:00Z',
    parent: 'folder-2',
    owner: 'me',
    shared: false,
    starred: true,
    thumbnail: 'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: uuidv4(),
    name: 'Conference.png',
    type: 'image',
    extension: 'png',
    size: 2800000,
    created: '2023-09-10T16:15:00Z',
    modified: '2023-09-10T16:15:00Z',
    parent: 'folder-2',
    owner: 'me',
    shared: true,
    starred: false,
    thumbnail: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  // Files in Work Documents subfolder
  {
    id: uuidv4(),
    name: 'Contract.pdf',
    type: 'pdf',
    extension: 'pdf',
    size: 4200000,
    created: '2023-08-28T11:00:00Z',
    modified: '2023-09-15T13:20:00Z',
    parent: 'folder-3',
    owner: 'me',
    shared: true,
    starred: false,
    thumbnail: 'https://via.placeholder.com/100?text=PDF'
  }
]

export const sampleFolders = [
  {
    id: 'folder-1',
    name: 'Projects',
    created: '2023-09-15T08:00:00Z',
    modified: '2023-10-18T11:30:00Z',
    parent: null,
    owner: 'me',
    shared: true,
    starred: true,
    isFolder: true,
    color: '#3B82F6' // primary blue
  },
  {
    id: 'folder-2',
    name: 'Photos',
    created: '2023-07-10T09:45:00Z',
    modified: '2023-09-10T16:15:00Z',
    parent: null,
    owner: 'me',
    shared: false,
    starred: false,
    isFolder: true,
    color: '#F97316' // accent orange
  },
  {
    id: 'folder-3',
    name: 'Work Documents',
    created: '2023-08-20T14:30:00Z',
    modified: '2023-09-15T13:20:00Z',
    parent: 'folder-1', // subfolder of Projects
    owner: 'me',
    shared: true,
    starred: false,
    isFolder: true,
    color: '#14B8A6' // secondary teal
  }
]