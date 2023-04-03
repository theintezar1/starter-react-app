import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../../Pages/Login/Login";
import Form from "../../Pages/MealRequirementForm/Form";
import Signin from "../../Pages/signin/Signin";
import PreviewPage from "../previewPage/PreviewPage";
import { auth } from "../../firebase-config";
import MealData from "../../Pages/MealsDisplayData/MealData";
import Admin from "../../Pages/Admin/Admin";
import AllMealData from "../AdminComponents/AllMealData";
import MealCalender from "../../Pages/MealCalender/MealCalender";

function RouteComponent() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PreviewPage />} />
      <Route path="/login" element={<Login />} />
       <Route path="/signup" element={<Signin/>} />
        <Route path="/customer_requirements" element={<Form/>} />
        <Route path="/meal_list" element={<MealData/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/admin/all_meal" element={<AllMealData/>} />
        <Route path="/calender_of_meal" element={<MealCalender/>} />

        
      </Routes>
    </div>
  );
}

export default RouteComponent;
