import React, {useState, useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';

import reducers from './src/stores/reducers';

import Splash from './src/components/Splash';
import Navigation from './src/components/Navigation';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    RNBootSplash.hide({fade: true});
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
