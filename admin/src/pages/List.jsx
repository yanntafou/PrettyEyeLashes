import axios from "axios";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { backendUrl, currency } from "../config/config";


const List = ({ token }) => {
  const [list, setList] = useState([])

  const fetchList = async () => {
    try {

      const response = await axios.get(backendUrl + '/api/product/list')
      console.log(response)
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message)
      }


    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  //delete a product
  const removeProduct = async (id) => {

    try {

      const response = await axios.post(`${backendUrl}/api/product/remove`, { id }, { headers: { token } })
      console.log(response)
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList(); //refresh the product list
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <>
      <p className="mb-2">All Products List</p>

      <div className="flex flex-col gap-2">

        {/* ----- List Table title ----- */}

        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* ----- List Table title ----- */}
        {
          list.map((item, index) => (
            <div className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border text-sm " key={index}>
              <img className="w-12" src={item.image[0]} alt="" />
              <p>{item.name} </p>
              <p>{item.category} </p>
              <p>{currency}{item.price}</p>
              <p onClick={() => removeProduct(item._id)} className="text-right md:text-center cursor-pointer text-lg">X</p>
            </div>
          ))
        }

      </div>
    </>
  )
}

List.propTypes = {
  token: PropTypes.string.isRequired
}

export default List

