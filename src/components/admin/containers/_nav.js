import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['User Manager']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'User',
    to: '/user',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Data Manager']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Category',
    to: '/category',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Course',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Subject',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Transaction',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Feedback',
  },
]

export default _nav
