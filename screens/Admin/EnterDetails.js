import React, {useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Color} from '../../assets/constant/Constant';
import ImagePicker from 'react-native-image-crop-picker';
import baseURL from '../../assets/config/baseURL';
import axios from 'axios';
import {set} from 'react-native-reanimated';

const EnterDetails = props => {
  // console.log('prams', props.route.params.item);

  const [categoryModel, setcategoryModel] = useState(false);
  const [selectedCategory, setselectedCategory] = useState('');
  const [Image64, setImage64] = useState({});
  // usestate
  const [pickerValue, setPickerValue] = useState();
  const [brand, setBrand] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  // const [image, setImage] = useState();
  const [mainImage, setMainImage] = useState();
  const [category, setCategory] = useState();
  const [fetchcategories, setFetchcategories] = useState([]);
  const [token, setToken] = useState();
  const [err, setError] = useState();
  const [countInStock, setCountInStock] = useState();
  const [rating, setRating] = useState(0);
  const [isFeatured, setIsFeature] = useState(false);
  const [richDescription, setRichDescription] = useState();
  const [numReviews, setNumReviews] = useState(0);
  const [item, setItem] = useState(null);
  const [mrp, setmrp] = useState('');
  const [weight, setweight] = useState('');

  const [isModalVisible, setModalVisible] = useState(false);
  const [image, setimage] = useState(
    'https://www.pngkey.com/png/full/260-2601842_upload-cad-files-sign.png',
  );
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleModalForCategory = () => {
    setcategoryModel(!categoryModel);
  };

  const TakephotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
  };

  const TakephotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      freeStyleCropEnabled: true,
    }).then(image => {
      setimage(image.path);
      setImage64(image);
      console.log(image);
    });
  };

  const CategoryHandler = item => {
    console.log('item', item);
    setselectedCategory(item);
  };

  const fetchCategory = () => {
    axios({
      method: 'get',
      url: `${baseURL}categories`,
    })
      .then(res => {
        console.log('res', res.data);
        setFetchcategories(res.data);
      })
      .catch(err => console.log('err', err));
  };

  const OnSubmiteData = () => {
    // console.log('name', name);
    // console.log('image', `data:${Image64.mime};base64,${Image64.data}`);
    // console.log('price', parseInt(price));
    // console.log('description', description);
    // console.log('category', selectedCategory.id);
    // console.log('countInStock', parseInt(countInStock));

    const data = {
      image: `data:${Image64.mime};base64,${Image64.data}`,
      brand: brand,
      price: parseInt(price),
      // rating: 1,
      // numReviews: 0,
      // isFeatured: true,
      name: name,
      description: description,
      category: selectedCategory.id,
      countInStock: parseInt(countInStock),
      mrp: mrp,
      weight: weight,
    };

    console.log('data', data);
    if (item !== null) {
      axios({
        method: 'put',
        url: `${baseURL}products/${item.id}`,
        data: data,
      })
        .then(res => {
          console.log('res', res);
          if (res.status == 200 || res.status == 201) {
            ToastAndroid.show('Data Updatwe', ToastAndroid.LONG);
            setTimeout(() => {
              props.navigation.navigate('ProdutsList');
            }, 500);
          }
        })
        .catch(err => {
          console.log('err', err);
          ToastAndroid.show('something went wrong', ToastAndroid.LONG);
        });
    } else {
      axios({
        method: 'post',
        url: `${baseURL}products`,
        data: data,
      })
        .then(res => {
          console.log('res', res);
          if (res.status == 200 || res.status == 201) {
            ToastAndroid.show('Data saved', ToastAndroid.LONG);
            props.navigation.navigate('ProdutsList');
          }
        })
        .catch(err => {
          console.log('err', err);
          ToastAndroid.show('something went wrong', ToastAndroid.LONG);
        });
    }
  };

  useEffect(() => {
    if (!props.route.params) {
      setItem(null);
    } else {
      setItem(props.route.params.item);
      setName(props.route.params.item.name);
      setBrand(props.route.params.item.brand);
      setPrice(props.route.params.item.price.toString());
      setDescription(props.route.params.item.description);
      setCountInStock(props.route.params.item.countInStock.toString());
      setselectedCategory(props.route.params.item.category);
      setimage(props.route.params.item.image);
      setmrp(props.route.params.item.mrp),
        setweight(props.route.params.item.weight);
    }

    fetchCategory();
  }, []);
  console.log('id', selectedCategory);
  return (
    <View
      style={{
        // backgroundColor: Color.background,
        flex: 1,
        justifyContent: 'space-between',
      }}>
      <ScrollView>
        <View style={{margin: wp('4%')}}>
          <View
            style={{
              // backgroundColor: Color.fontcolor,
              borderRadius: hp('10%'),
              width: wp('10%'),
              height: hp('5%'),
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: wp('3%'),
            }}>
            <TouchableOpacity>
              {/* <Image source={ArrowBack} /> */}
              <Icon name="arrowleft" size={28} color="black" />
            </TouchableOpacity>
          </View>
          <View style={{marginVertical: hp('2%')}}>
            <Text style={{fontSize: hp('2.5%')}}>Include product details</Text>
          </View>
          <View
            style={{
              //  backgroundColor: 'green',
              marginVertical: wp('3%'),
            }}>
            <TextInput
              placeholder="Product name"
              placeholderTextColor={'#3E3D46'}
              onChangeText={txt => setName(txt)}
              value={name}
              style={{
                backgroundColor: 'gray',
                borderRadius: 10,
                height: hp('8%'),
                fontSize: 16,
                color: '#fff',
                paddingHorizontal: wp('4%'),
              }}
            />

            <TextInput
              placeholder="Product brand"
              placeholderTextColor={'#3E3D46'}
              onChangeText={txt => setBrand(txt)}
              value={brand}
              style={{
                backgroundColor: 'gray',
                borderRadius: 10,
                height: hp('8%'),
                fontSize: 16,
                color: '#fff',
                paddingHorizontal: wp('4%'),
                marginVertical: hp('1'),
              }}
            />
            <TextInput
              placeholder="Product Price"
              placeholderTextColor={'#3E3D46'}
              onChangeText={txt => setPrice(txt)}
              keyboardType="number-pad"
              value={price}
              style={{
                backgroundColor: 'gray',
                borderRadius: 10,
                height: hp('8%'),
                fontSize: 16,
                color: '#fff',
                paddingHorizontal: wp('4%'),
                marginVertical: hp('1'),
              }}
            />
            <TextInput
              placeholder="Mrp"
              placeholderTextColor={'#3E3D46'}
              onChangeText={txt => setmrp(txt)}
              keyboardType="number-pad"
              value={mrp}
              style={{
                backgroundColor: 'gray',
                borderRadius: 10,
                height: hp('8%'),
                fontSize: 16,
                color: '#fff',
                paddingHorizontal: wp('4%'),
                marginVertical: hp('1'),
              }}
            />
            <TextInput
              placeholder="Weight kg/grams /units exp 1kg , 100grams"
              keyboardType="number-pad"
              placeholderTextColor={'#3E3D46'}
              onChangeText={txt => setweight(txt)}
              value={weight}
              style={{
                backgroundColor: 'gray',
                borderRadius: 10,
                height: hp('8%'),
                fontSize: 16,
                color: '#fff',
                paddingHorizontal: wp('4%'),
                marginVertical: hp('1'),
              }}
            />
            <TextInput
              placeholder="Product Desciption"
              placeholderTextColor={'#3E3D46'}
              onChangeText={txt => setDescription(txt)}
              value={description}
              style={{
                backgroundColor: 'gray',
                borderRadius: 10,
                height: hp('8%'),
                fontSize: 16,
                color: '#fff',
                paddingHorizontal: wp('4%'),
                marginVertical: hp('1'),
              }}
            />
            <TextInput
              placeholder="CountinStock"
              placeholderTextColor={'#3E3D46'}
              onChangeText={txt => setCountInStock(txt)}
              value={countInStock}
              keyboardType="number-pad"
              style={{
                backgroundColor: 'gray',
                borderRadius: 10,
                height: hp('8%'),
                fontSize: 16,
                color: '#fff',
                paddingHorizontal: wp('4%'),
                marginVertical: hp('1'),
              }}
            />
            <TouchableOpacity onPress={toggleModalForCategory}>
              <Text>
                {' '}
                {selectedCategory ? selectedCategory.name : 'choose category'}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              alignItems: 'center',
              alignContent: 'center',
              marginVertical: wp('3%'),
            }}>
            <TouchableOpacity
              onPress={TakephotoFromLibrary}
              style={{
                backgroundColor: 'gray',
                alignItems: 'center',
                width: wp('55%'),
                height: hp('18%'),
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              {/* <Uploadicon
                name="cloud-upload"
                size={55}
                onPress={() => console.log('dgsh')}
              /> */}

              <Image
                style={{height: hp(10), width: hp('10')}}
                source={{uri: image}}
              />
              <Text style={{color: Color.orange, fontSize: hp('2.5%')}}>
                Upload Image
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: wp('5%'),
          }}>
          <TouchableOpacity
            onPress={OnSubmiteData}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: Color.yellow,
              width: wp('90%'),
              borderRadius: 5,
              height: hp('6.5%'),
            }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Roboto-Medium',
                fontWeight: 'bold',
              }}>
              ADD PRODUCT
            </Text>
          </TouchableOpacity>
        </View>

        <Modal
          isVisible={isModalVisible}
          onBackButtonPress={() => setModalVisible(false)}
          onBackdropPress={() => setModalVisible(false)}
          backdropOpacity={0.5}
          style={{justifyContent: 'flex-end', margin: 0}}>
          <View
            style={{
              backgroundColor: '#272635',
              height: hp('30'),
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
            }}>
            <TouchableOpacity
              onPress={() => TakephotoFromCamera()}
              style={{
                backgroundColor: 'red',
                paddingVertical: hp('2%'),
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginHorizontal: wp('20'),
                marginVertical: hp('2'),
              }}>
              <Text style={{fontSize: hp('2'), color: 'white'}}>
                Choose from Camera
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => TakephotoFromLibrary()}
              style={{
                backgroundColor: 'red',
                paddingVertical: hp('2%'),
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginHorizontal: wp('20'),
                marginVertical: hp('1'),
              }}>
              <Text style={{fontSize: hp('2'), color: 'white'}}>
                Choose from Library
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Modal
          isVisible={categoryModel}
          onBackButtonPress={() => setcategoryModel(false)}
          onBackdropPress={() => setcategoryModel(false)}
          backdropOpacity={0.5}
          style={{justifyContent: 'flex-end', margin: 0}}>
          <View
            style={{
              backgroundColor: '#272635',
              height: hp('60'),
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
            }}>
            {fetchcategories.map(item => (
              <TouchableOpacity
                onPress={() => CategoryHandler(item)}
                style={{
                  backgroundColor: 'red',
                  paddingVertical: hp('2%'),

                  marginHorizontal: wp('20'),
                  marginVertical: hp('1'),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: hp('2'), color: 'white'}}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default EnterDetails;
