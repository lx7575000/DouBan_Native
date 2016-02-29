'use strict';
import React, {
  Component,
  StyleSheet,
  View,
  ListView,
  NavigatorIOS,
} from 'react-native';

import CityList from './CityList';
import LocActivity from './LocActivity';


export default class DBEvents extends Component {
  render(){
    return (
      <NavigatorIOS
      style={{
          flexDirection: 'row',
          flex: 1
      }}
        initialRoute={{
          component: LocActivity,
          title: '本地生活',
        }}
        shadowHidden={true}
        barTintColor="darkslateblue"
        titleTextColor="rgba(255,255,255, 0.8)"
        tintColor="rgba(255, 255, 255, 0.8)"
        translucent={true}
      />
    )
  }
}
