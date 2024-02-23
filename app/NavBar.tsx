"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { MdOutlineInventory } from "react-icons/md";
import classNames from 'classnames';

const NavBar = () => {
    const currentPath = usePathname()


    const links = [
        {href: '/', label: 'Dashboard'},
        {href: '/products', label: 'Products'}
    ]
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <Link href='/'> <MdOutlineInventory className='h-6 w-6'/></Link>
        <ul className='flex space-x-6'>
            {
                links.map(({href, label}) => (
                    <Link 
                    key={`${href}${label}`} 
                    href={href}
                    className={classNames({
                        'text-zinc-900': href === currentPath,
                        'text-zinc-500': href !== currentPath,
                        'hover:text-zinc-800 transition-colors': true
                    })}
                    >{ label}</Link>
                ))
            }
        </ul>
    </nav>
  )
}

export default NavBar