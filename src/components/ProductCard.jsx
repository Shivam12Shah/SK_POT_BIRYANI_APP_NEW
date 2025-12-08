import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

export default function ProductCard({ title, price }) {
  const dispatch = useDispatch();
  const yourState = useSelector(state => state.yourReducer);

  console.log('Rendering ProductCard:', title, price);
  return (
    <View style={styles.card}>
      <View style={styles.visual} />
      <View style={styles.body}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.row}>
          <Text style={styles.price}>₹{price}</Text>
          <TouchableOpacity style={styles.addBtn} activeOpacity={0.8}>
            <Text style={styles.addText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 200,
    marginRight: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eee',
  },
  visual: { height: 110, backgroundColor: '#333' },
  body: { padding: 8 },
  title: { fontWeight: '700' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  price: { fontWeight: '700' },
  addBtn: {
    borderWidth: 1,
    borderColor: '#e0c77a',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addText: { color: '#b8860b', fontWeight: '700' },
});
