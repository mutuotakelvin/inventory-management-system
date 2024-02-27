"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { MdOutlineInventory } from "react-icons/md";
import classNames from 'classnames';
import { useSession } from 'next-auth/react'
import { Container } from '@radix-ui/themes';

const NavBar = () => {
    const currentPath = usePathname()
    const { status, data: session } = useSession()

    const links = [
        {href: '/', label: 'Dashboard'},
        {href: '/products/list', label: 'Products'}
    ]
  return (
    <nav className='border-b mb-5 px-5 py-3'>
        <Container>
            <div className='flex justify-between items-center '>
                <div className='ml-3 flex gap-4 items-center'>
                    <Link href='/'> <MdOutlineInventory className='h-6 w-6'/></Link>
                    <ul className='flex space-x-6'>
                        {
                            links.map(({href, label}) => (
                                <li key={`${href}${label}`} >
                                    <Link 
                                    href={href}
                                    className={classNames({
                                        'text-zinc-900': href === currentPath,
                                        'text-zinc-500': href !== currentPath,
                                        'hover:text-zinc-800 transition-colors': true
                                    })}
                                    >{ label}</Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div>
                    {
                        status === 'authenticated' && (<Link href="/api/auth/signout">Sign Out</Link>)
                    }
                    {
                        status === 'unauthenticated' && (<Link href="/api/auth/signin">Sign In</Link>)
                    }
                </div>
            </div>
        </Container>
    </nav>
  )
}

export default NavBar