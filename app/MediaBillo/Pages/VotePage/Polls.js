import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from 'react-native';
import getEventList from '../ApiCalls/getEventList';
import img from '../Images/bilo-logo.jpg';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LoadingIcon from '../Components/LoadingIcon';
import {Snackbar} from 'react-native-paper'
const eev = [3, 5, 54, 6, 6, 7, 7, 6, 3, 34];
class Polls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible:false,
      msg:'',
      launched: false,
      polls:[],
      // noEvent:
      loading: false,
    };
  }
  handleNavigation = event_name => {
    //console.log('event name is ',event_name)
    this.props.navigation.navigate('CastVote', {eventName: event_name});
  };
  refresList = async () => {
    this.setState({loading: true});
    var data = await getEventList()
    var response = data;
    console.log('datais ',data)
   // alert(response)
    if (response == null){
      this.setState({
        msg:'Error Fetching Events Datads',
        visible:true,
        polls:null,
        loading:false

      })
     return 
    } else{
      this.setState({
        polls: response,
        loading: false,
        
      });
    }

   
  };
  componentDidMount = async () => {
    console.log('lauched is ', this.state.launched);
   /*  if (this.state.launched == false) {
      this.setState({loading: true});
      var data = await getEventList();
      var response = data;

      this.setState({
        polls: response,
        loading: false,
        launched: true,
      });
    } */
    this.refresList()
  };
  render() {
  console.log('poll lengthis ',this.state.polls);
    if (this.state.polls != null) {
    if (this.state.polls.length == 0) {
      return (
        <>
        <View style={[styles.centerContent]}>
          {this.state.loading ? <LoadingIcon /> : null}
          {/* <TouchableOpacity>
            <ImageBackground style={[styles.pollCard]} source={img}>
              <Text style={[styles.cardText]}>No Polls Has Not Been Created</Text>
            </ImageBackground>
          </TouchableOpacity> */}

        
          </View>
        </>
      );
    }
    return (
      <>
        {this.state.loading ? <LoadingIcon /> : null}
        <ScrollView style={{height: '100%'}}>
          
          {this.state.polls.map(item => {
            return (
              <TouchableOpacity
              key={item.id}
                onPress={() => this.handleNavigation(item.event_name)}>
                <ImageBackground style={[styles.pollCard]} source={img}>
                  <Text style={[styles.cardText]}>{item.event_name}</Text>
                </ImageBackground>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <Button
          title="Refresh"
          color='#c79665'
          onPress={() => {
            this.refresList();
          }}
        />
        
      </>
    );

  }
    else if(this.state.polls == null) {
      console.log('show display snackbar')
      return (
        <>
        {this.state.loading ? <LoadingIcon /> : null}
        <TouchableOpacity>
          <ImageBackground style={[styles.pollCard]} source={img}>
            <Text style={[styles.cardText]}>Error get Polls</Text>
          </ImageBackground>
        </TouchableOpacity>
        <Button
          title="Refresh"
          style={[styles.btn]}
          onPress={() => {
            this.refresList();
          }}
        />
         <Snackbar 
          visible={this.state.visible}
          onDismiss={() => this.setState({ visible: false })}
          action={{
            label: 'Ok',
            onPress: () => {
              // Do something
            },
          }}>
        {this.state.msg}
            </Snackbar>
      </>
      )
    }
    
   
  }
}

const styles = StyleSheet.create({
  btn:{
  color:'#e48a32'
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'blue'
  },
  loading: {
    width: '100%',
    height: 2000,
    backgroundColor: 'orange',
    position: 'absolute',
  },
  pollCard: {
    backgroundColor: '#e4f0ea',
    // width: '100%',
    height: 170,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    margin: 30,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderColor: '#1d2620',
    borderWidth: 2,

    //  borderRadius: 20,
    opacity: 0.7,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.97,
    shadowRadius: 15.19,

    elevation: 23,
   
  },
  cardText: {
    display: 'flex',

    fontSize: 25,
   
    color: 'white',
    height: '100%',
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#D71182',
  },
});
export default Polls;
