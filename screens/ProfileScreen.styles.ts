import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  username: { fontSize: 24, fontWeight: 'bold' },
  menuIcon: { fontSize: 26, fontWeight: 'bold' },

  avatarBlock: {
    marginTop: 20,
    alignItems: 'center',
  },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  changeText: { fontSize: 12, color: '#888', marginTop: 4 },

  bio: {
    marginTop: 10,
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#444',
    marginBottom: 20,
  },

  garageBox: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 15,
    flex: 1,
  },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 10 },

  addButton: {
    backgroundColor: '#ff3b3f',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  addButtonText: { color: '#fff', fontWeight: 'bold' },

  imageContainer: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
  },
  carImage: {
    width: (screenWidth - 60) / 2,
    height: 160,
    borderRadius: 10,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  fullImage: {
    width: '90%',
    height: '60%',
    borderRadius: 10,
    marginBottom: 15,
  },
  imageCaption: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default styles; 