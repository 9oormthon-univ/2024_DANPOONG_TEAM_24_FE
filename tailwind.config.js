/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        100: '#EAEBED',
        200: '#CBCDD2',
        300: '#A0A4A8',
        400: '#74787E',
        500: '#484C52',
        700: '#1C1D1F',
        800: '#000000',
        point1: '#F4635E',
        C400: '#74787E',
        Main: '#FDD835',
        Main2: '#FFF59D',
        ToggleBorder: '#FFBC5F',
        ContentsBox: '#F4F5F7',
      },
      backgroundImage: {
        'profile-gradient': 'linear-gradient(180deg, #FFA7A4 0%, #FFEA8B 100%)',
        'recipe-gradient':
          'linear-gradient(108deg, #FFE58C -15.89%, #FDD835 31.16%, #F78951 68.45%, #F4635E 90.25%)',
      },
    },
    fontFamily: {
      SB00: ['AppleSDGothicNeoSB00'],
      M00: ['AppleSDGothicNeoM00'],
      R00: ['AppleSDGothicNeoR00'],
      L00: ['AppleSDGothicNeoL00'],
      B00: ['AppleSDGothicNeoB00'],
    },
  },
  plugins: [],
}
