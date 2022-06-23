import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import firebase from "../../services/firebaseConnection";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ changeStatus }) {
    const [type, setType] = useState('login')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    function handleLogin() {
        if (type === 'login') {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((user) => {
                    changeStatus(user.user.uid)
                    AsyncStorage.setItem('user', user.user.uid)
                })
                .catch(error => {
                    console.log(error)
                })
        } else {
            firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
                changeStatus(user.user.uid)
            }).catch(err => console.log(err))
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
            />

            <TouchableOpacity style={[styles.handleLogin, { backgroundColor: type === 'login' ? '#3ea6f2' : '#141414' }]} onPress={handleLogin}>
                <Text style={styles.textLogin}>{type === 'login' ? "Acessar" : "Cadastrar"}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setType(type => type === 'login' ? 'cadastr' : 'login')}>
                <Text style={{ textAlign: 'center' }}> {type === 'login' ? "Criar uma conta" : "Já possuo uma conta"}</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 25,
        paddingHorizontal: 10,
        backgroundColor: "#f2f6fc",
        paddingHorizontal: 10,
    },
    input: {
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 4,
        height: 45,
        padding: 10,
        borderWidth: 1,
        borderColor: "#141414"
    },
    handleLogin: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#141414',
        height: 45,
        marginBottom: 10,
    },
    textLogin: {
        color: "#FFF",
        fontSize: 17,
    }
})