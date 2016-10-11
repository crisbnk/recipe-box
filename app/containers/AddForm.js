var React = require("react");
var Ingredients = require("./ingredients");
var IngredientsList = require("../components/ingredientsList");
var Modal = require('react-bootstrap').Modal;
var Image = require('react-bootstrap').Image;

var AddForm = React.createClass({
  getInitialState: function() {
    var title = "";
    var image = "";
    var descr = "";
    if(this.props.recipe !== undefined) {
      title = this.props.recipe.title;
      image = this.props.recipe.image;
      descr = this.props.recipe.description;
    }
    return {
      title: title,
      image: image,
      ingredients: [],
      description: descr,
      editRecipe: false,
      showIngredients: false,
      showModal: false,
      addFormCompleted: false
    }
  },

  addIngredientToList: function(ing) {
    this.state.ingredients.push(ing);
    this.setState({
      ingredients: this.state.ingredients
    });
  },

  saveTheRecipe: function(rec) {
    this.setState({
      title: rec,
      image: this.state.image,
      ingredients: this.state.ingredientsList,
      description: this.state.description,
      addFormCompleted: true
    });
    this.props.addRecipe(this.state);
    this.setState({
      title: "",
      image: "",
      ingredients: [],
      description: "",
      addFormCompleted: false
    });
    this.closeModal();
  },

  handleTitleChange: function(evt) {
    this.setState({
      title: evt.target.value
    });
  },

  handleImageChange: function(evt) {
    this.setState({
      image: evt.target.value
    });
  },

  handleTextAreaChange: function(evt) {
    this.setState({
      description: evt.target.value
    });
  },

  cancelIngredient: function(index, isRecipeSaved) {
    if(isRecipeSaved) {
      this.props.cancelIngredient(index);
    } else {
      this.state.ingredients.splice(index, 1)
      this.setState({
        ingredients: this.state.ingredients
      });
    }
  },

  closeModal: function() {
    this.props.closeModal();
  },

  editRecipe: function() {
    this.props.editRecipe();
  },

  saveModifiedRecipe: function() {
    if(this.state.title === "") { return; }
    this.props.saveModifiedRecipe(this.state.title, this.state.description, this.state.image);
    this.props.editRecipe();
  },

  saveTheIngredient: function() {
    this.props.saveTheIngredient();
  },

  renderModal: function() {
    if(this.props.recipe !== undefined) {
      return (
        <div>
          <Modal.Header closeButton>
            {this.props.recipe.editRecipe ? <div className="addFormTitle"><h4>Recipe name:</h4><input type="text" value={this.state.title} onChange={this.handleTitleChange}/></div> : <Modal.Title>{this.props.recipe.title}</Modal.Title>}
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-6">
                {!(this.props.recipe.editRecipe) ? <h4>Ingredients:</h4> : <div><h4>Ingredients:</h4><input id="ingredient" type="text" placeholder="Add a Recipe" /><button type="button" onClick={this.saveTheIngredient}><i className="fa fa-plus"></i></button></div>}
                <IngredientsList ingredientsList={this.props.recipe.ingredients} isRecipeSaved={true} editRecipe={this.props.recipe.editRecipe} cancelIngredient={this.cancelIngredient} />
              </div>
              <div className="col-md-6">
                {!(this.props.recipe.editRecipe) ? <Image src={this.props.recipe.image} responsive /> : <div><h4>Image URL:</h4><input className="imgUrl" type="text" value={this.state.image} onChange={this.handleImageChange}/></div>}
              </div>
            </div>
            <hr></hr>
            {this.props.recipe.editRecipe ? <div><h4>Description:</h4><textarea id="textarea" value={this.state.description} onChange={this.handleTextAreaChange}></textarea></div> : <div className="description">{this.props.recipe.description || ""}</div>}
          </Modal.Body>
          <Modal.Footer>
            {!(this.props.recipe.editRecipe) ? <span onClick={this.editRecipe}>Edit <i className="fa fa-edit"></i></span> : <span onClick={this.saveModifiedRecipe}>Save <i className="fa fa-edit"></i></span>}
          </Modal.Footer>
        </div>
      )
    } else {
      return (
        <div>
          <div className="addFormTitle">
            <input type="text" value={this.state.title} placeholder="Add a Recipe" onChange={this.handleTitleChange}/>
          </div>
          <hr></hr>
          <input type="text" className="imgUrl" value={this.state.image} placeholder="Add an URL Image" onChange={this.handleImageChange}/>
          <hr></hr>
          <Ingredients addIngredient={this.addIngredientToList} />
          <IngredientsList ingredientsList={this.state.ingredients} cancelIngredient={this.cancelIngredient} isRecipeSaved={false} />
          <hr></hr>
          <textarea id="textarea" value={this.state.description} onChange={this.handleTextAreaChange}></textarea>
          <hr></hr>
          <button onClick={this.saveTheRecipe}>Save</button>
          <button onClick={this.closeModal}>Cancel</button>
        </div>
      )
    }
  },

  render: function() {
    return (
      <div>
        {this.renderModal()}
      </div>
    )
  }
});

module.exports = AddForm;
