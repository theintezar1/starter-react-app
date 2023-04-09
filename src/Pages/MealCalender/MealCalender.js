import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Navbaar from '../../Components/Navbaar/Navbaar';
import { PrimaryColor, SecondaryColor, textColor } from '../../Color.Config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import MuiButton from '../../Components/muiComponents/MuiButoon';
import styled from '@emotion/styled';

const BUTTON = styled(Button)({
	backgroundColor: SecondaryColor,
	border: "none",
	color: textColor,
	fontWeight: "400",
	textTransform: "none",
	fontFamily: "Josefin Sans, sans-serif",
	height: "30px",
	"&:hover": {
	  bgcolor: "red",
	},
  });

const options = ["Me", "Son", "Wife", "Daughter"];

function MealCalender() {
  // const [first, setfirst] = useState({})
  const [userData, setUserData] = useState([]);
  const [weekPlan, setWeekPlan] = useState({});
  const [family, setFamyly] = useState(0);



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

  //Create WeekPlan Query
  useEffect(() => {
    const setMealPlanOfWeek = async () => {
      const breakfast = await userData.breakFast;
      const lunch = await userData.lunch;
      const dinner = await userData.dinner;

      const daysOfWeek = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];

      const weeklyMeals = {};

      daysOfWeek.forEach((day) => {
        const breakfastIndex = Math.floor(Math.random() * breakfast.length);
        let lunchIndex = Math.floor(Math.random() * lunch.length);
        let dinnerIndex = Math.floor(Math.random() * dinner.length);

        // Make sure the lunch and dinner meals are not the same as the breakfast meal
        while (breakfast[breakfastIndex].dish === lunch[lunchIndex].dish) {
          lunchIndex = Math.floor(Math.random() * lunch.length);
        }
        while (
          breakfast[breakfastIndex].dish === dinner[dinnerIndex].dish ||
          lunch[lunchIndex].dish === dinner[dinnerIndex].dish
        ) {
          dinnerIndex = Math.floor(Math.random() * dinner.length);
        }

        weeklyMeals[day] = {
          breakfast: breakfast[breakfastIndex],
          lunch: lunch[lunchIndex],
          dinner: dinner[dinnerIndex],
        };

        // Remove the used meals from the array for the next iteration
        breakfast.splice(breakfastIndex, 1);
        lunch.splice(lunchIndex, 1);
        dinner.splice(dinnerIndex, 1);
      });

      setWeekPlan(weeklyMeals);
    };
    setMealPlanOfWeek();
  }, [userData]);

  console.log("weekPlan", weekPlan);
  
