import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height / 2;
const LATITUDE_DELTA = 0.1522;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const area = {
  seoul: ['강남구', '서초구', '명동', '여의도'],
  jeju: ['제주시', '서귀포시'],
}

export default {
  area: area,
  region: {
    seoul: {
      latitude: 37.552547,
      longitude: 126.993552,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
    jeju: {
      latitude: 33.499634,
      longitude: 126.531223,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
  },
  polygon: {
    seoul: [
      // gangnam-gu
      { key: area.seoul[0], value: [
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
      { key: area.seoul[2], value: [
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
      { key: area.seoul[3], value: [
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
    jeju: [
      { key: area.jeju[0], value: [
        {
          latitude: 33.516733,
          longitude: 126.524663,
        },
        {
          latitude: 33.499781,
          longitude: 126.511951
        },
        {
          latitude: 33.487112,
          longitude: 126.534887
        },
        {
          latitude: 33.502141,
          longitude: 126.549929,
        },
      ],
      },
      { key: area.jeju[1], value: [
        {
          latitude: 33.259158,
          longitude: 126.561299
        },
        {
          latitude: 33.253879,
          longitude: 126.575245
        },
        {
          latitude: 33.240068,
          longitude: 126.563832
        },
        {
          latitude: 33.253140,
          longitude: 126.555264
        },
      ],
      },
    ],
  },
};
