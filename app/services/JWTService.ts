import { Buffer } from 'buffer';
import * as SecureStore from 'expo-secure-store';
import { initialJWTPalyload, JWTPayload } from '../models/JWT';

export async function decodeToken() {
  let decodeTokenString: JWTPayload = initialJWTPalyload;
  const jwtToken = await SecureStore.getItemAsync('token');
  if (jwtToken !== null) {
    decodeTokenString = JSON.parse(
      Buffer.from(jwtToken.split('.')[1], 'base64').toString()
    );
  }

  console.log('JWT payload', decodeTokenString.jti);
  return decodeTokenString;
}

export async function getToken() {
  const jwtToken = await SecureStore.getItemAsync('token');
  return jwtToken;
}

export async function isTokenValid() {
  const currentTime = Date.now() / 1000;
  const decodedToken = await decodeToken();
  console.log('exxpx' + decodedToken.exp);
  if (decodedToken.exp > currentTime) {
    console.log('true');
    return true;
  } else {
    await SecureStore.setItemAsync('token', 'null');
    return false;
  }
}

export async function getId() {
  let decodeTokenString: JWTPayload = initialJWTPalyload;
  const jwtToken = await SecureStore.getItemAsync('token');
  if (jwtToken !== null) {
    decodeTokenString = JSON.parse(
      Buffer.from(jwtToken.split('.')[1], 'base64').toString()
    );
  }
  return decodeTokenString.jti;
}
