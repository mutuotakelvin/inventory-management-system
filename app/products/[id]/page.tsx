import ProductStatusBadge from '@/app/components/ProductStatusBadge';
import prisma from "@/prisma/client";
import { Card, Heading, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';

interface Props {
    params: {id: string}
}

const ProductDetailPage = async ({params }: Props) => {

    const product = await  prisma.product.findUnique({
        where: { id: parseInt( params.id)}
    })

    if( !product) notFound()
  return (
    <div>
        <Heading>{ product.name}</Heading>
        <div className='flex my-2'>
            <ProductStatusBadge status={product.outOfStock}/>
            <Text>{ product.createdAt.toDateString()}</Text>
        </div>
        <Card>
            <Text>{ product.description}</Text>
        </Card>
    </div>
  )
}

export default ProductDetailPage