import Link from 'next/link'
import Head from 'next/head'
import { useState, ReactNode } from 'react'
import { MenuIcon, CurrencyDollarIcon, ShoppingCartIcon, UserCircleIcon } from '@heroicons/react/outline'
import { FireIcon } from '@heroicons/react/solid'
import { useAuthContext } from '../contexts/auth'

function SignedInNav() {
  const {user} = useAuthContext()
  return (
    <div className='lg:flex-row lg:ml-auto lg:w-auto lg:items-center items-start flex flex-col lg:h-auto'>
      <Link href='/'>
        <a className='lg:block lg:w-auto w-full px-3 py-2 rounded text-white hover:bg-green-600 hover:text-white'>
          <CurrencyDollarIcon className='h-8 w-8'/>
          <span className='text-xs font-bold'>Sell stuff</span>
        </a>
      </Link>
      <Link href='/'>
        <a className='lg:block lg:w-auto w-full px-3 py-2 rounded text-white hover:bg-green-600 hover:text-white'>
          <ShoppingCartIcon className='h-8 w-8'/>
          <span className='text-xs font-bold'>Cart</span>
        </a>
      </Link>
      <Link href='/'>
        <a className='lg:block lg:w-auto w-full px-3 py-2 rounded text-white hover:bg-green-600 hover:text-white'>
          <UserCircleIcon className='h-8 w-8'/>
          <span className='text-xs font-bold'>{user && user.attributes.email}</span>
        </a>
      </Link>
    </div>
  )
}

function SignedOutNav() {
  return (
    <div className='lg:flex-row lg:ml-auto lg:w-auto lg:items-center items-start flex flex-col lg:h-auto'>
      <Link href='/sign_in'>
        <a className='lg:block lg:w-auto w-full px-3 py-2 rounded text-white hover:bg-green-600 hover:text-white'>
          <UserCircleIcon className='h-8 w-8'/>
          <span className='text-xs font-bold'>Sign in</span>
        </a>
      </Link>
    </div>
  )
}

export default function Layout ({children}: {children: ReactNode}) {
  const [active, setActive] = useState(false)
  const handleClick = () => {
    setActive(!active)
  }
  const {user} = useAuthContext()

  return (
    <div>
      <Head>
        <title>Skwirly</title>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <header>
        <nav className='flex flex-wrap items-center bg-green-400 p-3'>
          <Link href='/'>
            <a className='inline-flex p-2 mr-4 text-white'>
              {/* Placeholder icon */}
              <FireIcon className='w-6 h-6'/>
              <span className='text-xl font-bold uppercase tracking-wide'>
                Swkirly
              </span>
            </a>
          </Link>
          <button
            className='inline-flex p-3 m-1 hover:bg-green-600 rounded lg:hidden text-white ml-auto hover:text-white'
            onClick={handleClick}
          >
            <MenuIcon className='w-6 h-6'/>
          </button>
          <div
            className={`${
              active ? '' : 'hidden'
            } w-full lg:inline-flex lg:flex-grow lg:w-auto`}
          >
            {(user) ? <SignedInNav /> : <SignedOutNav />}
          </div>
        </nav>
      </header>

      {children}

      <footer>This is the footer</footer>
    </div>
  )
}
