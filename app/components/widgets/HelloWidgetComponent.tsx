import React from 'react';
import { FlexWidget, TextWidget } from 'react-native-android-widget';
import { View, Text, StyleSheet } from "react-native"; 

export function HelloWidget() {
    return (
      <FlexWidget
        style={{
          height: 'match_parent',
          width: 'match_parent',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ffcccc',
          borderRadius: 16,
        }}
      >
        <TextWidget
          text="Hello"
          style={{
            fontSize: 32,
            fontFamily: 'Inter',
            color: '#ffcccc',
          }}
        />
      </FlexWidget>
    );
  }