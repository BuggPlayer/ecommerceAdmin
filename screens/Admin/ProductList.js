import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import OrderIcon from 'react-native-vector-icons/Fontisto';
import data from '../../assets/data/products.json';
import Modal from 'react-native-modal';
import axios from 'axios';
import baseURL from '../../assets/config/baseURL';

const ProductList = props => {
  console.log('propss', props);
  const [deleteId, setdeleteId] = useState('');
  const [productList, setProductList] = useState();
  const [productFilter, setProductFilter] = useState();
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [editData, seteditData] = useState('');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const truncate = str => {
    return str.length > 6 ? str.substring(0, 6) + ' ...' : str;
  };


  const fetchProductData = () => {
    axios({method: 'get', url: `${baseURL}products`})
      .then(res => {
        console.log('res', res);

        setProductList(res.data);
        setProductFilter(res.data);
        setLoading(false);
      })
      .catch(err => console.log('err', err));

    console.log('dgdgdg');
  };

  const deleteProduct = id => {
    console.log('idd', id);
    axios
      .delete(`${baseURL}products/${id}`, {
        // headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        console.log('res', res);
        ToastAndroid.show(res.data.message, ToastAndroid.LONG);
        // const products = productFilter.filter(item => item.id !== id);
        // setProductFilter(products);
      })
      .catch(error => console.log(error));
  };

  const modalHandler = item => {
    console.log('data', item);
    seteditData(item);
    toggleModal();
  };

  useEffect(() => {
    fetchProductData();
  }, [productList]);

  // console.log('editt ', editData);
  return (
    <View style={{flex: 1}}>
      <View style={{marginVertical: hp('2'), marginHorizontal: wp(2)}}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              backgroundColor: 'gray',
              width: wp('30'),
              height: hp('6'),
              paddingVertical: hp('1'),
              paddingHorizontal: wp('3'),
              borderRadius: 10,
            }}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Order')}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <OrderIcon name="shopping-bag-1" size={24} />
              <Text style={{marginHorizontal: wp('2'), fontSize: hp(2.5)}}>
                Orders
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('enterDetails')}
            style={{
              backgroundColor: 'gray',
              width: wp('30'),
              height: hp('6'),
              paddingVertical: hp('1'),
              paddingHorizontal: wp('3'),
              borderRadius: 10,
              marginHorizontal: wp(2),
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <OrderIcon name="shopping-bag-1" size={24} />
              <Text style={{marginHorizontal: wp('2'), fontSize: hp(2.5)}}>
                Products
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Category')}
            style={{
              backgroundColor: 'gray',
              width: wp('32'),
              height: hp('6'),
              paddingVertical: hp('1'),
              paddingHorizontal: wp('3'),
              borderRadius: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <OrderIcon name="shopping-bag-1" size={24} />
              <Text style={{marginHorizontal: wp('2'), fontSize: hp(2.5)}}>
                Categories
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: 'gray',
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginVertical: hp(2),
          }}>
          <Text style={{}}>Image</Text>
          <Text>Brand</Text>
          <Text>Name</Text>
          <Text>Category</Text>
          <Text>Price</Text>
        </View>
        <View>
          {loading ? (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <ActivityIndicator size="large" color="red" />
            </View>
          ) : (
            <FlatList
              // numColumns={5}
              data={productList}
              renderItem={({item}) => {
                console.log('item', item);
                setdeleteId(item.id);

                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      marginVertical: hp('1'),
                      backgroundColor: 'gray',
                      alignItems: 'center',
                    }}>
                    <Image
                      onPress={toggleModal}
                      style={{
                        height: hp(6),
                        width: hp(6),
                        resizeMode: 'contain',
                      }}
                      source={{uri: item.image}}
                    />
                    <Text
                      style={{alignItems: 'center', alignContent: 'center'}}>
                      {item.brand}
                    </Text>
                    <Text
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      {truncate(item.name)}
                    </Text>
                    <Text
                      onPress={() => modalHandler(item)}
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      {item.category.name}
                    </Text>
                    <Text
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      {item.price}
                    </Text>
                  </View>
                );
              }}
            />
          )}
        </View>
      </View>

      <Modal
        isVisible={isModalVisible}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        backdropOpacity={0.5}
        style={{}}>
        <View
          style={{
            backgroundColor: '#272635',
            height: hp(24),
            // borderTopRightRadius: 20,
            // borderTopLeftRadius: 20,
          }}>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('enterDetails', {item: editData})
            }
            style={{
              backgroundColor: 'red',
              paddingVertical: hp('2%'),
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginHorizontal: wp('20'),
              marginVertical: hp('2'),
            }}>
            <Text style={{fontSize: hp('2'), color: 'white'}}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => deleteProduct(deleteId)}
            style={{
              backgroundColor: 'red',
              paddingVertical: hp('2%'),
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginHorizontal: wp('20'),
              marginVertical: hp('1'),
            }}>
            <Text style={{fontSize: hp('2'), color: 'white'}}>Delete</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default ProductList;
