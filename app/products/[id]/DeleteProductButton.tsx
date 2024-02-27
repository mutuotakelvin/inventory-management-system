"use client"
import { AlertDialog, Button } from '@radix-ui/themes'
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const DeleteProductButton = ({productId}: { productId: number}) => {
    const [error, setError] = useState(false)
    const router = useRouter()

    const deleteProduct = async () => {
        try {
            await axios.delete('/api/products/' + productId)
            router.push('/products')
            router.refresh()
        } catch (error) {
            setError(true)
        }
    }
    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color='red'>Delete Product</Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content>
                    <AlertDialog.Title>Delete Product</AlertDialog.Title>
                    <AlertDialog.Description>
                        Are you sure you want to delete this product?
                    </AlertDialog.Description>
                    <div className='mt-4 flex gap-4 items-center'>
                        <AlertDialog.Cancel>
                            <Button  variant='soft' color='gray'>Cancel</Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                        <Button color='red' onClick={ deleteProduct}>Delete</Button>
                        </AlertDialog.Action>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Root>
            <AlertDialog.Root open={error}>
                <AlertDialog.Content>
                    <AlertDialog.Title>Error</AlertDialog.Title>
                    <AlertDialog.Description>
                        There was an error deleting the product.
                    </AlertDialog.Description>
                    <Button className='mt-2' color='gray' variant='soft' onClick={() => setError(false)}>OK</Button>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
)
}

export default DeleteProductButton