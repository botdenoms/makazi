import { View, SafeAreaView, StyleSheet, ScrollView, Text, TextInput, Pressable } from 'react-native'
import CustomInput from '../components/CustomInput'

export default function Listing({navigation}) {
  return (
    <SafeAreaView>
        <View style={styles.body}>
            <View style={styles.appBar}>
              <Pressable onPress={()=> navigation.goBack()}>
                <View style={styles.icon}></View>
              </Pressable>
            </View>
            <ScrollView>
              <Text>Add Listing</Text>
              <Text>Location</Text>
              <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
                <TextInput placeholder='County'/>
                <TextInput placeholder='Address'/>
              </View>
              <View style={{height: 100, width: '100%', backgroundColor: 'red'}}></View>
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
              <CustomInput title='Rent/Cost' type={1}/>
              <Text>Availability</Text>
              <View style={{flexDirection: 'row'}}>
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
              <Pressable>
                  <View style={styles.button}>
                    <Text>Publish</Text>
                  </View>
              </Pressable>
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
  }
})