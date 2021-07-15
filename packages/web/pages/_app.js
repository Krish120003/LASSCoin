import Head from "next/head";
import { Provider } from "react-redux";

import "../styles/globals.css";
import store from "../store";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <script src="https://code.iconify.design/1/1.0.7/iconify.min.js"></script>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