// Save Meal Plan query
    const saveMealPlan = async () => {
    // Create an initial document to update.
    const ref =
      options[family] == "Me"
        ? doc(db, "usersMealDecriptions", id)
        : doc(db, `users's${options[family]}`, id);
    //doc(db, "usersMealDecriptions", id);

    // To update age and favorite color:
    try {
      await updateDoc(ref, {
        weekPlan
      });
	  window.location.reload()
    } catch (error) {
      console.error(error);
    }
  };

    

  return (
    <Box sx={{ bgcolor: PrimaryColor, minHeight:"100vh" }}>
        <Navbaar/>
        <Box   sx={{position:"relative", top:"100px"}}>
        <h1  style={{color:textColor, marginBottom:"20px"}}>Week Meal Table</h1>
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
				<td>{userData.weekPlan?userData?.weekPlan?.Monday?.breakfast?.dish : weekPlan?.Monday?.breakfast?.dish}</td>
				<td>{userData.weekPlan?userData?.weekPlan?.Monday?.lunch?.dish:weekPlan?.Monday?.lunch?.dish}</td>
				<td>{userData.weekPlan?userData?.weekPlan?.Monday?.dinner?.dish:weekPlan?.Monday?.dinner.dish}</td>
			</tr>
			<tr>
				<td>Tuesday</td>
				<td>{userData.weekPlan?userData?.weekPlan?.Tuesday?.breakfast?.dish:weekPlan?.Tuesday?.breakfast?.dish}</td>
				<td>{userData.weekPlan?userData?.weekPlan?.Tuesday?.lunch?.dish:weekPlan?.Tuesday?.lunch?.dish}</td>
				<td>{userData.weekPlan?userData?.weekPlan?.Tuesday?.dinner?.dish:weekPlan?.Tuesday?.dinner?.dish}</td>
			</tr>
			<tr>
				<td>Wednesday</td>
				<td>{userData.weekPlan?userData?.weekPlan?.Wednesday?.breakfast?.dish:weekPlan?.Wednesday?.breakfast?.dish}</td>
				<td>{userData.weekPlan?userData?.weekPlan?.Wednesday?.lunch?.dish:weekPlan?.Wednesday?.lunch?.dish}</td>
				<td>{userData.weekPlan?userData?.weekPlan?.Wednesday?.dinner?.dish:weekPlan?.Wednesday?.dinner?.dish}</td>
			</tr>
			<tr>
				<td>Thursday</td>
				<td>{userData.weekPlan?userData?.weekPlan?.Thursday?.breakfast?.dish:weekPlan?.Thursday?.breakfast?.dish}</td>
				<td>{userData.weekPlan?userData?.weekPlan?.Thursday?.lunch?.dish:weekPlan?.Thursday?.lunch?.dish}</td>
				<td>{userData.weekPlan?userData?.weekPlan?.Thursday?.dinner?.dish:weekPlan?.Thursday?.dinner?.dish}</td>
			</tr>
			<tr>
				<td>Friday</td>
				<td>{userData.weekPlan?userData?.weekPlan?.Friday?.breakfast?.dish:weekPlan?.Friday?.breakfast?.dish}</td>
				<td>{userData.weekPlan?userData?.weekPlan?.Friday?.lunch?.dish:weekPlan?.Friday?.lunch?.dish}</td>
				<td>{userData.weekPlan?userData?.weekPlan?.Friday?.dinner?.dish:weekPlan?.Friday?.dinner?.dish}</td>
			</tr>
			<tr>
				<td>Saturday</td>
				<td>{userData.weekPlan?userData?.weekPlan?.Saturday?.breakfast?.dish:weekPlan?.Saturday?.breakfast?.dish}</td>
				<td>{userData.weekPlan?userData?.weekPlan?.Saturday?.lunch?.dish:weekPlan?.Saturday?.lunch?.dish}</td>
				<td>{userData.weekPlan?userData?.weekPlan?.Saturday?.dinner?.dish:weekPlan?.Saturday?.dinner?.dish}</td>
			</tr>
			<tr>
				<td>Sunday</td>
				<td>{userData.weekPlan?userData?.weekPlan?.Sunday?.breakfast?.dish:weekPlan?.Sunday?.breakfast?.dish}</td>
				<td>{userData.weekPlan?userData?.weekPlan?.Sunday?.lunch?.dish:weekPlan?.Sunday?.lunch?.dish}</td>
				<td>{userData.weekPlan?userData?.weekPlan?.Sunday?.dinner?.dish:weekPlan?.Sunday?.dinner?.dish}</td>
			</tr>
		</tbody>
	</table>
        </Box>
		<Box
        sx={{
          display: "flex",
          gap: { sm: "10px", xs: "3px" },
          flexWrap: "wrap",
          position: "fixed",
          zIndex: 999,
          bottom: "10px",
          width: "100%",
          justifyContent: "center",
        }}
      >
        {/* <BUTTON
          onClick={handleSave}
          variant="contained"
          style={{ height: "30px", display: userData }}
        >
          Save
        </BUTTON> */}
        <MuiButton setSelectedIndex={setFamyly} selectedIndex={family} />
        {/* <JsonToCsv mealData={mealList} /> */}
        <BUTTON
          onClick={saveMealPlan}
          variant="contained"
        >
          Change Meal
        </BUTTON>
      </Box>
    </Box>
  )
}

export default MealCalender