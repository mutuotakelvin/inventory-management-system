// "use client"
import prisma from "@/prisma/client";
import { Table } from '@radix-ui/themes';
import { Link, ProductStatusBadge } from '@/app/components';
import ProductActions from './ProductActions';
import { Status, product } from "@prisma/client";
import NextLink from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";

const ProductsPage = async ({ searchParams }: { searchParams: { status: Status, orderBy: keyof product, orderDirection?: 'asc' | 'desc'}}) => {
  const columns: { 
    label: string
    value: keyof product
    className?: string
  }[] = [
    { label: 'Product', value: 'name' },
    { label: 'Price', value: 'price', className: 'hidden md:table-cell' },
    { label: 'Status', value: 'outOfStock', className: 'hidden md:table-cell' },
    { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell'},
  ]
  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined
  const orderBy = searchParams.orderBy as string
  const orderDirection = searchParams.orderDirection === 'desc' ? 'desc' : 'asc'
  const products = await prisma.product.findMany({
    where: {
      outOfStock: status
    },
    orderBy: {
      [orderBy] : orderDirection

    }
  })
  
  return (
    <div>
        <ProductActions />
        <Table.Root variant='surface'>
          <Table.Header>
            <Table.Row >
              {
                columns.map(column => (
                  <Table.ColumnHeaderCell key={column.value} className={column.className}>
                    <NextLink href={{
                      query: { ...searchParams, orderBy: column.value}
                    }}>
                      {column.label}
                    </NextLink>
                    { column.value === searchParams.orderBy && <ArrowUpIcon />}
                  </Table.ColumnHeaderCell>
              ))}
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

export const dynamic = 'force-dynamic'

export default ProductsPage