import LatestProducts from "./LatestProducts";
import ProductSummary from "./ProductSummary";
import prisma from "@/prisma/client";


export default async function Home() {
  const inStock = await prisma.product.count({ where: { outOfStock: 'IN_STOCK' } })
  const outOfStock = await prisma.product.count({ where: { outOfStock: 'OUT_OF_STOCK' } })

  return (
    <div>
        <LatestProducts />
        <ProductSummary inStock={inStock} outOfStock={outOfStock} />
    </div>
  )
}
