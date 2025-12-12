import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/userSlice';
import { sendOTP } from '../store/authActions';
import OtpScreen from './OtpScreen';

export default function LoginScreen({ onBack }) {
  const dispatch = useDispatch();

  const [phone, setPhone] = useState('');
  const [valid, setValid] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [method, setMethod] = useState('sms'); // 'sms' or 'whatsapp'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const digits = phone.replace(/\D/g, '');
    setValid(digits.length === 10);
  }, [phone]);

  async function sendOtpToPhone() {
    if (!valid) return;

    setLoading(true);
    setError('');

    const phoneNumber = phone.replace(/\D/g, '');
    const result = await dispatch(sendOTP(phoneNumber));

    setLoading(false);

    if (result.success) {
      setOtpSent(true);
    } else {
      setError(result.error || 'Failed to send OTP. Please try again.');
    }
  }

  if (otpSent) {
    return (
      <OtpScreen
        phone={phone}
        onVerified={() => { }} // Verification handled in OtpScreen
        onBack={() => setOtpSent(false)}
      />
    );
  }

  return (
    <View style={styles.container}>
      {/* Header with Back Arrow */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Icon name="chevron-left" size={20} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Login</Text>
        <View style={{ width: 20 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Illustration Placeholder */}
        <View style={styles.illustration}>
          <Icon name="lock" size={80} color="#b8860b" />
        </View>

        <Text style={styles.title}>This won't take long!</Text>

        {/* SMS / WhatsApp Toggle */}
        <View style={styles.methodToggle}>
          <TouchableOpacity
            style={[
              styles.methodBtn,
              method === 'sms' && styles.methodBtnActive,
            ]}
            onPress={() => setMethod('sms')}
          >
            <Icon
              name="comment"
              size={16}
              color={method === 'sms' ? '#b8860b' : '#999'}
            />
            <Text
              style={[
                styles.methodText,
                method === 'sms' && styles.methodTextActive,
              ]}
            >
              SMS
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.methodBtn,
              method === 'whatsapp' && styles.methodBtnActive,
            ]}
            onPress={() => setMethod('whatsapp')}
          >
            <Icon
              name="whatsapp"
              size={16}
              color={method === 'whatsapp' ? '#b8860b' : '#999'}
            />
            <Text
              style={[
                styles.methodText,
                method === 'whatsapp' && styles.methodTextActive,
              ]}
            >
              WhatsApp
            </Text>
          </TouchableOpacity>
        </View>

        {/* Phone Input */}
        <View style={styles.form}>
          <View style={styles.phoneRow}>
            <View style={styles.countryCode}>
              <Text style={styles.countryCodeText}>IND</Text>
              <Icon name="chevron-down" size={12} color="#000" />
            </View>
            <Text style={styles.plus}>+91</Text>
            <TextInput
              style={styles.phoneInput}
              placeholder="Please Enter Mobile Number"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              maxLength={10}
            />
          </View>

          <Text style={styles.hint}>
            You'll receive a 6-digit OTP through{' '}
            {method === 'sms' ? 'SMS' : 'WhatsApp'}.
          </Text>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity
            style={[styles.button, (!valid || loading) && styles.buttonDisabled]}
            onPress={sendOtpToPhone}
            disabled={!valid || loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>SEND OTP</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* T&C */}
        <Text style={styles.termsText}>
          I accept the Terms and Conditions of{' '}
          <Text style={styles.termsLink}>Behrouz Biryani.</Text>{' '}
          <Text style={styles.readMore}>Read more</Text>
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  content: { paddingHorizontal: 16, paddingVertical: 20 },
  illustration: { alignItems: 'center', marginVertical: 24 },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 12,
    color: '#333',
  },
  methodToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#f0f0f0',
  },
  methodBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  methodBtnActive: { borderBottomColor: '#b8860b' },
  methodText: { marginLeft: 8, color: '#999', fontWeight: '500' },
  methodTextActive: { color: '#b8860b', fontWeight: '700' },
  form: { marginTop: 20 },
  phoneRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    marginRight: 8,
    backgroundColor: '#f9f9f9',
  },
  countryCodeText: { fontWeight: '700', marginRight: 4 },
  plus: { fontSize: 16, fontWeight: '700', marginRight: 8, color: '#333' },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    fontSize: 14,
  },
  hint: { color: '#999', fontSize: 12, marginBottom: 16 },
  button: {
    marginTop: 16,
    backgroundColor: '#b8860b',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: { backgroundColor: '#ccc' },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  termsText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 24,
  },
  termsLink: { fontWeight: '700', color: '#333' },
  readMore: { color: '#b8860b', fontWeight: '700' },
  errorText: {
    color: '#ef4444',
    fontSize: 14,
    marginBottom: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});
