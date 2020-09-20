
import React,{Component}  from 'react';
import {AppRegistry,StyleSheet,TextInput,AsyncStorage,SafeAreaView,Button,Image,FlatList,
    TouchableOpacity,}from 'react-native';
import {View,Text,Input,Container,Content ,Card, Item} from 'native-base';
import Axios from 'axios';

import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
export default class MyReserve extends Component{

    constructor(props){
        super(props)
        this.state={
            userEmail:"",
            userPassword:"",
            LoggedIn:"false",
            reserves :[],
            tableHead: ['تاریخ', 'ساعت','تعداد میهمان ','رستوران']
            
        }
    }

    componentDidMount(){
       AsyncStorage.getItem("LoggedIn").then(value => {
            this.setState({LoggedIn : value});
            
            
        });
        const email =this.props.navigation.getParam('userEmail', '1');
        this.setState({userEmail : email});
        Axios.post("http://192.168.1.107/restaurant/profile.php", {useremail:email} )
        .then(response =>{
            this.setState({ reserves: response.data})
            }
        )

    }
    renderListHeader=()=>{
        return(
          <View   style={{
            flex: 1,
            flexDirection:"row",
            justifyContent: "space-around",
            alignItems: "center",
            alignSelf: "stretch",
            paddingVertical: 5,
            marginBottom: 5,
            borderRadius: 10,
            borderWidth:2,
            
          }}>
                       <Text > تاريخ </Text>
         <Text >  زمان  </Text>
         <Text >  تعداد  </Text>
         <Text > رستوران  </Text>
          </View>
        );
      }
      renderItem({item}){
        return(
            <View
            style={{
              flex: 1,
              flexDirection:"row",
              justifyContent: "space-around",
              alignItems: "center",
              alignSelf: "stretch",
              paddingVertical: 5,
              marginBottom: 5,
              borderRadius: 10,
              borderColor:"#FF7F50" ,
              borderWidth:2,
              
            }}
          >
         <Text >  {item.date}  </Text>
         <Text >  {item.time}  </Text>
         <Text >  {item.numOfTables}  </Text>
         <Button title="مشاهده "  onPress={() => this.props.navigation.navigate("هر رستوران",{restId:item.restId})}/>   
         </View>
        );
      }
    renderTablee (){
        return this.state.reserves.map(reserve => 
             <Row  data={[reserve.date ,reserve.time ,reserve.numOfTables,reserve.restId]} />
            
        );
    }
    render() {
        if(this.state.reserves.length == 0 ){
           
                return (
                    <SafeAreaView style={styles.container} >
                        <Image
                    style={styles.ImageStyle}
                    source={  require('../icon/reserve.png')}/>
                    <Text style={styles. textStyle} >شما رزروي نداريد</Text>
                </SafeAreaView>
                );
               
        }
         else{ 
            return(  
            <SafeAreaView>
                  <Image
                    style={styles.ImageStyle}
                    source={  require('../icon/reserve.png')}/>
            <Text style={{padding:20,marginTop:40,fontSize:20}}>رزروهای من:</Text>
                  
                     <FlatList 
                    data={this.state.reserves}
                        renderItem={({item})=> this.renderItem({item})}
                        ListHeaderComponent={this.renderListHeader}
                        />
        </SafeAreaView>
    );
            
        }
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
    },ImageStyle: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        margin:15,
        alignSelf: "center",
        borderColor: '#B84B3D'
    },

})