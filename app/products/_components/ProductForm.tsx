"use client"

import axios from 'axios'
import { Button, Callout, Text, TextArea, TextField } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { productSchema } from '@/app/validationSchemas'
import { z } from 'zod'
import ErrorMessage from '@/app/components/ErrorMessage'
import Spinner from '@/app/components/Spinner'
import { product } from '@prisma/client'


type ProductFormData = z.infer<typeof productSchema>

interface Props {
    product?: product
}

const ProducForm = ({product}: { product?: product}) => {
    const router =  useRouter()
    const [error, setError] = useState('')
    const [ isSubmitting, setIsSubmitting] = useState(false)

    const { register, handleSubmit, formState: {errors} } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema)
    })

    const  onSubmit = handleSubmit(async(data: ProductFormData)=> {
        data.price = parseFloat(String(data.price)) as number;

        try {
            setIsSubmitting(true)
            if(product) 
                await axios.patch('/api/products/' + product.id, data)
            else
                await axios.post('/api/products', data)
            router.push('/products/list')
            router.refresh()
        } catch (error) {
            setIsSubmitting(false)
            setError('An unexpected error occurred.')
        }
    })

  return (
    <div>
        { error &&
            <Callout.Root color='red' className='mb-3'>
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
        }
        <form className='space-y-3 ' onSubmit={onSubmit}>
            <TextField.Root>
                <TextField.Input defaultValue={product?.name} placeholder='Name' {...register('name')}/>
            </TextField.Root>
            <ErrorMessage>{errors.name?.message}</ErrorMessage>
            <TextField.Root>
                <TextField.Input type='number' defaultValue={ product?.price}
    inputMode='decimal' placeholder='Price' {...register('price')}/>
            </TextField.Root>
            <ErrorMessage>{ errors.price?.message}</ErrorMessage>
            <TextField.Root>
                <TextField.Input defaultValue={product?.category} placeholder='Category' {...register('category')}/>
            </TextField.Root>
            <Text color='red' as='p'>{ errors.category?.message}</Text>
            <TextArea defaultValue={product?.description || ""} placeholder="Description" {...register('description')}/>
            <ErrorMessage>{ errors.description?.message}</ErrorMessage>
            <Button disabled={isSubmitting}>
                {
                    product ? 'Update Product' : 'Submit New Product'
                }
                {''}
                { isSubmitting && <Spinner />}</Button>
        </form>

    </div>
  )
}

export default ProducForm
