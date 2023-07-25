import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import ResetPassword from "./pages/ResetPassword"
import ForgotPassword from "./pages/ForgotPassword"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import UrlShortener from "./pages/UrlShortener"
import ViewShortUrl from "./pages/ViewShortUrl"




function App() {
  return(
    <BrowserRouter>
    <Routes>

      <Route path="/" Component={Register} />
      <Route path="/login" Component={Login} />
      <Route path="/forgot-password" Component={ForgotPassword} />
      <Route path="/api/v1/reset_password/:id/:token" Component={ResetPassword} />
      <Route path="/dashboard" Component={Dashboard} />
      <Route path="/UrlShortener" Component={UrlShortener} />
      <Route path="/:shortUrl" Component={ViewShortUrl} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
