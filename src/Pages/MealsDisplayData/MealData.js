import { Box } from "@mui/material";
import { display } from "@mui/system";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { PrimaryColor } from "../../Color.Config";
import RecipeReviewCard from "../../Components/muiComponents/RecipeReviewCard";
import Navbaar from "../../Components/Navbaar/Navbaar";
import { db } from "../../firebase-config";

function MealData() {
  const [userData, setUserData] = useState([]);
  const [mealList, setMealList] = useState([]);
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

  let array = [];

  useEffect(() => {
    const GetFilteredMeal = async () => {
      //   const q = query(
      //     collection(db, "meal"),
      //     where("Type", "==", await userData.dietary),
      //     where("Spiciness", "==", await userData.foodPreference),
      //    await userData.medical.length > 0
      //       ? where("MedCond", "==", await userData.medical[0])
      //       : where("allData", "==", "all"),
      //    await userData.allegries.length > 0
      //       ?where("Allergy", "==", await userData.allegries[0])
      //       : where("allData", "==", "all")
      //   );

      const q = query(
        collection(db, "meal"),
        userData.medical && userData.medical.length >0? where("medCond", "==", await userData.medical[0]):where("allData", "==", "all"),
        where("spiciness", "==", await userData.foodPreference),
        where("type", "==", await userData.dietary),
        where("allergy", "not-in", await userData.allegries),
        );

      
      const querySnapshot = await getDocs(q);
      setMealList(querySnapshot);

      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data().Dish);
      });
      const docsSnap = await getDocs(q);
      docsSnap.forEach((doc) => {
        console.log(doc.data());
      });
    };
    GetFilteredMeal();
  }, [
    userData.dietary,
    userData.foodPreference,
    userData.medical,
    userData.allegries,
  ]);
  const results = [];
  return (
    <Box sx={{ bgcolor: PrimaryColor }}>
      <Navbaar />
      {mealList.forEach((doc, index) => {
        results.push(
          <Box key={index}>
            <RecipeReviewCard
              name={doc.data().dish}
              allegrie={doc.data().allergy}
              image = {doc.data().image}
              desc= {doc.data().description}
              ing1={doc.data().Ing1}
              ing2={doc.data().Ing2}
              mainIng = {doc.data().mainIng}

            />
            <hr />
          </Box>
        );
      })}
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
        {results}
      </Box>
    </Box>
  );
}

export default MealData;
