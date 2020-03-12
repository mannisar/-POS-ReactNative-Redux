import React from 'react'
import { createAppContainer } from 'react-navigation'
// import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { Provider } from 'react-redux'
// import ParallaxScrollView from 'react-native-parallax-scroll-view'


import store from './src/components/redux/store';
import LoginScreen from './src/auth/screen/LoginScreen'
import HomeScreen from './src/components/screen/Home/HomeScreen'

/* PRODUCT */
import ProductScreen from './src/components/screen/Product/ProductScreen'
import ProductAdd from './src/components/screen/Product/ProductAdd'
import ProductEdit from './src/components/screen/Product/ProductEdit'

/* CATEGORY */
import CategoryScreen from './src/components/screen/Category/CategoryScreen'
import CategoryAdd from './src/components/screen/Category/CategoryAdd'
import CategoryEdit from './src/components/screen/Category/CategoryEdit'

/* USER */
import UserScreen from './src/components/screen/User/UserScreen'
import UserAdd from './src/components/screen/User/UserAdd'
import UserEdit from './src/components/screen/User/UserEdit'

/* CART */
import CartScreen from './src/components/screen/Cart/CartScreen'
import HistoryScreen from './src/components/screen/Order/HistoryScreen'


const MyStackNavigator = createStackNavigator({
  Login: LoginScreen,
  Home: HomeScreen,
  Cart: CartScreen,
  History: HistoryScreen,

  /* PRODUCT */
  Product: ProductScreen,
  ProductAdd: ProductAdd,
  ProductEdit: ProductEdit,

  /* CATEGORY */
  Category: CategoryScreen,
  CategoryAdd: CategoryAdd,
  CategoryEdit: CategoryEdit,

  /* USER */
  User: UserScreen,
  UserAdd: UserAdd,
  UserEdit: UserEdit
})

const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: MyStackNavigator,
  },
  /* PRODUCT */
  Product: ProductScreen,
  // ProductAdd: ProductAdd,
  // ProductEdit: ProductEdit,

  /* CATEGORY */
  Category: CategoryScreen,
  // CategoryAdd: CategoryAdd,
  // CategoryEdit: CategoryEdit,

  /* USER */
  User: UserScreen,
  // UserAdd: UserAdd,
  // UserEdit: UserEdit

  /* LOGOUT */
  History: HistoryScreen,
  Login: LoginScreen
});

const AppContainer = createAppContainer(MyDrawerNavigator)

function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  )
}

export default App;