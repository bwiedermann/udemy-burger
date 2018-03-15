import React, { Component } from 'react';
import { Sidebar } from 'semantic-ui-react';
import './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Sidedrawer from '../../components/Navigation/Sidedrawer/Sidedrawer';

class Layout extends Component {
    state = {
        sideDrawerOpen: false,
    }

    toggleSideDrawer = () => 
        this.setState({sideDrawerOpen: !this.state.sideDrawerOpen})

    render() {
        return (
            <Sidebar.Pushable>
                <Sidedrawer visible={this.state.sideDrawerOpen} />
                <Sidebar.Pusher>
                    <Toolbar toggleSideDrawer={this.toggleSideDrawer} />
                    <main>
                        {this.props.children}
                    </main>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        );
    }
}

export default Layout;
