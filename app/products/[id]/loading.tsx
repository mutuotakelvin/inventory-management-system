import ProductStatusBadge from '@/app/components/ProductStatusBadge'
import { Heading, Card, Box } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingProductPage = () => {
  return (
    <Box className='max-w-xl'>
        <Skeleton />
        <div className='flex my-2 space-x-3'>
            <Skeleton width="5rem" />
            <Skeleton /> 
        </div>
        <Card>
            <Skeleton count={3} />
        </Card>
    </Box>
  )
}

export default LoadingProductPage