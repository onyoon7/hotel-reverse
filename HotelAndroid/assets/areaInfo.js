import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height / 2;
const LATITUDE_DELTA = 0.1522;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default {
  area: {
    seoul: ['강남구', '서초구', '명동', '여의도'],
    jeju: ['제주시', '서귀포시'],
  },
  region: {
    seoul: {
      latitude: 37.552547,
      longitude: 126.993552,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
    jeju: {
    },
  },
  polygon: {
    seoul: [
      // gangnam-gu
      { key: 'gangnam', value: [
        {
          latitude: 37.533335,
          longitude: 127.027770,
        },
        {
          latitude: 37.503381,
          longitude: 127.069827,
        },
        {
          latitude: 37.468237,
          longitude: 127.122012,
        },
        {
          latitude: 37.456995,
          longitude: 127.098164,
        },
        {
          latitude: 37.469115,
          longitude: 127.053685,
        },
      ],
      },
      // myeong-dong
      { key: 'myeongdong', value: [
        {
          latitude: 37.568933,
          longitude: 126.976930,
        },
        {
          latitude: 37.567810,
          longitude: 126.989075,
        },
        {
          latitude: 37.556414,
          longitude: 126.985041,
        },
        {
          latitude: 37.563592,
          longitude: 126.982080,
        },
      ],
      },
      { key: 'yeouido', value: [
        {
          latitude: 37.541101,
          longitude: 126.927290,
        },
        {
          latitude: 37.518230,
          longitude: 126.940766,
        },
        {
          latitude: 37.520273,
          longitude: 126.916132,
        },
        {
          latitude: 37.532865,
          longitude: 126.911755,
        },
      ],
      },
    ],
    jeju: [],
  },
};
