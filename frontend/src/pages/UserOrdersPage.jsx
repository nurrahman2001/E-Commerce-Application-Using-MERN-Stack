import React from 'react'
import { UserOrders } from '../features/order/components/UserOrders'
import { Header } from '../features/navigation/components/Header'
import {Footer} from '../features/footer/Footer'

export const UserOrdersPage = () => {
  return (
    <>
    <Header/>
    <UserOrders/>
    <Footer/>
    </>
  )
}
