import React from 'react'
import { Wishlist } from '../features/wishlist/components/Wishlist'
import { Header } from '../features/navigation/components/Header'
import { Footer } from '../features/footer/Footer'

export const WishlistPage = () => {
  return (
    <>
    <Header/>
    <Wishlist/>
    <Footer/>
    </>
  )
}
