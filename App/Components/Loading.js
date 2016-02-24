'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  ActivityIndicatorIOS
} from 'react-native';

export default class Loading extends Component{
  render(){
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicatorIOS
          size="large"
          color="#00aa00"
        />
        <Text>
          页面加载中 ...
        </Text>
      </View>
    )
  }
}
