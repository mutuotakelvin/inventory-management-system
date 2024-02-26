import { Box } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingNewItemPage = () => {
  return (
    <Box className='max-w-xl'>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton height="20rem"/>
    </Box>
  )
}

export default LoadingNewItemPage