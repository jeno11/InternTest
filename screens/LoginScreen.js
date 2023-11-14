import { KeyboardAvoidingView, StyleSheet, TouchableOpacity,Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if(user){
                navigation.replace("Home")
            }
        })
        return unsubscribe 
    }, [])

    const handleSignUp = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Registered:', user.email);
            })
            .catch(error => alert(error.message))
    }
    
    const handleLogin = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Logged in with:', user.email);
            })
            .catch(error => alert(error.message))
    }

  return (
    <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        behavior="padding"
    >
        <View style={styles.inputContainer}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.input}
            />

            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.input}
                secureTextEntry
            />
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={handleLogin}
                style={styles.button}
            >   
                <Text style={styles.buttonText}> Log in </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={handleSignUp}
                style={[styles.button, styles.buttonOutline]}
            >
                <Text style={styles.buttonOutlineText}> Sign up </Text>
            </TouchableOpacity>
        </View> 
    </KeyboardAwareScrollView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        //alignItems: 'center',
    },
    inputContainer: {
        width: '80%',
        marginStart: 40,
        marginEnd: 40,
        alignItems: 'stretch'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        // width: '60%',
         marginStart: 80,
         marginEnd: 80,
         justifyContent: 'center',
         alignItems: 'center',
         marginTop: 40,
         opacity: 1
     },
     button: {
         backgroundColor: '#afeeee',
         width: '100%',
         padding: 15,
         borderRadius: 10,
     },
     buttonOutline: {
         backgroundColor: 'white',
         marginTop: 5,
         borderColor: '#afeeee',
         borderWidth: 2,
     },
     buttonText: {
         color: 'black',
         fontWeight: '700',
         fontSize: 16,
         textAlign: 'center'
     },
     buttonOutlineText: {
        color: 'black',
        fontWeight: '700',
        fontSize: 16,
        textAlign: 'center'
    },
})