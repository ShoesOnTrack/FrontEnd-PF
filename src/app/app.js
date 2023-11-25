import { Provider } from 'react-redux';
import store from '@/redux/store';
import HomePage from './page';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <HomePage />
    </Provider>
  );
}

export default MyApp;