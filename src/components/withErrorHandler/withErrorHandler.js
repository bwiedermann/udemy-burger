import React, { Fragment, Component } from 'react';
import { Modal, Header } from 'semantic-ui-react';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    }

    componentWillMount() {
      this.requestInterceptor = axios.interceptors.request.use(
        request => {
          this.clearError();
          return request;
        });

      this.responseInterceptor = axios.interceptors.response.use(
        response => response, 
        error => {
          this.setState({error: error});
        });
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    clearError = () => {
      this.setState({error: null});
    }

    render() {
      if (this.state.error) {
        console.log('[ERROR]', this.state.error);
      }
      return (
        <Fragment>
          <Modal 
            size='small' 
            open={this.state.error !== null}
            onClose={this.clearError}
            closeOnDimmerClick={true}
            >
            <Header icon='frown' content='An error occurred' />
            <Modal.Content>
              {this.state.error ? this.state.error.message : null}
            </Modal.Content>   
          </Modal>
          <WrappedComponent {...this.props} />
        </Fragment>
      );
    }
  }
}

export default withErrorHandler;
