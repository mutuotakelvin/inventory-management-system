import Link from 'next/link'
import React from 'react'
import { MdOutlineInventory } from "react-icons/md";

const NavBar = () => {
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
                    className='text-zinc-500 hover:text-zinc-600 transition-colors'
                    >{ label}</Link>
                ))
            }
        </ul>
    </nav>
  )
}

export default NavBar