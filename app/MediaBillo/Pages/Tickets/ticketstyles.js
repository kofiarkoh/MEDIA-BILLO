const { StyleSheet } = require("react-native");

const ticketstyles  = StyleSheet.create({
    h1:{
        fontSize:20,
        fontFamily:'roboto',
        color:'rgb(249, 238, 255)'
    },
    h2:{
        fontFamily :'segoe-ui',
        fontSize: 30,
        color:'rgb(233, 199, 247)',
       // color:'red',
    },
    mainView:{
        display:'flex',
        flex:1
    },
    view1:{
        flex:1,
        backgroundColor:'#D71182',
        justifyContent:'center',
        alignItems:'center',
       // height:300,
      /*   borderBottomRightRadius:20,
        borderBottomLeftRadius:20 */
    },
    view2:{
        flex:1,
        justifyContent:'center',
        
    
    },
    btnView:{
       /*  backgroundColor:'green',
        justifyContent: 'center',
        alignItems:'center' */
    },
    btn:{
        backgroundColor: '#00adf1', // '#D71182',
        width:'50%',
        alignSelf:'center',
        color:'white',
        padding:5
    }

})

export default ticketstyles