import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
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
class Polls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      msg: '',
      launched: false,
      polls: [],
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
      this.setState({
        polls: response,
        loading: false,
      });
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
                  <PollCardItem key={item.id} eventname={item.event_name} imgpath={item.image_url} navigate={this.handleNavigation}/>
                
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
                  // Do something
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

const styles = StyleSheet.create({
  btn: {
    color: '#e48a32',
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
  card: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 30,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  carditem: {
    backgroundColor: '#eae6ed',
  },
  pollCard: {
    height: 170,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    color: 'white',
    width: responsiveWidth(100),
  },
  bgImg: {
    height: 350,
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    width: responsiveWidth(60),
  },
  errorImg: {
    height: 210,
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    width: responsiveWidth(50),
  },

  cardText: {
    fontSize: 25,
    color: '#7a6464',
    height: '100%',
    width: '100%',
    textAlign: 'center',
  },
  btn: {
    alignSelf: 'flex-start',
    backgroundColor: '#c969a8',
    width: 70,
    margin: 10,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  refreshBtn: {
    alignSelf: 'center',
    backgroundColor: '#c969a8',
    width: 70,
    margin: 10,
    height: 40,
    textAlign: 'center',
  },
});
export default Polls;
