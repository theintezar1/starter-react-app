import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { PrimaryColor, SecondaryColor, textColor } from "../../Color.Config";
import {
  MultipleSelected,
  TextFields,
} from "../../Components/muiComponents/AllInputs";
import { auth, db } from "../../firebase-config";
import { signOut } from "firebase/auth";
import {
  getDoc,
  collection,
  addDoc,
  doc,
  setDoc,
  query,
  getDocs,
  where,
} from "firebase/firestore";
import {
  ageData,
  genderData,
  dietaryData,
  medicalData,
  deficiencyData,
  allegriesData,
  dailysleepData,
  acitvityData,
  mealsData,
  foodpreferenceData,
  lifestyleData,
  heightData,
} from "../../data";
import { set } from "date-fns";
import { useNavigate } from "react-router-dom";

function Form() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState([]);
  const [town, setTown] = useState("");
  const [city, setCity] = useState("");
  const [dietary, setDietary] = useState("");
  const [medical, setMedical] = useState([]);
  const [deficiency, setDeficiency] = useState([]);
  const [allegries, setAllegries] = useState([]);
  const [sleep, setSleep] = useState("");
  const [activity, setActivity] = useState("");
  const [meals, setMeals] = useState("");
  const [lifestyle, setLifestyle] = useState("");
  const [foodPreference, setFoodPreference] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState("");

  // calculate bmi function
  function calculateBmi() {
    if(weight > 0 && height > 0){	
    var finalBmi = weight/(height/100*height/100)
    if(finalBmi < 18.5){
   setBmi(`That you are too thin.${finalBmi}`)
    }
    if(finalBmi > 18.5 && finalBmi < 25){
   setBmi(`That you are healthy.${finalBmi}`)
    }
    if(finalBmi > 25){
   setBmi(`That you have overweight.${finalBmi}`)
    }
    }
    else{
    alert("Please Fill in everything correctly")
    }
    }

    if(height && weight ){
      setTimeout(() => {
        calculateBmi()
      }, 1000);
    }
  // calculate bmi function


  let id = localStorage.getItem("userId");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const userId = await auth?.currentUser?.uid;
      const ref = doc(db, "usersMealDecriptions", userId);
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      
      today = mm + '/' + dd + '/' + yyyy;

      await setDoc(ref, {
        age,
        gender,
        town,
        city,
        dietary,
        meals,
        medical,
        allegries,
        deficiency,
        sleep,
        activity,
        lifestyle,
        foodPreference,
        height,
        weight,
        bmi,
        "date":today,
      });
      alert("success");
      navigate("/meal_list")
      localStorage.setItem("userId", userId);
    } catch (error) {
      alert(error);
    }
  };



  useEffect(() => {
    const getDocument = async () => {
      try {
        const docRef = doc(db, "usersMealDecriptions", id);
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data());
        setAge(docSnap.data().age);
        setGender(docSnap.data().gender);
        setTown(docSnap.data().town);
        setCity(docSnap.data().city);
        setDietary(docSnap.data().dietary);
        setMedical(docSnap.data().medical);
        setDeficiency(docSnap.data().deficiency);
        setAllegries(docSnap.data().allegries);
        setSleep(docSnap.data().sleep);
        setActivity(docSnap.data().activity);
        setMeals(docSnap.data().meals);
        setLifestyle(docSnap.data().lifestyle);
        setFoodPreference(docSnap.data().foodPreference);
        setHeight(docSnap.data().height);
        setWeight(docSnap.data().weight);

      } catch (error) {
        console.log(error);
      }

    };
    getDocument();
  }, []);

  return (
    <Box
      sx={{
        bgcolor: { sm: PrimaryColor, xs: "white" },
        minHeight: "100vh",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: { sm: "row", xs: "column" },
      }}
    >
      <Box width={"100%"} sx={{ marginTop: { sm: "0", xs: "15px" } }}>
        <h1
          style={{
            color: textColor,
            display: "flex",
            justifyContent: "center",
            alignItems:"center",
          }}
        >
          <span
            style={{
              color: SecondaryColor,
              padding: "5px",
              backgroundColor: textColor,
            }}
          >
            HELP
          </span>{" "}
          <span style={{ padding: "5px" }}> US KNOW YOU!</span>
        </h1>
      </Box>
      <Box
        sx={{
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
          margin: "auto",
          bgcolor: "white",
          minHeight: "100vh",
          paddingTop: "30px",
          paddingBottom: "30px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: { sm: 4, xs: 1 },
            flexWrap: "wrap",
            width: { sm: "700px", xs: "100%" },
            margin: "auto",
          }}
        >
          <TextFields
            name="Age"
            selected={true}
            setInput={setAge}
            input={age}
            data={ageData}
          />
          <TextFields
            name="Gender"
            selected={true}
            setInput={setGender}
            input={gender}
            data={genderData}
          />
          <TextFields name="Home Town" setInput={setTown} input={town} />
          <TextFields name="Current City" setInput={setCity} input={city} />
          <TextFields
            name="Dietary Preference"
            selected={true}
            setInput={setDietary}
            input={dietary}
            data={dietaryData}
          />
          <MultipleSelected
            name="Medical Condition"
            setInput={setMedical}
            input={medical}
            data={medicalData}
          />
          <MultipleSelected
            name="Food Allegries"
            setInput={setAllegries}
            input={allegries}
            data={allegriesData}
          />
          <MultipleSelected
            name="Deficiency"
            setInput={setDeficiency}
            input={deficiency}
            data={deficiencyData}
          />
          <TextFields
            name="Daily Sleep"
            selected={true}
            setInput={setSleep}
            input={sleep}
            data={dailysleepData}
          />
          <TextFields
            name="Weekly Physical Activity"
            selected={true}
            setInput={setActivity}
            input={activity}
            data={acitvityData}
          />
          <TextFields
            name="Meals"
            selected={true}
            setInput={setMeals}
            input={meals}
            data={mealsData}
          />
          <TextFields
            name="Social Lifestyle"
            selected={true}
            input={lifestyle}
            setInput={setLifestyle}
            data={lifestyleData}
          />
          <TextFields
            name="Food Preference"
            selected={true}
            input={foodPreference}
            setInput={setFoodPreference}
            data={foodpreferenceData}
          />
          <TextFields name="Height" setInput={setHeight} input={height} selected={true} data={heightData} />
          <TextFields name="Weight (kg)" setInput={setWeight} input={weight} />
          <TextFields name="BMI" setInput={setBmi} input={bmi} />
        </Box>
        <button
          style={{
            padding: "10px",
            width: "250px",
            backgroundColor: SecondaryColor,
            border: "none",
            color: textColor,
            fontWeight: "600",
            fontSize: "18px",
            margin: "auto",
            marginTop: "-20px",
          }}
          onClick={handleSubmit}
        >
          Create Your Meal
        </button>
        {/* <Button onClick={handleLogout}> logout </Button> */}
      </Box>
    </Box>
  );
}

export default Form;