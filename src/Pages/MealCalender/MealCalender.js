import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Navbaar from '../../Components/Navbaar/Navbaar';
import { PrimaryColor, textColor } from '../../Color.Config';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';



function MealCalender() {
  // const [first, setfirst] = useState({})
  const [userData, setUserData] = useState([]);

  let id = localStorage.getItem("userId");
  useEffect(() => {
    const getDocument = async () => {
      try {
        const docRef = doc(db, "usersMealDecriptions", id);
        const docSnap = await getDoc(docRef);
        setUserData(docSnap.data());
      } catch (error) {
        console.log(error);
      }
    };
    getDocument();
  }, []);

  console.log("userData", userData)

    

  return (
    <Box sx={{ bgcolor: PrimaryColor, minHeight:"100vh" }}>
        <Navbaar/>
        <Box>
        <h1 style={{color:textColor, marginTop:"20px", marginBottom:"20px"}}>Week Meal Table</h1>
	<table>
		<thead>
			<tr>
				<th>Day</th>
				<th>Breakfast</th>
				<th>Lunch</th>
				<th>Dinner</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Monday</td>
				<td>{userData?.weekPlan?.Monday?.breakfast?.dish}</td>
				<td>{userData?.weekPlan?.Monday?.lunch?.dish}</td>
				<td>{userData?.weekPlan?.Monday?.dinner?.dish}</td>
			</tr>
			<tr>
				<td>Tuesday</td>
				<td>{userData?.weekPlan?.Tuesday?.breakfast?.dish}</td>
				<td>{userData?.weekPlan?.Tuesday?.lunch?.dish}</td>
				<td>{userData?.weekPlan?.Tuesday?.dinner?.dish}</td>
			</tr>
			<tr>
				<td>Wednesday</td>
				<td>{userData?.weekPlan?.Wednesday?.breakfast?.dish}</td>
				<td>{userData?.weekPlan?.Wednesday?.lunch?.dish}</td>
				<td>{userData?.weekPlan?.Wednesday?.dinner?.dish}</td>
			</tr>
			<tr>
				<td>Thursday</td>
				<td>{userData?.weekPlan?.Thursday?.breakfast?.dish}</td>
				<td>{userData?.weekPlan?.Thursday?.lunch?.dish}</td>
				<td>{userData?.weekPlan?.Thursday?.dinner?.dish}</td>
			</tr>
			<tr>
				<td>Friday</td>
				<td>{userData?.weekPlan?.Friday?.breakfast?.dish}</td>
				<td>{userData?.weekPlan?.Friday?.lunch?.dish}</td>
				<td>{userData?.weekPlan?.Friday?.dinner?.dish}</td>
			</tr>
			<tr>
				<td>Saturday</td>
				<td>{userData?.weekPlan?.Saturday?.breakfast?.dish}</td>
				<td>{userData?.weekPlan?.Saturday?.lunch?.dish}</td>
				<td>{userData?.weekPlan?.Saturday?.dinner?.dish}</td>
			</tr>
			<tr>
				<td>Sunday</td>
				<td>{userData?.weekPlan?.Sunday?.breakfast?.dish}</td>
				<td>{userData?.weekPlan?.Sunday?.lunch?.dish}</td>
				<td>{userData?.weekPlan?.Sunday?.dinner?.dish}</td>
			</tr>
		</tbody>
	</table>
        </Box>
        <Box></Box>
    </Box>
  )
}

export default MealCalender