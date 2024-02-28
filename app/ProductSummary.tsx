import { Status } from '@prisma/client'
import { Card, Flex, Text } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

interface Props {
    inStock: number,
    outOfStock: number,
}

const ProductSummary = ({ inStock, outOfStock}: Props) => {

    const productCards: {
        label: string,
        value: number,
        status: Status
    }[] = [
        { label: 'In Stock', value: inStock, status: 'IN_STOCK' },
        { label: 'Out of Stock', value: outOfStock, status: 'OUT_OF_STOCK' }
    ]
  return (
    <Flex gap="4">
        {productCards.map( productCard => (
            <Card key={productCard.label}>
                <Flex direction="column" gap="1">
                    <Link className='text-sm font-medium' href={`/products/list?status=${productCard.status}`}>
                        {productCard.label}
                    </Link>
                    <Text size="5" className='font-bold'>{productCard.value}</Text>
                </Flex>
            </Card>
        ))
        }
    </Flex>
  )
}

export default ProductSummary