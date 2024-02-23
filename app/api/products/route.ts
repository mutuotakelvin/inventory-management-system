import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

const createProductSchema = z.object({
    name: z.string(),
    price: z.number(),
    description: z.string(),
    category: z.string()
})

export async function POST( request: NextRequest){
    const body = await request.json()
    const validation = createProductSchema.safeParse(body)
    
    if(!validation.success){
        return NextResponse.json(validation.error.errors, {status: 400})
    }

    const newProduct = await prisma.product.create({
        data: { name: body.name, price: body.price, description: body.description, category: body.category}
    })

    return NextResponse.json(newProduct, {status: 201})
}