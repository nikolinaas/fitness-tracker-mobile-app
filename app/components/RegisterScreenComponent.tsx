import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  StyleSheet,
  Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
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
    width: 200,
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
    padding: '4%',
  },
});

export function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [email, setEmail] = useState('');

  async function onClick() {
    const config = {
      method: 'post',
      url: URL + ':8080/api/users/register',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
      },
      data: {
        firstName: firstName,
        secondName: secondName,
        age: age,
        height: height,
        weight: weight,
        email: email,
        username: username,
        password: password,
        stepsgoal: 0,
      },
    };
    try {
      await axios(config).then(async (resp: any) => {
        console.log(resp.data);
      });
    } catch (error: any) {
      console.log(error.response);
      console.error('Error initiating:', error);
    }
  }

  return (
    <LinearGradient
      collapsable={false}
      colors={['steelblue', 'powderblue', 'skyblue']}
      style={styles.container}
    >
      <View style={styles.boxLabel} collapsable={false}>
        <View
          style={{
            backgroundColor: 'rgba(70,130,180, 0.5)',
            flex: 1,
            borderRadius: 25,
            paddingTop: 20,
            height: screenHeight - 20,
            width: screenWidth - 50,
            margin: 5,
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: 10,
          }}
        >
          <View style={{ height: screenHeight / 9, justifyContent: 'center' }}>
            <Text style={{ fontSize: 24, color: 'powderblue' }}>
              Create your account!
            </Text>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.textLabel}>Fisrt name</Text>
            <TextInput
              editable
              style={styles.inputField}
              onFocus={() => {}}
              onChangeText={(newText) => setFirstName(newText)}
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
              onChangeText={(newText) => setSecondName(newText)}
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
              onChangeText={(newText) => setAge(Number(newText))}
              defaultValue={age.toString()}
              keyboardType="number-pad"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.textLabel}>Weight</Text>
            <TextInput
              editable
              style={styles.inputField}
              placeholder="Weight!"
              onChangeText={(newText) => setWeight(Number(newText))}
              defaultValue={weight + ''}
              keyboardType="number-pad"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.textLabel}>Height</Text>
            <TextInput
              editable
              style={styles.inputField}
              onChangeText={(newText) => setHeight(Number(newText))}
              defaultValue={height + ''}
              keyboardType="number-pad"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.textLabel}>Email</Text>
            <TextInput
              editable
              style={styles.inputField}
              onChangeText={(newText) => setEmail(newText)}
              defaultValue={email}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.textLabel}>Username</Text>
            <TextInput
              editable
              style={styles.inputField}
              onChangeText={(newText) => setUsername(newText)}
              defaultValue={username}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.textLabel}>Password</Text>
            <TextInput
              editable
              style={styles.inputField}
              onChangeText={(newText) => setPassword(newText)}
              defaultValue={password}
            />
          </View>
          <View style={styles.buttonView}>
            <Pressable style={styles.button} onPress={onClick}>
              <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}
