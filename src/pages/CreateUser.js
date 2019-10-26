import React, { Component } from 'react';


import api from '../services/api';

import {
  Input
} from '../styles/styles';

import {
    View,
    Button,
    AsyncStorage,
    Alert,
} from 'react-native';

export default class Add_User extends Component {
  
  state = {
    nome: '',
    endereco: '',
    bairro: '',
    lugar: '',
    numero: '',
    sucess:'',
    error:'',
    token:''
  };

  static navigationOptions = {
    title: "Cadastro",
  };

  async componentDidMount(){
    this.setState({token: await AsyncStorage.getItem('@EDA:token')})
  }
  handleNomeChange = (nome) => {
    this.setState({ nome });
  };

  handleEnderecoChange = (endereco) => {
    this.setState({ endereco });
  };

  handleBairroChange = (bairro) => {
    this.setState({ bairro });
  };
  
  handleLugarChange = (lugar) => {
    this.setState({ lugar });
  };

  handleNumeroChange = (numero) => {
    this.setState({ numero });
  };

  handleSignUpUser = async () => {
      try {
        await api.post('/add_client', {
          nome: this.state.nome,
          endereco: this.state.endereco,
          bairro: this.state.bairro,
          lugar: this.state.lugar,
          numero: this.state.numero,
        },{
          headers:{
            'Authorization': `Bearer ${this.state.token}`
        }
        });
        Alert.alert("Cliente cadastrado com sucesso!")
        this.props.navigation.navigate('Home')
      } catch (_err) {
        this.setState({ error: 'Houve um problema com o cadastro, verifique os dados preenchidos!' });
      }
  };

  render() {
    return (
        <View style={{
            backgroundColor:"#6800BF",
            flex:1,
        }}>
        <Input
          placeholder="Nome"
          value={this.state.username}
          onChangeText={this.handleNomeChange}
          autoCapitalize="none"
          autoCorrect={false}
          required={true}
        />
        <Input
          placeholder="Endereço"
          value={this.state.email}
          onChangeText={this.handleEnderecoChange}
          autoCapitalize="none"
          autoCorrect={false}
          required={true}
        />
        <Input
          placeholder="Bairro"
          value={this.state.bairro}
          onChangeText={this.handleBairroChange}
          autoCapitalize="none"
          autoCorrect={false}
          required={true}
        />
        <Input
          placeholder="Apartamento/Casa"
          value={this.state.lugar}
          onChangeText={this.handleLugarChange}
          autoCapitalize="none"
          autoCorrect={false}
          required={true}
        />
        <Input
          placeholder="Número"
          value={this.state.numero}
          onChangeText={this.handleNumeroChange}
          autoCapitalize="none"
          autoCorrect={false}
          required={true}
        />
        <Button
            title="Cadastrar"
            onPress={this.handleSignUpUser}
        />
        </View>
  
    );
  }
}