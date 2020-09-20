
import React,{Component}  from 'react';
import {AppRegistry,StyleSheet,TextInput,AsyncStorage,SafeAreaView,Button}from 'react-native';
import {View,Text,Input,Container,Content ,Card, Item} from 'native-base';
import Axios from 'axios';
export default class Login extends Component{

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
        if(this.state.LoggedIn == "true"){
            AsyncStorage.getItem("userEmail").then(value => {
                this.setState({ userEmail: value });
            });
        }
    }

    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
      }
      userLogin = () => {
        if(this.state.userEmail == "" && this.state.userPassword == "") {
          alert('اطلاعاتی برای ورود وارد نکرده اید!')
        } else {
            Axios.post('http://192.168.1.107/restaurant/login.php', 
            {   email:this.state.userEmail,
                password:this.state.userPassword,} ).then(response=>
                   { this.setState({
                        userEmail:'',
                        userPassword:'', 
                        })
                        if(response.data.message == "ورود موفق"){
                            AsyncStorage.setItem('LoggedIn' , "true");
                            AsyncStorage.setItem('userEmail' , response.data.userEmail);
                            this.setState({
                                LoggedIn : "true" , 
                                userEmail : response.data.userEmail,
                            });
                            alert("ورود با موفقیت انجام شد");
                            this.props.navigation.navigate( "پروفایل", {})
                            
                        }
                        else{
                            alert(response.data.message);
                        }   
                    })
   /*       this.setState({
            isLoading: true,
          })
          firebase
          .auth()
          .signInWithEmailAndPassword(this.state.email, this.state.password)
          .then((res) => {
            console.log(res)
            console.log('User logged-in successfully!')
            this.setState({
              isLoading: false,
              email: '', 
              password: ''
            })
            this.props.navigation.navigate('Dashboard')
          })
          .catch(error => this.setState({ errorMessage: error.message }))*/
        }
      } 
    render() {
    
        return (
          <SafeAreaView style={styles.container} >

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
          <Button
          color="#B84B3D"
          title="ورود"
          
          onPress={() => this.userLogin()}
          /> 
          <Text 
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate("ثبت نام", {})}>
          قبلا ثبت نام نکرده اید؟ از اینجا ثبت نام کنید
          </Text> 
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
        color: '#B84B3D',
        marginTop: 25,
        textAlign: 'right'
      },
    textStyle: {
        fontSize: 25,
        textAlign: 'center'
    }

})