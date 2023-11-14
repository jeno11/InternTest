import { StyleSheet, Text, Box, View, TouchableOpacity, ScrollView } from 'react-native'
import { auth } from '../firebase'
import React, { useState, useEffect, setData, fetchData } from "react";
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
    const navigation = useNavigation()

    const handleSignOut = () =>{
        auth
            .signOut()
            .then(() =>{
                navigation.replace("Login")
            })
            .catch(error => alert(error.message))
    }

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const url = "https://jsonplaceholder.typicode.com/posts";

    useEffect(() => {
        fetch(url)
        .then((response)=>response.json())
        .then((json)=>setData(json))
        .catch((error)=>console.log(error))
        .finally(()=>setLoading(false));
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handleSignOut}>
                <Text style={styles.buttonText}>Sign out</Text> 
            </TouchableOpacity> 
            
                {loading ? ( <Text>Loading...</Text>) : (
                    data.map((post,id)=>(
                        <ScrollView key={post.id} contentContainerStyle={styles.container}>
                            <Text style={{fontSize:30, fontWeight: 'bold'}}>{post.title}</Text>
                            <Text style={{fontSize:10, color:'blue'}}>{post.body}</Text>
                        </ScrollView>
                    ))
                )}
            
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#afeeee',
        width: '25%',
        height: '4%',
        marginRight: 5,
        marginLeft: 250,
        marginTop: 30,
        //marginEnd: 20,
        borderRadius: 10,
    },
    buttonText: {
        color: '#808080',
        fontWeight: '700',
        fontSize: 16,
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center'
    },
})