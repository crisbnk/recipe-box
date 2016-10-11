var React = require('react');
var PropTypes = React.PropTypes;

function IngredientName(props) {
  return (
    <div className="ingredientsName">
      {props.ingredient}
      {!(props.editRecipe) ? <span></span> : <span onClick={props.cancelIngredient}><i className="fa fa-trash-o"></i></span>}
      {props.isRecipeSaved ? <span></span> : <span onClick={props.cancelIngredient}><i className="fa fa-trash-o"></i></span>}
    </div>
  )
}

IngredientName.propTypes = {
  campers: PropTypes.array
}

module.exports = IngredientName;
