import prisma from "@/prisma/client";
import { notFound } from 'next/navigation';
import EditProductButton from './EditProductButton';
import ProductDetail from "./ProductDetail";

interface Props {
    params: {id: string}
}

const ProductDetailPage = async ({params }: Props) => {

    const product = await  prisma.product.findUnique({
        where: { id: parseInt( params.id)}
    })

    if( !product) notFound()
  return (
    <div className='flex items-start'>
        <div className='w-[70%]'>
            <ProductDetail product={product}/>
        </div>
        <EditProductButton productId={product.id}/>
    </div>
  )
}

export default ProductDetailPage