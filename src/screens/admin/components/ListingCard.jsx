import { useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import ImagesCard from '../../../components/ImagesCard'

export default function ListingCard({data, index, remove, approve}) {

    const [more, setMore] = useState(false)

    const toggle = ()=>{
        // 
    }

    return (
        <View style={styles.body}>
            <View style={{flexDirection: 'row', display: 'flex', justifyContent: 'space-between'}}>
                <Text style={styles.adress}>{data.rental === true? 'Rental':'Sale'}</Text>
                <Text style={styles.price}>{data.price} ksh</Text>
            </View>
            <ImagesCard images={data.images}/>
            <Pressable onPress={()=> setMore(!more)} style={{paddingVertical: 5}}>
                <Text style={styles.more}>
                    {
                        more?"Less": "More"
                    }
                </Text>
            </Pressable>
            {
                more?
                <>
                    <View style={{flexDirection: 'row', marginVertical: 5, justifyContent: 'space-between'}}>
                        <Text style={styles.desc}>{data.location[0]}, {data.location[1]}</Text>
                        <Text>lat: {data.geoloc[0]}, long: {data.geoloc[1]}</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginVertical: 5, justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 16}}>bedrooms: {data.bedrooms}</Text>
                        <Text style={{fontSize: 16}}>bathrooms: {data.bathrooms}</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginVertical: 5}}>
                        <Text style={{fontSize: 14, color: '#1e1e1e'}}>
                            {
                                data.availability?'Status: Vaccant':'Status: Takken'
                            }
                        </Text>
                    </View>
                </>
                :<></>
            }
            <View style={{flexDirection: 'row', display: 'flex', justifyContent: 'space-between'}}>
                <Pressable onPress={()=>remove(index)}>
                    <View style={[styles.button, {backgroundColor: 'red'}]}>
                        <Text style={{color: 'white'}}>Delete</Text>
                    </View>
                </Pressable>
                {
                    data.verified === false?
                    <Pressable onPress={()=> approve(index)}>
                        <View style={[styles.button, {backgroundColor: '#1e1e1e'}]}>
                            <Text style={{color: 'white'}}>Approve</Text>
                        </View>
                    </Pressable>
                    :<></>
                }
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  body:{
    // height: 150,
    width: '100%',
    // backgroundColor: 'yellow',
    marginVertical: 5,
    display: 'flex',
    justifyContent:'space-between',
  },
  button:{
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'grey',
    // marginHorizontal: 10,
    justifyContent: "center",
    alignItems:"center"
  },
  desc:{
    // width: '100%',
    // flex: 1,
    flexDirection: 'column',
    fontSize: 14
  },
  adress:{
    fontSize: 16,
    marginBottom: 5,
  },
  price:{
    fontSize: 17,
    color: 'green'
  },
  more:{
    fontSize: 17,
    color: '#1e1e1e'
  },
})
