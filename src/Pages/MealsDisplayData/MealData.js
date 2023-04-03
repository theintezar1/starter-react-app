import styled from "@emotion/styled";
import { Box, Button } from "@mui/material";
import { display } from "@mui/system";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { PrimaryColor, SecondaryColor, textColor } from "../../Color.Config";
import JsonToCsv from "../../Components/JsonToCSV/JsonToCsv";
import RecipeReviewCard from "../../Components/muiComponents/RecipeReviewCard";
import Navbaar from "../../Components/Navbaar/Navbaar";
import { db } from "../../firebase-config";
import { useNavigate } from "react-router-dom";

const BUTTON = styled(Button)({
  backgroundColor: SecondaryColor,
  border: "none",
  color: textColor,
  fontWeight: "400",
  textTransform:"none",
  fontFamily: 'Josefin Sans, sans-serif',
  height:"30px",
  '&:hover':{
    bgcolor:"red"
  }
})

// meal Plan





// meal plan

function MealData() {

  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [mealList, setMealList] = useState([]);
  const [family, setFamyly] = useState("Me")
  let id = localStorage.getItem("userId");
  useEffect(() => {
    const getDocument = async () => {
      try {
        const docRef =family=="Me"? doc(db, "usersMealDecriptions", id):doc(db, `users's${family}`, id);
        const docSnap = await getDoc(docRef);
        setUserData(docSnap.data());
      } catch (error) {
        console.log(error);
      }
    };
    getDocument();
  }, [family]);

 console.log("userData", userData)

  useEffect(() => {
    const GetFilteredMeal = async () => {
      const medicalArray = await userData.medical;
      const deficencyArray = await userData.deficiency;
      const foodPrefrence = await userData.foodPreference;
      const diet = await userData.dietary;
      const Allergies = await userData.allegries;
      const q = query(
        collection(db, "meal"),
        foodPrefrence
          ? where("spiciness", "==", await userData.foodPreference)
          : where("allData", "==", "all"),
        diet
          ? where("type", "==", await userData.dietary)
          : where("allData", "==", "all"),
        Allergies.length > 0
          ? where("allergy", "not-in", await userData.allegries)
          : where("allData", "==", "all")
      );

      console.log("medical", medicalArray);
      console.log("deficency", deficencyArray);

      const data = await getDocs(q);
      const filterData = data.docs.map((doc) => ({
        ...doc.data(),
      }));

      console.log("pre filter", filterData);
      const filteredData = filterData.filter((item) =>
        medicalArray.length > 0 && deficencyArray.length > 0
          ? !medicalArray.includes(item.medCond) &&
            deficencyArray.includes(item.contains)
          : !medicalArray.includes(item.medCond) ||
            deficencyArray.includes(item.contains)
      );
      console.log("after filter", filteredData);
      setMealList(filteredData);
    };
    GetFilteredMeal();
  }, [
    userData.dietary,
    userData.foodPreference,
    userData.medical,
    userData.allegries,
    family
  ]);

  const handleSave = async () => {
    // Create an initial document to update.
    const ref = family=="Me"? doc(db, "usersMealDecriptions", id):doc(db, `users's${family}`, id)
    //doc(db, "usersMealDecriptions", id);

    // To update age and favorite color:
    try {
      await updateDoc(ref, {
        saveMealData: mealList
      })
      alert("save successfully")
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <Box sx={{ bgcolor: PrimaryColor }}>
      <Navbaar />
      <Box sx={{display:"flex", gap:{sm:"20px", xs:"3px"}, mt:"10px",ml:"20px", flexWrap:"wrap"}}>
      <BUTTON onClick={handleSave} variant="contained" style={{height:"30px"}}>Save</BUTTON>
      <BUTTON onClick={()=>{setFamyly("Son")}} variant="contained" >Son</BUTTON>
      <BUTTON onClick={()=>{setFamyly("Wife")}} variant="contained" >Wife</BUTTON>
      <BUTTON onClick={()=>{setFamyly("Daughter")}} variant="contained" >Daughter</BUTTON>
      <JsonToCsv  mealData={mealList}/>
      <BUTTON onClick={()=>{navigate("/calender_of_meal")}} variant="contained" >Meal Calender</BUTTON>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          minHeight: "100vh",
          flexWrap: "wrap",
          mt: "10px",
        }}
      >
        {mealList ? (
          mealList.map((doc, index) => (
            <Box key={index}>
              <RecipeReviewCard
                name={doc.dish}
                allegrie={doc.allergy}
                medicalCond={doc.medCond}
                deficency={doc.contains}
                image={doc.image}
                desc={doc.description}
                ing1={doc.Ing1}
                ing2={doc.Ing2}
                mainIng={doc.mainIng}
                date={doc.date}
              />
              <hr />
            </Box>
          ))
        ) : (
          <h1></h1>
        )}
      </Box>
    </Box>
  );
}

export default MealData;
