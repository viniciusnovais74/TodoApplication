import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather'
export default function TaskList({ task, deleteItem, editItem }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ marginRight: 10 }} onPress={() => deleteItem(task.id)}>
        <Feather name="trash" color="#FFF" size={20} />
      </TouchableOpacity>
      <View style={{ paddingRight: 10 }}>
        <TouchableWithoutFeedback onPress={()=>editItem(task)}>
          <Text style={{ color: "#FFF", paddingRight: 10 }}>{task.title}</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#121212',
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
  }
})