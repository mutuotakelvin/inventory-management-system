"use client"
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const ProductStatusFilter = () => {
    const router = useRouter()
    const statuses: {label: string, value?: Status}[] = [
        { label: 'All' }, 
        { label: 'In Stock', value: 'IN_STOCK'},
        { label: 'Out of Stock', value: 'OUT_OF_STOCK'},
    ];
    
    return (
        <Select.Root onValueChange={(status) => {
            const query = status !== ' ' ? `?status=${status}` : ''
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

