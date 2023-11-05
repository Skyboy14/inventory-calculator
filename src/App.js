import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux'; // Import Provider to connect Redux to React
import store from '../src/Redux/store'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from "./Containers/LoginPage";
import ReactDOM from "react-dom/client";
import UpdateScreen from "./Containers/UpdateScreen";
import HomePageNav from "./Containers/Header";
import CalulatorScreen from "./Containers/CalulatorScreen";
import UserMaster from "./Containers/UserMaster";
import TestComponent from './Redux/TestComponent'
import axios from "axios";
import { useState } from "react";
import ResetPassword from "./Containers/ResetPassword";



export default function App() {
  const [createUtility, setCreateUtility] = useState(true)

  const apiUrl = process.env.REACT_APP_API_URL

  if (createUtility) {
    axios.post(`${apiUrl}/utility`)
      .then((data) => data.data.status === 'N', setCreateUtility(false))
      .catch((err) => err)
  }


  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePageNav />}>
              <Route index element={<LoginPage />} />
              <Route path="/Calculator" element={<CalulatorScreen />} />
              <Route path="/UpdateScreen" element={<UpdateScreen />} />
              <Route path="/UserMaster" element={<UserMaster />} />
              <Route path="/forgot-password" element={<ResetPassword />} />
              <Route path="/test" element={<TestComponent />} />
              <Route path="*" element={<LoginPage />} />
            </Route>
          </Routes>
        </BrowserRouter >
      </Provider>
      <div className="Footer">@ Build by Akash Yadav</div>
    </>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
