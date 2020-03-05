import React, {Component} from 'react';
import {Form, Item} from 'native-base';
import {RadioButton, Snackbar, } from 'react-native-paper';
import { BarChart} from 'react-native-chart-kit';
import {View, Text, Button,ScrollView,SafeAreaView} from 'react-native';
import getEventList from '../ApiCalls/getEventList';
import getVoteValues from '../ApiCalls/getVoteValues';
import LoadingIcon from '../Components/LoadingIcon';
import styleSheet from './leaderBoardstyles';

class LeaderBoardIndex extends Component {
  state = {
    eventName: [],
    msg: '',

    visible: false,
    selectedEvent: null,
    loading: false,
    //  dataAvali
    voteData: {
      labels: null,
      datasets: [{data: null}],
    },
  };
  handleChange = async value => {
    this.setState({selectedEvent: value, loading: true}, async () => {
      var response = await getVoteValues(this.state.selectedEvent);
      // console.log("the data is ",response.labels)
      this.setState(
        {
          voteData: {
            labels: response.labels,
            datasets: [{data: response.votes}],
          },
          loading: false,
        },
        () => {
          console.log(this.state.voteData);
        },
      );
    });
  };
  fetchVotes = async () => {
    this.setState({loading: true});
    var data = await getEventList();
    var response = data;
    if (data == null) {
      this.setState({
        msg: 'Error Fetching Data,please try again',
        visible: true,
        eventName: null,
      });
    } else {
      this.setState({
        eventName: response,
        loading: false,
      });
    }
  };
  componentDidMount = async () => {
    this.fetchVotes();
  };
  render() {
    if (this.state.eventName != null && this.state.eventName.length != 0) {
      return (
        <>
         <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
          <View style={[styles.leaderBoardlist]}>
            <Form>
              <Text style={[styles.heading]}>Select Event Name</Text>
              <RadioButton.Group

                onValueChange={value => this.handleChange(value)}
                value={this.state.selectedEvent}>
                {this.state.eventName.map(item => {
                  return (
                    <Item style={[styles.listItem]} key={item.id} onPress={() => this.handleChange(item.event_name)}>
                      <RadioButton color='#e48a32' value={item.event_name} />
                      <Text>{item.event_name}</Text>
                    </Item>
                  );
                })}
              </RadioButton.Group>
            </Form>

            {this.state.voteData.labels ==
            null ? null /* (
              <Text style={[styles.heading]}>Select An Event to view a graph</Text>
            )  */ : (
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {this.state.voteData.labels.length != 0 ? (
                  <BarChart
                    style={{
                      // width:'100%',
                      margin: 10,
                    }}
                    data={this.state.voteData}
                    width={350}
                    height={320}
                    yAxisLabel=""
                    chartConfig={{
                      backgroundColor: "#e48a32",
                      backgroundGradientFrom: "#e48a32",
                      backgroundGradientTo: "#e48a32",
                      decimalPlaces: 2, // optional, defaults to 2dp
                      color: (opacity = 0.5) =>
                        `rgba(255, 255, 255, ${opacity})`,
                      labelColor: (opacity = 1) =>
                        `rgba(255, 255, 255, ${opacity})`,
                      style: {
                        borderRadius: 16,
                      },
                      propsForDots: {
                        r: '6',
                        strokeWidth: '2',
                        stroke: '#ffa726',
                      },
                    }}
                    bezier
                    style={{
                      marginVertical: 8,
                      borderRadius: 16,
                    }}
                    verticalLabelRotation={30}
                  />
                ) : (
                  <Text style={{fontSize: 20}}>
                    Selected Event Has no data to display
                  </Text>
                )}
              </View>
            )}
            {this.state.loading ? <LoadingIcon /> : null}
          </View>

          <Snackbar
            visible={false}
            onDismiss={() => this.setState({visible: false})}
            action={{
              label: 'Ok',
              onPress: () => {
                // Do something
              },
            }}>
            {this.state.msg}
          </Snackbar>
         
          </ScrollView>
          </SafeAreaView>
        </>
        
      );
    }

    if (this.state.eventName != null && this.state.eventName.length == 0) {
      return (
        <>
          <View style={[styles.screenCenter]}>
            {this.state.loading ? <LoadingIcon /> : null}
            {/*    <Text>No Events Found</Text> */}
          </View>
          <Button title="Reload" onPress={this.fetchVotes} />
        </>
      );
    }
    if (this.state.voteData.labels == null) {
      return (
        <>
          <View style={[styles.screenCenter]}>
            <View>
              <Text>Error Fetching Data</Text>
            </View>
            <Button title="Reload" onPress={this.fetchVotes} />
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
    if (
      this.state.voteData.labels != null &&
      this.state.voteData.labels.length == 0
    ) {
      return (
        <>
          <View style={[styles.screenCenter]}>
            <Text>No Data Available For Seleced Event</Text>
          </View>
          <Button title="Reload" onPress={this.fetchVotes} />
        </>
      );
    }
  }
}
const styles = styleSheet();
export default LeaderBoardIndex;
