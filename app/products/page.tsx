// "use client"
import React from 'react'
import { Button, Table } from '@radix-ui/themes'
import Link from 'next/link'
import prisma from "@/prisma/client";
import ProductStatusBadge from '../components/ProductStatusBadge';
import delay from 'delay';
import ProductActions from './ProductActions';

const ProductsPage = async () => {
  const products = await prisma.product.findMany()
  await delay(2000)
  return (
    <div>
        <ProductActions />
        <Table.Root variant='surface'>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Product</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className='hidden md:table-cell'>Price</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              products.map(product => (
                <Table.Row key={ product.id }>
                  <Table.Cell>
                    <Link href={`/products/${product.id}`}>
                      {product.name}
                    </Link>
                    <div className='block md:hidden'>{ product.price}</div>
                    <div className='block md:hidden'><ProductStatusBadge status={product.outOfStock}/></div>
                    <div className='block md:hidden'>{ product.createdAt.toDateString()}</div>
                    </Table.Cell>
                  <Table.Cell className='hidden md:table-cell'>{ product.price}</Table.Cell>
                  <Table.Cell className='hidden md:table-cell'><ProductStatusBadge status={product.outOfStock}/></Table.Cell>
                  <Table.Cell className='hidden md:table-cell'> { product.createdAt.toDateString()}</Table.Cell>
                </Table.Row>
              ))
            }
          </Table.Body>
        </Table.Root>
    </div>
  )
}

export default ProductsPage