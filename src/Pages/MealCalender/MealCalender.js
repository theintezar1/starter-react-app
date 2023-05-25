import {
  Avatar,
  Box,
  Button,
  IconButton,
  Input,
  inputAdornmentClasses,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbaar from "../../Components/Navbaar/Navbaar";
import {
  BottomNavbaarColor,
  PrimaryColor,
  SecondaryColor,
  textColor,
} from "../../Color.Config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import MuiButton from "../../Components/muiComponents/MuiButoon";
import styled from "@emotion/styled";
import EditIcon from "@mui/icons-material/Edit";
import MealInput, {
  TextFields,
} from "../../Components/muiComponents/AllInputs";
import { Document, Page, pdfjs } from "react-pdf";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import CancelIcon from "@mui/icons-material/Cancel";
import "./meal.css"

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

function abc() {}
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function MealCalender() {
  let index = localStorage.getItem("index");
  // const [first, setfirst] = useState({})
  const [userData, setUserData] = useState([]);
  const [weekPlan, setWeekPlan] = useState({});
  const [family, setFamyly] = useState(index);
  const [edit, setEdit] = useState(true);

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const [mondayB, setMondayB] = useState();
  const [mondayL, setMondayL] = useState();
  const [mondayD, setMondayD] = useState();
  const [tuesdayB, settuesdayB] = useState();
  const [tuesdayL, settuesdayL] = useState();
  const [tuesdayD, settuesdayD] = useState();
  const [wednesdayB, setwednesdayB] = useState();
  const [wednesdayL, setwednesdayL] = useState();
  const [wednesdayD, setwednesdayD] = useState();
  const [thursdayB, setthursdayB] = useState();
  const [thursdayL, setthursdayL] = useState();
  const [thursdayD, setthursdayD] = useState();
  const [fridayL, setfridayL] = useState();
  const [fridayB, setfridayB] = useState();
  const [fridayD, setfridayD] = useState();
  const [saturdayB, setsaturdayB] = useState();
  const [saturdayL, setsaturdayL] = useState();
  const [saturdayD, setsaturdayD] = useState();
  const [sundayB, setsundayB] = useState();
  const [sundayL, setsundayL] = useState();
  const [sundayD, setsundayD] = useState();
  const [groceryShow, SetGroceryShow] = useState(false);
  const [groceryShowunique, SetGroceryShowunique] = useState(false);

  //
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  //download pdf
  const handleDownload = () => {
    const input = document.getElementById("download-container");
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("download.pdf");
    });
  };

  //get data from local storage
  let name = localStorage.getItem("name");
  let id = localStorage.getItem("userId");
  const dataArray = JSON.parse(name);
  const options = [...new Set(dataArray)];
  useEffect(() => {
    const getDocument = async () => {
      try {
        const docRef =
          options[family] == "Self"
            ? doc(db, "usersMealDecriptions", id)
            : doc(db, `users's${options[family]}`, id);
        const docSnap = await getDoc(docRef);
        setUserData(docSnap.data());
        setMondayB(
          docSnap.data().weekPlan.Monday.breakfast || weekPlan.Monday.breakfast
        );
        setMondayL(
          docSnap.data().weekPlan.Monday.lunch || weekPlan.Monday.lunch
        );
        setMondayD(
          docSnap.data().weekPlan.Monday.dinner || weekPlan.Monday.dinner
        );
        settuesdayB(
          docSnap.data().weekPlan.Tuesday.breakfast ||
            weekPlan.Tuesday.breakfast
        );
        settuesdayL(
          docSnap.data().weekPlan.Tuesday.lunch || weekPlan.Tuesday.lunch
        );
        settuesdayD(
          docSnap.data().weekPlan.Tuesday.dinner || weekPlan.Tuesday.dinner
        );
        setwednesdayB(
          docSnap.data().weekPlan.Wednesday.breakfast ||
            weekPlan.Wednesday.breakfast
        );
        setwednesdayL(
          docSnap.data().weekPlan.Wednesday.lunch || weekPlan.Wednesday.lunch
        );
        setwednesdayD(
          docSnap.data().weekPlan.Wednesday.dinner || weekPlan.Wednesday.dinner
        );
        setthursdayB(
          docSnap.data().weekPlan.Thursday.breakfast ||
            weekPlan.Thursday.breakfast
        );
        setthursdayL(
          docSnap.data().weekPlan.Thursday.lunch || weekPlan.Thursday.lunch
        );
        setthursdayD(
          docSnap.data().weekPlan.Thursday.dinner || weekPlan.Thursday.dinner
        );
        setfridayB(
          docSnap.data().weekPlan.Friday.breakfast || weekPlan.Friday.breakfast
        );
        setfridayL(
          docSnap.data().weekPlan.Friday.lunch || weekPlan.Friday.lunch
        );
        setfridayD(
          docSnap.data().weekPlan.Friday.dinner || weekPlan.Friday.dinner
        );
        setsaturdayB(
          docSnap.data().weekPlan.Saturday.breakfast ||
            weekPlan.Saturday.breakfast
        );
        setsaturdayL(
          docSnap.data().weekPlan.Saturday.lunch || weekPlan.Saturday.lunch
        );
        setsaturdayD(
          docSnap.data().weekPlan.Saturday.dinner || weekPlan.Saturday.dinner
        );
        setsundayB(
          docSnap.data().weekPlan.Sunday.breakfast || weekPlan.Sunday.breakfast
        );
        setsundayL(
          docSnap.data().weekPlan.Sunday.lunch || weekPlan.Sunday.lunch
        );
        setsundayD(
          docSnap.data().weekPlan.Sunday.dinner || weekPlan.Sunday.dinner
        );
      } catch (error) {
        console.log(error);
      }
    };
    getDocument();
  }, [family, edit]);

  console.log("userData", userData);

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

  // Save Meal Plan query

  const saveMealPlan = async (data) => {
    try {
      const collection =
        options[family] == "Self"
          ? "usersMealDecriptions"
          : `users's${options[family]}`;
      const ref = doc(db, collection, id);
      await updateDoc(ref, { weekPlan });
      !data && window.location.reload();
    } catch (error) {
      console.error(error);
      // handle error here
    }
  };

  //update meal plan manually
  const updateMealPlan = async (data) => {
    try {
      const collection =
        options[family] == "Self"
          ? "usersMealDecriptions"
          : `users's${options[family]}`;
      const ref = doc(db, collection, id);
      await updateDoc(ref, {
        weekPlan: {
          Sunday: {
            lunch: sundayL,
            breakfast: sundayB,
            dinner: sundayD,
          },
          Wednesday: {
            dinner: wednesdayD,
            breakfast: wednesdayB,
            lunch: wednesdayL,
          },
          Saturday: {
            dinner: saturdayD,
            breakfast: saturdayB,
            lunch: saturdayL,
          },
          Thursday: {
            lunch: thursdayL,
            breakfast: thursdayB,
            dinner: thursdayD,
          },
          Tuesday: {
            breakfast: tuesdayB,
            dinner: tuesdayD,
            lunch: tuesdayL,
          },
          Monday: {
            lunch: mondayL,
            breakfast: mondayB,
            dinner: mondayD,
          },
          Friday: {
            breakfast: fridayB,
            dinner: fridayD,
            lunch: fridayL,
          },
        },
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
      // handle error here
    }
  };

  //set index in local storage
  if (family == "1") {
    localStorage.setItem("index", 1);
  } else if (family == "2") {
    localStorage.setItem("index", 2);
  } else if (family == "3") {
    localStorage.setItem("index", 3);
  } else {
    localStorage.setItem("index", 0);
  }

  //grocery unique array
  const mainIngList = Object.keys(weekPlan).flatMap((day) =>
    ["breakfast", "lunch", "dinner"].map(
      (meal) =>
        userData?.weekPlan?.[day]?.[meal]?.mainIng ||
        weekPlan[day]?.[meal]?.mainIng
    )
  );

  const uniqueGroceries = Array.from(
    new Set(
      mainIngList
        .flatMap((items) => items.split(","))
        .map((item) => item.trim())
    )
  );

  console.log("unique", uniqueGroceries);

  return (
    <Box sx={{ bgcolor: PrimaryColor, minHeight: "100vh" }}>
      <Navbaar />
      <Box sx={{ position: "relative", top: "100px" }}>
        <h1
          style={{
            color: "#b14325",
            marginBottom: "20px",
            marginTop: { xs: "200px", sm: "500px" },
          }}
        >
          Week Meal Table
        </h1>
        <table id="download-container">
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
              {edit ? (
                <td>
                  {userData.weekPlan
                    ? userData?.weekPlan?.Monday?.breakfast?.dish
                    : weekPlan?.Monday?.breakfast?.dish}
                </td>
              ) : (
                <td>
                  {" "}
                  <MealInput
                    name={"Meal"}
                    selected={true}
                    input={mondayB}
                    setInput={setMondayB}
                    data={userData?.breakFast}
                  />
                </td>
              )}
              {edit ? (
                <td>
                  {userData.weekPlan
                    ? userData?.weekPlan?.Monday?.lunch?.dish
                    : weekPlan?.Monday?.lunch?.dish}
                </td>
              ) : (
                <td>
                  {" "}
                  <MealInput
                    name={"Meal"}
                    selected={true}
                    input={mondayL}
                    setInput={setMondayL}
                    data={userData?.saveMealData}
                  />
                </td>
              )}
              {edit ? (
                <td>
                  {userData.weekPlan
                    ? userData?.weekPlan?.Monday?.dinner?.dish
                    : weekPlan?.Monday?.dinner.dish}
                </td>
              ) : (
                <td>
                  {" "}
                  <MealInput
                    name={"Meal"}
                    selected={true}
                    input={mondayD}
                    setInput={setMondayD}
                    data={userData?.saveMealData}
                  />
                </td>
              )}
            </tr>
            <tr>
              <td>Tuesday</td>
              {edit ? (
                <td>
                  {userData.weekPlan
                    ? userData?.weekPlan?.Tuesday?.breakfast?.dish
                    : weekPlan?.Tuesday?.breakfast?.dish}
                </td>
              ) : (
                <td>
                  {" "}
                  <MealInput
                    name={"Meal"}
                    selected={true}
                    input={tuesdayB}
                    setInput={settuesdayB}
                    data={userData?.breakFast}
                  />
                </td>
              )}
              {edit ? (
                <td>
                  {userData.weekPlan
                    ? userData?.weekPlan?.Tuesday?.lunch?.dish
                    : weekPlan?.Tuesday?.lunch?.dish}
                </td>
              ) : (
                <td>
                  {" "}
                  <MealInput
                    name={"Meal"}
                    selected={true}
                    input={tuesdayL}
                    setInput={settuesdayL}
                    data={userData?.saveMealData}
                  />
                </td>
              )}
              {edit ? (
                <td>
                  {userData.weekPlan
                    ? userData?.weekPlan?.Tuesday?.dinner?.dish
                    : weekPlan?.Tuesday?.dinner?.dish}
                </td>
              ) : (
                <td>
                  {" "}
                  <MealInput
                    name={"Meal"}
                    selected={true}
                    input={tuesdayD}
                    setInput={settuesdayD}
                    data={userData?.saveMealData}
                  />
                </td>
              )}
            </tr>
            <tr>
              <td>Wednesday</td>
              {edit ? (
                <td>
                  {userData.weekPlan
                    ? userData?.weekPlan?.Wednesday?.breakfast?.dish
                    : weekPlan?.Wednesday?.breakfast?.dish}
                </td>
              ) : (
                <td>
                  {" "}
                  <MealInput
                    name={"Meal"}
                    selected={true}
                    input={wednesdayB}
                    setInput={setwednesdayB}
                    data={userData?.breakFast}
                  />
                </td>
              )}
              {edit ? (
                <td>
                  {userData.weekPlan
                    ? userData?.weekPlan?.Wednesday?.lunch?.dish
                    : weekPlan?.Wednesday?.lunch?.dish}
                </td>
              ) : (
                <td>
                  {" "}
                  <MealInput
                    name={"Meal"}
                    selected={true}
                    input={wednesdayL}
                    setInput={setwednesdayL}
                    data={userData?.saveMealData}
                  />
                </td>
              )}
              {edit ? (
                <td>
                  {userData.weekPlan
                    ? userData?.weekPlan?.Wednesday?.dinner?.dish
                    : weekPlan?.Wednesday?.dinner?.dish}
                </td>
              ) : (
                <td>
                  {" "}
                  <MealInput
                    name={"Meal"}
                    selected={true}
                    input={wednesdayD}
                    setInput={setwednesdayD}
                    data={userData?.saveMealData}
                  />
                </td>
              )}
            </tr>
            <tr>
              <td>Thursday</td>
              {edit ? (
                <td>
                  {userData.weekPlan
                    ? userData?.weekPlan?.Thursday?.breakfast?.dish
                    : weekPlan?.Thursday?.breakfast?.dish}
                </td>
              ) : (
                <td>
                  {" "}
                  <MealInput
                    name={"Meal"}
                    selected={true}
                    input={thursdayB}
                    setInput={setthursdayB}
                    data={userData?.breakFast}
                  />
                </td>
              )}

              {edit ? (
                <td>
                  {userData.weekPlan
                    ? userData?.weekPlan?.Thursday?.lunch?.dish
                    : weekPlan?.Thursday?.lunch?.dish}
                </td>
              ) : (
                <td>
                  {" "}
                  <MealInput
                    name={"Meal"}
                    selected={true}
                    input={thursdayL}
                    setInput={setthursdayL}
                    data={userData?.saveMealData}
                  />
                </td>
              )}
              {edit ? (
                <td>
                  {userData.weekPlan
                    ? userData?.weekPlan?.Thursday?.dinner?.dish
                    : weekPlan?.Thursday?.dinner?.dish}
                </td>
              ) : (
                <td>
                  {" "}
                  <MealInput
                    name={"Meal"}
                    selected={true}
                    input={thursdayD}
                    setInput={setthursdayD}
                    data={userData?.saveMealData}
                  />
                </td>
              )}
            </tr>
            <tr>
              <td>Friday</td>
              {edit ? (
                <td>
                  {userData.weekPlan
                    ? userData?.weekPlan?.Friday?.breakfast?.dish
                    : weekPlan?.Friday?.breakfast?.dish}
                </td>
              ) : (
                <td>
                  {" "}
                  <MealInput
                    name={"Meal"}
                    selected={true}
                    input={fridayB}
                    setInput={setfridayB}
                    data={userData?.breakFast}
                  />
                </td>
              )}
              {edit ? (
                <td>
                  {userData.weekPlan
                    ? userData?.weekPlan?.Friday?.lunch?.dish
                    : weekPlan?.Friday?.lunch?.dish}
                </td>
              ) : (
                <td>
                  {" "}
                  <MealInput
                    name={"Meal"}
                    selected={true}
                    input={fridayL}
                    setInput={setfridayL}
                    data={userData?.saveMealData}
                  />
                </td>
              )}
              {edit ? (
                <td>
                  {userData.weekPlan
                    ? userData?.weekPlan?.Friday?.dinner?.dish
                    : weekPlan?.Friday?.dinner?.dish}
                </td>
              ) : (
                <td>
                  {" "}
                  <MealInput
                    name={"Meal"}
                    selected={true}
                    input={fridayD}
                    setInput={setfridayD}
                    data={userData?.saveMealData}
                  />
                </td>
              )}
            </tr>
            <tr>
              <td>Saturday</td>
              {edit ? (
                <td>
                  {userData.weekPlan
                    ? userData?.weekPlan?.Saturday?.breakfast?.dish
                    : weekPlan?.Saturday?.breakfast?.dish}
                </td>
              ) : (
                <td>
                  {" "}
                  <MealInput
                    name={"Meal"}
                    selected={true}
                    input={saturdayB}
                    setInput={setsaturdayB}
                    data={userData?.breakFast}
                  />
                </td>
              )}
              {edit ? (
                <td>
                  {userData.weekPlan
                    ? userData?.weekPlan?.Saturday?.lunch?.dish
                    : weekPlan?.Saturday?.lunch?.dish}
                </td>
              ) : (
                <td>
                  {" "}
                  <MealInput
                    name={"Meal"}
                    selected={true}
                    input={saturdayL}
                    setInput={setsaturdayL}
                    data={userData?.saveMealData}
                  />
                </td>
              )}
              {edit ? (
                <td>
                  {userData.weekPlan
                    ? userData?.weekPlan?.Saturday?.dinner?.dish
                    : weekPlan?.Saturday?.dinner?.dish}
                </td>
              ) : (
                <td>
                  {" "}
                  <MealInput
                    name={"Meal"}
                    selected={true}
                    input={saturdayD}
                    setInput={setsaturdayD}
                    data={userData?.saveMealData}
                  />
                </td>
              )}
            </tr>
            <tr>
              <td>Sunday</td>
              {edit ? (
                <td>
                  {userData.weekPlan
                    ? userData?.weekPlan?.Sunday?.breakfast?.dish
                    : weekPlan?.Sunday?.breakfast?.dish}
                </td>
              ) : (
                <td>
                  {" "}
                  <MealInput
                    name={"Meal"}
                    selected={true}
                    input={sundayB}
                    setInput={setsundayB}
                    data={userData?.breakFast}
                  />
                </td>
              )}

              {edit ? (
                <td>
                  {userData.weekPlan
                    ? userData?.weekPlan?.Sunday?.lunch?.dish
                    : weekPlan?.Sunday?.lunch?.dish}
                </td>
              ) : (
                <td>
                  {" "}
                  <MealInput
                    name={"Meal"}
                    selected={true}
                    input={sundayL}
                    setInput={setsundayL}
                    data={userData?.saveMealData}
                  />
                </td>
              )}
              {edit ? (
                <td>
                  {userData.weekPlan
                    ? userData?.weekPlan?.Sunday?.dinner?.dish
                    : weekPlan?.Sunday?.dinner?.dish}
                </td>
              ) : (
                <td>
                  {" "}
                  <MealInput
                    name={"Meal"}
                    selected={true}
                    input={sundayD}
                    setInput={setsundayD}
                    data={userData?.saveMealData}
                  />
                </td>
              )}
            </tr>
          </tbody>
        </table>

        {/* <table id="download-container">
  <thead>
    <tr>
      <th>Day</th>
      <th>Breakfast</th>
      <th>Lunch</th>
      <th>Dinner</th>
    </tr>
  </thead>
  <tbody>
    ${Object.entries(weekPlan).map(([day, meals]) => (
    <tr key={day}>
      <td>${day}</td>
      ${Object.entries(meals).map(([meal, dishData]) => (
      <td>
        {edit ? (
          <td>
            {userData.weekPlan
              ? userData?.weekPlan[day][meal]?.dish
              : weekPlan[day][meal]?.dish}
          </td>
        ) : (
          <td>
            <MealInput
              name={"Meal"}
              selected={true}
              input={getMealInput(day, meal)}
              setInput={setMealInput(day, meal)}
              data={getUserData(day, meal)}
            />
          </td>
        )}
      </td>
      ))}
    </tr>
    ))}
  </tbody>
</table> */}

        {/* Update meal button */}
        <Button
          sx={{
            display: edit ? "none" : "block",
            margin: "auto",
            bgcolor: SecondaryColor,
            color: textColor,
          }}
          onClick={() => {
            updateMealPlan();
          }}
        >
          save
        </Button>
      </Box>

      {/* Grocery List Table */}
      <Box
        sx={{
          background: "white",
          position: "absolute",
          top: "150px",
          width: "100%",
          height: { xs: "700px", sm: "300px" },
          display: groceryShow ? "block" : "none",
        }}
      >
        <table id="download-container">
          {/* close button */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              position: "absolute",
              top: "0px",
              right: "0px",
              gap: "1px",
            }}
          >
            <IconButton
              onClick={() => {
                SetGroceryShow(false);
              }}
              aria-label="share"
              sx={{}}
            >
              <CancelIcon sx={{ color: textColor }} />
            </IconButton>
          </Box>

          <thead>
            <tr>
              <th>Day</th>
              <th>Breakfast</th>
              <th>Lunch</th>
              <th>Dinner</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(weekPlan).map((day) => (
              <tr key={day}>
                <td>{day}</td>
                {["breakfast", "lunch", "dinner"].map((meal) => (
                  <td key={meal}>
                    {userData?.weekPlan?.[day]?.[meal]?.mainIng ||
                      weekPlan[day]?.[meal]?.mainIng}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Box>

      {/* Unique Grocery List */}
      <Box
        sx={{
          position: "absolute",
          background: "white",
          width: "100%",
          height: "100vh",
          top: "98px",
          display: groceryShowunique ? "block" : "none",
        }}
      >
        {/* close button */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            position: "absolute",
            top: "0px",
            right: "0px",
            gap: "1px",
          }}
        >
          <IconButton
            onClick={() => {
              SetGroceryShowunique(false);
            }}
            aria-label="share"
            sx={{}}
          >
            <CancelIcon sx={{ color: textColor }} />
          </IconButton>
        </Box>
        
      <div class="list-container" >
    <ul class="list">
      {uniqueGroceries.map((item)=>(
      <li class="list-item">{item}</li>
      ))}
    </ul>
  </div>

      </Box>

      {/* edit icon */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          position: "absolute",
          top: "60px",
          right: "10px",
          gap: "1px",
        }}
      >
        <IconButton
          onClick={() => {
            setEdit(false);
            !userData?.weekPlan ? saveMealPlan("data") : abc();
          }}
          aria-label="share"
          sx={{}}
        >
          <EditIcon sx={{ color: textColor }} />
        </IconButton>
        <span style={{ fontSize: "15px" }}>Edit</span>
      </Box>

      {/* Grocery list icon */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          position: "absolute",
          top: "60px",
          right: { sm: "100px", xs: "80px" },
          gap: "1px",
        }}
      >
        <IconButton
          onClick={() => {
            SetGroceryShow(true);
          }}
          aria-label="share"
          sx={{}}
        >
          <LocalGroceryStoreIcon sx={{ color: textColor }} />
        </IconButton>
        <span style={{ fontSize: "15px" }}>Grocery</span>
      </Box>

      {/*Unique Grocery list icon */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          position: "absolute",
          top: "60px",
          right: { sm: "215px", xs: "180px" },
          gap: "1px",
        }}
      >
        <IconButton
          onClick={() => {
            SetGroceryShowunique(true);
          }}
          aria-label="share"
          sx={{}}
        >
          <LocalGroceryStoreIcon sx={{ color: textColor }} />
        </IconButton>
        <span style={{ fontSize: "15px" }}>Unique Grocery List</span>
      </Box>

      {/* Bottom navbar */}
      <Box
        sx={{
          display: "flex",
          gap: { sm: "10px", xs: "3px" },
          flexWrap: "wrap",
          position: "fixed",
          zIndex: 999,
          bottom: "0px",
          width: "100%",
          padding: "8px",
          justifyContent: "center",
          backgroundColor: BottomNavbaarColor,
        }}
      >
        <MuiButton setSelectedIndex={setFamyly} selectedIndex={family} />
        {/* <JsonToCsv mealData={mealList} /> */}
        <BUTTON onClick={saveMealPlan}>Change Meal</BUTTON>
        <div>
          {/* Download File */}
          <BUTTON onClick={handleDownload}>Download PDF</BUTTON>
        </div>
      </Box>
    </Box>
  );
}

export default MealCalender;
