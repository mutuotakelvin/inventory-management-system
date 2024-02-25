import React from 'react'
import prisma from "@/prisma/client";
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
        <p>{ product.name}</p>
        <p>{ product.description}</p>
        <p>{ product.outOfStock}</p>
        <p>{ product.createdAt.toDateString()}</p>
    </div>
  )
}

export default ProductDetailPage