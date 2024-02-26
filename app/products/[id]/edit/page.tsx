import { notFound } from 'next/navigation'
import ProducForm from '../../_components/ProductForm'

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