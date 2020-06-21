import * as React from 'react';
import {View} from 'react-native';
import {Button, Paragraph, Dialog, Portal} from 'react-native-paper';
import {Input} from 'react-native-elements';
export default class SuccessDialog extends React.Component {
  constructor(props) {
    super(props);
    this.dialogRef = React.createRef();
    this.state = {
      visible: false,
      otp: '',
    };
  }

  _showDialog = () => this.setState({visible: true});

  _hideDialog = () => {
    this.setState({visible: false}, () => {
      //this.props.navigator.navigate('Polls')

      this.props.otpcall(this.state.otp)
    });
  };

  render() {
    return (
      <View ref={this.dialogRef}>
        <Portal>
          <Dialog visible={this.state.visible} onDismiss={this._hideDialog}>
            <Dialog.Title>Request Sent</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Please enter the pin sent by sms...</Paragraph>
              <Input
                leftIcon={{type: 'font-awesome', name: 'lock'}}
                keyboardType="numeric"
                value={this.state.otp}
                onChangeText={text => this.setState({otp: text})}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={this._hideDialog}>Ok</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    );
  }
}
