import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  Dimensions,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from './ProfileScreen.styles';

const screenWidth = Dimensions.get('window').width;

export default function ProfileScreen() {
  const [garage, setGarage] = useState<{ id: string; uri: string }[]>([]);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [bio, setBio] = useState<string>('Passionné de bolides japonais 🚗🇯🇵');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickGarageImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ quality: 1 });
    if (!result.canceled) {
      setGarage([...garage, { id: Date.now().toString(), uri: result.assets[0].uri }]);
    }
  };

  const pickProfileImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ quality: 1 });
    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };

  const handleImagePress = (imageUri: string) => {
    setSelectedImage(imageUri);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Header avec profil + menu */}
      <View style={styles.header}>
        <Text style={styles.username}>Mon Profil</Text>
        <TouchableOpacity onPress={() => alert('Paramètres à venir')}>
          <Text style={styles.menuIcon}>≡</Text>
        </TouchableOpacity>
      </View>

      {/* Avatar + changer photo */}
      <TouchableOpacity style={styles.avatarBlock} onPress={pickProfileImage}>
        <Image
          source={profilePic ? { uri: profilePic } : require('../assets/vroom_logo.png')}
          style={styles.avatar}
        />
        <Text style={styles.changeText}>Changer la photo</Text>
      </TouchableOpacity>

      {/* Bio */}
      <TextInput
        value={bio}
        onChangeText={setBio}
        multiline
        style={styles.bio}
      />

      {/* Garage */}
      <View style={styles.garageBox}>
        <Text style={styles.sectionTitle}>🚗 Mon garage</Text>

        <TouchableOpacity style={styles.addButton} onPress={pickGarageImage}>
          <Text style={styles.addButtonText}>+ Ajouter une voiture</Text>
        </TouchableOpacity>

        <FlatList
          data={garage}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleImagePress(item.uri)}
              style={styles.imageContainer}
            >
              <Image source={{ uri: item.uri }} style={styles.carImage} />
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Modal image en grand */}
      <Modal visible={modalVisible} transparent>
        <View style={styles.modalContainer}>
          {selectedImage && (
            <Image source={{ uri: selectedImage }} style={styles.fullImage} />
          )}
          <Text style={styles.imageCaption}>Cette voiture est dans mon garage 🏎️</Text>
          <Button title="Fermer" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}
