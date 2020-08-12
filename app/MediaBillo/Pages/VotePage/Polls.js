import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Alert,
  Linking
} from 'react-native';

import {
  Content,
  Container,
  Card,
  CardItem,
  Button,
  Icon,
  Fab,
} from 'native-base';
import getEventList from '../ApiCalls/getEventList';
import img from '../Images/bilo-logo.jpg';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LoadingIcon from '../Components/LoadingIcon';
import {Snackbar} from 'react-native-paper';
import noEventimg from '../Images/nodata.png';
import errorImage from '../Images/billoerror.png';
import PollCardItem from './PollCardItem';
import Pollstylesheet from './Pollstylesheet';

const play_store_link = 'https://play.google.com/store/apps/details?id=com.mediabillo'
const appversion = 4;
class Polls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      msg: '',
      launched: false,
      polls: [],
      // noEvent:
      //use the versionCode from the graddle file
      loading: false,
    };
  }
  handleNavigation = event_name => {
    //console.log('event name is ',event_name)
    this.props.navigation.navigate('CastVote', {eventName: event_name});
  };
  refresList = async () => {
    this.setState({loading: true});
    var data = await getEventList();
    var response = data;
    console.log('datais ', data);
    // alert(response)
    if (response == null) {
      this.setState({
        msg: 'Error Fetching Events Datads',
        visible: true,
        polls: null,
        loading: false,
      });
      return;
    } else {
      if(response.app_version === appversion) {
        this.setState({
          polls: response.polls,
          loading: false,
        });
      } else{
        this.setState({loading:false})
        Alert.alert('Update','A new version has been found, please update to enjoy the voting experience',
        [
          {
            text:'Update',
            onPress: ()=>{
                Linking.openURL(play_store_link)
            }
          }
        ])
      }
    
    }
  };
  componentDidMount = async () => {
    this.refresList();
  };
  render() {
    console.log('poll lengthis ', this.state.polls);
    if (this.state.polls != null) {
      if (this.state.polls.length == 0) {
        return (
          <>
            <View style={[styles.centerContent]}>
              {this.state.loading ? (
                <LoadingIcon />
              ) : (
                <TouchableOpacity>
                  <ImageBackground style={[styles.bgImg]} source={noEventimg} />
                </TouchableOpacity>
              )}
            </View>
          </>
        );
      }
      return (
        <>
          <Container>
            <Content>
              {this.state.loading ? <LoadingIcon /> : null}
              {/*  <ScrollView style={{height: '100%'}}> */}
              {this.state.polls.map(item => {
                return (
                  <PollCardItem key={item.id} 
                  ended = {item.is_ended}
                  eventname={item.event_name} 
                  imgpath={item.image_url} 
                  navigate={this.handleNavigation}/>
                
                );
              })}
              {/*  </ScrollView> */}
            </Content>
          </Container>
          <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{}}
            style={{backgroundColor: '#00adf1'}}
            position="bottomRight"
            dis
            onPress={() => {
              this.refresList();
            }}>
            <Icon name="refresh" />
          </Fab>
        </>
      );
    } else if (this.state.polls == null) {
      console.log('show display snackbar');
      return (
        <>
          <View style={[styles.centerContent]}>
            {this.state.loading ? <LoadingIcon /> : null}
            <TouchableOpacity>
              <ImageBackground style={[styles.errorImg]} source={errorImage} />
            </TouchableOpacity>
            <Fab
              active={this.state.active}
              direction="up"
              containerStyle={{}}
              style={{backgroundColor: '#00adf1'}}
              position="bottomRight"
              dis
              onPress={() => {
                this.refresList();
              }}>
              <Icon name="refresh" />
            </Fab>
            <Snackbar
              visible={this.state.visible}
              onDismiss={() => this.setState({visible: false})}
              action={{
                label: 'Ok',
                onPress: () => {
                  // null
                },
              }}>
              {this.state.msg}
            </Snackbar>
          </View>
        </>
      );
    }
  }
}

const styles =  Pollstylesheet()
export default Polls;
