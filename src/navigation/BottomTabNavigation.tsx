import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home/Home';
import WishList from '../screens/WishList/WishList';
import {renderTabIcon} from './helper';
import {SCREENS} from '../constants/screenNames';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Cart from '../screens/Cart/Cart';
import Profile from '../screens/Profile/Profile';
import Messages from '../screens/Messages/Messages';
import {useCustomTheme} from '../theme/ThemeContext';

const BottomTab = createBottomTabNavigator();

export const BOTTOM_BAR_HEIGHT = 65;

const BottomTabNavigation = () => {
  const {theme} = useCustomTheme();

  return (
    <View style={styles.container}>
      <BottomTab.Navigator
        initialRouteName={SCREENS.HOME}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) =>
            renderTabIcon(route, focused, color, size, theme),
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            width: widthPercentageToDP('80%'),
            height: BOTTOM_BAR_HEIGHT,
            backgroundColor: theme?.secondaryBG,
            borderRadius: 50,
            marginLeft: widthPercentageToDP('10%'),
            paddingTop: 13,
            position: 'absolute',
            bottom: 25,
          },
          tabBarButton: props => (
            <Pressable
              {...props}
              android_ripple={null}
              style={({pressed}) => [
                props.style,
                {
                  transform: [{scale: pressed ? 0.95 : 1}],
                  opacity: pressed ? 5 : 1,
                },
              ]}
            />
          ),
        })}>
        <BottomTab.Screen name={SCREENS.HOME} component={Home} />
        <BottomTab.Screen name={SCREENS.CART} component={Cart} />
        <BottomTab.Screen name={SCREENS.WISHLIST} component={WishList} />
        <BottomTab.Screen name={SCREENS.MESSAGES} component={Messages} />
        <BottomTab.Screen name={SCREENS.PROFILE} component={Profile} />
      </BottomTab.Navigator>
    </View>
  );
};

export default BottomTabNavigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
