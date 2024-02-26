import prisma from "@/prisma/client";
import { notFound } from 'next/navigation';
import EditProductButton from './EditProductButton';
import ProductDetail from "./ProductDetail";
import DeleteProductButton from "./DeleteProductButton";

interface Props {
    params: {id: string}
}

const ProductDetailPage = async ({params }: Props) => {

    const product = await  prisma.product.findUnique({
        where: { id: parseInt( params.id)}
    })

    if( !product) notFound()
  return (
    <div className='flex flex-col gap-4 md:gap-0 md:flex-row items-start'>
        <div className='w-[70%]'>
            <ProductDetail product={product}/>
        </div>
        <div className="flex flex-col px-2 gap-4 items-center md:w-[30%] ">
            <EditProductButton productId={product.id}/>
            <DeleteProductButton productId={product.id}/>
        </div>
    </div>
  )
}

export default ProductDetailPage