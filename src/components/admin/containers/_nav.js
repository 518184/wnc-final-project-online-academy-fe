import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['User Manager']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'User',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'OTP',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Data Manager']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Category',
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
