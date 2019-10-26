import { createStackNavigator } from 'react-navigation';
import Login from './pages/Login.js'
import Main from './pages/Home.js'
import User from './pages/CreateUser'

export default createStackNavigator({
    First:Login,
    Home:Main,
    Second:User,
}, {
    navigationOptions:{
        headerStyle:{
            backgroundColor: "#743B8C"
        },
        headerTintColor:"#000000"       
    },
});