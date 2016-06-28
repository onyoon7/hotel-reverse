import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height / 2;

const area = {
  main: {서울: 'seoul', 제주: 'jeju'},
  seoul: ['강남구', '서초구', '명동', '여의도'],
  jeju: ['제주시', '서귀포시'],
}

export default {
  area: area,
  region: {
    seoul: {
      latitude: 37.552547,
      longitude: 126.993552,
      latitudeDelta: 0.1522,
      longitudeDelta: 0.1522 * ASPECT_RATIO,
    },
    jeju: {
      latitude: 33.389222,
      longitude: 126.562156,
      latitudeDelta: 0.5522,
      longitudeDelta: 0.5522 * ASPECT_RATIO,
    },
  },
  marker: {
    seoul: [
      { key: area.seoul[0],
        value: {
          latitude: 37.495890,
          longitude: 127.056266 }
      },
      { key: area.seoul[2],
        value: {
          latitude: 37.564001,
          longitude: 126.985170 }
      },
      { key: area.seoul[3],
        value: {
          latitude: 37.525378,
          longitude: 126.924887 }
      },
    ],
    jeju: [
      { key: area.jeju[0],
        value: {
          latitude: 33.499981,
          longitude: 126.526628 }
      },
      { key: area.jeju[1],
        value: {
          latitude: 33.252828,
          longitude: 126.563587 }
      },
    ],
  },
  polygon: {
    seoul: [
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
          latitude: 33.434145,
          longitude: 126.286091,
        },
        {
          latitude: 33.464916,
          longitude: 126.539818,
        },
        {
          latitude: 33.546098,
          longitude: 126.810510
        },
      ],
      },
      { key: area.jeju[1], value: [
        {
          latitude: 33.304173,
          longitude: 126.562683
        },
        {
          latitude: 33.328827,
          longitude: 126.812722
        },
        {
          latitude: 33.240068,
          longitude: 126.563832
        },
        {
          latitude: 33.235721,
          longitude: 126.255851
        },
      ],
      },
    ],
  },
};
