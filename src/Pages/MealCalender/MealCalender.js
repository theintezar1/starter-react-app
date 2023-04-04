import { Box } from '@mui/material';
import React from 'react'
import Navbaar from '../../Components/Navbaar/Navbaar';
import { PrimaryColor, textColor } from '../../Color.Config';

const meals = {
    breakfast:["toast", "coffee", "upma", "bun", "sandwich", "poha", "eggs", "croissant", "pancakes", "waffles", "oatmeal", "smoothie bowl", "bagel and cream cheese", "avocado toast", "granola and yogurt", "french toast", "scrambled eggs and bacon", "muffins", "omelette", "fruit salad", "hash browns"]
  ,
    lunch: ["sushi", "salad", "pizza", "tacos", "sandwich", "burger", "pasta", "rice bowl", "wrap", "quinoa bowl", "stir fry", "soup and sandwich", "burrito", "pad thai", "falafel wrap", "lasagna", "chicken shawarma", "bibimbap", "chicken salad", "fish and chips", "tuna salad"]
  ,
    dinner:["steak", "chops", "salmon", "chicken curry", "stew", "spaghetti", "grilled vegetables", "roast", "shrimp scampi", "baked salmon", "lamb chops", "mushroom risotto", "stir fry", "roast chicken", "vegetable lasagna", "chicken fajitas", "stuffed peppers", "chicken parmesan", "teriyaki chicken", "meatloaf", "broccoli"]
  };
  
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const weeklyMeals = {};
  
  daysOfWeek.forEach(day => {
    const breakfastIndex = Math.floor(Math.random() * meals.breakfast.length);
    let lunchIndex = Math.floor(Math.random() * meals.lunch.length);
    let dinnerIndex = Math.floor(Math.random() * meals.dinner.length);
  
    // Make sure the lunch and dinner meals are not the same as the breakfast meal
    while (meals.breakfast[breakfastIndex] === meals.lunch[lunchIndex]) {
      lunchIndex = Math.floor(Math.random() * meals.lunch.length);
    }
    while (meals.breakfast[breakfastIndex] === meals.dinner[dinnerIndex] || meals.lunch[lunchIndex] === meals.dinner[dinnerIndex]) {
      dinnerIndex = Math.floor(Math.random() * meals.dinner.length);
    }
  
    weeklyMeals[day] = {
      breakfast: meals.breakfast[breakfastIndex],
      lunch: meals.lunch[lunchIndex],
      dinner: meals.dinner[dinnerIndex]
    };
  
    // Remove the used meals from the array for the next iteration
    meals.breakfast.splice(breakfastIndex, 1);
    meals.lunch.splice(lunchIndex, 1);
    meals.dinner.splice(dinnerIndex, 1);
  });
  
  console.log(weeklyMeals.Monday.breakfast);

function MealCalender() {
    

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
				<td>{weeklyMeals.Monday.breakfast}</td>
				<td>{weeklyMeals.Monday.lunch}</td>
				<td>{weeklyMeals.Monday.dinner}</td>
			</tr>
			<tr>
				<td>Tuesday</td>
				<td>{weeklyMeals.Tuesday.breakfast}</td>
				<td>{weeklyMeals.Tuesday.lunch}</td>
				<td>{weeklyMeals.Tuesday.dinner}</td>
			</tr>
			<tr>
				<td>Wednesday</td>
				<td>{weeklyMeals.Wednesday.breakfast}</td>
				<td>{weeklyMeals.Wednesday.lunch}</td>
				<td>{weeklyMeals.Wednesday.dinner}</td>
			</tr>
			<tr>
				<td>Thursday</td>
				<td>{weeklyMeals.Thursday.breakfast}</td>
				<td>{weeklyMeals.Thursday.lunch}</td>
				<td>{weeklyMeals.Thursday.dinner}</td>
			</tr>
			<tr>
				<td>Friday</td>
				<td>{weeklyMeals.Friday.breakfast}</td>
				<td>{weeklyMeals.Friday.lunch}</td>
				<td>{weeklyMeals.Friday.dinner}</td>
			</tr>
			<tr>
				<td>Saturday</td>
				<td>{weeklyMeals.Saturday.breakfast}</td>
				<td>{weeklyMeals.Saturday.lunch}</td>
				<td>{weeklyMeals.Saturday.dinner}</td>
			</tr>
			<tr>
				<td>Sunday</td>
				<td>{weeklyMeals.Sunday.breakfast}</td>
				<td>{weeklyMeals.Sunday.lunch}</td>
				<td>{weeklyMeals.Sunday.dinner}</td>
			</tr>
		</tbody>
	</table>
        </Box>
        <Box></Box>
    </Box>
  )
}

export default MealCalender