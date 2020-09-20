
import React,{Component}  from 'react';
import {AppRegistry,StyleSheet,TextInput,AsyncStorage,SafeAreaView,Button,Image}from 'react-native';
import {View,Text,Input,Container,Content ,Card, Item} from 'native-base';
import Axios from 'axios';
export default class Profile extends Component{
    
    constructor(props){
        super(props)
        this.state={
            userEmail:"",
            userPassword:"",
            LoggedIn:"false"
        }
    }

    componentDidMount(){
       AsyncStorage.getItem("LoggedIn").then(value => {
            this.setState({LoggedIn : value});
             
        });
        AsyncStorage.getItem("userEmail").then(value => {
            this.setState({ userEmail: value });
        });
        
    }
    
    logout = () =>{
        AsyncStorage.setItem('LoggedIn' , "false");
        AsyncStorage.setItem('userEmail' ,"");
        this.setState({
            LoggedIn : "false" , 
            userEmail:"",
            userPassword:""
        })
        this.props.navigation.navigate( "ورود", {})
    }
    render(){
        
      /*  if(this.state.LoggedIn=="true"){
        }
        else{
        return(
            <SafeAreaView style={styles.container} >
                    <Image
                        style={styles.ImageStyle}
                        source={  require('./img/profile.png')}
                    />
                        <Item inlineLabel style={styles.inputStyle} > 
                            <Text style={styles. textStyle} >لطفا ابتدا وارد صفحه کاربری خود شوید</Text>
                           
                        </Item>
                        <Button   color="#B84B3D" title="ورود "  onPress={()=>this.props.navigation.navigate( "ورود", {})}/>
                </SafeAreaView> );
        }*/
        return (
                <SafeAreaView style={styles.container}>
                    <Item inlineLabel style={styles.inputStyle} > 
                        <Text style={{ padding:20,}}>ایمیل شما:                   {this.state.userEmail}</Text>
                    </Item>
                    <Button  color="#B84B3D" title="خروج"  onPress={()=>this.logout()}/>
                    <Text></Text>
                    <Button   color="#B84B3D" title="رزرو هاي من "  onPress={()=>this.props.navigation.navigate("رزرو های من", {userEmail:this.state.userEmail})}/>
                    
                </SafeAreaView>    
            
        );
       
    }
    
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 35,
        backgroundColor: '#fff'
      },
      inputStyle: {
        width: '100%',
        marginBottom: 15,
        paddingBottom: 15,
        alignSelf: "center",
        borderColor: "#CA0000",
        textAlign:"right",
        borderBottomWidth: 1
      },
      loginText: {
        color: '#3740FE',
        marginTop: 25,
        textAlign: 'right'
      },
    textStyle: {
        fontSize: 20,
        textAlign: 'center'
    },
    ImageStyle: {
        width: 80,
        height: 80,
        resizeMode: 'cover',
        margin:15,
        borderRadius: 50,
        alignSelf: "center",
        borderColor: '#B84B3D'
    },

})