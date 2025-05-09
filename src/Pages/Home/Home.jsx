import React from 'react'
import './Home.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Feed from '../../Components/Feed/Feed' 
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'

const Home = ({sidebar}) => {

  // const[category,setCategory] = useState([]);
  //cahages to
  const [category, setCategory] = useState(0); // 👈 Correct default category ID


  return (
   <>
<Sidebar sidebar={sidebar} category={category} setCategory={setCategory} />
<div className={`container ${sidebar?"":"large-container"}`}> 

      <Feed sidebar={sidebar} category={category} setCategory={setCategory} />
      </div>
    
   </>
  )
}

export default Home