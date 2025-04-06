import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import React, {useContext} from 'react';
import Icons from 'react-native-vector-icons/FontAwesome';
import {Store} from '../store/Store';

const SearchBar = () => {

  const {showSearch, setShowSearch, input, setInput, searchData, setSearchData,handleLocation} = useContext(Store);

  const reset = () => {
    setInput('');
    setShowSearch(false);
    setSearchData([]);
  };

  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchBar}>
        {showSearch ? (
          <TextInput
            placeholder="Search City"
            placeholderTextColor={'lightgray'}
            style={[styles.searchTxt, {display: showSearch ? 'flex' : 'none'}]}
            value={input}
            onChangeText={(e)=>setInput(e)}
          />
        ) : null}
        <TouchableOpacity
          style={styles.searchBtn}
          onPress={() => setShowSearch(!showSearch)}>
          <Icons name="search" size={25} color={'white'} />
        </TouchableOpacity>
      </View>
      {searchData.length > 0 && showSearch && (
        <View style={styles.searchList}>
          {searchData.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.searchItem}
              onPress={() => {handleLocation(item); reset();}}>
              <Icons name="map-marker" size={20} />
              <Text style={styles.searchItemTxt}>{item.name}, {item.region}, {item.country}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchContainer: {
    marginHorizontal: 10,
    zIndex: 10,
  },
  searchBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'hidden',
  },
  conditionalSearchBg: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  searchTxt: {
    flex: 1,
    fontSize: 15,
    color: 'white',
    paddingLeft: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 30,
  },
  searchBtn: {
    margin: 5,
    backgroundColor: 'lightgray',
    opacity: 0.5,
    padding: 8,
    borderRadius: 30,
  },
  searchList: {
    position: 'absolute',
    backgroundColor: 'rgba(211, 211, 211, 0.8)',
    top: 60,
    width: '100%',
    borderRadius: 20,
  },
  searchItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 20,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    borderRadius: 20,
  },
  searchItemTxt: {
    color: 'black',
    fontSize: 20,
  },
});
