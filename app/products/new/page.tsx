"use client"

import axios from 'axios'
import { Button, Callout, Text, TextArea, TextField } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { createProductSchema } from '@/app/validationSchemas'
import { z } from 'zod'
import ErrorMessage from '@/app/components/ErrorMessage'


type ProductForm = z.infer<typeof createProductSchema>

const NewIssuePage = () => {
    const router =  useRouter()
    const [error, setError] = useState('')

    const { register, handleSubmit, formState: {errors} } = useForm<ProductForm>({
        resolver: zodResolver(createProductSchema)
    })

  return (
    <div>
        { error &&
            <Callout.Root color='red' className='mb-3'>
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
        <form className='space-y-3 ' onSubmit={handleSubmit(async(data: ProductForm)=> {
            data.price = parseFloat(data.price)

            try {
                const product = await axios.post('/api/products', data)
                router.push('/products')
            } catch (error) {
                setError('An unexpected error occurred.')
            }
        })}>
            <TextField.Root>
                <TextField.Input  placeholder='Name' {...register('name')}/>
            </TextField.Root>
            <ErrorMessage>{errors.name?.message}</ErrorMessage>
            <TextField.Root>
                <TextField.Input  placeholder='Price' {...register('price')}/>
            </TextField.Root>
            <ErrorMessage>{ errors.price?.message}</ErrorMessage>
            <TextField.Root>
                <TextField.Input  placeholder='Category' {...register('category')}/>
            </TextField.Root>
            <Text color='red' as='p'>{ errors.category?.message}</Text>
            <TextArea placeholder="Description" {...register('description')}/>
            <ErrorMessage>{ errors.description?.message}</ErrorMessage>
            <Button>Submit New Product</Button>
        </form>

    </div>
  )
}

export default NewIssuePage