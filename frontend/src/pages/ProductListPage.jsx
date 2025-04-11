import React from 'react'
import { Product } from '../features/products/components/Product'
import { Header } from '../features/navigation/components/Header'

export const ProductListPage = () => {
    return (
        <div>
            <Header />
            <Product />
        </div>
    )
}

