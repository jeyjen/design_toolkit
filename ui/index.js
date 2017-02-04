import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './js/app';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('content')
  );
};


render(App);
if (module.hot) 
{
	console.log("hot!!!!");
	module.hot.accept('./js/app', () => 
	{
		render(App)
	});
}