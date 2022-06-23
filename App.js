import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, FlatList, Keyboard } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import firebase from "./src/services/firebaseConnection";
import Login from './src/components/Login'
import TaskList from './src/components/TaskList'
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function App() {
  console.log(AsyncStorage.getItem('user'))
  const [user, setUser] = useState(AsyncStorage.getItem('user')._W)
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [id, setId] = useState(null)
  const [type, setType] = useState('add')
  const inputRef = useRef();
  useEffect(() => {
    if (!user) return;

    firebase.database().ref("tarefas").child(user).once('value', (snap) => {
      setTasks([])

      snap?.forEach(childs => {
        let data = {
          id: childs.val().id,
          title: childs.val().title,
          done: childs.val().done
        }
        setTasks(tasks => [...tasks, data])
      })
    })
  }, [user])

  if (!user) return <Login changeStatus={(user) => setUser(user)} />

  function handleAdd() {
    if (newTask === '') return
    if (type === 'add') {
      let tarefas = firebase.database().ref("tarefas").child(user);
      let chave = tarefas.push().key

      tarefas.child(chave).set({
        id: chave,
        title: newTask,
        done: false
      }).then(() => {
        setTasks(a => [...a, { id: chave, title: newTask }])
      })
    } else {
      let tarefas = firebase.database().ref("tarefas").child(user);
      tarefas.child(id).update({ title: newTask }).then(() => {
        setTasks(tasks.map(task => task.id === id ? { ...task, title: newTask } : task))
      })
      setType('add')
      setId(null)

    }
    Keyboard.dismiss();
    setNewTask('')
  }
  function handleDelete(key) {
    firebase.database().ref("tarefas").child(user).child(key).remove()
    setTasks(a => a.filter(task => task.id !== key))
  }

  function handleEdit(data) {
    setNewTask(data.title)
    setId(data.id)
    setType('edit')
    inputRef.current.focus();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerTask}>
        {id ?
          <TouchableOpacity style={[styles.buttonAdds, { backgroundColor: "red", marginLeft: 0, marginRight: 5 }]} onPress={() => [setId(null),setNewTask(""),setType('add')]}>
            <Feather name="x-circle" color="#FFF" size={20} />
          </TouchableOpacity>
          : null}
        <TextInput
          style={styles.input}
          placeholder="O que vai fazer hoje?"
          value={newTask}
          onChangeText={text => setNewTask(text)}
          ref={inputRef}
        />

        <TouchableOpacity style={[styles.buttonAdds, { backgroundColor: type !== 'add' ? "green" : "#3ea6f2" }]} onPress={() => handleAdd()}>
          <Text style={styles.buttonText}>{type === 'add' ? <Feather name="plus" size={25} color="#FFF" /> : <Feather name="edit" size={18} color="#FFF" />}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <TaskList task={item} deleteItem={handleDelete} editItem={handleEdit} />}
      />
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 10,
    backgroundColor: "#f2f6fc"
  },
  containerTask: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#141414",
    height: 45
  },
  buttonAdds: {
    backgroundColor: '#3ea6f2',
    borderRadius: 4,
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5
  },
  buttonText: {
    color: '#fff',
    fontSize: 28,

  }
})