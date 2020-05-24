import * as React from 'react';
import { View } from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';

export default class SuccessDialog extends React.Component {
  constructor(props) {
    super(props)
    this.dialogRef = React.createRef()
    this.state = {
      visible: false,
    };
  }
  
  

  _showDialog = () => this.setState({ visible: true });

  _hideDialog = () => {
  
   this.setState({ visible: false },()=>{
    this.props.navigator.navigate('Polls')

   }) 
    
  };

  render() {
    return (
      <View ref={this.dialogRef}>
    
        <Portal>
          <Dialog
             visible={this.state.visible}
             onDismiss={this._hideDialog}>
            <Dialog.Title>Request Sent</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Please wait for prompt and approve the transaction...</Paragraph>
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