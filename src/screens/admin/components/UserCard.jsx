import { View, Text, StyleSheet, Pressable } from 'react-native'

export default function UserCard({data}) {
  return (
    <View style={styles.body}>
        <View style={styles.top}>
            <Text style={styles.text1}>{data.name}</Text>
            <Text style={styles.text1}>{data.telephone}</Text>
        </View>
        <Text style={styles.text2}>{data.email}</Text>
        <Pressable>
          <View style={styles.button}>
            <Text style={{color: 'white'}}>Delete</Text>
          </View>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    body:{
        backgroundColor: 'grey',
        paddingHorizontal: 5,
        marginVertical: 2,
        alignItems: 'flex-start'
    },
    top:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text1:{
        fontSize: 17,
        color: '#1e1e1e'
    },
    text2:{
        fontSize: 15,
        color: '#1e1e1e'
    },
    button:{
        marginVertical: 10,
        paddingHorizontal: 40,
        paddingVertical: 10,
        backgroundColor: '#1e1e1e',
        marginHorizontal: 20,
        justifyContent: "center",
        alignItems:"center"
    }
})