import { productSchema } from "@/app/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

interface Props{
    params: { params: { id: string}}
}

export async function PATCH( request: NextRequest,{params}:{ params: { id: string}}){
    const body = await request.json()
    const validation = productSchema.safeParse(body)

    if(!validation.success){
        return NextResponse.json(validation.error.format(), {status: 400})
    } 

    const product = prisma.product.findUnique({
        where: {id: parseInt(params.id)}
    })

    if( !product){
        return NextResponse.json({error: "Product not found"}, {status: 404})
    }

    const updatedProduct = await prisma.product.update({
        where: { id: parseInt(params.id) },
        data: {
            name: body.name,
            description: body.description,
            price: body.price,
            category: body.category
        }
    })

    return NextResponse.json(updatedProduct)
}

export async function DELETE( request: NextRequest,{params}:{ params: { id: string}}){
   const product = await prisma.product.findUnique({
        where: {id: parseInt(params.id)}
    })

    if(!product){
        return NextResponse.json({error: "Product not found"}, {status: 404})
    }

    await prisma.product.delete({
        where: {id: parseInt(params.id)}
    })

    return NextResponse.json({message: "Product deleted"})
}
