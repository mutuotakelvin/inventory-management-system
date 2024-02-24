import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

const createProductSchema = z.object({
    name: z.string().min(1, "Name is required").max(255, "Name is too long"),
    price: z.number().min(0, "Price must be a positive number"),
    description: z.string().min(1, "Description is required").max(255, "Description is too long"),
    category: z.string().min(1, "Category is required").max(255, "Category is too long")
})

export async function POST( request: NextRequest){
    const body = await request.json()
    const validation = createProductSchema.safeParse(body)
    
    if(!validation.success){
        return NextResponse.json(validation.error.format(), {status: 400})
    }

    const newProduct = await prisma.product.create({
        data: { name: body.name, price: body.price, description: body.description, category: body.category}
    })

    return NextResponse.json(newProduct, {status: 201})
}