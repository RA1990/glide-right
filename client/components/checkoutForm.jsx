import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: 'show',
      placeOrder: false,
      'customerName': '',
      'creditCardInfo': '',
      'shippingAddressInfo': ''
    };
    this.modal = this.modal.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCreditCardChange = this.handleCreditCardChange.bind(this);
    this.handleShippingAddressInfo = this.handleShippingAddressInfo.bind(this);
    this.getCartTotal = this.getCartTotal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOrder = this.handleOrder.bind(this);
  }
  modal() {
    this.setState({ modal: 'hide' });
  }
  handleOrder() {
    let name = this.state.customerName;
    let credit = this.state.creditCardInfo;
    if (!name.match(/^([a-zA-Z\-'\s]+)$/)) {
      return undefined;
    }
    if (!credit.match(/^(^\d{10}$)$/)) {
      return undefined;
    }
    this.setState({ placeOrder: true });
  }

  handleNameChange(event) {
    this.setState({ customerName: event.target.value });
  }

  handleCreditCardChange(event) {
    this.setState({ creditCardInfo: event.target.value });
  }

  handleShippingAddressInfo(event) {
    this.setState({ shippingAddressInfo: event.target.value });
  }

  handleSubmit(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

  getCartTotal() {
    let cartTotalItem = this.props.allItems;
    let total = 0;
    for (let i = 0; i < cartTotalItem.length; i++) {
      total += parseInt(cartTotalItem[i].price * cartTotalItem[i].count);
    }
    return total;
  }

  render() {
    if (this.state.placeOrder === true) {
      return (
      <>
        <div className="container">
          <button className="btn btn-link mt-4" onClick={() => this.props.setView('catalog', {})}>
            {'<'}  Back to Catalog
          </button>
        </div>;
    <div className=" mt-5 d-block p-2 bg-dark text-white text-center checkout">
      <span>Thank You For Ordering</span>
      <h2>Your Order Number is </h2>
      <h2>{ Math.floor(Math.random() * 1000000000) }</h2>
    </div>
      </>
      );
    }

    return (
      <>
        <div className="modal" id={this.state.modal} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content modaltop">
              <div className="modal-body">
                <p className="mr-5">This is a demo site there are no products for sale</p>
              </div>
              <div className="modal-footer">
                <button onClick={this.modal} type="button" className="btn btn-secondary modalButton" data-dismiss="modal">I Agree</button>
              </div>
            </div>
          </div>
        </div>
        <div className="container checkoutTextColor">
          <h1 className="checkoutTextColor">Checkout</h1>
          <p className="checkoutTextColor">Order Total:${(this.getCartTotal() / 100).toFixed(2)}</p>
          <form className="checkoutTextColor" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label >Name</label>
              <input onKeyDown={this.handleSubmit} type="text" pattern="[a-zA-Z\-'\s]+" value={this.state.customerName} onChange={this.handleNameChange} className="form-control" id="exampleFormControlInput1" placeholder="enter name" />
            </div>

            <div className="form-group">
              <label>Credit Card</label>
              <input onKeyDown={this.handleSubmit} type="text" pattern="^\d{10}$" value={this.state.creditCardInfo} onChange={this.handleCreditCardChange} className="form-control" id="exampleFormControlInput1" placeholder="enter credit card 10 digits no space" />
            </div>

            <div className="form-group">
              <label>Shipping Address</label>
              <textarea onKeyDown={this.handleSubmit} value={this.state.shippingAddressInfo} onChange={this.handleShippingAddressInfo} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>

            <div className="container">
              <div className="row">
                <div className="col">
                  <button className="btn btn-link mt-4" onClick={() => this.props.setView('catalog', {})}>
                    {'<'}  continue shopping
                  </button>
                </div>
                <div className="col">
                  <button onClick={this.handleOrder} type="button" className="btn placeOrder btn-primary">Place Order</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </>

    );
  }

}
