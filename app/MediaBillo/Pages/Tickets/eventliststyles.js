const {StyleSheet} = require('react-native');

const eventlistStyles = StyleSheet.create({
  h1: {
    fontSize: 20,
    position: 'absolute',

    fontFamily: 'roboto',
   // backgroundColor: 'red',
    top:'60%',
    left:'10%'
    //color:'green',
  },
  h2: {
  //  backgroundColor: 'blue',
    position: 'absolute',
    top: '25%',
    left:'5%',
    fontFamily: 'segoe-ui',
    fontSize: 25,

    color: 'rgb(233, 199, 247)',
  },
  mainView: {
    display: 'flex',
    flex: 1,
  },
  view1: {
    flex: 1,
    height: 200,
    //  marginTop:90,
    backgroundColor: '#D71182',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  view2: {
    flex: 4,
    justifyContent: 'center',
    //backfaceVisibility:'',
    backgroundColor: 'red',
  },
  btnView: {
    /*  backgroundColor:'green',
        justifyContent: 'center',
        alignItems:'center' */
  },
  btn: {
    backgroundColor: '#D71182',
    width: '50%',
    alignSelf: 'center',
    color: 'white',
    padding: 5,
  },
});

export default eventlistStyles;
