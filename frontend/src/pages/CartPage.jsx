import React from 'react'
import { Header } from '../features/navigation/components/Header'
import { Cart } from '../features/cart/components/Cart'
import {Footer} from '../features/footer/Footer'

export const CartPage = () => {
  return (
    <>
    <Header/>
    <Cart/>
    <Footer/>
    </>
  )
}
