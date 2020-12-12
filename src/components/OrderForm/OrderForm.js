import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addOrder } from "../../Redux/actions/orders";

export class OrderForm extends Component {
  state = {
    ingrediants: [],
    name: "",
    possibleIngredients: [
      "beans",
      "steak",
      "carnitas",
      "sofritas",
      "lettuce",
      "queso fresco",
      "pico de gallo",
      "hot sauce",
      "guacamole",
      "jalapenos",
      "cilantro",
      "sour cream",
    ],
  };
  // adding the ingrediants to the state
  handleIngredientChange = (ingrediant, e) => {
    e.preventDefault();
    this.setState({
      ingrediants: [...this.state.ingrediants, ingrediant],
    });
  };
  // handle name change in the form
  handleAddName = (e) => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  };
  //clearing state after submition
  handleClear = () => {
    this.setState({ name: "", ingrediants: [], total: 0 });
  };
  // handle submit to send the new order to the server
  handleSubmit = async (e) => {
    e.preventDefault();
    await this.props.addOrder(
      this.state.name,
      this.state.ingrediants,
      this.state.total
    );
    this.handleClear();
  };

  render() {
    return (
      <form className="container-form">
        <h3>Order Menu</h3>
        <input
          className="name-input"
          type="text"
          placeholder="Name"
          name="name"
          value={this.state.name}
          onChange={(e) => this.handleAddName(e)}
        />

        {this.state.possibleIngredients.map((ingrediant, idx) => {
          return (
            <React.Fragment key={idx}>
              <button
                className="ingrediant"
                onClick={(e) => this.handleIngredientChange(ingrediant, e)}
                data-testid={`ingrediant${idx}`}
              >
                {ingrediant} ${this.state.cost}
              </button>
            </React.Fragment>
          );
        })}

        <button
          className="submit"
          onClick={(e) => this.handleSubmit(e)}
          disabled={
            this.state.name === "" ||
            this.state.ingrediants.length < 1 ||
            this.props.data.isLoading
              ? true
              : false
          }
          data-testid="submit"
        >
          Submit Order
        </button>
        {
          // rendering added ingrediants for users to be able to see their added ingrediants
          this.state.ingrediants.map((ing, id) => (
            <React.Fragment key ={id}>
              <ul>{ing}</ul>
            </React.Fragment>
          ))
        }
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state,
});

const mapDispatchToProps = (dispatch) => ({
  addOrder: bindActionCreators(addOrder, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);
