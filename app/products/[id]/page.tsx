import prisma from "@/prisma/client";
import { notFound } from 'next/navigation';
import EditProductButton from './EditProductButton';
import ProductDetail from "./ProductDetail";
import DeleteProductButton from "./DeleteProductButton";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";

interface Props {
    params: {id: string}
}

const ProductDetailPage = async ({params }: Props) => {
    const session = await getServerSession(authOptions)

    const product = await  prisma.product.findUnique({
        where: { id: parseInt( params.id)}
    })

    if( !product) notFound()
  return (
    <div className='flex flex-col gap-4 md:gap-0 md:flex-row items-start'>
        <div className='w-[70%]'>
            <ProductDetail product={product}/>
        </div>
        {
            session && 
            <div className="flex flex-col px-2 gap-4 items-center md:w-[30%] ">
                <EditProductButton productId={product.id}/>
                <DeleteProductButton productId={product.id}/>
            </div>
        }
    </div>
  )
}

export async function generateMetadata({params}: Props) {
    const product =  await prisma.product.findUnique({ where: { id: parseInt(params.id) }})
    return {
        title: product?.name,
        description: 'Details of product'+ product?.id
    }
}

export default ProductDetailPage