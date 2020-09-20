import React ,{Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import{
  Button,
  Card,
  CardItem,
} from 'native-base';





class Categories extends Component{
    navigateToList(cat){
      this.props.navigation.navigate("رستوران ها", {category:cat });
    }
    render(){
      return(
        <SafeAreaView style={{flexDirection:"column" , justifyContent:"center"}} >
        <CardItem  style={{flexDirection:"row",marginTop:50}}>
        
            <TouchableOpacity
            style={styles.categoryCard} onPress={this.navigateToList.bind(this,1)} >
            <Image source={ require( './img/cafe.jpg') }  style={styles.categoryImage}/>
            <Text style={styles.categoryText}>کافه</Text>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.categoryCard} onPress={this.navigateToList.bind(this,2)}>
            <Image source={require( './img/italian.jpg')}  style={styles.categoryImage}/>
            <Text style={styles.categoryText}>رستوران ایتالیایی</Text>
          </TouchableOpacity>
  
          </CardItem>
  
          <CardItem style={{flexDirection:"row"}}>
        
        <TouchableOpacity style={styles.categoryCard} onPress={this.navigateToList.bind(this,3)}>
          <Image source={require( './img/fastfood.jpg')}  style={styles.categoryImage}/>
          <Text style={styles.categoryText}>فست فود</Text>
      </TouchableOpacity>
  
      <TouchableOpacity style={styles.categoryCard} onPress={this.navigateToList.bind(this,4)}>
        <Image source={require( './img/irani.jpg')}  style={styles.categoryImage}/>
        <Text style={styles.categoryText}>رستوران ایرانی</Text>
      </TouchableOpacity>
      
      </CardItem>
      </SafeAreaView>
      );
    }
  }
  const styles=StyleSheet.create({
    categoryCard:{
      flex:1,
      flexDirection:"column",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "stretch",
      margin:5,
      padding:5,
      borderRadius: 10,
     // borderColor:"#FF7F50",
      //borderWidth:1,
      elevation:0.3,
    },
    categoryImage:{
      width: 100,
       height: 100,
      borderRadius: 7,
    },
    categoryText:{
     // color:"#FF7F50",
      fontSize:15,
      paddingTop:5,
      alignContent:"center",
      //fontFamily:
    }
  }
  );

  export default Categories;