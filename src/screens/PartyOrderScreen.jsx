import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

export default function PartyOrderScreen({ onGoBack }) {
  const handleCall = () => {
    Linking.openURL('tel:8433530006');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:celebrations@rebelfoods.com');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onGoBack} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.callButton} onPress={handleCall}>
            <Icon name="phone" size={18} color="#b8860b" />
            <Text style={styles.callText}>Call us at{'\n'}8433530006</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroImageContainer}>
            <Icon name="cutlery" size={120} color="#b8860b" style={styles.heroIcon} />
            <Text style={styles.heroSubtext}>Party Feast</Text>
          </View>

          <View style={styles.heroTextContainer}>
            <Text style={styles.heroTitle}>Jashn Ka Aaghaz,</Text>
            <Text style={styles.heroTitle}>SK Biryani Ke Saath!</Text>

            <Text style={styles.heroDescription}>
              Set up a royal daawat for the season of celebrations with our wide range of shaandaar biryanis, lajawab kebabs, indulgent desserts and more!
            </Text>

            <TouchableOpacity style={styles.contactButton} onPress={handleEmail}>
              <Text style={styles.contactButtonText}>Contact Us</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Get in Touch Section */}
        <View style={styles.touchSection}>
          <Text style={styles.touchTitle}>Get in touch</Text>

          <Text style={styles.touchDescription}>
            Fill this form or write to us on
          </Text>

          <TouchableOpacity onPress={handleEmail}>
            <Text style={styles.emailText}>celebrations@rebelfoods.com</Text>
          </TouchableOpacity>

          <Text style={styles.responseText}>
            We will get back to you in less than 6 hours
          </Text>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <View style={styles.featureCard}>
            <Icon name="users" size={40} color="#b8860b" />
            <Text style={styles.featureTitle}>Large Orders</Text>
            <Text style={styles.featureText}>
              Perfect for parties, events, and celebrations
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Icon name="star" size={40} color="#b8860b" />
            <Text style={styles.featureTitle}>Premium Quality</Text>
            <Text style={styles.featureText}>
              Authentic biryanis and kebabs for your special occasions
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Icon name="clock-o" size={40} color="#b8860b" />
            <Text style={styles.featureTitle}>Quick Response</Text>
            <Text style={styles.featureText}>
              We respond to all inquiries within 6 hours
            </Text>
          </View>
        </View>

        {/* Contact Info */}
        <View style={styles.contactInfo}>
          <TouchableOpacity style={styles.infoRow} onPress={handleCall}>
            <Icon name="phone" size={24} color="#b8860b" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Call Us</Text>
              <Text style={styles.infoValue}>8433530006</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.infoRow} onPress={handleEmail}>
            <Icon name="envelope" size={24} color="#b8860b" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Email Us</Text>
              <Text style={styles.infoValue}>celebrations@rebelfoods.com</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#b8860b',
  },
  callText: {
    fontSize: 12,
    color: '#b8860b',
    fontWeight: '600',
    lineHeight: 16,
  },
  content: {
    flex: 1,
  },
  heroSection: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  heroImageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  heroIcon: {
    marginBottom: 16,
  },
  heroSubtext: {
    fontSize: 16,
    color: '#b8860b',
    fontWeight: '600',
  },
  heroTextContainer: {
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
  heroDescription: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  contactButton: {
    backgroundColor: '#c9a961',
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 30,
  },
  contactButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
  },
  touchSection: {
    padding: 30,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  touchTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 16,
  },
  touchDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  emailText: {
    fontSize: 16,
    color: '#b8860b',
    fontWeight: '600',
    marginBottom: 16,
  },
  responseText: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
  },
  featuresSection: {
    padding: 20,
    gap: 16,
  },
  featureCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginTop: 12,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  contactInfo: {
    padding: 20,
    gap: 16,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});
