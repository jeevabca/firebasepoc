import { StyleSheet, Text, TouchableOpacity, View, Linking } from 'react-native';
import React, { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

const FirestoreComponent = () => {
  const [count, setCount] = useState(0);

  
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const ref = firestore().collection("count").doc('checkinCount');
        
        
        const docSnapshot = await ref.get();
        console.log(docSnapshot);
        
        
        if (docSnapshot.exists) {
          // If document exists, fetch the current count
          setCount(docSnapshot.data().count);
        } else {
          
          await ref.set({ count: 0 });
          setCount(0);
        }
      } catch (error) {
        console.error("Error fetching count:", error);
      }
    };

    fetchCount();
  }, []);  

  const checkinfunc = async () => {
    try {
      const ref = firestore().collection("count").doc('checkinCount');
      
      // Increment the count by 1
      const newCount = count + 1;

      // Update Firestore with the new count
      await ref.set({ count: newCount }, { merge: true });  // Use merge to update only the count field

      // Update local state
      setCount(newCount);

      // Open the web check-in link
      const CHECKINWEBLINK = 'https://www.lionairthai.com/en/Flight/Web-Checkin';
      Linking.openURL(CHECKINWEBLINK);
    } catch (error) {
      console.error("Error updating count:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.but} onPress={checkinfunc}>
        <Text style={styles.buttonText}>Check-in</Text>
      </TouchableOpacity>
      
    </View>
  );
};

export default FirestoreComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  but: {
    width: 120,
    height: 50,
    backgroundColor: 'red',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  countText: {
    fontSize: 18,
    marginTop: 20,
  },
});
