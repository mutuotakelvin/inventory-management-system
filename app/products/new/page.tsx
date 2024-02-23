"use client"

import { Button, TextArea, TextField } from '@radix-ui/themes'
import React from 'react'

const NewIssuePage = () => {
  return (
    <div className='space-y-3'>
        <TextField.Root>
            <TextField.Input  placeholder='Name'/>
        </TextField.Root>
        <TextField.Root>
            <TextField.Input  placeholder='Price'/>
        </TextField.Root>
        <TextField.Root>
            <TextField.Input  placeholder='Category'/>
        </TextField.Root>
        <TextArea placeholder="Description" />
        <Button>Submit New Product</Button>
    </div>
  )
}

export default NewIssuePage