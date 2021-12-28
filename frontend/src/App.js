import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'
// import Switch from 'react-bootstrap/esm/Switch';

import './App.css';
import Footer from './component/Footer';
import Header from './component/Header';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import CartScreen from './screens/CartScreen';
import NotFoundPage from './component/NotFoundPage';
import UserListScreen from './screens/UserListScreen';
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen';
import ProductAddScreen from './screens/ProductAddScreen';
import ShippingScreen from './screens/ShippingScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import PaymentScreen from './screens/PaymentScreen';
import OrderScreen from './screens/OrderScreen';
import OrderListScreen from './screens/OrderListScreen';
import WishListScreen from './screens/WishListScreen';
import StripePayment from './component/StripePayment';

// import ProductEditScreen from './screens/ProductEditScreen'

function App() {
  return (
    <Router>
      <Header />
        <main className='py-3'>
              <Container>
              <Switch>
                    <Route path='/' component={HomeScreen} exact />
                    <Route path='/product/:id' component={ProductScreen} />
                    <Route path='/login' component={LoginScreen} />
                    <Route path='/register' component={RegisterScreen} />
                    <Route path='/profile' component={ProfileScreen} />
                    <Route path='/cart' component={CartScreen} />
                    <Route path='/shipping' component={ShippingScreen} />
                    <Route path='/payment' component={PaymentScreen} />
                    <Route path='/placeorder' component={PlaceOrderScreen} />
                    <Route path='/admin/userlist' component={UserListScreen} />
                    <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
                    <Route path='/admin/add-product' component={ProductAddScreen} />
                    <Route path='/order/:id' component={OrderScreen} />
                    <Route path='/admin/orderlist' component={OrderListScreen} />
                    <Route path='/wishlist' component={WishListScreen} />

                    <Route
                      path='/admin/productlist'
                      component={ProductListScreen}
                      exact
                    />
                    <Route component={NotFoundPage} />

                    {/* <Route path='/privacy-policy' component={() => { 
                      window.location.href = 'https://stackoverflow.com/questions/42914666/react-router-external-link'; 
                      return null;
                  }}/> */}
              </Switch>
              </Container>
          </main>
      <Footer />
   </Router>
  );
}

export default App;
