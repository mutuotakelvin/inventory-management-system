import { ProductStatusBadge } from '@/app/components'
import { product } from '@prisma/client'
import { Card, Heading, Text } from '@radix-ui/themes'

const ProductDetail = ({product}:{product: product}) => {
  return (
    <>
        <Heading>{ product.name}</Heading>
            <div className='flex my-2'>
                <ProductStatusBadge status={product.outOfStock}/>
                <Text>{ product.createdAt.toDateString()}</Text>
            </div>
            <Card>
                <Text>{ product.description}</Text>
            </Card>
    </>
  )
}

export default ProductDetail