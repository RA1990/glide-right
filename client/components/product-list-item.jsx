import React from 'react';
import ProductDetails from './product-details';

export default class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: 'hide',
      overflow: null
    };
    this.modal = this.modal.bind(this);
    this.modalClose = this.modalClose.bind(this);
  }
  componentDidUpdate() {
    if (this.state.modal === 'hide') {
      document.documentElement.classList.remove('overflow-control');
    } else {
      document.documentElement.classList.add('overflow-control');
    }
  }
  modal() {
    document.body.classList.remove('overflow-x-body');
    document.body.classList.add('overflow-control');
    this.setState({ modal: 'show' });
  }
  modalClose() {
    document.body.classList.add('overflow-x-body');
    document.body.classList.remove('overflow-control');
    this.setState({ modal: 'hide' });
  }

  render() {
    return (
      <>
        <div className="modal" id={this.state.modal} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content modal-t">
              <div className="modal-body">
                <ProductDetails id={this.props.id} click={this.modalClose} add={this.props.addTocart} />
              </div>
              <div className="modal-footer">
              </div>
            </div>
          </div>
        </div>
        <div onClick={this.modal} className="card col-xl-3  col-for-cards mb-3 zoom">
          <div className="card-body text-left">
            <img src={this.props.image} className="card-img-top" alt="item1" />
            <h5 className="card-title">{this.props.name}</h5>
            <p className="text-left">{this.props.shortDescription}</p>
            <p className="text-left"><span className="badge badge-primary" >${(this.props.price / 100).toFixed(2)}</span></p>
          </div>
        </div>
      </>
    );
  }
}
