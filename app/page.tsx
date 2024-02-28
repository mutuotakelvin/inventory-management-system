import LatestProducts from "./LatestProducts";
import ProductChart from "./ProductChart";
import ProductSummary from "./ProductSummary";
import prisma from "@/prisma/client";


export default async function Home() {
  const inStock = await prisma.product.count({ where: { outOfStock: 'IN_STOCK' } })
  const outOfStock = await prisma.product.count({ where: { outOfStock: 'OUT_OF_STOCK' } })

  return (
    <div>
      <ProductChart inStock={inStock} outOfStock={outOfStock} />
        <LatestProducts />
        <ProductSummary inStock={inStock} outOfStock={outOfStock} />
    </div>
  )
}
