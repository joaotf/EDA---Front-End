import React from 'react'
import api from '../services/api.js'

import { FloatingAction } from "react-native-floating-action";
import { SearchBar } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

import { Fonts } from '../utils/Font.js'

import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Alert,
} from 'react-native'

export default class Main extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            loading: false,      
            error: null,    
            clients:[],
            token:''
    };
        this.arrayholder = []
        this.actions = [
            {
                text:"Criar cliente",
                icon:require('../images/adduser.png'),
                name:"add_user",
                position:1
            }
        ]
    }
    static navigationOptions = {
        title: "Égua du Açaí",
        headerLeft:null
    };
    shouldComponentUpdate(nextProps, nextState) {
        return this.state.clients !== nextState.clients;
    }
    async componentDidMount(){
        this.setState({token:await AsyncStorage.getItem('@EDA:token')})
        this.loadClients()
    }

    loadClients = async () => {
        try {  
            const response = await api.get("/clients",{
                headers:{
                    'Authorization': `Bearer ${this.state.token}`
                }
            })
            this.setState({ clients: response.data })
            this.arrayholder = response.data
        } catch (error) {
            this.setState({error:"Erro!"})
        }
    }
    

    searchFilterFunction = text => {
        this.setState({
          value: text,
        });
        
        if(this.state.value !== ''){
          const newData = this.arrayholder.filter(item => {
          const itemData = `${item.nome.toUpperCase()}`;
          const textData = text.toUpperCase();
    
          return itemData.indexOf(textData) > -1;
        });
        this.setState({
          clients: newData,
            });
        }
    };
      
      renderHeader = () => {
        return (
            <SearchBar
                placeholder="Type Here..."
                lightTheme
                round
                onChangeText={text => this.searchFilterFunction(text)}
                autoCorrect={false}
                value={this.state.value}
                style={{
                    padding:20
                }}
                 />
        )
      };
      

    renderItem = ({ item }) => (
        <View style={styles.userContainer}>
            <Text style={styles.nome}>{item.nome}       </Text>
            <Text style={styles.endereco}>{item.endereco}</Text>
            <Text style={styles.endereco}>{item.bairro}</Text>
            <Text style={styles.endereco}>{item.lugar}</Text>
            <Text style={styles.endereco}>{item.numero}</Text>
        </View>
    )

    render(){ 
        return (
            <View style={styles.container}>
                <FlatList
                    contentContainerStyle={styles.list}
                    data={this.state.clients}
                    keyExtractor={item => item._id}
                    renderItem={this.renderItem}
                    ListHeaderComponent={this.renderHeader}
                />
                <FloatingAction
                    actions={this.actions}
                    onPressItem={name => {this.props.navigation.navigate('Second')}}
                    color="#743B8C"
                />
            </View>
            
        );
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#92BF4E"
    },
    list :{
        padding:15,
    },
    userContainer:{
        backgroundColor:'#fff',
        borderWidth:1,
        borderColor:"#DDD",
        borderRadius:5,
        padding:20,
        marginBottom:10,
        marginTop:10
    },
    nome:{
        fontFamily:Fonts.BebasNeue,
        fontSize:23,
        fontWeight:'bold',
        color:'#333'
    },
    endereco:{
        fontSize:17,
        
        color:"#1C1C1C",
        marginTop:5,
        lineHeight:24
    },
    busca:{
        marginTop:50,
    }
});