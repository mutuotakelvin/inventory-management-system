import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const ProductActions = () => {
  return (
    <div className='mb-3 mt-3'>
          <Button>
              <Link href='/products/new'>New Product</Link>
          </Button>
        </div>
  )
}

export default ProductActions