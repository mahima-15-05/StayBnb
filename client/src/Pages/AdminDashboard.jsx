import React from 'react'
import api from '../api/axiosInstance';
import { useState } from 'react';
import { useEffect } from 'react';

const AdminDashboard = () => {
  const [data, setData] = useState([]);

  const getData = async()=>{
    try {
      const response = await api.get('/admin/admin-dashboard') ;

      setData(response.data);
      console.log(response.data)
      
    } catch (error) {
      console.log("Internal server error");
    }
  }

  useEffect(()=>{
    getData();
  },[]);
  return (
    <div>

      

      <h2>This is admin dashboard</h2>

{data.map((item)=>{
  return (
<div key={item._id}>
        <h2>{data.title || "Default Title"}</h2>
        <p>{data.description || "Default description"}</p>
      </div>
  )
})}
      
      
    </div>
  )
}

export default AdminDashboard
