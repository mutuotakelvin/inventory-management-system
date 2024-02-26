import dynamic from "next/dynamic"
import ProductFormSkeleton from "./loading"

const ProductForm = dynamic(
  () => import('@/app/products/_components/ProductForm'),
  {
    ssr: false,
    loading: () => <ProductFormSkeleton/>
  }
  )

const NewProductPage = () => {
  return (
    <ProductForm />
  )
}

export default NewProductPage