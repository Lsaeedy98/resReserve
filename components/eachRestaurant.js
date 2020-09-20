import React, { Component } from 'react';
import {StyleSheet ,AsyncStorage, Image, TouchableOpacity, View, SafeAreaView,Button} from 'react-native';
//import FitImage from 'react-native-fit-image';
import {Content,Text, Icon , Item , Label,Card,CardItem,Body} from 'native-base';
import axios from 'axios';
export default class Resto extends Component{
    constructor(props){
        super(props);
        this.state={
            isLoading:false,    
            rest:[],
            restId:'1',
            LoggedIn: false , 
            userEmail : "no user",
            Default_Rating:0,
            Max_Rating:5
        }
        this.star="./img/full_star.png";
        this.star_with_border="./img/border_star.png";
        //this.loadData
        /*

        
                <Text>به این رستوران امتیاز دهید:</Text>
                <View style={styles.childView}>
                    { React_Native_Rating_Bar}
                </View>
                <Button  title="  ثبت امتیاز  " color="#3fbf9d" onPress={() => {this.sendRating()}}/>
               
        */
    }

    
    
      loadData(){
      //
        
      }


    UpdateRating(key){
        this.setState({Default_Rating:key})
    }
    sendRating(){
        axios.post("http://192.168.1.107/restaurant/setRate.php", {
            rating: this.state.Default_Rating,
            ID:this.state.restId
        }).then(response => {
            if(response.data.message == "success"){
                
                alert("امتیاز شما ثبت شد");
                
            }
            else if(response.data.message == "failure"){
                alert("لطفا بعدا دوباره تلاش کنید");
            }  
            else{
                alert(response.data.message);
            }
        });
        
    }
    componentDidMount(){
        AsyncStorage.getItem('LoggedIn').then(value => {
            this.setState({LoggedIn : value});
        });
        AsyncStorage.getItem('userEmail').then(value => {
            this.setState({userEmail : value})
        })
        const Id =this.props.navigation.getParam('restId', '1');
        this.setState({restId : Id})
        axios.post("http://192.168.1.107/restaurant/eachRestaurant.php", {
            id: Id
        })
        .then(response => {
            this.setState({
                //add another image to resto for tables
                rest:response.data,
                
            });
        });
    }

    showRestaurant(){
        let React_Native_Rating_Bar=[];
        for(var i=1 ; i <= this.state.Max_Rating ; i++)
        {
            React_Native_Rating_Bar.push(
                <TouchableOpacity
                key={i}
                activeOpacity={0.7}
                onPress={this.UpdateRating.bind(this,i)}>
             

                    <Image
                        style={styles.ImageStyle}
                        source={(i<=this.state.Default_Rating)? 
                            require('./img/full_star.png'):
                            require('./img/border_star.png')}
                    />
                </TouchableOpacity>
            )
            
        }
        return this.state.rest.map( restaurant =>
            <Content style={{ padding: 12 }}>
            <View style={{alignItems:"center", justifyContent: 'center'}}>
            <Card style={{alignItems:"center" }}>
                <CardItem cardBody style={{flex:1,  flexDirection: 'column',}}>
                <Image source={{ uri: "http://192.168.1.107/resReserve/assets/img/restos/"+restaurant.image }}  style={{ width: 200, height: 200, borderRadius: 20}}/>
               
                </CardItem>
                <CardItem>
                <Body style={{alignItems:"center",flex:1}}>
                   
                    <Text style={{fontSize:20, fontFamily: "Sp_Soroosh"}}>{restaurant.name}{"\n"}</Text>
                    <Text style={{fontSize:20, fontFamily: "Sp_Soroosh"}}>تلفن: {restaurant.phone}{"\n"}</Text>
                    <Text style={{fontSize:20, fontFamily: "Sp_Soroosh"}}>آدرس: {restaurant.address}{"\n"}</Text>
                    <View style={[{width:"100%"}]}>
                    <Button  title="رزرو "  color="#B84B3D" onPress={() => {
                        this.props.navigation.navigate('رزرو', {restId: this.state.restId })}}/>
                    </View>
                </Body>
                </CardItem>
            </Card>
            </View>
            </Content>    
           
        );
    }
    render(){
        
        return(
            <SafeAreaView style={{flex:1, /*backgroundColor: '#D29B79',*/flexDirection:"column" , justifyContent:"center"}} >
                {this.showRestaurant()}
            </SafeAreaView>
        );
    }
    

}


const styles = StyleSheet.create({
    registerBtn: {
          
          width: null,
          marginTop: 5,
          marginLeft: 12,
          height: 48,
          backgroundColor: '#B84B3D'
      } ,

      container: {
          justifyContent: 'center',
          alignItems: 'center'
      },
      ImageStyle: {
          width: 40,
          height: 40,
          resizeMode: 'cover',
          marginTop:15
      },
      childView: {
          flexDirection: 'row',
          justifyContent: 'center'
      },
      textStyle: {
          textAlign: 'center',
          fontSize: 23,
          color: '#000',
          marginTop: 15,
          marginBottom: 15
      },
      registerCard : {
        alignItems: 'center',
        padding: 10,
        marginTop:10,
                borderTopRightRadius: 50,
        backgroundColor: '#817A7A'}

  
  })