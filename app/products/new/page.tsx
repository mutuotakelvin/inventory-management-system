"use client"

import axios from 'axios'
import { Button, Callout, TextArea, TextField } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { set } from 'zod'

interface ProductionForm {
    name: string
    price: string
    category: string
    description: string
}

const NewIssuePage = () => {
    const router =  useRouter()
    const [error, setError] = useState('')

    const { register, handleSubmit } = useForm<ProductionForm>()

  return (
    <div>
        { error &&
            <Callout.Root color='red' className='mb-3'>
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
        <form className='space-y-3 ' onSubmit={handleSubmit(async(data: ProductionForm)=> {
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
            <TextField.Root>
                <TextField.Input  placeholder='Price' {...register('price')}/>
            </TextField.Root>
            <TextField.Root>
                <TextField.Input  placeholder='Category' {...register('category')}/>
            </TextField.Root>
            <TextArea placeholder="Description" {...register('description')}/>
            <Button>Submit New Product</Button>
        </form>

    </div>
  )
}

export default NewIssuePage