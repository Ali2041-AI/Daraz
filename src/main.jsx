import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './store/store.js'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Account from './Pages/AccountPage.jsx'
import Store from './Pages/Store.jsx'
import LoginSignupPage from './Pages/LoginSignupPage.jsx'
import Signup from './Pages/Signup.jsx'
import Login from './Pages/Login.jsx'
import SellerCreation from './Pages/SellerCreation.jsx'
import StoreCreation from './Pages/StoreCreation.jsx'
import StoreDashboard from './Pages/StoreDashboard.jsx'
import PostProduct from './Pages/PostProduct.jsx'
import SearchedProducts from './Pages/SearchedProducts.jsx'
import ProductDisplay from './Pages/ProductDisplay.jsx'
import AddressPage from './Pages/AddressPage.jsx'
import AddressForm from './components/AddressForm.jsx'
import ProductQna from './Pages/ProductQnaPage.jsx'
import CartPage from './Pages/CartPage.jsx'
import CheckoutPage from './Pages/CheckoutPage.jsx'
import Orders from './Pages/Orders.jsx'
import Review from './Pages/Review.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import CategoriesPage from './Pages/Categories.jsx'
import CategoriesDisplay from './Pages/CategoriesDisplay.jsx'
import SellerOrder from './Pages/SellerOrder.jsx'
// import AddressPage from './Pages/AddressPage.jsx'



const route=createBrowserRouter([
  {path:'/',
   element:<App />,
   children:[
    {
      path:'/',
      element:<Home />
    },{
      path:'/searchProducts/:title',

      element:<SearchedProducts/>
    },
    {
      path:'/productDisplay/:productID',
      element:<ProductDisplay />

    },
    {
      path:'/product-qna/:productID',
      element:<ProductQna />
    },
    {
      path:'/addressPage',
      element:<AddressPage />
      ,children:[
        {
          path:"addressForm",
          element:<AddressForm />
        }
      ]
    },
    {
      path:"/review/:productID",
      element:<Review />

    },
    {
      path:'/category',
      element:<CategoriesPage />

    },
    {
      path:'/categories/:categoryName',
      element:<CategoriesDisplay />
    },
    {
      path:'/cart',
      element:<CartPage />
    },
    {
      path:'/checkout',
      element:<CheckoutPage />
    },
    {
      path:'orders',
      element:<Orders />
    },
    {
      path:'/account',
      element:<Account />,
      children:[
        {
          path:'loginSignup',
          element:<LoginSignupPage />,
          children:[
            {
              path:'signup',
              element:<Signup />

            },
            {
              path:'login',
              element:<Login />
            }
          ]
        }
        ,{
          path:'sellerCreation',
          element:<SellerCreation />
        }
        ,{
          path:'storeCreation',
          element:<StoreCreation />
        }
        ,{
          path:'storeDashboard',
          element:<StoreDashboard />,
          children:[
            {
              path:'postProduct',
              element:<PostProduct />
            }
            ,{
              path:'orders',
              element:<SellerOrder />
            }
          ]

        },
       


      ] 
    },
    {
      path:'/Store',
      element:<Store />
    }
    ,
   ]
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={route} />
  </Provider>,
)
