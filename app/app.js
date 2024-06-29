import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { Card } from 'react-native-paper';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const apiKey = 'pk-yDfQBaWYbtpPfJbGvIieEZIRlBdaxQmj';
  const endpoint = 'https://api.pawan.krd/cosmosrp/v1';

  const sendMessage = () => {
    if (inputMessage.trim() === '') {
      return;
    }

    setLoading(true);
    axios.post(endpoint, {
      message: inputMessage,
      apiKey: apiKey
    }).then(response => {
      if (response.data && response.data.message) {
        setMessages([...messages, { text: inputMessage, sender: 'user' }, { text: response.data.message, sender: 'bot' }]);
      } else {
        setMessages([...messages, { text: inputMessage, sender: 'user' }, { text: 'Error: Invalid response from server', sender: 'bot' }]);
      }
      setInputMessage('');
    }).catch(error => {
      setMessages([...messages, { text: inputMessage, sender: 'user' }, { text: 'Error sending message. Please try again.', sender: 'bot' }]);
    }).finally(() => {
      setLoading(false);
    });
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {messages.map((msg, index) => (
        <Card key={index} style={{ padding: 10, marginVertical: 5, backgroundColor: msg.sender === 'bot' ? '#f0f0f0' : '#e0e0e0' }}>
          <Text style={{ color: msg.sender === 'bot' ? '#000' : '#fff' }}>{msg.text}</Text>
        </Card>
      ))}
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        value={inputMessage}
        onChangeText={setInputMessage}
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

export default Chatbot;