import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {SCREENS} from '../constants/screenNames';
import {View} from 'react-native';

export const renderTabIcon = (
  route: any,
  focused: boolean,
  color: string,
  size: number,
  theme: any,
) => {
  let iconName = 'home';
  let IconComponent = Ionicons;

  switch (route.name) {
    case SCREENS.HOME:
      iconName = focused ? 'home' : 'home-outline';
      IconComponent = focused ? MaterialIcons : MaterialCommunityIcons;
      break;
    case SCREENS.CART:
      iconName = focused ? 'bag-shopping' : 'bag-outline';
      IconComponent = focused ? FontAwesome6 : Ionicons;
      break;
    case SCREENS.WISHLIST:
      iconName = focused ? 'heart' : 'heart-o';
      IconComponent = FontAwesome;
      break;
    case SCREENS.MESSAGES:
      iconName = focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline';
      IconComponent = Ionicons;
      break;
    case SCREENS.PROFILE:
      iconName = focused ? 'account-circle' : 'account-circle-outline';
      IconComponent = MaterialCommunityIcons;
      break;
    default:
      iconName = focused ? 'home' : 'home-outline';
      IconComponent = focused ? Ionicons : MaterialCommunityIcons;
      break;
  }

  return (
    <View
      style={{
        width: 50,
        height: 48,
        backgroundColor: focused ? theme?.primaryBG : 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
      }}>
      <IconComponent
        name={iconName}
        size={25}
        color={focused ? theme?.primary : '#D9DBDB'}
      />
    </View>
  );
};
