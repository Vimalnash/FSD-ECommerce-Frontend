// import React from 'react';
import './App.css';
import HomePage from './Pages/HomePage';
import { RegisterPage } from './Pages/RegisterPage';
import { LoginPage } from './Pages/LoginPage';
import { UserActivateVerifyLinkPage } from './Pages/UserActivateVerifyLinkPage';
import { ResetPassVerifyLinkPage } from './Pages/ResetPassVerifyLinkPage';
import { ResetPasswordPage } from './Pages/ResetPasswordPage';
import { NewPasswordSetPage } from './Pages/NewPasswordSetPage';
import { Route, Routes } from 'react-router-dom';
import { Loader } from './Components/Loader';
import { useAppContext } from './Context/AppContext';
import { ItemDetail } from './Components/ItemDetail';
import { ItemsCart } from './Pages/ItemsCart';

const App = () => {
  const {theme, LoadingTrue, setLoadingTrue} = useAppContext();

  setTimeout(() => {
    setLoadingTrue(false);
  },2000)

  return (
    <>
      <div>
        {
          LoadingTrue ?
          (
            <Loader />
          )
          :
          (
          <div>
            <Routes>
              <Route exact path='/' element={<HomePage />} />
              <Route path="/items/:id" element={<ItemDetail />} />
              <Route path="/items/cart" element={<ItemsCart />} />

              <Route path="/signup" element={<RegisterPage />} />
              <Route path="/useractivation" element={<UserActivateVerifyLinkPage />} />
              
              <Route path="/login" element={<LoginPage />} />

              <Route path="/resetpassword" element={<ResetPasswordPage />} />
              <Route path="/resetpasswordlink" element={<ResetPassVerifyLinkPage />} />
              <Route path="/newpassword" element={<NewPasswordSetPage />} />
            </Routes>
          </div>
          )
        }
      </div>
    </>
  )
}

export default App
