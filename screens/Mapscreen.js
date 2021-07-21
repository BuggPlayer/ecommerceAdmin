import React, {useState, useEffect} from 'react';
import Geocoder from 'react-native-geocoder';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {
  ActivityIndicator,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Image,
  Button,
  StyleSheet,
  Dimensions,
  useWindowDimensions,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

if (Platform.OS === 'android') {
  PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  )
    .then(res => console.log('res', res))
    .catch(err => console.log('err', err));
}

const Mapscreen = () => {
  const [address, setaddress] = useState('');
  const [position, setPosition] = useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  // try to route

  const mode = 'driving'; // 'walking';
  const origin = 'coords or address';
  const destination = 'coords or address';
  const APIKEY = 'AIzaSyB__wtJyCwL-57x_tHEwFC4m71LqYK8wzE';
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}&mode=${mode}`;

  const [coords, setCoords] = useState(0);

  const onRegionChange = region => {
    Geocoder.geocodePosition({
      lat: region.latitude,
      lng: region.longitude,
    }).then(res => {
      // props.onSelectLocation(res[2]);
      console.log('resformatted', res[2].formattedAddress);
      setaddress(res[2].formattedAddress);
    });
  };

  const truncate = str => {
    return str.length > 10 ? str.substring(0, 41) + ' ...' : str;
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(pos => {
      const crd = pos.coords;
     
      setPosition({
        latitude: crd.latitude,
        longitude: crd.longitude,
        latitudeDelta: 0.021,
        longitudeDelta: 0.021,
      });
    }).catch(err => {
      console.log(err);
    });
  }, []);

  useEffect(() => {
console.log("caled");

    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.routes.length) {
          console.log(
            'decode',
            decode(responseJson.routes[0].overview_polyline.points),
          );
          setCoords(decode(responseJson.routes[0].overview_polyline.points));
          // this.setState({
          //   coords: this.decode(
          //     responseJson.routes[0].overview_polyline.points,
          //   ), // definition below
          // });
        }
      })
      .catch(e => {
        console.warn(e);
      });
  }, []);
  const decode = function (t, e) {
    for (
      var n,
        o,
        u = 0,
        l = 0,
        r = 0,
        d = [],
        h = 0,
        i = 0,
        a = null,
        c = Math.pow(10, e || 5);
      u < t.length;

    ) {
      (a = null), (h = 0), (i = 0);
      do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5);
      while (a >= 32);
      (n = 1 & i ? ~(i >> 1) : i >> 1), (h = i = 0);
      do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5);
      while (a >= 32);
      (o = 1 & i ? ~(i >> 1) : i >> 1),
        (l += n),
        (r += o),
        d.push([l / c, r / c]);
    }
    return (d = d.map(function (t) {
      return {latitude: t[0], longitude: t[1]};
    }));
  };
  // transforms something like this geocFltrhVvDsEtA}ApSsVrDaEvAcBSYOS_@... to an array of coordinates
  return (
    <View>
      <View>
        <MapView
          provider={PROVIDER_GOOGLE}
          onRegionChange={onRegionChange}
          style={{height: hp(' 70'), width: wp('100')}}
          initialRegion={position}
          showsCompass={true}
          showsMyLocationButton={true}
          showsUserLocation={true}>
          {/* <Marker
            coordinate={{latitude: 37.78825, longitude: -122.4324}}
            pinColor={'purple'} // any color
            title={'title'}
            description={'description'}
          /> */}
        </MapView>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          top: -200,
        }}>
        <Text style={{color: 'indianred'}}>{'You are here!'}</Text>
        <Image
          resizeMode="contain"
          style={{height: 55, width: 50}}
          source={require('../assets/Image/pin.png')}
        />
      </View>

      <View
        style={{
          // backgroundColor: 'green',
          marginVertical: hp('4'),
          marginHorizontal: wp('5'),
        }}>
        <View
          style={{
            // backgroundColor: 'yellow',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: hp('1'),
          }}>
          <Text style={{fontSize: hp('2.5')}}>Select delivery location</Text>
          <Text style={{color: 'black'}}>Where we deliver ?</Text>
        </View>

        <Text style={{color: 'gray'}}>Your location</Text>
        <View
          style={{
            // backgroundColor: 'pink',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{paddingVertical: hp('1')}}>{truncate(address)}</Text>
          <TouchableOpacity style={{}}>
            <Text style={{color: 'green'}}>CHANGE</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: 'indianred',
            height: hp('7'),
            width: wp('80'),
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: wp('5'),
            marginVertical: hp('2'),
            borderRadius: 10,
          }}>
          <Text style={{color: 'black'}}> Confirm Location & Proceed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Mapscreen;
