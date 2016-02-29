'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  ActivityIndicatorIOS,
  View,
  ListView,
  TouchableOpacity,
  TouchableHighlight,
  Image,
} from 'react-native';

export default class CityList extends Component{
  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      cityList: [],
      loaded: true,
      start: 0,
      count: 30,
      total: 0,
    }

    this.REQUEST_URL = 'https://api.douban.com/v2/loc/list';
    this._fetchData();
  }

  requestURL(url=this.REQUEST_URL,
            count=this.state.count,
            start=this.state.start
  ){
    return `${url}?count=${count}&start=${start}`;
  }

  _fetchData(){
    fetch(this.requestURL())
      .then(response => response.json())
      .then(responseData => {
        // console.log('loaded ' + this.state.loaded);

        let newStart = responseData.count + responseData.start;
        this.setState({
          cityList: responseData.locs,
          loaded: false,
          total: responseData.total,
          start: newStart
        });
      });
  }

  _renderRow(rowData){
    return (
      <TouchableHighlight
        underlayColor={'#ccc'}
        style={{flex: 1}}
        onPress={() => console.log(`press city: ${rowData.name}  id: ${rowData.id}`)}
      >
      <View style={styles.container}>
        <Text style={{fontSize: 33 ,textAlign: 'center', flex: 1}}>
          {rowData.name}
        </Text>
      </View>
      </TouchableHighlight>
    )
  }

  render(){
    return (

        <View style={{
          flex: 1,
          flexDirection: 'row',
          marginTop: 10,
        }}>
          <ListView
            dataSource={this.ds.cloneWithRows(this.state.cityList)}
            renderRow={this._renderRow.bind(this)}
          />
        </View>

    )
  }

}

let styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#ccc',
    marginBottom: 4,
    alignItems: 'center'
  }
})
