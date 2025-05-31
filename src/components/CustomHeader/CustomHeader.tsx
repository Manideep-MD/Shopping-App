import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ThemeColors} from '../../theme/themeConfig';
import {useCustomTheme} from '../../theme/ThemeContext';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import BackIcon from 'react-native-vector-icons/MaterialIcons';
import HeartIcon from 'react-native-vector-icons/Fontisto';
import {useNavigation} from '@react-navigation/native';

interface CustomHeaderProps {
  title: string;
  onBackPress?: () => void;
  onRightIconPress?: () => void;
  showRightIcon?: boolean;
  rightIconName?: string;
  rightIconSize?: number;
  rightIconColor?: string;
  backIconColor?: string;
  backgroundColor: string;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  onBackPress,
  onRightIconPress,
  showRightIcon = true,
  rightIconName = 'heart-alt',
  rightIconSize = 15,
  rightIconColor,
  backIconColor = '#3F3F3F',
  backgroundColor,
}) => {
  const {theme} = useCustomTheme();
  const styles = createStyle(theme, backgroundColor);
  const navigation = useNavigation<any>();

  const handleNavigate = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.iconButton} onPress={handleNavigate}>
        <BackIcon name="keyboard-backspace" size={26} color={backIconColor} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      {showRightIcon ? (
        <TouchableOpacity style={styles.iconButton} onPress={onRightIconPress}>
          <HeartIcon
            name={rightIconName}
            size={rightIconSize}
            color={rightIconColor}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.iconButton} />
      )}
    </View>
  );
};

export default CustomHeader;

const createStyle = (theme: ThemeColors, backgroundColor?: string) =>
  StyleSheet.create({
    headerContainer: {
      width: wp('100%'),
      backgroundColor: backgroundColor,
      height: hp('10%'),
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 10,
      paddingRight: 10,
    },
    iconButton: {
      width: 40,
      height: 40,
      borderRadius: 50,
      backgroundColor: theme.background,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: theme.inActive,
      borderWidth: 1.5,
      opacity: 0.9,
    },
    headerTitle: {
      fontSize: 16,
      fontWeight: '500',
    },
  });
