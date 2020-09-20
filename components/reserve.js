
import React,{Component}  from 'react';
import {TextInput,AsyncStorage,StyleSheet,Dimensions,SafeAreaView,Button,Image}from 'react-native';
import {View ,Text,Input,Content,Card, Item,Picker, Right} from 'native-base';
import Axios from 'axios';
//import { PersianCalendarPicker } from 'react-native-persian-calendar-picker';
export default class Reserve extends Component{

    constructor(props){
        super(props)
        this.state={
            daySelection:'',
            monthSelection:'',
            yearSelection:'',
            timeSelection:'',
            tableSelection:'',
            numOfTables:'',
            LoggedIn:"false",
            userEmail:""
        }
  //      this.onDateChange = this.onDateChange.bind(this);
    }
/*    onDateChange(date){
        this.setState({date:date})
    }*/
    componentDidMount(){
        
        AsyncStorage.getItem('LoggedIn').then(value => {
            this.setState({LoggedIn : value});
        });
        AsyncStorage.getItem('userEmail').then(value => {
            this.setState({userEmail : value})
        });
    }
    updateInputVal = (prop, val) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
      //  this.setState({monthSelection: prop, } );
      }
      updateInput = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
      }

    reserve = () =>{
        const { navigation } = this.props;
        const Id = navigation.getParam('restId', '1');
        Axios.post('http://192.168.1.107/restaurant/reserve.php', 
                {userEmail:this.state.userEmail,
                restId:Id,    
                day:this.state.daySelection,
                month:this.state.monthSelection,
                year:this.state.yearSelection,
                time:this.state.timeSelection,
                table:this.state.tableSelection,
                numOfTables:this.state.numOfTables} ).then( response=>
                    this.setState({
                        daySelection:'',
                        monthSelection:'',
                        yearSelection:'',
                        timeSelection:'',
                        tableSelection:'',
                        numOfTables:''})
                                                    );

    }
    render() {
        if(this.state.LoggedIn=="true"){
        return (
            <SafeAreaView style={styles.container} >
                
               <Text >لطفا اطلاعات رزرو را وارد نماييد:</Text>
                <Picker
                    mode="dropdown"
                    note={true}
                   itemTextStyle={{ textAlign:"right"}}
                    selectedValue={this.state.daySelection}
                    onValueChange={this.updateInputVal.bind(this,'daySelection')}
                    >
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                    <Picker.Item label="7" value="7" />
                    <Picker.Item label="8" value="8" />
                    <Picker.Item label="9" value="9" />
                    <Picker.Item label="10" value="10" />
                    <Picker.Item label="11" value="11" />
                    <Picker.Item label="12" value="12" />
                    <Picker.Item label="13" value="13" />
                    <Picker.Item label="14" value="14" />
                    <Picker.Item label="15" value="15" />
                    <Picker.Item label="16" value="16" />
                    <Picker.Item label="17" value="17" />
                    <Picker.Item label="18" value="18" />
                    <Picker.Item label="19" value="19" />
                    <Picker.Item label="20" value="20" />
                    <Picker.Item label="21" value="21" />
                    <Picker.Item label="22" value="22" />
                    <Picker.Item label="23" value="23" />
                    <Picker.Item label="24" value="24" />
                    <Picker.Item label="25" value="25" />
                    <Picker.Item label="26" value="26" />
                    <Picker.Item label="27" value="27" />
                    <Picker.Item label="28" value="28" />
                    <Picker.Item label="29" value="29" />
                    <Picker.Item label="30" value="30" />
                    <Picker.Item label="31" value="31" />
                    </Picker>
                
                    <Picker
                    mode="dropdown"
                   // note={false}
                    selectedValue={this.state.monthSelection}
                    onValueChange={this.updateInputVal.bind(this,'monthSelection')}
                    >
                    <Picker.Item label="فروردین" value="1" />
                    <Picker.Item label="اردیبهشت" value="2" />
                    <Picker.Item label="خرداد" value="3" />
                    <Picker.Item label="تیر" value="4" />
                    <Picker.Item label="مرداد" value="5" />
                    <Picker.Item label="شهریور" value="6" />
                    <Picker.Item label="مهر" value="7" />
                    <Picker.Item label="آبان" value="8" />
                    <Picker.Item label="آذر" value="9" />
                    <Picker.Item label="دی" value="10" />
                    <Picker.Item label="بهمن" value="11" />
                    <Picker.Item label="اسفند" value="12" />
                    </Picker>
 

                <Picker
                    mode="dropdown"
                    note={false}
                    selectedValue={this.state.yearSelection}
                    onValueChange={this.updateInputVal.bind(this,'yearSelection')}
                    >
                    <Picker.Item label="امسال" value="1399" />
                    
                    <Picker.Item label="سال دیگه!" value="1400" />
                    </Picker>
                    
                
                    <TextInput
                    style={styles.inputStyle}
                    placeholder="ساعت"
                    value={this.state.timeSelection}
                    onChangeText={(val) => this.updateInput(val, 'timeSelection')}
                    />
                    <TextInput
                    style={styles.inputStyle}
                    placeholder="تعداد میهمان ها"
                    value={this.state.numOfTables}
                    onChangeText={(val) => this.updateInput(val, 'numOfTables')}
                    />
                     <Text>{"\n"}توجه:هر رزرو به مدت دو ساعت می باشد{"\n"}</Text>
                    <Button  title="رزرو" color="#B84B3D" style={styles.registerBtn} onPress={()=>this.reserve()}/>
            </SafeAreaView>
                
        );}
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
  registerBtn: {
        
        width: null,
        borderRadius: 50,
        backgroundColor: '#B84B3D'
    } 

});
/*<View style={{ flexDirection: "row", width: '100%',}}>
                     
                     <TextInput
                     style={styles.inputStyle,{ width: '33%',}}
                     placeholder="/ سال"
                     value={this.state.yearSelection}
                     onChangeText={(val) => this.updateInputVal(val, 'yearSelection')}
                     />
                      <TextInput
                     style={styles.inputStyle,{ width: '33%',} }
                     placeholder="/  ماه"
                     value={this.state.monthSelection}
                     onChangeText={(val) => this.updateInputVal(val, 'monthSelection')}
                     />
                     <TextInput
                     style={styles.inputStyle,{ width: '33%',}}
                     placeholder="روز"
                     value={this.state.daySelection}
                     onChangeText={(val) => this.updateInputVal(val, 'daySelection')}
                     />
                 </View>*/