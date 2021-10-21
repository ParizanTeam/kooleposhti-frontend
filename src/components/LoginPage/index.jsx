import React from 'react';
import Recaptcha from 'react-recaptcha';

import './style.scss';

const LoginPage = () => {
  return (
    <div>
      <Recaptcha
        sitekey="6LfI6N4cAAAAAM5s9zVuo5MJiUYbHYO9Du9cgJSU"
        render="expilcit"
        onloadCallback={() => console.log('loaded')}
      />

      <h1>صفحه ورود</h1>
    </div>
  );
};

export default LoginPage;
