import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';

export default function FAQScreen({ navigation }) {
  const dispatch = useDispatch();
  const yourState = useSelector(state => state.yourReducer);

  const [expandedItems, setExpandedItems] = useState({});

  const faqs = [
    {
      id: 1,
      question: 'What are your delivery timings?',
      answer: 'We deliver from 11:00 AM to 11:00 PM, Monday through Sunday.',
    },
    {
      id: 2,
      question: 'What is the minimum order value?',
      answer: 'The minimum order value is ₹200 for delivery.',
    },
    {
      id: 3,
      question: 'How long does delivery take?',
      answer:
        'Delivery typically takes 30-45 minutes depending on your location and order size.',
    },
    {
      id: 4,
      question: 'Do you accept online payments?',
      answer:
        'Yes, we accept online payments via UPI, credit/debit cards, and digital wallets. Cash on delivery is also available.',
    },
    {
      id: 5,
      question: 'Can I cancel my order?',
      answer:
        'You can cancel your order within 5 minutes of placing it. After that, please contact our customer support.',
    },
    {
      id: 6,
      question: 'Do you offer party orders?',
      answer:
        'Yes, we offer party orders for large quantities. Please contact us at least 24 hours in advance.',
    },
  ];

  const toggleItem = id => {
    setExpandedItems({
      ...expandedItems,
      [id]: !expandedItems[id],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FAQs</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        {faqs.map(faq => (
          <View key={faq.id} style={styles.faqItem}>
            <TouchableOpacity
              style={styles.faqQuestion}
              onPress={() => toggleItem(faq.id)}
            >
              <Text style={styles.questionText}>{faq.question}</Text>
              <Icon
                name={expandedItems[faq.id] ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#666"
              />
            </TouchableOpacity>
            {expandedItems[faq.id] && (
              <View style={styles.faqAnswer}>
                <Text style={styles.answerText}>{faq.answer}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  faqItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  questionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginRight: 12,
  },
  faqAnswer: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  answerText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
