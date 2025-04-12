
import { Issue, IssueType, StatusType } from '@/types';

// Issue type labels for display
export const issueTypeLabels: Record<IssueType, string> = {
  pothole: 'Pothole',
  streetlight: 'Street Light Issue',
  garbage: 'Garbage Collection',
  waterLeak: 'Water Leak',
  graffiti: 'Graffiti',
  sidewalk: 'Damaged Sidewalk',
  trafficLight: 'Traffic Light Issue',
  other: 'Other'
};

// Status type labels and colors for display
export const statusInfo: Record<StatusType, { label: string; color: string }> = {
  pending: { label: 'Pending', color: 'bg-status-pending text-white' },
  inProgress: { label: 'In Progress', color: 'bg-status-inProgress text-white' },
  resolved: { label: 'Resolved', color: 'bg-status-resolved text-white' }
};

// Mock issues for testing
export const mockIssues: Issue[] = [
  {
    id: '1',
    title: 'Large Pothole on Main Street',
    description: 'Deep pothole causing vehicle damage near the intersection of Main St. and 5th Ave.',
    type: 'pothole',
    status: 'pending',
    location: {
      latitude: 40.7128,
      longitude: -74.006,
      address: 'Main St. & 5th Ave.'
    },
    media: ['/placeholder.svg'],
    upvotes: 15,
    createdAt: '2025-04-10T14:30:00Z',
    updatedAt: '2025-04-10T14:30:00Z',
    comments: [
      {
        id: '101',
        issueId: '1',
        author: 'Jane Smith',
        isAdmin: false,
        content: 'This pothole damaged my car tire last week!',
        createdAt: '2025-04-11T09:15:00Z'
      }
    ],
    reportedBy: 'John Doe'
  },
  {
    id: '2',
    title: 'Broken Street Light',
    description: 'Street light has been out for over a week, creating safety concerns at night.',
    type: 'streetlight',
    status: 'inProgress',
    location: {
      latitude: 40.7145,
      longitude: -74.0071,
      address: 'Oak Street near Central Park'
    },
    media: ['/placeholder.svg'],
    upvotes: 8,
    createdAt: '2025-04-09T10:20:00Z',
    updatedAt: '2025-04-11T16:45:00Z',
    comments: [
      {
        id: '102',
        issueId: '2',
        author: 'CityAdmin',
        isAdmin: true,
        content: 'Maintenance team has been dispatched to investigate and repair.',
        createdAt: '2025-04-11T16:45:00Z'
      }
    ],
    reportedBy: 'Sarah Johnson'
  },
  {
    id: '3',
    title: 'Garbage Overflow',
    description: 'Public garbage bins overflowing near the community center.',
    type: 'garbage',
    status: 'resolved',
    location: {
      latitude: 40.7112,
      longitude: -74.0059,
      address: 'Community Center, Pine Street'
    },
    media: ['/placeholder.svg'],
    upvotes: 12,
    createdAt: '2025-04-08T08:15:00Z',
    updatedAt: '2025-04-12T11:30:00Z',
    comments: [
      {
        id: '103',
        issueId: '3',
        author: 'Robert Brown',
        isAdmin: false,
        content: 'This has been happening every weekend! Please increase collection frequency.',
        createdAt: '2025-04-09T14:25:00Z'
      },
      {
        id: '104',
        issueId: '3',
        author: 'CityAdmin',
        isAdmin: true,
        content: 'Issue resolved. We have increased the collection schedule to twice daily on weekends.',
        createdAt: '2025-04-12T11:30:00Z'
      }
    ],
    reportedBy: 'Michael Wilson'
  },
  {
    id: '4',
    title: 'Water Main Leak',
    description: 'Water leaking from street, possibly a broken pipe.',
    type: 'waterLeak',
    status: 'pending',
    location: {
      latitude: 40.7136,
      longitude: -74.0046,
      address: 'Maple Street between 3rd and 4th'
    },
    media: ['/placeholder.svg'],
    upvotes: 20,
    createdAt: '2025-04-11T17:30:00Z',
    updatedAt: '2025-04-11T17:30:00Z',
    comments: [],
    reportedBy: 'Emily Davis'
  }
];
