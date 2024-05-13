import {
  NavigationContainerRef,
  CommonActions,
  StackActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { Keyboard } from 'react-native';

export const navigationRef = createNavigationContainerRef();

type NavigationContainerComponent = any;
let _navigator: NavigationContainerComponent;
let isAuth: boolean = false;
let _navigationRef: NavigationContainerRef<any> | null;
let currentRouteName = '';

function setTopLevelNavigator(
  navigatorRef: NavigationContainerComponent,
  isAuthParams: boolean,
) {
  _navigator = navigatorRef;
  isAuth = isAuthParams;
  _navigationRef = navigatorRef;
}

function setTopLevelNavigatorRef(
  navigatorRef: NavigationContainerRef<any> | null,
  isAuthParams: boolean,
) {
  _navigationRef = navigatorRef;
  isAuth = isAuthParams;
}

function isSignIn(): boolean {
  return isAuth;
}

function setParams(options: any) {
  return _navigator.dispatch(CommonActions.setParams(options.params));
}

function navigate({
  routeName,
  params = undefined,
  key = routeName,
}: {
  routeName: string;
  params?: any;
  key?: string;
}) {
  if (_navigationRef) {
    return _navigationRef.navigate(routeName, params);
  }
  Keyboard.dismiss();
  return _navigator.dispatch(
    CommonActions.navigate({
      params,
      key,
      path: routeName,
      name: routeName,
    }),
  );
}

function replace({
  routeName,
  params = undefined,
  key = routeName,
}: {
  routeName: string;
  params: any;
  key: string;
}) {
  return _navigator.dispatch(
    StackActions.replace(routeName, {
      routeName,
      params,
      key,
    }),
  );
}

export function popToRoot() {
  return _navigator.dispatch(StackActions.popToTop());
}

export const goBack = () => {
  Keyboard.dismiss();
  if (canGoBack()) {
    if (_navigationRef && _navigationRef !== null) {
      return _navigationRef.goBack();
    }
    return _navigator.dispatch(StackActions.pop());
  }
  return;
};

export const canGoBack = () => {
  if (_navigationRef && _navigationRef !== null) {
    return _navigationRef.canGoBack();
  }
  return;
};

export const getCurrentRouteName = () => {
  return currentRouteName;
};

export const setCurrentRouteName = (name: string) => {
  currentRouteName = name;
};

export const reset = ({
  routes,
  index,
}: {
  routes: { name: string; params?: { [key: string]: any } }[];
  index?: number;
}) => {
  if (index !== undefined) {
    return _navigationRef?.dispatch(
      CommonActions.reset({
        routes,
        index,
      }),
    );
  }
  _navigationRef?.reset({ routes });
};

const NavigationService = {
  navigate,
  setTopLevelNavigator,
  isSignIn,
  replace,
  setParams,
  popToRoot,
  setTopLevelNavigatorRef,
  canGoBack,
  goBack,
  getCurrentRouteName,
  setCurrentRouteName,
  reset,
};

export default NavigationService;
