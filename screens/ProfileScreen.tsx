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
  const [editGarageModal, setEditGarageModal] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<'garage' | 'roadtrips' | 'groupes'>('garage');

  // Simule les stats (à remplacer par des vraies données plus tard)
  const abonnés = 12;
  const evenements = 3;

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

      {/* Profil : avatar à gauche, stats à droite */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
        {/* Avatar */}
        <TouchableOpacity style={{ alignItems: 'center' }} onPress={pickProfileImage}>
          <Image
            source={profilePic ? { uri: profilePic } : require('../assets/vroom_logo.png')}
            style={styles.avatar}
          />
        </TouchableOpacity>
        {/* Stats à droite */}
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', marginLeft: 16 }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{abonnés}</Text>
            <Text style={{ color: '#888' }}>Abonnés</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{evenements}</Text>
            <Text style={{ color: '#888' }}>Événements</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{garage.length}</Text>
            <Text style={{ color: '#888' }}>Voitures</Text>
          </View>
        </View>
      </View>
      {/* Bio sous la photo de profil */}
      <Text style={[styles.bio, { marginTop: 8 }]}>
        {bio}
      </Text>
      <TouchableOpacity onPress={pickProfileImage} style={{ alignItems: 'center' }}>
        <Text style={styles.changeText}>Changer la photo</Text>
      </TouchableOpacity>

      {/* Onglets navigation avec plus d'espace */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20, marginTop: 20 }}>
        <TouchableOpacity onPress={() => setSelectedTab('garage')}>
          <Text style={{ fontWeight: selectedTab === 'garage' ? 'bold' : 'normal', fontSize: 18, color: selectedTab === 'garage' ? '#ff3b3f' : '#888' }}>
            Mon garage
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab('roadtrips')}>
          <Text style={{ fontWeight: selectedTab === 'roadtrips' ? 'bold' : 'normal', fontSize: 18, color: selectedTab === 'roadtrips' ? '#ff3b3f' : '#888' }}>
            Roadtrips
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab('groupes')}>
          <Text style={{ fontWeight: selectedTab === 'groupes' ? 'bold' : 'normal', fontSize: 18, color: selectedTab === 'groupes' ? '#ff3b3f' : '#888' }}>
            Groupes suivis
          </Text>
        </TouchableOpacity>
      </View>

      {/* Contenu dynamique selon l'onglet sélectionné */}
      {selectedTab === 'garage' && (
        <View style={styles.garageBox}>
          <Text style={styles.sectionTitle}>Mon garage</Text>
          <TouchableOpacity
            style={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}
            onPress={() => setEditGarageModal(true)}
          >
            <Text style={{ fontSize: 18, color: '#ff3b3f' }}>✏️</Text>
          </TouchableOpacity>
          <Text style={{ fontStyle: 'italic', color: '#888', marginBottom: 8 }}>
            Votre garage est votre vitrine, à votre image.
          </Text>
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
      )}
      {selectedTab === 'roadtrips' && (
        <View style={styles.garageBox}>
          <Text style={styles.sectionTitle}>Mes roadtrips</Text>
          {/* Ici tu pourras afficher la liste des trajets effectués */}
          <Text style={{ color: '#888', textAlign: 'center' }}>Aucun roadtrip pour l'instant.</Text>
        </View>
      )}
      {selectedTab === 'groupes' && (
        <View style={styles.garageBox}>
          <Text style={styles.sectionTitle}>Groupes suivis</Text>
          {/* Ici tu pourras afficher la liste des groupes suivis */}
          <Text style={{ color: '#888', textAlign: 'center' }}>Aucun groupe suivi pour l'instant.</Text>
        </View>
      )}

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

      {/* Modal édition du garage */}
      <Modal visible={editGarageModal} transparent>
        <View style={styles.modalContainer}>
          <Text style={styles.sectionTitle}>Édition du garage</Text>
          <FlatList
            data={garage}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={({ item }) => (
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.uri }} style={styles.carImage} />
                <TouchableOpacity
                  style={{ marginTop: 4, backgroundColor: '#ff3b3f', borderRadius: 5, padding: 4 }}
                  onPress={() => setGarage(garage.filter(car => car.id !== item.id))}
                >
                  <Text style={{ color: '#fff', fontSize: 12 }}>Supprimer</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <TouchableOpacity style={styles.addButton} onPress={pickGarageImage}>
            <Text style={styles.addButtonText}>+ Ajouter une voiture</Text>
          </TouchableOpacity>
          <Button title="Fermer" onPress={() => setEditGarageModal(false)} />
        </View>
      </Modal>
    </View>
  );
}
