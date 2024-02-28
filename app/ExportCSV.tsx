"use client"
import { product } from '@prisma/client'
import React, { useState } from 'react'
import exportFromJSON from 'export-from-json'
import { Button } from '@radix-ui/themes';
import { Spinner } from './components';

interface Props {
  data: product[];
}

const ExportCSV = ({data}: Props) => {
    const [loading, setLoading ] = useState(false)

    const exportCSV = async () => {
        setLoading(true)
        const filename = 'products'
        const exportType = exportFromJSON.types.csv
        exportFromJSON({ data: data, fileName: filename, exportType })
        setLoading(false)
    }
  return (
    <div>
        <Button onClick={exportCSV}>Export
        {
            loading && <Spinner />
        }
        </Button>
    </div>
  )
}

export default ExportCSV
