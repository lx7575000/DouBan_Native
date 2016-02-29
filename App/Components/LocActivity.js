'use strict';

import React, {
  Component,
  StyleSheet,
  View,
  Text,
  Image,
  ListView,
  NavigatorIOS,
  TouchableHighlight,
  PickerIOS,
} from 'react-native';

import Loading from './Loading';

let PickerItemIOS = PickerIOS.Item;



export default class  LocActivity extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.locID = 118173 //宁波ID
    this.REQUEST_URL = 'https://api.douban.com/v2/event/list';
    this.citys = {
      '北京':{
        ID: 108288,
      },
      '上海':{
        ID: 108296,
      },
      '广州': {
        ID: 118281,
      },
      '杭州': {
        ID: 118172,
      },
      '宁波':{
        ID: 118173,
      },
    };
    this.types = ['all', 'music', 'sports'];
    this.state = {
      loaded: true,
      type: 'all',
      selectedCity: '',
      events: [],
      total: 0,
    }


    // this.search(this.state.selectedCity);
  }

  // 根据选择框选择城市来加载不同城市活动内容
  shouldComponentUpdate(nextProps, nextState){
    // console.log('shouldComponentUpdate ....   ');
    // console.log(  nextState.selectedCity !== this.state.selectedCity);
    if(nextState.selectedCity !== this.state.selectedCity){
      this.search(nextState.selectedCity);

    }
    return nextState.selectedCity !== this.state.selectedCity;
  }

  async search(newCity){
    try {
      await this._fetchData();
      this.setState({
        selectedCity: newCity
      });

      console.log('fetch data for ' + newCity);
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  _fetchData(city = this.citys[this.state.selectedCity].ID,
            type = this.state.type){
      let requesturl = `${this.REQUEST_URL}?loc=${city}&type=${type}`;
      this.setState({loaded: true})
      fetch(requesturl)
        .then(response => response.json())
        .then(responseData => {
          // 加载不同城市活动内容。
          this.setState({
            events: responseData.events,
            total: responseData.total,
            loaded: false,
          });
        });
  }

  _renderEventsItem(event){
    return (
      <TouchableHighlight
        underlayColor={'#ccc'}
        style={{flex: 1}}
      >
        <View style={styles.container}>
          <View style={styles.imageView}>
            <Image source={{uri: event.image}} style={styles.image}/>
          </View>
          <View style={styles.description}>
            <Text style={{flex: 1, fontSize: 16, color: 'red', fontWeight: '400'}}>
              {event.title}
            </Text>
            <Text >
              发起人：<Text style={{flex: 1, fontSize: 12, lineHeight: 20, fontWeight: '500'}}> {event.owner.name} </Text>
            </Text>
            <Text>
              地点: <Text style={{flex: 1, fontSize: 14, fontWeight: '500', lineHeight: 18}}>{event.address} </Text>
            </Text>
            <Text style={{lineHeight: 16, flex: 1,}}>
              感兴趣: {event.wisher_count} 参加: {event.participant_count}
            </Text>
          </View>
          <View style={styles.arrowImage}>
            <Image source={require('../Assets/Image/double-arrow-right.png')} style={styles.arrowIcon}/>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  render(){

    return(
      <View style={{flex: 1, marginTop: 20}}>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <TouchableHighlight
          onPress={() => this.setState({selectedCity: '北京'})}
        >
        <View style={{flex: 1, width: 100, }}>

          <Text style={{textAlign: 'center'}}>
            北京
          </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => this.setState({selectedCity: '上海'})}
        >
        <View style={{flex: 1, width: 100, }}>

          <Text style={{textAlign: 'center'}}>
            上海
          </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => this.setState({selectedCity: '宁波'})}
        >
        <View style={{flex: 1, width: 100, }}>

          <Text style={{textAlign: 'center'}}>
            宁波
          </Text>
          </View>
        </TouchableHighlight>
          {/*<PickerIOS
            selectedValue={this.state.selectedCity}
            onValueChange={(selectedCity) => this.search(selectedCity)}
          >
          {Object.keys(this.citys).map((name, index) => (
              <PickerItemIOS
              key={`${name}_${index}`}
              value={`${name}`}
              label={`${name}`}
              />
          )) }

          </PickerIOS>*/}
        </View>
        <ListView
          style={{flex: 4, marginTop: -30}}
          dataSource={this.ds.cloneWithRows(this.state.events)}
          renderRow={this._renderEventsItem.bind(this)}
        />
      </View>
    )
  }
}





let styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'rgb(207, 198, 241)',
    height: 150,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  ImageView: {
    flex: 1,
  },
  image: {
    width: 100,
    height: 132,
    marginLeft: 20,
    marginTop: 9,
  },
  arrowImage: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: 30,
    marginBottom: 10,
    opacity: 0.3,
  },
  arrowIcon: {
    width: 12,
    height: 12
  },
  description: {
    flex: 7,
    marginTop: 6,
    marginLeft: 10,
    flexDirection: 'column'
  }
})

class CityPicker extends Component{
  constructor(props){
    super(props);
    this.citys = {
      '北京':{
        ID: 108288,
      },
      '上海':{
        ID: 108296,
      },
      '广州': {
        ID: 118281,
      },
      '杭州': {
        ID: 118172,
      },
      '宁波':{
        ID: 118173,
      },
    };
    this.state = {
      selectedCity: this.props.selectedCity,
    }
  }
  render(){
    return (
      <View style={{flex: 1, marginTop: 100}}>
      <PickerIOS
        selectedValue={this.state.selectedCity}
        onValueChange={(selectedCity) => this.setState({selectedCity})}
      >
      {Object.keys(this.citys).map((name, index) => (
          <PickerItemIOS
          key={`${name}_${index}`}
          value={`${name}`}
          label={`${name}`}
          />
      )) }
      </PickerIOS>
      <TouchableHighlight
        onPress={() => {
          console.log('返回上一级菜单 返回参数  ' + this.state.selectedCity);
          this.props.navigator.pop()
        }}
      >
        <View style={{justifyContent: 'center', alignItems: 'center',height: 40, width: 100, backgroundColor: '#ccc', flex: 1}}>
          <Text style={{textAlign: 'center'}}>
            确定
          </Text>
        </View>
      </TouchableHighlight>
      </View>
    )
  }
}
