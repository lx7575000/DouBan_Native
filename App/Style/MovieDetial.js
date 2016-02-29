import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'rgba(95, 66, 201, 0.3)',
    height: 150,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  imageView:{
    flex: 1,
  },
  image: {
    width: 100,
    height: 132,
    marginLeft: 20,
    marginTop: 9,
  },
  summary:{
    flex: 1,
    justifyContent: 'center',
    marginLeft: 6,
    paddingLeft: 6,
  },
  title:{
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 23,
    marginBottom: 8
  },
  year:{
    fontSize: 13,
    fontWeight: '300',
    lineHeight: 18,
  },
  rating: {
    color: 'rgb(235, 146, 6)',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 25,
  },
  genres:{
    fontFamily: 'Arial',
    fontSize: 13,
    fontWeight: '300',
    lineHeight: 22,
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
  }
})

export default styles;
