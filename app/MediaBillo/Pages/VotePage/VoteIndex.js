import React, {Component} from 'react';
//import {Image} from 'react-native';
import {Text} from 'native-base';
import {StyleSheet, View, TouchableOpacity, Button} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import RadioButton from 'radio-button-react-native';
import VoteAmount from './VoteAmount';
import getContestants from '../ApiCalls/getContestants';
import {Snackbar} from 'react-native-paper';
import Image from 'react-native-image-progress';
import Progress from 'react-native-progress';
import img from '../Images/logo.png';
import ProgressBar from 'react-native-progress/Bar';
import LoadingIcon from '../Components/LoadingIcon';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";

class VoteIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      loading: false,
      visible: false,
      seletectedContestant: null,

      event_ame: '',
      contestants: [],
    };
  }

  handleNav = ({navigation}) => {
    if (this.state.seletectedContestant == null) {
      this.setState({
        msg: 'Choose a contestant to vote for',
        visible: true,
      });
      return;
      //alert('Choose a contestant to vote for')
    }
    this.props.navigation.navigate('Payment', {
      eventName: this.state.event_name,
      id: this.state.seletectedContestant,
    });
  };

  handleOnPress = value => {
    console.log('called' + value);
    this.setState({seletectedContestant: value});
  };
  componentDidMount = async () => {
    const eventName = this.props.route.params.eventName;
    console.log('load contestant for ', eventName);
    this.setState({loading: true});
    var data = await getContestants(eventName);
    console.log(data);
    this.setState({
      contestants: data,
      event_name: eventName,
      loading: false,
    });
  };
  render() {
    if (this.state.contestants.length === 0) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          {this.state.loading ? <LoadingIcon /> : null}
        </View>
      );
    } else {
      return (
        <>
          <FlatGrid
            itemDimension={300}
            items={this.state.contestants}
            style={styles.gridView}
            renderItem={({item, index}) => (
              <View style={[styles.OuterContainer]}>
              <View
                style={[styles.itemContainer, {backgroundColor: '#D71182'}]}
                onPress={() => this.handleOnPress(item.id)}>
                <TouchableOpacity onPress={() => this.handleOnPress(item.id)}>
                  <Image
                    source={{
                      uri: 'https://www.startransittravels.org/MEDIA BILLO/dashboard/adminresources' + item.image_path,
                    }}
                    indicator={ProgressBar}
                    indicatorProps={{
                      size: 80,
                      borderWidth: 0,
                      color: 'rgba(150, 150, 150, 1)',
                      unfilledColor: 'rgba(200, 200, 200, 0.2)',
                    }}
                    style={[styles.imgItem]}
                  />
                </TouchableOpacity>

                <RadioButton
                  currentValue={this.state.seletectedContestant}
                  value={item.id}
                  outerCircleSize={20}
                  onPress={() => this.handleOnPress(item.id)}>
                  <Text style={styles.itemName}>{item.contestant_name}</Text>
                </RadioButton>
              </View>
              </View>
            )}
          />

          <Button title="Proceed" onPress={this.handleNav} />
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
        </>
      );
      // });
    }
  }
}
const styles = StyleSheet.create({
 
  gridView: {
    marginTop: 20,
    flex: 1,
  },
  OuterContainer:{

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign:'center'
  },
  itemContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
    height: 350,
   // width:300
  },
  itemName: {
    textAlign:'center',
    fontSize: 12,
    color: '#fff',
    
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  imgItem: {
    width: 250,
    height: 300,
  },
});
export default VoteIndex;
