import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import { verifyOTP } from '../store/authActions';

export default function OtpScreen({ phone, onVerified, onBack }) {
  const dispatch = useDispatch();

  const [digits, setDigits] = useState(['', '', '', '', '', '']); // 6 digits
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Create refs for each input
  const inputRefs = useRef([]);

  // No auto-fill - user must enter manually

  const handleDigitChange = (index, value) => {
    // Only allow numbers
    if (value && !/^[0-9]$/.test(value)) return;

    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (index, key) => {
    // Handle backspace
    if (key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  async function handleVerify() {
    setError('');
    const code = digits.join('');
    if (code.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setLoading(true);
    const phoneNumber = phone.replace(/\D/g, '');
    const result = await dispatch(verifyOTP(phoneNumber, code, 'user'));
    setLoading(false);

    if (result.success) {
      setVerified(true);
      // Auto-proceed after verification
      setTimeout(() => {
        onVerified && onVerified(code);
      }, 800);
    } else {
      setError(result.error || 'Invalid OTP. Please try again.');
    }
  }

  return (
    <View style={styles.container}>
      {/* Header with Back Arrow */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Icon name="chevron-left" size={20} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Enter OTP</Text>
        <View style={{ width: 20 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Enter the 6-digit code</Text>
        <Text style={styles.subtitle}>We sent it to +91 {phone} via SMS</Text>

        {/* OTP Boxes with TextInput */}
        <View style={styles.otpRow}>
          {digits.map((d, i) => (
            <TextInput
              key={i}
              ref={(ref) => (inputRefs.current[i] = ref)}
              style={styles.otpBox}
              value={d}
              onChangeText={(value) => handleDigitChange(i, value)}
              onKeyPress={({ nativeEvent: { key } }) => handleKeyPress(i, key)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
              autoFocus={i === 0}
            />
          ))}
        </View>

        {/* Error Message */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Single Verify OTP Button */}
        <TouchableOpacity
          style={[styles.button, (verified || loading) && styles.buttonSuccess]}
          onPress={handleVerify}
          disabled={verified || loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {verified ? '✓ VERIFIED' : 'VERIFY OTP'}
            </Text>
          )}
        </TouchableOpacity>

        {/* Resend Section */}
        <View style={styles.resendSection}>
          <Text style={styles.resendText}>Didn't receive code?</Text>
          <TouchableOpacity>
            <Text style={styles.resendLink}>Resend</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 24,
  },
  otpBox: {
    width: 50,
    height: 60,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#b8860b',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fef9e7',
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  hint: { fontSize: 12, color: '#999', marginBottom: 32 },
  resendSection: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  resendText: { fontSize: 14, color: '#666' },
  resendLink: { fontSize: 14, fontWeight: '700', color: '#b8860b' },
  errorText: {
    color: '#ef4444',
    fontSize: 14,
    marginBottom: 16,
    fontWeight: '600',
  },
  button: {
    marginTop: 24,
    paddingVertical: 14,
    paddingHorizontal: 40,
    backgroundColor: '#b8860b',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonSuccess: { backgroundColor: '#22c55e' },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
