import { Box } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { SecondaryColor, textColor } from "../../Color.Config";
import { TextFields } from "../muiComponents/AllInputs";
import {
  allegriesData,
  bmiData,
  dietaryData,
  foodpreferenceData,
  medicalData,
} from "../../data";
import { db } from "../../firebase-config";

function AddMealForm(props) {
  const [type, setType] = useState("");
  const [state, setState] = useState("");
  const [spiciness, setSpiciness] = useState("");
  const [allergy, setAllergy] = useState("");
  const [dish, setDish] = useState("");
  const [timeOfFood, setTimeOfFood] = useState("");
  const [bmi, setBmi] = useState("");
  const [weight, setWeight] = useState("");
  const [mainIng, setMainIng] = useState("");
  const [Ing1, setIng1] = useState("");
  const [Ing2, setIng2] = useState("");
  const [image, setImage] = useState("");
  const [medCond, setMedCond] = useState("");
  const [description, setDescription] = useState("");

  const {setInput} = props;
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  
  today = mm + '/' + dd + '/' + yyyy;

  const handleSubmit = async () => {
    try {
      const mealCollection = collection(db, "meal");

      await addDoc(mealCollection, {
       type,
       state,
       spiciness,
       allergy,
       dish,
       timeOfFood,
       bmi,
       weight,
       mainIng,
       Ing1,
       Ing2,
       image,
       medCond,
       description,
       "allData":"all",
       "date": today
      });
      alert("success");
      // setInput(false)
    } catch (error) {
      alert(error);
    }
  };

  
  return (
    <Box pb={3} display={"grid"} justifyContent={"center"} rowGap={4}>
    <Box sx={{width:"600px", display:"flex", flexWrap:"wrap", justifyContent:"center", gap:"20px", paddingTop:"30px", paddingBottom:"20px"}}>
      <TextFields
        name="Food Type"
        selected={true}
        setInput={setType}
        data={dietaryData}
      />
      <TextFields
        name="State"
        selected={true}
        setInput={setState}
        data={stateData}
      />
      <TextFields
        name="Spiceness"
        selected={true}
        setInput={setSpiciness}
        data={foodpreferenceData}
      />
      <TextFields
        name="Medical Condition"
        selected={true}
        setInput={setMedCond}
        data={medicalData}
      />
      <TextFields name="Dish Name" setInput={setDish} />
      <TextFields name="BMI" setInput={setBmi} />
      <TextFields
        name="Allergies"
        selected={true}
        setInput={setAllergy}
        data={allegriesData}
      />
      <TextFields name="Ingridents 1" setInput={setIng1} />
      <TextFields name="Ingridents 2" setInput={setIng2} />
      <TextFields name="Main Ingridiants" setInput={setMainIng} />
      <TextFields
        name="Weight"
        selected={true}
        setInput={setWeight}
        data={bmiData}
      />
      <TextFields name="Description" setInput={setDescription} />
      <TextFields name="Image" setInput={setImage} />
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
        >Add Meals</button>
    </Box>
  );
}

export default AddMealForm;

const stateData = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];
