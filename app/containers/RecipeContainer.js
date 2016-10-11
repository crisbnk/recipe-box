var React = require("react");
var Recipe = require("../components/recipe");
var AddForm = require("./addForm");
var CreateRecipeModal = require("./createRecipeModal");
var Button = require('react-bootstrap').Button;

require('../style/style.scss');

var RecipeContainer = React.createClass({
  getInitialState: function() {
    var storage = JSON.parse(localStorage.getItem("recipes")) || [];
    return {
      recipes: storage
    }
  },

  addRecipeToList: function(rec) {
    console.log("image: ", rec.image);
    if(rec.image === "") {
      rec.image = "http://lorempixel.com/800/600/food/";
    }
    this.state.recipes.push(rec);
    this.setState({
      recipes: this.state.recipes
    });
    localStorage.setItem("recipes", JSON.stringify(this.state.recipes));
  },

  editRecipe: function(id) {
    this.state.recipes[id].editRecipe = !(this.state.recipes[id].editRecipe);
    this.setState({
      recipes: this.state.recipes
    });
    localStorage.setItem("recipes", JSON.stringify(this.state.recipes));
  },

  deleteRecipe: function(id) {
    this.state.recipes.splice(id, 1);
    this.setState({
      recipes: this.state.recipes
    });
    localStorage.setItem("recipes", JSON.stringify(this.state.recipes));
  },

  saveTheIngredient: function(id, ingredient) {
    this.state.recipes[id].ingredients.push(ingredient);
    this.setState({
      recipes: this.state.recipes
    });
    localStorage.setItem("recipes", JSON.stringify(this.state.recipes));
  },

  cancelIngredient: function(ingrId, recId) {
    this.state.recipes[recId].ingredients.splice(ingrId, 1);
    this.setState({
      recipes: this.state.recipes
    });
    localStorage.setItem("recipes", JSON.stringify(this.state.recipes));
  },

  toggleIngredients: function(recId) {
    this.state.recipes[recId].showIngredients = !this.state.recipes[recId].showIngredients;
    this.setState({
      recipes: this.state.recipes
    });
    localStorage.setItem("recipes", JSON.stringify(this.state.recipes));
  },

  showRecipeModal: function(recId) {
    if(!this.state.recipes[recId]) {
      return;
    }
    this.state.recipes[recId].showModal = true;
    this.setState({
      recipes: this.state.recipes
    });
    localStorage.setItem("recipes", JSON.stringify(this.state.recipes));
  },

  hideRecipeModal: function(recId) {
    this.state.recipes[recId].showModal = false;
    this.setState({
      recipes: this.state.recipes
    });
    localStorage.setItem("recipes", JSON.stringify(this.state.recipes));
  },

  saveModifiedRecipe: function(recId, title, description, image) {
    this.state.recipes[recId].description = description;
    this.state.recipes[recId].title = title;
    this.state.recipes[recId].image = image;
    this.setState({
      recipes: this.state.recipes
    });
    localStorage.setItem("recipes", JSON.stringify(this.state.recipes));
  },

  render: function() {
    return (
      <div className="container">
        <h1 className="title">Recipe-Box</h1>
        <div className="addForm">
          <CreateRecipeModal addRecipe={this.addRecipeToList} />
        </div>
        <div>
          <Recipe recipeList={this.state.recipes} editRecipe={this.editRecipe} deleteRecipe={this.deleteRecipe} saveTheIngredient={this.saveTheIngredient} cancelIngredient={this.cancelIngredient} toggleIngredients={this.toggleIngredients} showRecipeModal={this.showRecipeModal} hideRecipeModal={this.hideRecipeModal} saveModifiedRecipe={this.saveModifiedRecipe} />
        </div>
      </div>
    )
  }
});

module.exports = RecipeContainer;
