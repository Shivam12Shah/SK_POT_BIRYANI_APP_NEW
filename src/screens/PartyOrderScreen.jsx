import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

export default function PartyOrderScreen() {
  const dispatch = useDispatch();
  const yourState = useSelector(state => state.yourReducer);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Party Order</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: '700' },
});
