import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './pages/app/App';
import Login from './pages/login';
import AppCenter from './pages/app_center';
import Account from './pages/account';
import Reports from './pages/reports/Reports';
import Shops from './pages/shops/Shops';
//门店详细信息
import DetailInfo from 'PAGES/detailInfo';
//放大图片
import DetailImage from 'PAGES/detailImage';

import Error404 from 'PAGES/404';

export default(
  <Route path="/" component={App}>
    <IndexRoute component={Login} />
    <Route path="login" component={Login}/>
    <Route path="appCenter" component={AppCenter}/>
    <Route path="account" component={Account} />
    <Route path="shops" component={Shops} />
    <Route path="reports" component={Reports}/>
    <Route path="detailInfo(/:id)" component={DetailInfo}/>
    <Route path="detailImage(/:id)" component={DetailImage}/>
    <Route path="*" component={Error404}/>
  </Route>
);
