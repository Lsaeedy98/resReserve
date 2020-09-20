
import React,{Component}  from 'react';
import {AppRegistry,StyleSheet,TextInput, SafeAreaView,Button,AsyncStorage}from 'react-native';
import {View ,Text,Content,Card,Item,Input} from 'native-base';
import Axios from 'axios';

export default class Register extends Component{

    constructor(props){
        super(props)
        this.state={
          LoggedIn:"false",
            userName:"",
            userEmail:"",
            userPassword:"",
            userPhone:""
        }
    }

    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }
    
      registerUser = () => {
        if(this.state.email === "" && this.state.password === "") {
          alert('اطلاعاتی برای ثبت نام وارد نکرده اید!')
        } else {
          //check register success 
          Axios.post('http://192.168.1.107/restaurant/register.php', 
          {   name:this.state.userName,
              email:this.state.userEmail,
              password:this.state.userPassword,
              phone:this.state.userPhone} ).then(response=>{
                   this.setState({
                      userName:"",
                      userEmail:"",
                      userPassword:"",
                      userPhone:"", })
                      this.props.navigation.navigate( "ورود", {})
                      /*
                      if(response.data.message == "register success"){
                        AsyncStorage.setItem('LoggedIn' , "true");
                        AsyncStorage.setItem('userEmail' , response.data.userEmail);
                        this.setState({
                            LoggedIn : "true" , 
                            userEmail : response.data.userEmail,
                        });
                        alert("ثبت نام با موفقیت انجام شد");
                        this.props.navigation.navigate( "پروفایل", {})
                    }
                    else{
                      alert(response.data.message);
                      
                    } */

            });
                      
                 









/*          this.setState({
            isLoading: true,
          })
          firebase
          .auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then((res) => {
            res.user.updateProfile({
              displayName: this.state.displayName
            })
            console.log('User registered successfully!')
            this.setState({
              isLoading: false,
              displayName: '',
              email: '', 
              password: ''
            })
            this.props.navigation.navigate('Login')
          })
          .catch(error => this.setState({ errorMessage: error.message }))      */
        }
      }
    render() {
        return (
         <SafeAreaView style={styles.container}> 
             <TextInput
            style={styles.inputStyle}
            placeholder="نام"
            value={this.state.userName}
            onChangeText={(val) => this.updateInputVal(val, 'userName')}      
            />
            <TextInput
            style={styles.inputStyle}
            placeholder="ایمیل"
            value={this.state.userEmail}
            onChangeText={(val) => this.updateInputVal(val, 'userEmail')}
            />
            <TextInput
            style={styles.inputStyle}
            placeholder="رمز عبور"
            value={this.state.userPassword}
            onChangeText={(val) => this.updateInputVal(val, 'userPassword')}
            maxLength={15}
            secureTextEntry={true}
            />   
            <TextInput
            style={styles.inputStyle}
            placeholder="شماره تلفن"
            value={this.state.userPhone}
            onChangeText={(val) => this.updateInputVal(val, 'userPhone')}
            /> 
            <Button
            color="#B84B3D"
            title="ثبت نام"
            onPress={() => this.registerUser()}
            />

                               

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
        borderColor: "#817A7A",
        textAlign:"right",
        borderBottomWidth: 1
      },
      loginText: {
        color: '#3740FE',
        marginTop: 25,
        textAlign: 'center'
      },

})

