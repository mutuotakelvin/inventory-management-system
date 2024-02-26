import { Skeleton } from '@/app/components'
import { Box, Card } from '@radix-ui/themes'

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