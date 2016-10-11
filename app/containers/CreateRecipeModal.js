var React = require("react");
var Modal = require('react-bootstrap').Modal;
var AddForm = require("./addForm");

var CreateRecipeModal = React.createClass({
  getInitialState() {
    return {modalShow: false};
  },

  addRecipeToList: function(rec) {
    this.props.addRecipe(rec);
  },

  openModal: function() {
    this.setState({
      modalShow: true
    });
  },

  closeModal: function() {
    this.setState({
      modalShow: false
    });
  },

  render() {
    return (
      <div>
        <div className="addNewRecipeBtn">
          <button type="button" onClick={this.openModal}>
            <i className="fa fa-plus"></i>
          </button>
          <div>Add New Recipe</div>
        </div>
        <Modal show={this.state.modalShow} bsSize="large" dialogClassName="modalStyle" aria-labelledby="contained-modal-title-lg">
          <AddForm addRecipe={this.addRecipeToList} closeModal={this.closeModal} />
        </Modal>
      </div>
    );
  }
});

module.exports = CreateRecipeModal;
