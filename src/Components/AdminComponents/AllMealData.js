import { Box } from '@mui/material';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { PrimaryColor, SecondaryColor } from '../../Color.Config';
import { db } from '../../firebase-config';
import Navbaar from '../Navbaar/Navbaar';

function AllMealData() {
  const [mealList, setMealList] = useState([]);
  const mealData =  collection(db, "meal")

    useEffect(() => {
    const GetFilteredMeal = async () => {
      try {
        const data = await getDocs(mealData);
        const filterData = data.docs.map((doc)=>({
          ...doc.data()
        }))
        setMealList(filterData)
        
      } catch (error) {
        console.log(error)
      }
 
    };
    GetFilteredMeal();
  }, [])
  let results = []
  return (
    <Box sx={{ bgcolor: PrimaryColor }}>
    <Navbaar />
    <Box sx={{display:"flex", flexWrap:"wrap", gap:"15px", p:2, justifyContent:"center"}}>
      {mealList.map((item)=>(
        <Box sx={{display:"flex", gap:"10px", bgcolor:"white",  width:450}}>
          <img width={120} src={item.image} alt="" />
          <Box p={"5px"}>
            <h4>Name:&nbsp;&nbsp;{item.dish}</h4>
            <p>Allergy:&nbsp;&nbsp;{item.allergy}</p>
            <p>Spiceness:&nbsp;&nbsp;{item.spiciness}</p>
            <p>Medical Condition:&nbsp;&nbsp;{item.medCond}</p>
            <p>Type:&nbsp;&nbsp;{item.type}</p>
          </Box>
        </Box>
      ))}
    </Box>
  </Box>
  )
}

export default AllMealData