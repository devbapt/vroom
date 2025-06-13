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
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from './ProfileScreen.styles';

const screenWidth = Dimensions.get('window').width;

interface Car {
  id: string;
  uri: string;
  brand?: string;
  model?: string;
  year?: number;
}

export default function ProfileScreen() {
  const [garage, setGarage] = useState<Car[]>([]);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [bio, setBio] = useState<string>('Passionné de bolides japonais 🚗🇯🇵');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [editGarageModal, setEditGarageModal] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<'garage' | 'roadtrips' | 'groupes'>('garage');
  const [menuVisible, setMenuVisible] = useState(false);
  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const [profilePicModalVisible, setProfilePicModalVisible] = useState(false);
  const [carDetailsModal, setCarDetailsModal] = useState(false);

  // Simule les stats (à remplacer par des vraies données plus tard)
  const abonnés = 201;
  const evenements = 34;

  const pickGarageImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ quality: 1 });
    if (!result.canceled) {
      const newCar: Car = {
        id: Date.now().toString(),
        uri: result.assets[0].uri,
      };
      setSelectedCar(newCar);
      setCarDetailsModal(true);
    }
  };

  const pickProfileImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ quality: 1 });
    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };

  const handleImagePress = (car: Car) => {
    setSelectedCar(car);
    setModalVisible(true);
  };

  const renderContent = () => {
    const renderItem = ({ item }: { item: Car }) => (
      <TouchableOpacity
        onPress={() => handleImagePress(item)}
        style={styles.imageContainer}
      >
        <Image source={{ uri: item.uri }} style={styles.carImage} />
      </TouchableOpacity>
    );

    const ListHeaderComponent = () => (
      <>
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
      </>
    );

    switch (selectedTab) {
      case 'garage':
        return (
          <View style={styles.garageBox}>
            <FlatList
              data={garage}
              keyExtractor={(item) => item.id}
              numColumns={2}
              renderItem={renderItem}
              ListHeaderComponent={ListHeaderComponent}
              showsVerticalScrollIndicator={false}
            />
          </View>
        );
      case 'roadtrips':
        return (
          <View style={styles.garageBox}>
            <Text style={styles.sectionTitle}>Mes roadtrips</Text>
            <Text style={{ color: '#888', textAlign: 'center' }}>Aucun roadtrip pour l'instant.</Text>
          </View>
        );
      case 'groupes':
        return (
          <View style={styles.garageBox}>
            <Text style={styles.sectionTitle}>Groupes suivis</Text>
            <Text style={{ color: '#888', textAlign: 'center' }}>Aucun groupe suivi pour l'instant.</Text>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>Mon Profil</Text>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Text style={styles.menuIcon}>≡</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => setProfilePicModalVisible(true)}>
          <Image
            source={profilePic ? { uri: profilePic } : require('../assets/vroom_logo.png')}
            style={styles.avatar}
          />
        </TouchableOpacity>
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

      <Text style={[styles.bio, { paddingLeft: 10, marginTop: 5, marginBottom: 5, textAlign: 'left' }]}>
        {bio}
      </Text>

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

      {renderContent()}

      {/* Modals */}
      <Modal visible={modalVisible} transparent>
        <View style={styles.modalContainer}>
          {selectedCar && (
            <>
              <Image source={{ uri: selectedCar.uri }} style={styles.fullImage} />
              <Text style={styles.imageCaption}>
                {selectedCar.brand && selectedCar.model && selectedCar.year
                  ? `${selectedCar.brand} ${selectedCar.model} (${selectedCar.year})`
                  : 'Cette voiture est dans mon garage 🏎️'}
              </Text>
            </>
          )}
          <Button title="Fermer" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>

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

      <Modal visible={menuVisible} transparent animationType="slide">
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <View style={{ height: 60 }} />
          <View style={{ height: 48, justifyContent: 'center', position: 'relative', marginBottom: 32 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', position: 'absolute', left: 0, right: 0 }}>Paramètres et activité</Text>
            <TouchableOpacity
              onPress={() => setMenuVisible(false)}
              style={{ position: 'absolute', right: 10, top: 4, width: 48, height: 48, justifyContent: 'center', alignItems: 'center', borderRadius: 24 }}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={{ fontSize: 28, color: '#ff3b3f' }}>✕</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginLeft: 28, marginRight: 28 }}>
            <TouchableOpacity style={{ marginBottom: 28 }}>
              <Text style={{ fontSize: 18 }}>Groupe</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginBottom: 28 }} onPress={() => { setMenuVisible(false); setEditProfileVisible(true); }}>
              <Text style={{ fontSize: 18 }}>Éditer le profil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginBottom: 28 }}>
              <Text style={{ fontSize: 18 }}>Paramètres</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginBottom: 28 }}>
              <Text style={{ fontSize: 18 }}>Confidentialité du compte</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginBottom: 28 }}>
              <Text style={{ fontSize: 18 }}>Bloqué</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={editProfileVisible} animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>Éditer le profil</Text>
          <TouchableOpacity onPress={pickProfileImage} style={{ alignItems: 'center' }}>
            <Image
              source={profilePic ? { uri: profilePic } : require('../assets/user.png')}
              style={styles.avatar}
            />
            <Text style={styles.changeText}>Changer la photo</Text>
          </TouchableOpacity>
          <TextInput
            value={bio}
            onChangeText={setBio}
            multiline
            style={styles.bio}
          />
          <Button title="Fermer" onPress={() => setEditProfileVisible(false)} />
        </View>
      </Modal>

      <Modal visible={profilePicModalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Image
              source={profilePic ? { uri: profilePic } : require('../assets/vroom_logo.png')}
              style={[styles.avatar, { width: 180, height: 180, borderRadius: 90, marginBottom: 20 }]}
            />
            <Button title="Fermer" onPress={() => setProfilePicModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <Modal visible={carDetailsModal} transparent animationType="slide">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalContainer}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.carDetailsFormWrapper} keyboardShouldPersistTaps="handled" scrollEnabled={true}>
              <View style={styles.carDetailsForm}>
                <Text style={styles.sectionTitle}>Ajouter les détails de la voiture</Text>
                {selectedCar && (
                  <Image source={{ uri: selectedCar.uri }} style={styles.carImage} />
                )}
                <TextInput
                  style={styles.input}
                  placeholder="Marque"
                  placeholderTextColor="#000"
                  onChangeText={(text) => setSelectedCar(prev => prev ? {...prev, brand: text} : null)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Modèle"
                  placeholderTextColor="#000"
                  onChangeText={(text) => setSelectedCar(prev => prev ? {...prev, model: text} : null)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Année"
                  placeholderTextColor="#000"
                  keyboardType="numeric"
                  onChangeText={(text) => setSelectedCar(prev => prev ? {...prev, year: parseInt(text)} : null)}
                />
                <View style={styles.buttonContainer}>
                  <Button title="Annuler" onPress={() => setCarDetailsModal(false)} />
                  <Button 
                    title="Sauvegarder" 
                    onPress={() => {
                      if (selectedCar) {
                        setGarage([...garage, selectedCar]);
                        setCarDetailsModal(false);
                        setSelectedCar(null);
                      }
                    }}
                  />
                </View>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}
