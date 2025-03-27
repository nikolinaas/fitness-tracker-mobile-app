import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Switch,
  Pressable,
  Alert,
} from 'react-native';

import * as Keychain from 'react-native-keychain';
import Login from '../LoginComponent';
import * as SecureStore from 'expo-secure-store';
import { ProfileOverviewScreen } from '../ProfileOverview';
import { isTokenValid } from '../../services/JWTService';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    height: 160,
    width: 170,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    paddingVertical: 40,
    color: 'red',
  },
  inputView: {
    gap: 15,
    width: '100%',
    paddingHorizontal: 40,
    marginBottom: 5,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 7,
  },
  rememberView: {
    width: '100%',
    paddingHorizontal: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 8,
  },
  switch: {
    flexDirection: 'row',
    gap: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rememberText: {
    fontSize: 13,
  },
  forgetText: {
    fontSize: 11,
    color: 'red',
  },
  button: {
    backgroundColor: 'red',
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonView: {
    width: '100%',
    paddingHorizontal: 50,
  },
  optionsText: {
    textAlign: 'center',
    paddingVertical: 10,
    color: 'gray',
    fontSize: 13,
    marginBottom: 6,
  },
  mediaIcons: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 23,
  },
  icons: {
    width: 40,
    height: 40,
  },
  footerText: {
    textAlign: 'center',
    color: 'gray',
  },
  signup: {
    color: 'red',
    fontSize: 13,
  },
});

export function ProfileScreen({ navigation }: { navigation: any }) {
  const [click, setClick] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState<boolean>(true);

  async function getToken() {
    let result = await SecureStore.getItemAsync('token');
    console.log('rreessuullt ' + result);
    result !== null && (await isTokenValid())
      ? setLogin(false)
      : setLogin(true);
  }

  function setLogedin(param: boolean) {
    setLogin(param);
  }

  function navigateToRegistration() {
    console.log('metodaaaa');
    navigation.navigate('Registration');
  }

  useEffect(() => {
    getToken();
  }, [login]);

  return (
    <LinearGradient
      colors={['steelblue', 'powderblue', 'skyblue']}
      style={styles.container}
    >
      {login === true ? (
        <Login
          loginClick={setLogedin}
          navigateClick={navigateToRegistration}
        ></Login>
      ) : (
        <View collapsable={false}>
          <ProfileOverviewScreen />
        </View>
      )}
    </LinearGradient>
  );
}
