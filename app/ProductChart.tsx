"use client"
import { Card } from '@radix-ui/themes'
import React from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface Props {
    inStock: number,
    outOfStock: number,
}

const ProductChart = ({ inStock, outOfStock}: Props) => {
    const data = [
        {
            label: 'In Stock', value: inStock
        },
        {
            label: 'Out of Stock', value: outOfStock
        }
    ]
  return (
    <Card>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <XAxis dataKey="label" />
                <YAxis />
                <Bar dataKey="value" style={{fill: 'var(--accent-a10)'}} barSize={60} />
            </BarChart>
        </ResponsiveContainer>
    </Card>
  )
}

export default ProductChart