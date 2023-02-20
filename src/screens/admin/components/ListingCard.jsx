import { useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import ImagesCard from '../../../components/ImagesCard'

export default function ListingCard({data}) {

    const [more, setMore] = useState(false)

    const toggle = ()=>{
        // 
    }

    return (
        <View style={styles.body}>
            <View style={{flexDirection: 'row', display: 'flex', justifyContent: 'space-between'}}>
                <Text>{data.rental === true? 'Rental':'Sale'}</Text>
                <Text>{data.price} ksh</Text>
            </View>
            <ImagesCard images={data.images}/>
            <Pressable onPress={()=> setMore(!more)}>
                <Text>
                    {
                        more?"Less": "More"
                    }
                </Text>
            </Pressable>
            {
                more?
                <>
                    <View style={{flexDirection: 'row', display: 'flex', justifyContent: 'space-between'}}>
                        <Text>{data.location[0]}, {data.location[1]}</Text>
                        <Text>{data.geoloc}</Text>
                    </View>
                    <View style={{flexDirection: 'row', display: 'flex', justifyContent: 'space-between'}}>
                        <Text>bedrooms: {data.bedrooms}</Text>
                        <Text>bathrooms: {data.bathrooms}</Text>
                    </View>
                </>
                :<></>
            }
            <View style={{flexDirection: 'row', display: 'flex', justifyContent: 'space-between'}}>
                <Pressable>
                    <View style={styles.button}>
                        <Text>Delete</Text>
                    </View>
                </Pressable>
                <Pressable>
                    <View style={styles.button}>
                        <Text>Approve</Text>
                    </View>
                </Pressable>
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
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems:"center"
  },
  desc:{
    width: '100%',
    flex: 1,
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
})
