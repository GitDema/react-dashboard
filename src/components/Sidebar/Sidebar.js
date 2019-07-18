import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { withRouter, Link } from 'react-router-dom';

import LinksGroup from './LinksGroup/LinksGroup';

import logo from '../../images/logo_white.png';

import s from './Sidebar.scss';

const Sidebar = () => (
  <nav className={s.root}>
    <header className={s.logo}>
      <Link to="/admin">
        <img src={logo} alt="Logo" />
      </Link>
    </header>
    <ul className={s.nav}>
      <LinksGroup
        header="Tariff plans"
        headerLink="/admin/tariffs"
        glyph="user"
      />

      <LinksGroup 
        header="Orders" 
        headerLink="/admin/orders" 
        headerLink="/admin/orders" 
        glyph="tables" 
      />  

      <LinksGroup 
        header="Categories" 
        headerLink="/admin/categories" 
        glyph="list" 
      />

      {/* <LinksGroup header="Order" headerLink="/admin/order" glyph="typography" /> */}
      {/* <hr />
      <LinksGroup header="Dashboard" headerLink="/admin" glyph="dashboard" />
      <LinksGroup
        header="Typography"
        headerLink="/admin/typography"
        glyph="typography"
      />
      <LinksGroup
        header="Tables Basic"
        headerLink="/admin/tables"
        glyph="tables"
      /> */}
      {/* <LinksGroup
        header="Notifications"
        headerLink="/admin/notifications"
        glyph="notifications"
      /> */}
      {/* <LinksGroup
        header="Components"
        headerLink="/admin/components"
        childrenLinks={[
          {
            name: 'Buttons',
            link: '/admin/components/buttons',
          },
          {
            name: 'Charts',
            link: '/admin/components/charts',
          },
          {
            name: 'Icons',
            link: '/admin/components/icons',
          },
          {
            name: 'Maps',
            link: '/admin/components/maps',
          },
        ]}
        glyph="components"
      /> */}
    </ul>
  </nav>
);

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
  };
}

export default withRouter(connect(mapStateToProps)(withStyles(s)(Sidebar)));
