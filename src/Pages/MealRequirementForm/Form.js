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
  updateDoc,
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
  forWhomData,
  relationData,
} from "../../data";
import { set } from "date-fns";
import { useNavigate } from "react-router-dom";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import LoadingButton from "@mui/lab/LoadingButton";

const storedName = []; 

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
  const [forWhom, setForWhom] = useState("Self");
  const [relation, setRelation] = useState("");
  const [nameOfFamily, setnameOfFamily] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(nameOfFamily)

  // calculate bmi function
  function calculateBmi() {
    if (weight > 0 && height > 0) {
      var finalBmi = weight / (((height / 100) * height) / 100);
      let RoundBmi = Math.round(finalBmi);

      if (finalBmi < 18.5) {
        setBmi(`That you are too thin.${RoundBmi}`);
      }
      if (finalBmi > 18.5 && finalBmi < 25) {
        setBmi(`${RoundBmi}`);
      }
      if (finalBmi > 25) {
        setBmi(`${RoundBmi}`);
      }
    } else {
      console.log("Fill Right Data");
    }
  }

  if (height && weight) {
    setTimeout(() => {
      calculateBmi();
    }, 1000);
  }


  //Get Value from localStorage
  let id = localStorage.getItem("userId");
  let name = localStorage.getItem("name");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const userId = await auth?.currentUser?.uid;
      const ref =
        forWhom == "Self"
          ? doc(db, "usersMealDecriptions", userId)
          : doc(db, `users's${relation}`, userId);
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();

      today = mm + "/" + dd + "/" + yyyy;

      await setDoc(ref, {
        relation,
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
        date: today,
      });
      // alert("Show my meal plan");
      navigate("/meal_list");
      localStorage.setItem("userId", userId);
      addingListOfFamily()

  // Parse current value into array
  const myArray = name ? JSON.parse(name) : [];

  // Add new value to array
  forWhom=="Self"? myArray.push("Self"): myArray.push(relation)
 

  // Serialize updated array
  const updatedValue = JSON.stringify(myArray);

  // Store updated value in localStorage
 localStorage.setItem("name", updatedValue);

      window.location.reload();
    } catch (error) {
      alert(error);
    }
  };

const dataArray = JSON.parse(name);
const uniqueValues = [...new Set(dataArray)];
console.log("stored Data",uniqueValues);

//update add user plan
const addingListOfFamily = async() =>{
  try {
    const collection = "userMembers"
    const ref = doc(db, collection, id);
    await setDoc(ref,{uniqueValues});
  } catch (error) {
    console.error(error);
    // handle error here
  }
}

  useEffect(() => {
    const getDocument = async () => {
      try {
        const docRef =
          forWhom == "Self"
            ? doc(db, "usersMealDecriptions", id)
            : doc(db, `users's${relation}`, id);
        //doc(db, "usersMealDecriptions", id);
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
        // setRelation(docSnap.data().relation);
      } catch (error) {
        console.log(error);
      }
    };
    getDocument();
  }, [ forWhom, relation]);

  useEffect(() => {
    const getDocument = async () => {
      try {
        const docRef =
          forWhom == "Self"
            ? doc(db, "usersMealDecriptions", id)
            : doc(db, `users's${relation}`, id);
            const docSnap = await getDoc(docRef);
        setRelation(docSnap.data().relation);
      } catch (error) {
        console.log(error);
      }
    };
    getDocument();
  }, [forWhom]);

  //getuser list
  useEffect(() => {
    const getDocument = async () => {
      try {
        const docRef =doc(db, "userMembers", id)
        //doc(db, "usersMealDecriptions", id);
        const docSnap = await getDoc(docRef);
        console.log("list",docSnap.data());
        setnameOfFamily(docSnap.data().uniqueValues)
      } catch (error) {
        console.log(error);
      }
    };
    getDocument();
  }, [relation, forWhom]);

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
      <Box width={"100%"} sx={{ marginTop: { sm: "0", xs: "20px" } }}>
        <Box
          sx={{
            color: textColor,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: { sm: "30px", xs: "25px" },
          }}
        >
          <p
            style={{
              color: SecondaryColor,
              backgroundColor: textColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "3px",
              paddingTop: "8px",
            }}
          >
            HELP{" "}
          </p>{" "}
          <p
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "3px",
              paddingTop: "8px",
            }}
          >
            US KNOW YOU!
          </p>
        </Box>
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
            name="For Whom"
            selected={true}
            setInput={setForWhom}
            input={forWhom}
            data={forWhomData}
          />
         <TextFields
            name="Name*"
            selected={forWhom=="List of Family"?true:false}
            setInput={setRelation}
            input={relation}
            data={uniqueValues}
            disable={forWhom == "Self" ? true : false}
          /> 
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
            name="Spiciness Level"
            selected={true}
            input={foodPreference}
            setInput={setFoodPreference}
            data={foodpreferenceData}
          />
          <TextFields
            name="Height"
            setInput={setHeight}
            input={height}
            selected={true}
            data={heightData}
          />
          <TextFields name="Weight (kg)" setInput={setWeight} input={weight} />
          <TextFields name="BMI" setInput={setBmi} input={bmi} />
        </Box>
        <LoadingButton
          style={{
            width: "250px",
            backgroundColor: SecondaryColor,
            border: "none",
            color: textColor,
            fontWeight: "500",
            fontSize: "18px",
            margin: "auto",
            marginTop: "-20px",
            textTransform: "none",
            fontFamily: "Josefin Sans, sans-serif",
          }}
          size="small"
          onClick={handleSubmit}
          loading={loading}
        >
         Show Meal Plan
        </LoadingButton>
      </Box>
    </Box>
  );
}

export default Form;
