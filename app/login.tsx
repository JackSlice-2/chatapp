import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { useSignIn, useSignUp } from '@clerk/clerk-expo';

const Page = () => {
    const { type } = useLocalSearchParams<{type: string}>();
    const [loading, setLoading] = useState(false);
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");

    const { signIn, isLoaded, setActive } = useSignIn()
    const { signUp, isLoaded: SignUpLoaded, setActive: SignUpActive } = useSignUp()

    const onSignUpPress = async() => {
        if (!SignUpLoaded) return;
        setLoading(true)

        try {
            const result = await signUp.create({
                emailAddress,
                password,
            })
            SignUpActive({
                session: result.createdSessionId
            })
        } catch (error: any) {
            console.log("Error creating account", error)
            Alert.alert(error.errors[0].message)
        }
        finally {
            setLoading(false)
        }
    }
    const onLogInPress = async() => {
        if (!isLoaded) return;
        setLoading(true)

        try {
            const result = await signIn.create({
                identifier: emailAddress,
                password,
            })
            setActive({
                session: result.createdSessionId
            })
        } catch (error: any) {
            console.log("Error logging in", error)
            Alert.alert(error.errors[0].message)
        }
        finally {
            setLoading(false)
        }
    }

  return (
    <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={70} style={styles.container}>
        {loading && (
            <View style={defaultStyles.loadingOverlay}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        )}
        <Image source={require('../assets/images/logo-dark.png')} style={styles.logo} />
        <Text style={styles.title}>
            {type === 'login' ? 'Welcome Back' : 'Create your Account'}
        </Text>
        <View style={{marginBottom: 30}}>
            <TextInput 
                style={styles.inputField}
                autoCapitalize='none'
                placeholder='Email'
                value={emailAddress}
                onChangeText={setEmailAddress}
            />
            <TextInput 
                style={styles.inputField}
                autoCapitalize='none'
                placeholder='Password'
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
        </View>
        {type === "login" ? (
            <TouchableOpacity style={[defaultStyles.btn, styles.btnPrimary]} onPress={onLogInPress}>
                <Text style={styles.btnPrimaryText}>Login</Text>
            </TouchableOpacity>)
            :
            (<TouchableOpacity style={[defaultStyles.btn, styles.btnPrimary]} onPress={onSignUpPress}>
                <Text style={styles.btnPrimaryText}>Create Account</Text>
            </TouchableOpacity>
        )}  
        </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // justifyContent: 'center',
      padding: 20,
    },
    logo: {
      width: 60,
      height: 60,
      alignSelf: 'center',
      marginVertical: 80,
    },
    title: {
      fontSize: 30,
      marginBottom: 20,
      fontWeight: 'bold',
      alignSelf: 'center',
    },
    inputField: {
      marginVertical: 4,
      height: 50,
      borderWidth: 1,
      borderColor: Colors.primary,
      borderRadius: 12,
      padding: 10,
      backgroundColor: '#fff',
    },
    btnPrimary: {
      backgroundColor: Colors.primary,
      marginVertical: 4,
    },
    btnPrimaryText: {
      color: '#fff',
      fontSize: 16,
    },
  });

export default Page