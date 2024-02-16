
import { ForgotPassword } from '@/pages/auth/forgotPassword/ForgotPassword';
import { Login } from '@/pages/auth/login/Login';
import { Signup } from '@/pages/auth/signup/Signup';
import {Routes, Route} from 'react-router-dom'


export function AuthRouters() {
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Login />} />
        <Route path="/forgot-password" element={< ForgotPassword/>} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
  );
}