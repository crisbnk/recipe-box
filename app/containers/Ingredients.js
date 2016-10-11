var React = require("react");

var Ingredients = React.createClass({
  getInitialState: function() {
    return {
      value: ""
    }
  },

  handleChange: function(evt) {
    this.setState({
      value: evt.target.value
    });
  },

  saveTheIngredient: function() {
    this.props.addIngredient(this.state.value);
    this.setState({
      value: ""
    });
  },

  render: function() {
    return (
      <div className="addIngredient">
        <input type="text" value={this.state.value} placeholder="Add an Ingredient" onChange={this.handleChange}/>
        <button href="" onClick={this.saveTheIngredient}><i className="fa fa-plus"></i></button>
      </div>
    )
  }
});

module.exports = Ingredients;
