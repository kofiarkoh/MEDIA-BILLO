import React, {Component} from 'react';
import {Text} from 'native-base';
import {StyleSheet, View, TouchableHighlight} from 'react-native';
import {Button} from 'native-base';
import * as Animatable from 'react-native-animatable';

import {FlatGrid} from 'react-native-super-grid';
import RadioButton from 'radio-button-react-native';
import getContestants from '../ApiCalls/getContestants';
import {Snackbar} from 'react-native-paper';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import LoadingIcon from '../Components/LoadingIcon';
import checkedIcon from '../Images/checkedicon.png';
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
clearSelection = ()=>[
  this.setState({
    checked: false,
    seletectedContestant: null,

  })
]
  handleNav = () => {
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
      price :this.props.route.params.charge
    });
  };

  handleOnPress = value => {
    console.log('called' + value);
    this.setState({seletectedContestant: value});
  };
  _renderCheckedIcon = () => {
    // if ()
  };
  componentDidMount = async () => {
    const eventName = this.props.route.params.eventName;
   
    this.setState({loading: true});
    var data = await getContestants(eventName);
  //  console.log(data);
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
            itemDimension={150} //300
            items={this.state.contestants}
            style={styles.gridView}
            renderItem={({item, index}) => (
              <View style={[styles.OuterContainer]}>
                <View
                  style={[
                    styles.itemContainer,
                    {
                      backgroundColor:
                        this.state.seletectedContestant === item.id
                          ? '#4f2e2b'
                          : '#D71182',
                    },
                  ]}
                  onPress={() => this.handleOnPress(item.id)}>
                  <TouchableHighlight
                    onPress={() => this.handleOnPress(item.id)}>
                    <View style={{position: 'relative'}}>
                      <Image
                        source={{
                          uri: item.image_path
                        }}
                        indicator={ProgressBar}
                        indicatorProps={{
                          size: 80,
                          borderWidth: 0,
                          color: 'rgba(150, 150, 150, 1)',
                          unfilledColor: 'rgba(200, 200, 200, 0.2)',
                        }}
                        style={[
                          styles.imgItem,
                          {
                            opacity:
                              this.state.seletectedContestant === item.id
                                ? 0.4
                                : 1,
                          },
                        ]}
                      />
                      {this.state.seletectedContestant === item.id ? 
                        <Animatable.View
                        style={{position: 'absolute', top: 0, right: 40}}
                          animation="fadeIn"
                          iterationCount={1}
                          direction="alternate">
                          <Image
                           
                            source={checkedIcon}
                          />
                        </Animatable.View>
                       : null}
                    </View>
                  </TouchableHighlight>

                  <RadioButton
                    currentValue={this.state.seletectedContestant}
                    value={item.id}
                   /*  outerCircleSize={20}
                    innerCircleColor='red'
                    innerCircleSize={15} */
                    
                    onPress={() => this.handleOnPress(item.id)}>
                    <Text style={styles.itemName}>{item.contestant_name}</Text>
                  </RadioButton>
                </View>
              </View>
            )}
          />
          <Button primary style={[styles.clrBtn]} onPress={this.clearSelection}>
            <Text style={{color:'red'}}>Clear Selection</Text>
          </Button>

          <Button primary style={[styles.btn]} onPress={this.handleNav}>
            <Text>Proceed</Text>
          </Button>
          <Snackbar
            visible={this.state.visible}
            onDismiss={() => this.setState({visible: false})}
            action={{
              label: 'Ok',
              onPress: () => {
                // nothing here
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
  OuterContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  itemContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    padding: 2,
    //height: 350,
    // width:300
  },
  itemName: {
    textAlign: 'center',
    fontSize: 15,
    color: '#fff',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  imgItem: {
    width: 160, //250,
    height: 200, //300,
  },
  btn: {
    alignSelf: 'flex-end',
    backgroundColor: '#ff00a6',

    width: 105,
    margin: 10,
    height: 40,

    textAlign: 'center',
  },
  clrBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#ffc2e4',
    position:'absolute',
    bottom:0,
    width: 120,
    margin: 10,
    height: 40,

    textAlign: 'center',
  },
});
export default VoteIndex;
