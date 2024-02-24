import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'

const statusMap: Record<Status, {label: string, color: 'red'| 'green'}> = {
    IN_STOCK: { label: 'In stock', color: 'green'},
    OUT_OF_STOCK: { label: 'Out of STOCK', color: 'red'}
}

const ProductStatusBadge = ({status}: {status: Status}) => {
  return (
    <Badge color={statusMap[status].color}>{ statusMap[status].label}</Badge>
  )
}

export default ProductStatusBadge