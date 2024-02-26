import { Pencil1Icon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'

const EditProductButton = ({productId}: {productId: number}) => {
  return (
    <Button>
        <Pencil1Icon />
        <Link href={`/products/${productId}/edit`}>Edit Product</Link>
    </Button>
  )
}

export default EditProductButton