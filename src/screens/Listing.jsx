import { View, SafeAreaView, StyleSheet, ScrollView, Text, TextInput, Pressable } from 'react-native'
import CustomInput from '../components/CustomInput'

import { ChevronLeftIcon } from "react-native-heroicons/solid"

export default function Listing({navigation}) {
  return (
    <SafeAreaView>
        <View style={styles.body}>
            <View style={styles.appBar}>
              <Pressable onPress={()=> navigation.goBack()}>
                {/* <View style={styles.icon}></View> */}
                <ChevronLeftIcon size={28} color='#1e1e1e'/>
              </Pressable>
              <Text style={[{fontSize: 18}, styles.text]}>Add Listing</Text>
              <View style={{width: 28}}></View>
            </View>
            <ScrollView>
              <Text style={styles.text}>Description</Text>
              <TextInput style={styles.input} placeholder='Description'/>
              <Text style={styles.text}>Location</Text>
              <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                <TextInput style={styles.input} placeholder='County'/>
                <TextInput style={styles.input} placeholder='Address'/>
              </View>
              <View style={{height: 150, width: '100%', backgroundColor: 'red'}}></View>
              <View style={{justifyContent: 'center', alignItems:'center'}}>
                <Pressable>
                  <View style={styles.button}>
                    <Text>Upload image</Text>
                  </View>
                </Pressable>
              </View>
              <View style={{justifyContent: 'space-between', paddingHorizontal: 20, flexDirection: 'row'}}>
                <CustomInput title='Bedrooms' type={0}/>
                <CustomInput title='Bathrooms' type={0}/>
              </View>
              <View style={{justifyContent: 'center', alignItems:'flex-start', paddingHorizontal: 20}}>
                <CustomInput title='Rent/Cost' type={1}/>
              </View>
              <Text style={styles.text}>Availability</Text>
              <View style={{flexDirection: 'row', display: 'flex', justifyContent: 'space-between'}}>
                <Pressable>
                  <View style={styles.button}>
                    <Text>Available</Text>
                  </View>
                </Pressable>
                <Pressable>
                  <View style={styles.button}>
                    <Text>Un Available</Text>
                  </View>
                </Pressable>
              </View>
              <View style={{justifyContent: 'center', alignItems:'center'}}>
                <Pressable>
                    <View style={styles.button}>
                      <Text>Publish</Text>
                    </View>
                </Pressable>
              </View>
            </ScrollView>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  body:{
    width:'100%',
    height: '100%'
  },
  appBar:{
    height: 50,
    // backgroundColor: 'red',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  icon:{
    height: 28,
    width: 28,
    borderRadius: 14,
    backgroundColor: 'green'
  },
  button:{
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'grey',
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems:"center"
  },
  input:{
    height: 40,
    paddingLeft: 10,
    borderRadius: 5,
    borderColor: '#1e1e1e',
    borderWidth: 1,
    marginVertical: 5,
    marginHorizontal: 20
  },
  text:{
    paddingHorizontal: 20,
    fontSize: 16,
  }
})