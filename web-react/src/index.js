import React from 'react';
import ReactDOM from 'react-dom/client'; // is /client needed?
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ApolloClient, InMemoryCache, ApolloProvider, makeVar} from "@apollo/client";
import {Auth0Provider} from "@auth0/auth0-react";

export const starredVar = makeVar([]);

const client = new ApolloClient({
   uri: "http://localhost:4000",
   cache: new InMemoryCache({
      typePolicies: {
         Business: {
            fields: {
               isStarred: {
                  read(_, {readField}) {
                     return starredVar().includes(readField("businessId"));
                  },
               },
            },
         },
      },
   }),
});

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
   <React.StrictMode>
      <Auth0Provider
         domain="https://dev-5buaw1p10tc2dc2y.us.auth0.com/"
         clientId="jTi8E1pvtMNRPfkkMZNvBxa3XtAGs9n7"
         redirectUri={window.location.origin}
         audience="mckeown.me"
      >
         <ApolloProvider client={client}>
            <App />
         </ApolloProvider>
      </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
