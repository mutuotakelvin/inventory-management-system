import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { productSchema } from "../../validationSchemas";

export async function POST( request: NextRequest){
    const body = await request.json()
    const validation = productSchema.safeParse(body)
    
    if(!validation.success){
        return NextResponse.json(validation.error.format(), {status: 400})
    }

    const newProduct = await prisma.product.create({
        data: { name: body.name, price: body.price, description: body.description, category: body.category}
    })

    return NextResponse.json(newProduct, {status: 201})
}