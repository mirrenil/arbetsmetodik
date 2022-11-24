import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./authContext";
import Layout from "./Layout";
import CategoryPage from "./Pages/CategoryPage";
import DetailPage from "./Pages/DetailPage";
import NewListingPage from "./Pages/NewListingPage";
import ProfilePage from "./Pages/ProfilePage";
import RequestsPage from "./Pages/RequestsPage";
import SignInPage from "./Pages/SignIn";
import SignUpPage from "./Pages/SignUp";
import StartPage from "./Pages/StartPage";

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<StartPage />} />
              <Route path="/detail/:id" element={<DetailPage />} />
              <Route path="/category/:d" element={<CategoryPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/profile/:id" element={<ProfilePage />} />
              <Route path="/newlisting" element={<NewListingPage />} />
              <Route path="/requests" element={<RequestsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
