import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import ProductStatusFilter from "./ProductStatusFilter";

const ProductActions = () => {
  return (
    <div className="mb-3 mt-3 flex justify-between">
      <ProductStatusFilter />
      <Button>
        <Link href="/products/new">New Product</Link>
      </Button>
    </div>
  );
};

export default ProductActions;
