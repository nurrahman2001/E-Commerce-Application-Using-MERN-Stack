import React, { useEffect } from 'react'
import { Navbar } from '../features/header/Navbar'
import { ProductList } from '../features/products/components/ProductList'
import { resetAddressStatus, selectAddressStatus } from '../features/address/AddressSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Footer } from '../features/footer/Footer'
import { Header } from '../features/navigation/components/Header'


export const HomePage = () => {

  const dispatch = useDispatch()
  const addressStatus = useSelector(selectAddressStatus)

  useEffect(() => {
    if (addressStatus === 'fulfilled') {

      dispatch(resetAddressStatus())
    }
  }, [addressStatus])

  return (
    <>
      <Header isProductList={true}/>
      <Navbar  />
      <ProductList />
      <Footer />
    </>
  )
}
