import React, { Component, Fragment } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import { Loader, Message, Icon } from 'semantic-ui-react';

import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../components/withErrorHandler/withErrorHandler';

import * as actions from '../../store/actions/burgerBuilder';

class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount = () => {
        // TODO
    //   axios.get('https://udemy-burger-d490e.firebaseio.com/ingredients.json')
    //         .then(response => {
    //             this.setState({ingredients: response.data});
    //             this.updatePurchasableState(response.data);
    //         })
    //         .catch(error => this.setState({error: true}));
    this.updatePurchasableState(this.props.ingredients);
    }

    componentWillReceiveProps(nextProps) {
        this.updatePurchasableState(nextProps.ingredients);
    }

    updatePurchasableState(ingredients) {
        // the burger is purchasable if any ingredient has a quantity > 0.
        const purchasable = ingredients &&
            Object.keys(ingredients).some(name => ingredients[name] > 0);
        this.setState({purchasable: purchasable});
    }

    addIngredient = (type) => this.props.ingredientAdded(type)
    removeIngredient = (type) => this.props.ingredientRemoved(type)

    order = () => this.setState({purchasing: true})
    cancelOrder = () => this.setState({purchasing: false})
    continueOrder = () => this.props.history.push('/checkout');

    render() { 
        const disabledInfo = {...this.props.ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let burger = 
          (<Fragment>
            <Burger ingredients={this.props.ingredients} />
            <BuildControls
                ingredientAdded={this.addIngredient}
                ingredientRemoved={this.removeIngredient}
                disabled={disabledInfo}
                price={this.props.totalPrice}
                purchasable={this.state.purchasable}
                order={this.order} />
            <OrderSummary
                price={this.props.totalPrice}
                ingredients={this.props.ingredients}
                purchasable={this.state.purchasable}
                purchasing={this.state.purchasing}
                order={this.order}
                purchaseCanceled={this.cancelOrder}
                purchaseContinued={this.continueOrder}
                loading={this.state.loading}
            />
          </Fragment>);
        if (this.props.ingredients === null) {
            burger = <Loader active />
        }
        if (this.state.error) {
            burger = 
            <Message negative size = 'massive'>
                <Message.Header>
                    <Icon name='food' />  Uh Oh!
                </Message.Header>
                Ingredients can't be loaded
            </Message>
        }
        return (
          <Fragment>
              {burger}
          </Fragment>  
        );
    }
}
 
/*******************************************************************************
 * connect component to the store
 *******************************************************************************/
const mapStateToProps = (state) => ({
  ingredients: state.ingredients,
  totalPrice: state.totalPrice,
});

const mapDispatchToProps = (dispatch) => ({
    ingredientAdded: (type) => dispatch(actions.addIngredientAction(type)),
    ingredientRemoved: (type) => dispatch(actions.removeIngredientAction(type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
