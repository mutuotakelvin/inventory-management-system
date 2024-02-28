import React from 'react'
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Table } from '@radix-ui/themes';
import {  ProductStatusBadge } from './components';
import Link from 'next/link';
const LatestProducts = async () => {
    const products = await prisma.product.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        take: 5
        
    })

  return (
    <Card>
        <Heading size="4" mb="5">Latest Products</Heading>
        <Table.Root>
            <Table.Body>
                {products.map(product => (
                    <Table.Row key={product.id}>
                        <Table.Cell>
                            <div className='flex justify-between items-center'>
                                <Flex direction="column" align="start" gap='2'>
                                    <Link href={`/products/${product.id}`}>
                                        {product.name}
                                    </Link>
                                    <ProductStatusBadge status={product.outOfStock}/>
                                </Flex>
                                <div className='flex flex-col gap-3 justify-start items-end'>
                                    <p>{ product.category}</p>
                                    <p>ksh. {product.price}</p>
                                </div>
                            </div>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>

    </Card>
  )
}

export default LatestProducts