"use client"
import { AlertDialog, Button } from '@radix-ui/themes'
import React from 'react'

const DeleteProductButton = ({productId}: { productId: number}) => {
  return (
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
                    <Button color='red'>Delete</Button>
                </AlertDialog.Action>
            </div>
        </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

export default DeleteProductButton