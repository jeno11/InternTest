import { KeyboardAvoidingView, StyleSheet, TouchableOpacity,Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Yup from 'yup';

const signUpSchema = Yup.object().shape({
    email: Yup.string().email('Email is Invalid').required('Email Cannot Be Empty'),
    password: Yup.string().min(8, 'Password Must have a Minimum of eight Characters').required('Password Cannot Be Empty'),
});

const LoginScreen = () => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState({});
    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if(user){
                navigation.replace("Home")
            }
        })
        return unsubscribe 
    }, [])

    const handleSignUp = async () => {
        try {
          // Awaiting for Yup to validate text
          await signUpSchema.validate({ email, password }, { abortEarly: false });
          
          auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Registered:', user.email);
            })
            
          // Reseting Warnings and displaying success message if all goes well
          setErrors({});
          setSuccess(true);
        } catch (error) {
          // Reseting Succes Message
          setSuccess(false);
    
          // Setting error messages identified by Yup
          if (error instanceof Yup.ValidationError) {
            // Extracting Yup specific validation errors from list of total errors
            const yupErrors = {};
            error.inner.forEach((innerError) => {
              yupErrors[innerError.path] = innerError.message;
            });
    
            // Saving extracted errors
            setErrors(yupErrors);
          }
        }
        
      };
    

    // const handleSignUp = () => {
    //     auth
    //         .createUserWithEmailAndPassword(email, password)
    //         .then(userCredentials => {
    //             const user = userCredentials.user;
    //             console.log('Registered:', user.email);
    //         })
    //         .catch(error => alert(error.message))
    // }
    
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
            {errors.email && 
            <Text style={styles.textWarning}>
                {errors.email}
            </Text>}

            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.input}
                secureTextEntry
            />
            {errors.password && 
            <Text style={styles.textWarning}>
                {errors.password}
            </Text>}
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