import {StyleSheet } from 'react-native'
function styleSheet(){
    
    return StyleSheet.create({
      leaderBoardlist:{
        //margin:10
      },
    centerContent: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputField: {
      marginTop: 40,
    },
    radioItem: {
      display: 'flex',
      flexDirection: 'row',
    },
    radioView: {
      display: 'flex',
      flexDirection: 'column',
    },
    heading: {
      fontSize: 20,
      marginBottom: 20,
      textAlign:'center'
    },
   
    listItem: {
     fontSize:30
      // width: '100%',
    },
    container: {
      flex: 1,
     
    },
    scrollView: {
      
      marginHorizontal: 20,
    },
    text: {
      fontSize: 42,
    },
    screenCenter: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor: 'blue'
    },
  });
}
export default styleSheet 