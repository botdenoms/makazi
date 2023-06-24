import { View, SafeAreaView, StyleSheet, ScrollView, Text, TextInput, Pressable, Image, ActivityIndicator } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import auth from '@react-native-firebase/auth'

import {launchImageLibrary} from 'react-native-image-picker'

import CustomInput from '../components/CustomInput'

import { ChevronLeftIcon } from "react-native-heroicons/solid"
import { useState } from 'react'

export default function Listing({navigation}) {

  const ref = firestore().collection('listings')
  const parent = storage().ref('/images/')

  const [descrip, setDescrip] = useState('')
  const [county, setCounty] = useState('')
  const [adress, setAdress] = useState('')
  const [bed, setBed] = useState(1)
  const [bath, setBath] = useState(0)
  const [rent, setRent] = useState(1)
  const [units, setUnits] = useState(1)
  const [images, setImages] = useState([])
  const [avail, setAvail] = useState(true)
  const [rental, setRental] = useState(true)
  const [geo, setGeo] = useState([])
  const [error, setError] = useState(false)
  const [emsg, setEmsg] = useState('')
  const [sucess, setSucess] = useState(false)
  const [smsg, setSmsg] = useState('')
  const [imagesCache, setImagesCache] = useState([])
  const [upLoading, setUploading] = useState(false)
  const [listing, setListing] = useState(false)


  const toggleAvail = ()=>{
    setAvail(!avail)
  }

  const clearInputs = ()=>{
    setDescrip('')
    setCounty('')
    setAdress('')
    setBath(0)
    setBed(0)
    setRent(0),
    setUnits(0)
    setImages([])
    setGeo([])
  }

  const addListing = async () =>{
    if(listing){
      return
    }
    setError(false)
    setSucess(false)
    // check if input fields are valid
    if(images.length < 1 || imagesCache.length < 1){
      setEmsg('Atleast one image required')
      setError(true)
      return
    }
    if(rent === 1 || units < 0){
      setEmsg('units number cannot be zero')
      setError(true)
      return
    }
    if(descrip === '' || county === '' || adress === '' || geo.length !== 2){
      // console.log('empty fieild found')
      setEmsg('Please fill all the fields')
      setError(true)
    }else{
      // create a listing
      if (auth().currentUser.uid !== null) {
        // console.log(`user id: ${auth().currentUser.uid}`)
        if(imagesCache.length === images.length){
          setListing(true)
          const _documentRef = await ref.doc().set({
            owner: auth().currentUser.uid,
            description: descrip,
            location: [county, adress],
            price: Number(rent),
            units: Number(units),
            bathrooms: Number(bath),
            bedrooms: Number(bed),
            images,
            rental,
            availability: avail,
            uploaded: Date.now(),
            geoloc: geo,
            verified: false
          }).catch(()=>{
            setEmsg('Failed to create the listing, try again')
            setError(true)
          })
          setListing(false)
          clearInputs()
          setSmsg('Listing create succesfully')
          setSucess(true)
          // console.log(`doc id: ${documentRef}`)
        }else{
          setEmsg('File upload not finished, try again')
          setError(true)
        }
      }else{
        // console.log('no user found')
        setEmsg('no user found')
        setError(true)
      }
    }
  }

  const pickPhoto = async()=>{
    setError(false)
    setSucess(false)
    await launchImageLibrary({mediaType: 'photo'}, async (result)=>{
      if (result.didCancel) { 
        // console.log('Cancelled')
        setEmsg('Image Pick cancelled')
        setError(true)
      } else if (result.error) { 
        setEmsg(result.errorMessage)
        setError(true)
        // console.log('Error', result.errorMessage)
      } else { 
        // console.log(result)
        // console.log(`file path: ${result.assets[0].uri}`)
        var t = {
          name: result.assets[0].fileName,
          url: result.assets[0].uri
        }
        setImagesCache([...imagesCache, t])
        const ref = parent.child(result.assets[0].fileName)
        setUploading(true)
        ref.putFile(result.assets[0].uri).then(async (e)=>{
          const url = await ref.getDownloadURL()
          setImages([...images, url])
          setSmsg('File Uploaded succesfully')
          setSucess(true)
          if(!upLoading){
            setUploading(true)
          }
          setUploading(false)
          // console.log(`url path: ${url}`)
        })
      }
    })
  }

  return (
    <SafeAreaView>
        <View style={styles.body}>
            <View style={styles.appBar}>
              {
                upLoading || listing ?
                <ActivityIndicator size='small' color='blue'/>:
                <Pressable onPress={()=> navigation.goBack()}>
                  <ChevronLeftIcon size={28} color='#1e1e1e'/>
                </Pressable>
              }
              <Text style={[{fontSize: 18}, styles.text]}>Add Listing</Text>
              <View style={{width: 28}}></View>
            </View>
            <ScrollView>
              <Text style={styles.text}>Description</Text>
              <TextInput 
                style={styles.input} 
                placeholder='Description'
                onChangeText={(t)=> setDescrip(t)}
                value={descrip}/>
              <Text style={styles.text}>Location</Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <TextInput 
                  style={[styles.input, {width: '40%'}]} 
                  placeholder='County'
                  onChangeText={(t)=> setCounty(t)}
                  value={county}/>
                <TextInput 
                  style={[styles.input, {width: '40%'}]}  
                  placeholder='Address'
                  onChangeText={(t)=> setAdress(t)}
                  value={adress}/>
              </View>
              <View style={{height: 150, width: '100%', paddingHorizontal: 10}}>
                {
                  imagesCache.length < 1?
                  <View style={{justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%'}}>
                    <Text>no images uploaded</Text>
                  </View>
                  :<ScrollView horizontal={true}>
                  {
                    imagesCache.map((u, i)=> {
                      return (
                        <View style={{width: 150, height: '100%', marginHorizontal: 2}} key={i}>
                          <Image 
                            source={{uri: u.url}} 
                            style={{width: '100%', height: '100%'}} 
                            progressiveRenderingEnabled={true}/>
                        </View>
                      )
                    })
                  }
                  </ScrollView>
                }
              </View>
              <View style={{justifyContent: 'center', alignItems:'center'}}>
                <Pressable onPress={()=> pickPhoto()}>
                  <View style={styles.button}>
                    <Text style={styles.btncolor}>Upload image</Text>
                  </View>
                </Pressable>
              </View>
              <View style={{justifyContent: 'space-between', paddingHorizontal: 20, flexDirection: 'row'}}>
                <CustomInput title='Bedrooms' type={0} handleChange={setBed} />
                <CustomInput title='Bathrooms' type={0} handleChange={setBath} />
              </View>
              <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                <View>
                  <Text style={styles.text}>Type</Text>
                  <Pressable onPress={()=> setRental(!rental)}>
                    <View style={styles.button}>
                      {
                        rental? <Text style={styles.btncolor}>Rental</Text> :<Text style={styles.btncolor}>Sale</Text>
                      }
                    </View>
                  </Pressable>
                </View>
                <View >
                  <Text style={styles.text}>Availability</Text>
                  <Pressable onPress={()=> toggleAvail()}>
                    <View style={styles.button}>
                      {
                        avail? <Text style={styles.btncolor}>Available</Text> :<Text style={styles.btncolor}>UnAvailable</Text>
                      }
                    </View>
                  </Pressable>
                </View>
              </View>
              <View style={{flexDirection: 'row', paddingHorizontal: 10, display: 'flex', justifyContent: 'space-between'}}>
                <CustomInput title='Rent/Cost' type={1} handleChange={setRent}/>
                <CustomInput title='Units' type={0} handleChange={setUnits}/>
              </View>
              <View style={{flexDirection: 'row', display: 'flex', justifyContent: 'space-between'}}>
                <View>
                  <Text style={{paddingHorizontal: 10}}>Longitude</Text>
                  <TextInput 
                  style={styles.input} 
                  placeholder='-180 to 180' 
                  onChangeText={(t)=> setGeo([Number(t), geo[1]])}
                  />
                </View>
                <View>
                  <Text style={{paddingHorizontal: 10}}>Latitude</Text>
                  <TextInput 
                  style={styles.input} 
                  placeholder='-180 to 180' 
                  onChangeText={(t)=> setGeo([geo[0], Number(t)])}
                  />
                </View>
              </View>
              {
                sucess && 
                <View style={{justifyContent: 'center', alignItems:'center', marginVertical: 10}}>
                  <Text style={{color: 'green'}}>{smsg}</Text>
                </View>
              }
              {
                error && 
                <View style={{justifyContent: 'center', alignItems:'center', marginVertical: 20}}>
                  <Text style={{color: 'red'}}>{emsg}</Text>
                </View>
              }
              <View style={{height: 20}}></View>
              <View style={{justifyContent: 'center', alignItems:'center'}}>
                <Pressable onPress={()=> addListing()}>
                  {
                    listing?
                    <ActivityIndicator color='blue' size='small'/>:
                    <View style={styles.button}>
                      <Text style={styles.btncolor}>Publish</Text>
                    </View>
                  }
                </Pressable>
              </View>
              <View style={{height: 30}}></View>
            </ScrollView>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  body:{
    width:'100%',
    height: '100%',
    backgroundColor: 'white'
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
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#1e1e1e',
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems:"center"
  },
  btncolor:{
    color: 'white'
  },
  input:{
    height: 40,
    paddingLeft: 10,
    borderRadius: 5,
    borderColor: '#1e1e1e',
    borderWidth: 1,
    marginVertical: 5,
    marginHorizontal: 10
  },
  text:{
    paddingHorizontal: 20,
    fontSize: 16,
  }
})