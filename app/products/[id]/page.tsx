import React from 'react'
import prisma from "@/prisma/client";
import { notFound } from 'next/navigation';
import { Button, Card, Heading, Text } from '@radix-ui/themes';
import ProductStatusBadge from '@/app/components/ProductStatusBadge';
import { Pencil1Icon } from '@radix-ui/react-icons';
import Link from 'next/link';

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
        <div className='flex justify-between items-center'>
            <Heading>{ product.name}</Heading>
            <Button>
                <Pencil1Icon />
                <Link href={`/products/${product.id}/edit`}>Edit Product</Link>
            </Button>
        </div>
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