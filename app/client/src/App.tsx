import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./Style/App.css";
import {
  Accessories, CategoryLayout, Clothes,
  Electronics, ErrorPage, Home,
  Kids, Logout, MainLayout,
  Payment, Product, SignIn, SignUp
} from "./exports";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<CategoryLayout />}>
            <Route index element={<Kids />} />
            <Route path="kids" element={<Kids />} />
            <Route path="accessories" element={<Accessories />} />
            <Route path="electronics" element={<Electronics />} />
            <Route path="clothes" element={<Clothes />} />
          </Route>
          <Route path="/product" element={<Product />}>
            <Route path=":id" element={<Product />} />
          </Route>
          <Route path="/payment" element={<Payment />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
