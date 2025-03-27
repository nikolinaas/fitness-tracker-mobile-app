import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
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
  Button,
} from 'react-native';
import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import * as SecureStore from 'expo-secure-store';
import { URL } from '../services/URLService';

export default function Login(props: any) {
  const [click, setClick] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function onClick() {
    const config = {
      method: 'post',
      url: URL + ':8080/api/authentication/login',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
      },
      data: {
        username: username,
        password: password,
      },
    };
    console.log(config.url);
    try {
      await axios(config).then(async (resp: any) => {
        console.log(resp.data);
        await SecureStore.setItemAsync('token', resp.data.token);
        props.loginClick(false);
      });
    } catch (error: any) {
      console.log(error.response);
      console.error('Error initiating:', error);
    }
  }

  return (
    <LinearGradient
      colors={['steelblue', 'powderblue', 'skyblue']}
      style={styles.container}
    >
      <View style={styles.container}>
        <Text style={styles.title}>You are not signed in</Text>
        <Text style={styles.title}>Sign in</Text>

        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="USERNAME"
            value={username}
            onChangeText={(newText) => setUsername(newText)}
            autoCorrect={false}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="PASSWORD"
            secureTextEntry
            value={password}
            onChangeText={(newText) => setPassword(newText)}
            autoCorrect={false}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.buttonView}>
          <Pressable style={styles.button} onPress={onClick}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </Pressable>
        </View>

        <Text style={styles.footerText}>
          Don't Have Account?{' '}
          <Text
            onPress={() => {
              props.navigateClick();
              console.log('registeeeeeer');
            }}
            style={styles.signup}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    height: 160,
    width: 170,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    color: 'white',
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
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 7,
  },

  button: {
    height: 45,
    width: 100,
    backgroundColor: 'rgba(22, 58, 89, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'white',
    shadowOpacity: 0.8,
    elevation: 50,
    shadowRadius: 10,
    shadowOffset: { width: 1, height: 13 },
    borderStyle: 'solid',
    borderBlockColor: 'black',
    borderRadius: 25,
    margin: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonView: {
    width: '100%',
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
    color: 'white',
    fontSize: 13,
  },
});
