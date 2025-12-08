import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { setDeliveryTime } from '../store/userSlice';

export default function DeliveryTimeModal({ visible, onClose }) {
  const dispatch = useDispatch();
  const yourState = useSelector(state => state.yourReducer);
  const [selectedTime, setSelectedTime] = useState(null);

  const timeSlots = [
    { id: 1, label: 'ASAP', time: new Date(Date.now() + 30 * 60000) }, // 30 minutes from now
    {
      id: 2,
      label: 'Lunch (12:00 PM - 2:00 PM)',
      time: new Date(new Date().setHours(12, 0, 0, 0)),
    },
    {
      id: 3,
      label: 'Dinner (7:00 PM - 9:00 PM)',
      time: new Date(new Date().setHours(19, 0, 0, 0)),
    },
    {
      id: 4,
      label: 'Tomorrow Lunch',
      time: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(
        12,
        0,
        0,
        0,
      ),
    },
    {
      id: 5,
      label: 'Tomorrow Dinner',
      time: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(
        19,
        0,
        0,
        0,
      ),
    },
  ];

  const handleSelectTime = timeSlot => {
    setSelectedTime(timeSlot);
  };

  const handleConfirm = () => {
    if (selectedTime) {
      dispatch(
        setDeliveryTime({
          label: selectedTime.label,
          time: selectedTime.time.toISOString(),
        }),
      );
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Select Delivery Time</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="times" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            {timeSlots.map(slot => (
              <TouchableOpacity
                key={slot.id}
                style={[
                  styles.timeSlot,
                  selectedTime?.id === slot.id && styles.timeSlotSelected,
                ]}
                onPress={() => handleSelectTime(slot)}
              >
                <View style={styles.timeSlotContent}>
                  <Text
                    style={[
                      styles.timeSlotLabel,
                      selectedTime?.id === slot.id &&
                        styles.timeSlotLabelSelected,
                    ]}
                  >
                    {slot.label}
                  </Text>
                  <Text
                    style={[
                      styles.timeSlotTime,
                      selectedTime?.id === slot.id &&
                        styles.timeSlotTimeSelected,
                    ]}
                  >
                    {slot.label === 'ASAP'
                      ? '30 minutes'
                      : (slot.time instanceof Date
                          ? slot.time
                          : new Date(slot.time)
                        ).toLocaleDateString('en-IN', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                  </Text>
                </View>
                {selectedTime?.id === slot.id && (
                  <Icon name="check-circle" size={24} color="#b8860b" />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={[
                styles.confirmButton,
                !selectedTime && styles.confirmButtonDisabled,
              ]}
              onPress={handleConfirm}
              disabled={!selectedTime}
            >
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  content: {
    padding: 20,
  },
  timeSlot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  timeSlotSelected: {
    backgroundColor: '#fff8e1',
    borderColor: '#b8860b',
  },
  timeSlotContent: {
    flex: 1,
  },
  timeSlotLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  timeSlotLabelSelected: {
    color: '#b8860b',
  },
  timeSlotTime: {
    fontSize: 14,
    color: '#666',
  },
  timeSlotTimeSelected: {
    color: '#b8860b',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  confirmButton: {
    backgroundColor: '#b8860b',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    backgroundColor: '#ccc',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
