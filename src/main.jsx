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
