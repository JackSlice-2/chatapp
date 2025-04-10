import { Ionicons } from "@expo/vector-icons";
import { SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import { Slot } from "expo-router";
import { useFonts } from "expo-font";

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string){
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  }
}

SplashScreen.preventAutoHideAsync();

const InicialLayout = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  })
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (!isLoaded) return;
    const inAuthGroup = segments[0] === '(auth)'
    console.log('inAuthGroup', inAuthGroup)
    console.log('isSignedIn', isSignedIn)
    if (isSignedIn && !inAuthGroup) {
      router.replace('/(auth)/')
    } else if (!isSignedIn && inAuthGroup) {
      router.replace('/')
    }
  },[isSignedIn])

  if (!loaded || !isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    )
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
        />
        <Stack.Screen name="login" 
        options={{
          presentation: 'modal',
          title: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back}>
              <Ionicons name="close-outline" size={28} />
            </TouchableOpacity>
          )
        }}/>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  )
}

const RootLayoutNav = () => {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
      <GestureHandlerRootView style={{ flex: 1 }}>
          <InicialLayout />
      </GestureHandlerRootView>
    </ClerkProvider>
  )
}
export default RootLayoutNav