import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

//remove card if possible


import Login from "./components/login.js";
import Register from "./components/registeration.js";
import Profile from "./components/profile.js";
import Categories from "./components/categories.js";
import MainList from "./components/mainList.js";
import Resto from "./components/eachRestaurant.js";
import Reserve from "./components/reserve.js";
import MyReserve from "./components/myReserve.js";
import SplashScreen from "./components/splash.js";
const RestaurantsStack = createStackNavigator({
  "اسپلش":SplashScreen,
  "دسته بندی": Categories,
  "رستوران ها": MainList,
  "هر رستوران":Resto,
  "رزرو":Reserve,
});

const UserStack = createStackNavigator({
  
  "ورود":Login, 
  "پروفایل":Profile,
  "ثبت نام":Register,
  "رزرو های من":MyReserve, },
  );

const RootNavigator= createAppContainer(createBottomTabNavigator({
  "رستوران ها و دسته بندي": RestaurantsStack,
  "اطلاعات کاربری":UserStack,
},
{
  
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
    style: {
      borderColor:'tomato',
      padding:12,
    }
  }
  
}
));

export default RootNavigator ;