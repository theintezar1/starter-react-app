import { Box } from "@mui/material";
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
  ]);

  const handleSave = async () => {
    // Create an initial document to update.
    const ref = doc(db, "usersMealDecriptions", id);

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
      <button onClick={handleSave} style={{display:userData.saveMealData?"none":"block"}}>Save this meal</button>
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
