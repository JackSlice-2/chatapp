import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { defaultStyles } from '@/constants/Styles'
import { Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Colors from '@/constants/Colors'
import { Link } from 'expo-router'

const ButtonLoginSheet = () => {

    const { bottom } = useSafeAreaInsets()
  return (
    <View style={[styles.container, {paddingBottom: bottom}]}>
        <TouchableOpacity style={[defaultStyles.btn, styles.btnLight]}>
            <Ionicons name='logo-apple' size={15} style={styles.btnIcon} />
            <Text style={styles.btnLightText}>Continue With Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[defaultStyles.btn, styles.btnDark]}>
            <Ionicons name='logo-google' size={16} style={styles.btnIcon} color={'#fff'} />
            <Text style={styles.btnDarkText}>Continue With Google</Text>
        </TouchableOpacity>

        <Link href={{
            pathname: '/login',
            params: {
                type: 'register'
            }
        }} asChild style={[defaultStyles.btn, styles.btnOutline]}>
            <TouchableOpacity>
                <Ionicons name='mail' size={16} style={styles.btnIcon} color={'#fff'} />
                <Text style={styles.btnDarkText}>Continue with E-Mail</Text>
            </TouchableOpacity>
        </Link>

        <Link href={{
            pathname: '/login',
            params: {
                type: 'login'
            }
        }} asChild style={[defaultStyles.btn, styles.btnOutline]}>
            <TouchableOpacity>
                <Text style={styles.btnDarkText}>Log In</Text>
            </TouchableOpacity>
        </Link>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: "100%",
        backgroundColor: '#000',
        padding: 26,
        gap: 14,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    btnLight: {
        backgroundColor: '#fff'
    },
    btnDark: {
        backgroundColor: Colors.grey
    },
    btnLightText: {
        fontSize: 20
    },
    btnDarkText: {
        fontSize: 20,
        color: '#fff'
    },
    btnOutline: {
        borderWidth: 3,
        borderColor: Colors.grey
    },
    btnIcon: {
        paddingRight: 7
    }
})

export default ButtonLoginSheet