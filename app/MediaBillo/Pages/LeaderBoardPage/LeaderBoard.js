import React, {Component} from 'react';
import {Form, Item, Right} from 'native-base';
import {RadioButton, Snackbar} from 'react-native-paper';
//import {BarChart} from 'react-native-chart-kit';
import {View, Text, Button, ScrollView, SafeAreaView} from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import getEventList from '../ApiCalls/getEventList';
import getVoteValues from '../ApiCalls/getVoteValues';
import LoadingIcon from '../Components/LoadingIcon';
import styleSheet from './leaderBoardstyles';
import RefreshFab from './RefreshFab';
import StatisticsCard from '../Components/StatisticsCard';
class LeaderBoardIndex extends Component {
  state = {
    eventName: [],
    msg: '',

    visible: false,
    selectedEvent: null,
    loading: false,
   
    voteData: {
      labels: null,
      datasets: [{data: null}],
    },
    voteDataArray: null,
  };
  handleChange = async value => {
    this.setState({selectedEvent: value, loading: true}, async () => {
    
      var response = await getVoteValues(this.state.selectedEvent);
      console.log('the data is ', response.votes);
      this.setState(
        {
          voteData: {
            labels: response.labels,
            datasets: [{data: response.votes}],
          },
          voteDataArray: response.alldata,
          loading: false,
        }
      );
    });
  };
  fetchVotes = async () => {
    this.setState({loading: true, selectedEvent: null});
    var data = await getEventList();
    var response = data.polls;

    if (data == null) {
      this.setState({
        msg: 'Error Fetching Data,please try again',
        visible: true,
        eventName: null,
        loading: false,
      });
    } else {
      this.setState({
        eventName: response,
        loading: false,
      });
    }
  };
  componentDidMount = () => {
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
                  <Text style={[styles.heading]}>Select Event</Text>
                  <RadioButton.Group
                    onValueChange={value => this.handleChange(value)}
                    value={this.state.selectedEvent}>
                    {this.state.eventName.map(item => {
                      return (
                        <Item
                          style={[styles.listItem]}
                          key={item.id}
                          onPress={() => this.handleChange(item.event_name)}>
                          <RadioButton
                            color="#D71182"
                            value={item.event_name}
                          />
                          <Text>{item.event_name}</Text>
                        </Item>
                      );
                    })}
                  </RadioButton.Group>
                </Form>

                {this.state.voteDataArray != null
                  ? this.state.voteDataArray.map(item => {
                      return (
                        <StatisticsCard
                          name={item.contestant_name}
                          imagePath={item.image_path}
                          votes={item.votes}
                        />
                      );
                    })
                  : null}

                {
                  //PLACEHOLDER FOR GRAPH
                }

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
            <RefreshFab refresh={this.fetchVotes} />
          </SafeAreaView>
        </>
      );
    }

    if (this.state.eventName != null && this.state.eventName.length == 0) {
      return (
        <>
          <View style={[styles.screenCenter]}>
            {this.state.loading ? <LoadingIcon /> : null}
           
          </View>
        </>
      );
    }
    if (this.state.voteData.labels == null) {
      return (
        <>
          <View style={[styles.screenCenter]}>
            {this.state.loading ? <LoadingIcon /> : null}
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
    } else {
      <>
        <View>
          <Text>Unknown Error</Text>
        </View>
      </>;
    }
  }
}
const styles = styleSheet();
export default LeaderBoardIndex;
