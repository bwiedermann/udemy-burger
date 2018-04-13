import React, { Fragment, Component } from 'react';
import { Modal, Header } from 'semantic-ui-react';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    }
    componentDidMount() {
      axios.interceptors.request.use(request => {
        this.clearError();
        return request;
      });
      axios.interceptors.response.use(response => response, error => {
        this.setState({error: error});
      });
    }

    clearError = () => {
      this.setState({error: null});
    }

    render() {
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