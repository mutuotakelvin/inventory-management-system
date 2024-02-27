import { productSchema } from "@/app/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";

interface Props{
    params: { params: { id: string}}
}

export async function PATCH( request: NextRequest,{params}:{ params: { id: string}}){

    const session = await getServerSession(authOptions)

    if(!session)
        return NextResponse.json({error: 'Unauthorized'}, {status: 401})
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

    const session = await getServerSession(authOptions)

    if(!session)
        return NextResponse.json({error: 'Unauthorized'}, {status: 401})
    
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
