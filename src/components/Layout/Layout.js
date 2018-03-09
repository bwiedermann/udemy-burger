import React, { Fragment } from 'react';
import './Layout.css';

const Layout = (props) => (
    <Fragment>
        <div>Toolbar, Sidedrawer, Backdrop</div>
        <main>
            {props.children}
        </main>
    </Fragment>
);

export default Layout;
