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
import CatagorizedProducts from './pages/catagorizedProducts';
import Checkout from './pages/Checkout';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import OrderCompletePage from './pages/OrderCompletePage';
import CreateShop from './pages/CreateShop';
import ProtectedRoutes from './components/ProtectedRoutes';




function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      element: <ProtectedRoutes />,
      children: [
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/products/:productId",
          element: <ProductDetail />,
        },
        {
          path: "/products/catagory/:catagory",
          element: <CatagorizedProducts />,
        },
        {
          path: "/shops",
          element: <Shops />,
        },
        {
          path: "/shops/:shopId",
          element: <ShopDetails />,
        },
        {
          path: "/checkout",
          element: <Checkout />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/payment",
          element: <Payment />,
        },
        {
          path: "/order-completed",
          element: <OrderCompletePage />,
        },
        {
          path: "/create-shop",
          element: <CreateShop />,
        },
      ]
    }
  ]);

  return (
    <div className='APP'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
