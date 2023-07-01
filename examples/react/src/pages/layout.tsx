import { Suspense } from 'react'
import { Link, Outlet } from 'react-router-dom'

const pages = [
  {
    path: '/sign-in',
    name: 'Sign In',
  },
  {
    path: '/admin',
    name: 'Admin',
  },
  {
    path: '/member',
    name: 'Member',
  },
]

const RootLayout = () => {
  return (
    <div>
      <h1>Root Layout</h1>
      <nav>
        <ul>
          {pages.map((page) => (
            <li key={page.path}>
              <Link to={page.path}>{page.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  )
}

export default RootLayout
