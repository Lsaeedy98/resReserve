

import React, { Component } from 'react';
import { View, Text,Dimensions,StyleSheet, ImageBackground,StatusBar,} from 'react-native';
import { Container, Content } from 'native-base';
class SplashScreen extends Component {

  render() {

    setTimeout(()=>{
        this.props.navigation.replace("دسته بندی");
    },3000)

    return (
        <Container style={styles.splashBackground}>
        <StatusBar
            hidden={true}
        />
        <Content style={styles.splashBackground}>
            <ImageBackground source={require('./back.jpg')} style={styles.splashBackground}>
                <Text style={styles.splashTitle}>رزرو آنلاین رستوران</Text>
            </ImageBackground>
        </Content>
    </Container>
    );
  }
}
const styles = StyleSheet.create({
  splashTitle : {
      fontFamily : "Lobster" , 
      width : "100%",
      fontSize : 35 ,
      textAlign : "center" , 
      color:'#B84B3D' , 
      marginTop : "130%"
  } , 
  splashBackground : {
      width : "100%" ,
      height: Dimensions.get('window').height
  }
})
export default SplashScreen;