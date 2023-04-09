import styled from "@emotion/styled";
import { Box, Button } from "@mui/material";
import { display } from "@mui/system";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
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
import { loadingButtonClasses } from "@mui/lab";
import MuiButton from "../../Components/muiComponents/MuiButoon";

const BUTTON = styled(Button)({
  backgroundColor: SecondaryColor,
  border: "none",
  color: textColor,
  fontWeight: "400",
  textTransform: "none",
  fontFamily: "Josefin Sans, sans-serif",
  height: "30px",
});

const options = ["Me", "Son", "Wife", "Daughter"];

function MealData() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [mealList, setMealList] = useState([]);
  const [unsubscribe, setUnsubscribe] = useState(null);
  const [family, setFamyly] = useState(0);
  let id = localStorage.getItem("userId");
  useEffect(() => {
    const getDocument = async () => {
      try {
        const docRef =
          options[family] == "Me"
            ? doc(db, "usersMealDecriptions", id)
            : doc(db, `users's${options[family]}`, id);
        const docSnap = await getDoc(docRef);
        setUserData(docSnap.data());
      } catch (error) {
        console.log(error);
      }
    };
    getDocument();
  }, [family]);

  console.log("userData", userData);

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

      // console.log("medical", medicalArray);
      // console.log("deficency", deficencyArray);

      const data = await getDocs(q);
      const filterData = data.docs.map((doc) => ({
        ...doc.data(),
      }));

      // console.log("pre filter", filterData);
      const filteredData = filterData.filter((item) =>
        medicalArray.length > 0 && deficencyArray.length > 0
          ? !medicalArray.includes(item.medCond) &&
            deficencyArray.includes(item.contains)
          : !medicalArray.includes(item.medCond) ||
            deficencyArray.includes(item.contains)
      );
      // console.log("after filter", filteredData);
      setMealList(filteredData);
    };
    GetFilteredMeal();
  }, [
    userData.dietary,
    userData.foodPreference,
    userData.medical,
    userData.allegries,
    family,
  ]);

  const lunch = mealList.filter((item) => item.timeOfFood == "L");
  const breakFast = mealList.filter((item) => item.timeOfFood == "B");
  const dinner = mealList.filter((item) => item.timeOfFood == "D");
  

  const handleSave = async () => {
    // Create an initial document to update.
    const ref =
      options[family] == "Me"
        ? doc(db, "usersMealDecriptions", id)
        : doc(db, `users's${options[family]}`, id);
    //doc(db, "usersMealDecriptions", id);

    // To update age and favorite color:
    try {
      await updateDoc(ref, {
        saveMealData: mealList,
        lunch,
        breakFast,
        dinner,
      });
    } catch (error) {
      console.error(error);
    }
  };



  setTimeout(() => {
    handleSave();
  }, 3000);

  return (
    <Box sx={{ bgcolor: PrimaryColor, minHeight: "100vh" }}>
      <Navbaar />
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
        <JsonToCsv mealData={mealList} />
        <BUTTON
          onClick={() => {
            navigate("/calender_of_meal");
            handleSave();
          }}
        >
          Meal Calender
        </BUTTON>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          flexWrap: "wrap",
          position: "relative",
          top: 90,
          backgroundColor: PrimaryColor,
          p: 1,
        }}
      >
        {mealList ? (
          mealList.map((doc, index) => (
            <Box key={index}>
              <RecipeReviewCard
                name={doc?.dish}
                allegrie={doc?.allergy}
                medicalCond={doc?.medCond}
                deficency={doc?.contains}
                image={doc?.image}
                desc={doc?.description}
                ing1={doc?.Ing1}
                ing2={doc?.Ing2}
                mainIng={doc?.mainIng}
                date={doc?.date}
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
