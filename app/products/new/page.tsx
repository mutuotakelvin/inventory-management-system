"use client"

import axios from 'axios'
import { Button, Callout, Text, TextArea, TextField } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { createProductSchema } from '@/app/validationSchemas'
import { z } from 'zod'


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
            { errors.name && <Text color='red' as='p'>{errors.name.message}</Text>}
            <TextField.Root>
                <TextField.Input  placeholder='Price' {...register('price')}/>
            </TextField.Root>
            { errors.price && <Text color='red' as='p'>{ errors.price.message}</Text>}
            <TextField.Root>
                <TextField.Input  placeholder='Category' {...register('category')}/>
            </TextField.Root>
            { errors.category && <Text color='red' as='p'>{ errors.category.message}</Text>}
            <TextArea placeholder="Description" {...register('description')}/>
            { errors.description && <Text color='red' as='p'>{ errors.description.message}</Text>}
            <Button>Submit New Product</Button>
        </form>

    </div>
  )
}

export default NewIssuePage