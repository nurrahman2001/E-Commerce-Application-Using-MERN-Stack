import React from 'react'
import { Header } from '../features/navigation/components/Header'
import { ProductDetails } from '../features/products/components/ProductDetails'
// import {ProductCard} from '../features/products/components/ProductCard'
import { Footer } from '../features/footer/Footer'

export const ProductDetailsPage = () => {
  return (
    <>
      <Header />
      <ProductDetails />
      <Footer />
    </>
  )
}
