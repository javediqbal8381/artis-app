import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import SignIn from './pages/SignIn';
import Products from './pages/Products';
import Shops from './pages/Shops';
import ShopDetails from './pages/ShopDetail';
import ProductDetail from './pages/productDetail';




function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/signup",
      element: <SignUp/>,
    },
    {
      path: "signin",
      element: <SignIn/>,
    },
    {
      path: "/about",
      element: <About/>,
    },
    {
      path: "/contact",
      element: <Contact/>,
    },
    {
      path: "/products",
      element: <Products/>,
    },
    {
      path: "/products/:productId",
      element: <ProductDetail/>,
    },
    {
      path: "/shops",
      element: <Shops/>,
    },
    {
      path: "/shops/:shopId",
      element: <ShopDetails/>,
    },
  ]);
 
  return (
    <div className='APP'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
