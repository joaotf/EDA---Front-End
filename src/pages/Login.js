import React from 'react'


import {
    Container,
    Input,
    ErrorMessage,
    Button,
    ButtonText,
    SignUpLink,
    SignUpLinkText,
  } from '../styles/style.js';

import {
    StyleSheet,
    AsyncStorage,
    StatusBar,
    Alert
} from 'react-native'


import api from '../services/api.js'

export default class Login extends React.Component{
   state = {
       loggedInUser:null,
       email:'',
       password:'',
   }

   handleChangeEmail = (email) => {
       this.setState({ email })
   }
   handleChangePassword = (password) => {
       this.setState({ password })
   }

    signIn = async () => {
        if(this.state.email.length === 0 && this.state.password.length === 0){
            Alert.alert("Preencha um email e senha para continuar")
        }else if(this.state.email.length === 0){
            Alert.alert("Preencha um email para continuar")
        }else if(this.state.password.length === 0){
            Alert.alert("Preencha uma senha para continuar")
        }else{
            try {
                const response = await api.post('/authenticate',{
                    email: this.state.email,
                    password: this.state.password
                });
                const { user , token } = response.data
        
                await AsyncStorage.multiSet([
                    ['@EDA:token',token],
                    ['@EDA:user',JSON.stringify(user)]
                ]);
    
                this.setState({loggedInUser: user})
    
                Alert.alert("Login realizado com sucesso")
                this.props.navigation.navigate('Home')
    
            }catch(err) {
                Alert.alert('Email ou senha incorretos,verifique suas credenciais')
            }
        }
    };

    async componentDidMount(){
        const token = await AsyncStorage.getItem('@EDA:token')
        const user = JSON.parse(await AsyncStorage.getItem('@EDA:user'))

        if(token && user)
            this.setState({ loggedInUser: user})
    }
    

    render() {
        return (
          <Container>
            <Input
              placeholder="Endereço de e-mail"
              value={this.state.email}
              onChangeText={this.handleChangeEmail}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Input
              placeholder="Senha"
              value={this.state.password}
              onChangeText={this.handleChangePassword}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
            />
            <Button onPress={this.signIn}>
              <ButtonText>Entrar</ButtonText>
            </Button>
          </Container>
        );
      }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
  });