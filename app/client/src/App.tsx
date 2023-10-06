import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./Style/App.css";
import {
  CategoryLayout, Category, ErrorPage,
  Home, Logout, MainLayout,
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
            <Route index element={<Category />} />
            <Route path="kids" element={<Category />} />
            <Route path="accessories" element={<Category />} />
            <Route path="electronics" element={<Category />} />
            <Route path="clothes" element={<Category />} />
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
