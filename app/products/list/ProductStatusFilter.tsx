"use client"
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const ProductStatusFilter = () => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const statuses: {label: string, value?: Status}[] = [
        { label: 'All' }, 
        { label: 'In Stock', value: 'IN_STOCK'},
        { label: 'Out of Stock', value: 'OUT_OF_STOCK'},
    ];
    
    return (
        <Select.Root
        defaultValue={searchParams.get('status') || ' '}
         onValueChange={(status) => {
            const params = new URLSearchParams()

            if(status) params.append('status',status)
            if (searchParams.get('orderBy'))
                params.append('orderBy', searchParams.get('orderBy')!)
            
            const query = params.size ? '?' + params.toString() : ' '
            router.push('/products/list' + query)
        }}>
            <Select.Trigger placeholder='Filter by status...' />
            <Select.Content>
                {
                    statuses.map((status, index) => (
                        <Select.Item key={index} value={status.value || ' '}>{status.label}</Select.Item>
                    ))
                }
            </Select.Content>
        </Select.Root>
    );
};

export default ProductStatusFilter;

