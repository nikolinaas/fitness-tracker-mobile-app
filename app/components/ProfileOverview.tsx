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
  Dimensions,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import {
  decodeToken,
  getId,
  getToken,
  isTokenValid,
} from '../services/JWTService';
import axios from 'axios';
import { initialJWTPalyload, JWTPayload } from '../models/JWT';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { URL } from '../services/URLService';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  boxLabel: {
    backgroundColor: 'rgba(22, 58, 89, 0.8)',
    color: 'white',
    flex: 1,
    borderRadius: 25,
    paddingTop: 20,
    height: screenHeight - 20,
    width: screenWidth - 30,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  inputField: {
    height: 40,
    borderColor: 'powderblue',
    borderWidth: 2,
    borderRadius: 20,
    borderStyle: 'solid',
    width: 150,
    padding: 5,
    justifyContent: 'flex-end',
    fontSize: 18,
    color: 'powderblue',
    marginRight: 5,
  },

  textLabel: { padding: 5, color: 'powderblue', fontSize: 20 },
  inputGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 5,
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '5%',
  },
});

const displayValue = Dimensions.get('window').height;

export function ProfileOverviewScreen() {
  const [click, setClick] = useState(false);
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [login, setLogin] = useState(true);
  const [token, setToken] = useState<JWTPayload>(initialJWTPalyload);
  const [stpsGoal, setStepsGoal] = useState(1000);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [text, setText] = useState('');

  async function getUser() {
    const token = await decodeToken();
    const jwtToken = await SecureStore.getItemAsync('token');
    const config = {
      method: 'get',
      url: URL + ':8080/api/users/' + token.jti,
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    console.log('idd ' + jwtToken + 'teekst');
    console.log(config.url);
    try {
      await axios(config).then((resp) => {
        console.log(resp.data);
        setUsername(resp.data.username);
        setFirstName(resp.data.firstName);
        setSecondName(resp.data.secondName);
        setStepsGoal(resp.data.stepsgoal);
        setWeight(resp.data.weight);
        setHeight(resp.data.height);
        setAge(resp.data.age);
      });
    } catch (error) {
      setLogin(true);
      console.error(error);
    }
  }

  useEffect(() => {
    getUser();
  }, [login]);

  function onClick() {
    console.log('saveee');
  }

  return (
    <LinearGradient
      collapsable={false}
      colors={['steelblue', 'powderblue', 'skyblue']}
      style={styles.container}
    >
      <View style={styles.boxLabel} collapsable={false}>
        <View
          collapsable={false}
          style={{
            height: 130,
            width: 130,
            backgroundColor: 'rgba(70,130,180, 0.5)',
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>
            <MaterialCommunityIcons
              name="account"
              color={'powderblue'}
              size={30}
            />{' '}
          </Text>
          <Text style={{ color: 'powderblue', fontSize: 20 }}>{username}</Text>
        </View>

        <View
          style={{
            backgroundColor: 'rgba(70,130,180, 0.5)',
            flex: 1,
            borderRadius: 25,
            paddingTop: 20,
            height: screenHeight - 20,
            width: screenWidth - 50,
            margin: 5,

            padding: 10,
          }}
        >
          <View style={styles.inputGroup}>
            <Text style={styles.textLabel}>Fisrt name</Text>
            <TextInput
              editable
              style={styles.inputField}
              onFocus={() => {}}
              placeholder="First name!"
              onChangeText={(newText) => {
                setIsSaveDisabled(false);
                setFirstName(newText);
              }}
              defaultValue={firstName}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.textLabel}>Second name</Text>
            <TextInput
              editable
              style={styles.inputField}
              onFocus={() => {}}
              placeholder="First name!"
              onChangeText={(newText) => {
                setIsSaveDisabled(false);
                setSecondName(newText);
              }}
              defaultValue={secondName}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.textLabel}>Age</Text>
            <TextInput
              editable
              style={styles.inputField}
              placeholder="Second name!"
              onChangeText={(newText) => {
                setIsSaveDisabled(false);
                setAge(Number(newText));
              }}
              defaultValue={age.toString()}
              keyboardType="number-pad"
            ></TextInput>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.textLabel}>Weight</Text>
            <TextInput
              editable
              style={styles.inputField}
              placeholder="Weight!"
              onChangeText={(newText) => {
                setIsSaveDisabled(false);
                setWeight(Number(newText));
              }}
              defaultValue={weight + ''}
              keyboardType="number-pad"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.textLabel}>Height</Text>
            <TextInput
              editable
              style={styles.inputField}
              placeholder="Height!"
              onChangeText={(newText) => {
                setIsSaveDisabled(false);
                setHeight(Number(newText));
              }}
              defaultValue={height + ''}
              keyboardType="number-pad"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.textLabel}>Steps goal</Text>
            <TextInput
              editable
              style={styles.inputField}
              placeholder="Steps goal!"
              onChangeText={(newText) => {
                setIsSaveDisabled(false);
                setStepsGoal(Number(newText));
              }}
              defaultValue={stpsGoal.toString()}
              keyboardType="number-pad"
            />
          </View>
          <View style={styles.buttonView}>
            <Pressable
              style={styles.button}
              onPress={onClick}
              disabled={isSaveDisabled}
            >
              <Text style={styles.buttonText}>SAVE</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}
