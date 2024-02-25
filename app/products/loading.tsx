import { Table } from '@radix-ui/themes'
import React from 'react'
import ProductStatusBadge from '../components/ProductStatusBadge'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ProductActions from './ProductActions'

const LoadingProductPage = () => {
    const products = [1,2,3,4,5]
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
                <Table.Row key={ product }>
                  <Table.Cell>
                    <Skeleton />
                    <div className='block md:hidden'><Skeleton /></div>
                    <div className='block md:hidden'><Skeleton /></div>
                    <div className='block md:hidden'><Skeleton /></div>
                    </Table.Cell>
                  <Table.Cell className='hidden md:table-cell'>
                    <Skeleton />
                  </Table.Cell>
                  <Table.Cell className='hidden md:table-cell'><Skeleton /></Table.Cell>
                  <Table.Cell className='hidden md:table-cell'><Skeleton /></Table.Cell>
                </Table.Row>
              ))
            }
          </Table.Body>
        </Table.Root>
    </div>
  )
}

export default LoadingProductPage