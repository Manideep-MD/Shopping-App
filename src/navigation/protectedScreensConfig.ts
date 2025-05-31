import {SCREENS} from '../constants/screenNames';
import ProductDetails from '../screens/ProductDetails/ProductDetails';
import BottomTabNavigation from './BottomTabNavigation';

export const protectedScreensConfig = [
  {name: SCREENS.BOTTOM_TAB, component: BottomTabNavigation},
  {name: SCREENS.PRODUCT_DETAILS, component: ProductDetails},
];
