import { Button, Flex, Grid } from "@radix-ui/themes";
import LatestProducts from "./LatestProducts";
import ProductChart from "./ProductChart";
import ProductSummary from "./ProductSummary";
import prisma from "@/prisma/client";
import { Metadata } from "next";
import ExportCSV from "./ExportCSV";



export default async function Home() {
  const inStock = await prisma.product.count({ where: { outOfStock: 'IN_STOCK' } })
  const outOfStock = await prisma.product.count({ where: { outOfStock: 'OUT_OF_STOCK' } })
  const products = await prisma.product.findMany({})


  return (
    <Grid columns={{initial:'1', md:'2'}} gap="5">
        <Flex direction="column" gap="5">
          <ProductSummary inStock={inStock} outOfStock={outOfStock} />
          <ProductChart inStock={inStock} outOfStock={outOfStock} />
          <div>
            <h2>Export Data</h2>
            <div>
              <p>Export product data to a CSV file</p>
              <ExportCSV data={products} />
            </div>
          </div>
        </Flex>
        <LatestProducts />   
    </Grid>
  )

}

export const metadata: Metadata = {
  title: 'Inventory Management System - Dashboard',
  description: 'View prodcut summary and latest products.'
}