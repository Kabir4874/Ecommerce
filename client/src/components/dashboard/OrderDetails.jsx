import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

const OrderDetails = () => {
    const {orderId}= useParams();
    const dispatch= useDispatch();
    const {myOrder}= useSelector(state=>state.order);
    useEffect(()=>{
        dispatch()
    },[])
  return (
    <div className='bg-white p-5'>

    </div>
  )
}

export default OrderDetails