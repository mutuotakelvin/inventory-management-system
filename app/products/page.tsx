// "use client"
import React from 'react'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'

const ProductsPage = () => {
  return (
    <div>
        <h1>Products page</h1>
        <Button>
            <Link href='/products/new'>New Product</Link>
        </Button>
    </div>
  )
}

export default ProductsPage