'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
  Image,
} from 'react-native';

import Loading from './Loading';

export default class MovieSummary extends Component{
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
      MovieDetail : '',
    }

    const REQUEST_URL = `https://api.douban.com/v2/movie/subject/${this.props.movie.id}`;
    this._fetchData(REQUEST_URL);
  }

  componentDidMount(){
    console.log('componentDidMount ....');
  }

  _fetchData(REQUEST_URL){
    fetch(REQUEST_URL)
      .then(response => response.json())
      .then(responseData => {
        // console.log(responseData.summary);
        this.setState({
          loaded: true,
          MovieDetial: responseData,
        });
      })
      .done();
  }

  render(){
    if(!this.state.loaded){
      console.log('is loading ......');
      return(
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Loading />
            <Text>
                正在努力加载 《{this.props.movie.title}》 内容
            </Text>
        </View>
      );
    }

    this.movie = this.state.MovieDetial;
    this.summary = this.movie.summary.split(/\n/).map( p => {
      return (
        <View key={'summary' + p[0]} style={{marginBottom: 16, paddingLeft: 6, paddingRight: 6}}>
          <Text style={styles.description}>
              {p}
          </Text>
        </View>
      )
    });

    return (
      <View style={styles.container}>
        {this.summary}
      </View>
    )
  }
}

let styles = StyleSheet.create({
  container:{
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 70,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  description:{
    fontWeight: '300',
    color: 'rgba(0, 0, 0, 0.8)',
    lineHeight: 26,
    fontFamily: 'Helvetica Neue',
    fontSize: 16,
  },
});
