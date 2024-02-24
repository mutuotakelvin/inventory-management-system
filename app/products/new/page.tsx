"use client"

import axios from 'axios'
import { Button, TextArea, TextField } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import React from 'react'
import { useRouter } from 'next/navigation'

interface ProductionForm {
    name: string
    price: string
    category: string
    description: string
}

const NewIssuePage = () => {
    const router =  useRouter()

    const { register, handleSubmit } = useForm<ProductionForm>()

  return (
    <form className='space-y-3' onSubmit={handleSubmit(async(data: ProductionForm)=> {
        data.price = parseFloat(data.price)
        const product = await axios.post('/api/products', data)
        router.push('/products')
    })}>
        <TextField.Root>
            <TextField.Input  placeholder='Name' {...register('name')}/>
        </TextField.Root>
        <TextField.Root>
            <TextField.Input  placeholder='Price' {...register('price')}/>
        </TextField.Root>
        <TextField.Root>
            <TextField.Input  placeholder='Category' {...register('category')}/>
        </TextField.Root>
        <TextArea placeholder="Description" {...register('description')}/>
        <Button>Submit New Product</Button>
    </form>
  )
}

export default NewIssuePage