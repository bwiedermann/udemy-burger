import React, { Component, Fragment } from 'react';
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: .4,
    meat: 1.3,
    bacon: 0.7,
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        purchasable: false
    }

    updatePurchasableState(ingredients) {
        // the burger is purchasable if any ingredient has a quantity > 0.
        const purchasable = 
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

    order = () => {

    }

    render() { 
        const disabledInfo = {...this.state.ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (  
            <Fragment>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded={this.addIngredient}
                    ingredientRemoved={this.removeIngredient} 
                    disabled={disabledInfo} 
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable} />
            </Fragment>
        );
    }
}
 
export default BurgerBuilder;
