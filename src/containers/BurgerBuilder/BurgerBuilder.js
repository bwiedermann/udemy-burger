import React, { Component, Fragment } from 'react';
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import withErrorHandler from '../../components/withErrorHandler/withErrorHandler';
import { Loader, Message, Icon } from 'semantic-ui-react';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: .4,
    meat: 1.3,
    bacon: 0.7,
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount = () => {
      axios.get('https://udemy-burger-d490e.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
                this.updatePurchasableState(response.data);
            })
            .catch(error => this.setState({error: true}));
      this.updatePurchasableState(this.state.ingredients);
    }
    

    updatePurchasableState(ingredients) {
        // the burger is purchasable if any ingredient has a quantity > 0.
        const purchasable = ingredients &&
            Object.keys(ingredients).some(name => ingredients[name] > 0);
        this.setState({purchasable: purchasable});
    }

    addIngredient = (type) => {
        const newIngredients = {...this.state.ingredients};
        newIngredients[type] = this.state.ingredients[type] + 1;
        this.setState({ingredients: newIngredients});
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({ totalPrice: newPrice});
        this.updatePurchasableState(newIngredients);
    }

    removeIngredient = (type) => {
        if (this.state.ingredients[type] <= 0) {
            return;
        }
        const newIngredients = { ...this.state.ingredients };
        newIngredients[type] = this.state.ingredients[type] - 1;
        this.setState({ ingredients: newIngredients });
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({ totalPrice: newPrice });
        this.updatePurchasableState(newIngredients);
    }

    order = () => this.setState({purchasing: true})
    cancelOrder = () => this.setState({purchasing: false})

    continueOrder = () => {
        const queryParams = ['price=' + this.state.totalPrice];
        for (let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        const queryString = queryParams.join('&')
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString,
        });
    }

    render() { 
        const disabledInfo = {...this.state.ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let burger = 
          (<Fragment>
            <Burger ingredients={this.state.ingredients} />
            <BuildControls
                ingredientAdded={this.addIngredient}
                ingredientRemoved={this.removeIngredient}
                disabled={disabledInfo}
                price={this.state.totalPrice}
                purchasable={this.state.purchasable}
                order={this.order} />
            <OrderSummary
                price={this.state.totalPrice}
                ingredients={this.state.ingredients}
                purchasable={this.state.purchasable}
                purchasing={this.state.purchasing}
                order={this.order}
                purchaseCanceled={this.cancelOrder}
                purchaseContinued={this.continueOrder}
                loading={this.state.loading}
            />
          </Fragment>);
        if (this.state.ingredients === null) {
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
 
export default withErrorHandler(BurgerBuilder, axios);
