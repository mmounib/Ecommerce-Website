import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './Style/App.css'
import Accessories from './Pages/Category/Accessories'
import Clothes from './Pages/Category/Clothes'
import Electronics from './Pages/Category/Electronics'
import Kids from './Pages/Category/Kids'
import CategoryLayout from './Pages/CategoryLayout'
import ErrorPage from './Pages/ErrorPage'
import Home from './Pages/Home/Home'
import Logout from './Pages/Logout/Logout'
import MainLayout from './Pages/MainLayout'
import Payment from './Pages/Payment/Payment'
import Product from './Pages/Product/Product'
import Sign from './Pages/Sign/Sign'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign" element={<Sign />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route element={<MainLayout />} >
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<CategoryLayout />} >
            <Route index element={<Kids />} />
            <Route path="kids" element={<Kids />} />
            <Route path="accessories" element={<Accessories />} />
            <Route path="electronics" element={<Electronics />} />
            <Route path="clothes" element={<Clothes />} />
          </Route>
          <Route path="/product" element={<Product />} >
            <Route path=':id' element={<Product />} />
          </Route>
          <Route path="/payment" element={<Payment />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
