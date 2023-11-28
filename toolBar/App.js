import React, { Component } from 'react';
import { View, BackHandler } from 'react-native';
import MessageList from './components/MessageList';
import Toolbar from './components/Toolbar';
import {
  createImageMessage,
  createLocationMessage,
  createTextMessage,
} from './utils/MessageUtils';

class Message extends Component {
  state = {
    messages: [
      createImageMessage('https://t4.ftcdn.net/jpg/00/98/26/11/360_F_98261159_Po5JS7ds82XaePJIsG1MiEtHRzOeUPNj.jpg'),
      createTextMessage('Picture Icons of Message for Testing'),
      createTextMessage('Change of'),
      createLocationMessage({
        latitude: 37.78825,
        longitude: -122.4324,
      }),
    ],
    fullscreenImageId: null,
    isInputFocused: false,
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    const { fullscreenImageId } = this.state;
    if (fullscreenImageId) {
      this.setState({ fullscreenImageId: null });
      return true;
    }
    return false;
  };

  handlePressMessage = (message) => {
    const { fullscreenImageId } = this.state;
    this.setState({
      fullscreenImageId:
        message.type === 'image' ? message.id : null,
    });
  };

  handlePressToolbarCamera = () => {
    // Implement camera handling logic
  };

  handlePressToolbarLocation = () => {
    // Implement location handling logic
  };

  handleChangeFocus = (isFocused) => {
    this.setState({ isInputFocused: isFocused });
  };

  handleSubmit = (text) => {
    const { messages } = this.state;
    this.setState({
      messages: [createTextMessage(text), ...messages],
    });
  };

  renderToolbar() {
    const { isInputFocused } = this.state;
    return (
      <View style={styles.toolbar}>
        <Toolbar
          isFocused={isInputFocused}
          onSubmit={this.handleSubmit}
          onChangeFocus={this.handleChangeFocus}
          onPressCamera={this.handlePressToolbarCamera}
          onPressLocation={this.handlePressToolbarLocation}
        />
      </View>
    );
  }

  renderMessageList() {
    const { messages, fullscreenImageId } = this.state;

    return (
      <View style={styles.content}>
        <MessageList
          messages={messages}
          onPressMessage={this.handlePressMessage}
          fullscreenImageId={fullscreenImageId}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderMessageList()}
        {this.renderToolbar()}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
  },
  toolbar: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.04)',
  },
};

export default Message;
