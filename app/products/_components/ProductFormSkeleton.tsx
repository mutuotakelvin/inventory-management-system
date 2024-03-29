import { Box } from '@radix-ui/themes'
import React from 'react'
import { Skeleton } from '@/app/components'
const ProductFormSkeleton = () => {
  return (
    <Box className='max-w-xl'>
        <Skeleton height="2rem"/>
        <Skeleton height="2rem"/>
        <Skeleton height="2rem"/>
        <Skeleton height="5rem"/>
    </Box>
  )
}

export default ProductFormSkeleton