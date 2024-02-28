// "use client"
import prisma from "@/prisma/client";
import { Table } from '@radix-ui/themes';
import { Link, ProductStatusBadge } from '@/app/components';
import ProductActions from './ProductActions';
import { Status, product } from "@prisma/client";
import NextLink from "next/link";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "@/app/components/Pagination";

const ProductsPage = async ({ searchParams }: { searchParams: { status: Status, orderBy: keyof product, orderDirection?: 'asc' | 'desc', page: string}}) => {
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

  const where = {outOfStock: status}
  const orderBy = columns.map(col => col.value).includes(searchParams.orderBy)
    ? { [searchParams.orderBy] : searchParams.orderDirection === 'desc' ? 'desc' : 'asc'} : undefined
  
  const page = parseInt(searchParams.page) || 1
  const pageSize = 10
  
  const products = await prisma.product.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize
  }) 

  const productCount = await prisma.product.count({ where })
  // console.log(searchParams.orderDirection)
  
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
                      query: { ...searchParams, orderBy: column.value, orderDirection: column.value === searchParams.orderBy && searchParams.orderDirection === 'asc' ? 'desc' : 'asc'}
                    }}>
                      {column.label}
                    </NextLink>
                    { column.value === searchParams.orderBy && <ArrowDownIcon /> }
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
        <div className="mt-3 flex justify-end w-full">
          <Pagination
            pageSize={pageSize}
            currentPage={page}
            itemCount={productCount}
          />
        </div>
    </div>
  )
}

export const dynamic = 'force-dynamic'

export default ProductsPage