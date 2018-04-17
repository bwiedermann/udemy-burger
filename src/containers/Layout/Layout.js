import React, { Component } from 'react';
import { Sidebar } from 'semantic-ui-react';
import './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Sidedrawer from '../../components/Navigation/Sidedrawer/Sidedrawer';
import { connect } from 'react-redux';

class Layout extends Component {
    state = {
        sideDrawerOpen: false,
    }

    toggleSideDrawer = () => 
        this.setState({sideDrawerOpen: !this.state.sideDrawerOpen})

    render() {
        return (
            <Sidebar.Pushable>
                <Sidedrawer visible={this.state.sideDrawerOpen} loggedIn={this.props.loggedIn} />
                <Sidebar.Pusher>
                    <Toolbar toggleSideDrawer={this.toggleSideDrawer} loggedIn={this.props.loggedIn} />
                    <main>
                        {this.props.children}
                    </main>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        );
    }
}

const mapStateToProps = (state) => ({
  loggedIn: state.auth.token != null,
})


export default connect(mapStateToProps)(Layout);
