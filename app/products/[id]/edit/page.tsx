import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'
import ProductFormSkeleton from './loading'

const ProducForm = dynamic(
  () => import('@/app/products/_components/ProductForm'),
  { 
    ssr: false,
    loading: () => <ProductFormSkeleton />
  }
)
interface Props {
  params: { id: string}
}

const EditProductPage = async ({params}: Props) => {
  const product = await prisma?.product.findUnique({
    where: { id: Number(params.id) }
  })

  if(!product) notFound()
  return (
    <ProducForm product={product} />
  )
}


export default EditProductPage