import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import UserContextProvider from "./UserContext";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;

function App() {
    return (
        <UserContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<MainPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </UserContextProvider>
    );
}

export default App;
