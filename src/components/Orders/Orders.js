import React, { Component } from "react";
import "./Orders.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setOrders } from "../../Redux/actions/orders";

class Orders extends Component {
  state = {
    orders: [],
  };
  componentDidMount() {
    this.props.setOrders();
  }
  handleDelete(e, orderId) {
    e.preventDefault();
    this.props.excludeOrder(orderId);
  }

  render() {
    let orders = this.props.data.data;
    let orderEls;
    if (orders) {
      orderEls = orders.map((order) => {
        return (
          <div className="order" key={order.id}>
            <h4>{order.name}</h4>
            {
              <>
                <h4>ingredients :</h4>
                <ul className="ingredient-list">
                  {order.ingredients.map((ingredient, idx) => {
                    return <li key={idx}>{ingredient}</li>;
                  })}
                </ul>
              </>
            }
          </div>
        );
      });
    } else {
      orderEls = [];
    }
    return (
      <section className="order-container">
        {orderEls.length ? orderEls : <p>No orders yet!</p>}
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state,
});

const mapDispatchToProps = (dispatch) => ({
  setOrders: bindActionCreators(setOrders, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
