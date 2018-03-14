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
    }

    addIngredient = (type) => {
        const newIngredients = {...this.state.ingredients};
        newIngredients[type] = this.state.ingredients[type] + 1;
        this.setState({ingredients: newIngredients});
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({ totalPrice: newPrice});
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
                    disabled={disabledInfo} />
            </Fragment>
        );
    }
}
 
export default BurgerBuilder;
