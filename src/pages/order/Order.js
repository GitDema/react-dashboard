/* eslint-disable jsx-a11y/label-has-for */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import axios from 'axios';

import Widget from '../../components/Widget';

/* 

-product name
-title of propose
-parameters
-requirements
-photos
-documents

*/

const inputsCss = {
  width: '100%',
};

class Order extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clientId: null,
    };

    this.handleInputs = this.handleInputs.bind(this);
    this.orderApprove = this.orderApprove.bind(this);
  }

  componentDidMount() {
    this.setState({
      order: this.props.order,
      orderName: this.props.order.name,
      orderProposeTitle: this.props.order.proposeTitle,
      orderRequirements: this.props.order.requirements,
    });
  }

  handleInputs = name => event => {
    this.setState({ [name]: event.target.value });
  };

  orderApprove() {}

  render() {
    const {
      order,
      orderName,
      orderProposeTitle,
      orderRequirements,
    } = this.state;

    if (!order) {
      return (
        <p style={{ textAlign: 'center', fontSize: '22px' }}>Loading...</p>
      );
    }

    return (
      <div>
        <Breadcrumb>
          <BreadcrumbItem active>Order</BreadcrumbItem>
        </Breadcrumb>

        <h1 className="page-title mb-lg">Edit order #{order._id}</h1>

        {console.log(order)}

        <Row>
          <Col sm="6">
            <Widget settings close>
              <form>
                <label htmlFor="name">Product name:</label>
                <br />
                <input
                  value={orderName}
                  onChange={this.handleInputs('orderName')}
                  type="text"
                  id="name"
                  style={inputsCss}
                />
                <br />
                <br />

                <label htmlFor="desc">Title of propose:</label>
                <br />
                <input
                  value={orderProposeTitle ? orderProposeTitle : ''}
                  onChange={this.handleInputs('orderProposeTitle')}
                  type="text"
                  id="desc"
                  style={inputsCss}
                />
                <br />
                <br />

                {/* <label htmlFor="param">Parameters:</label>
                <br />
                <input type="text" id="param" style={inputsCss} />
                <br />
                <br /> */}

                <label htmlFor="req">Requirements:</label>
                <br />
                <textarea
                  value={orderRequirements ? orderRequirements : ''}
                  onChange={this.handleInputs('orderRequirements')}
                  name="req"
                  id="req"
                  rows="8"
                  style={inputsCss}
                />
                <br />
                <br />

                <label htmlFor="photos">Photos:</label>
                <br />
                <input
                  type="file"
                  id="photos"
                  accept="image/png, image/jpeg, image/gif"
                  multiple
                />
                <br />
                <br />

                <label htmlFor="docs">Documents:</label>
                <br />
                <input
                  type="file"
                  id="docs"
                  accept="application/doc, application/pdf, application/xls"
                  multiple
                />
                <br />

                <br />
                <br />

                <div className="order-btns">
                  <div>
                    <Link to="/admin/orders">
                      <Button
                        color="danger"
                        className="btn-rounded width-100 mb-xs mr-xs"
                      >
                        Cancel
                      </Button>
                    </Link>

                    <Link to="/admin/orders">
                      <Button color="success" className="width-100 mb-xs mr-xs">
                        Save
                      </Button>
                    </Link>
                  </div>

                  <div>
                    {order.status.toLowerCase() === 'placed' ? (
                      <Fragment>
                        <Button
                          className="width-100 mb-xs mr-xs"
                          color="danger"
                          outline
                        >
                          Reject
                        </Button>
                        <Button
                          className="width-100 mb-xs mr-xs"
                          color="success"
                          outline
                        >
                          Approve
                        </Button>
                      </Fragment>
                    ) : order.status.toLowerCase() === 'approved' ? (
                      <Button
                        className="width-100 mb-xs mr-xs"
                        color="success"
                        disabled
                        outline
                      >
                        Approved
                      </Button>
                    ) : (
                      <Button
                        className="width-100 mb-xs mr-xs"
                        color="danger"
                        disabled
                        outline
                      >
                        Rejected
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </Widget>
          </Col>

          <Col sm="6">
            <Widget settings close>
              <div>
                <p>Photos:</p>
                {order.photos.length > 0 ? (
                  <div className="order-photos">
                    {order.photos.map(photo => (
                      <a
                        href={`http://dev.opnplatform.com/api/v1/file/${
                          photo._id
                        }`}
                        target="_black"
                      >
                        <img
                          key={photo._id}
                          src={`http://dev.opnplatform.com/api/v1/file/${
                            photo._id
                          }`}
                          width={100}
                          height={100}
                          style={{ objectFit: 'cover' }}
                        />
                      </a>
                    ))}
                  </div>
                ) : (
                  'No photos'
                )}
              </div>

              <br />
              <br />

              <div>
                <p>Documents:</p>
                {order.documents.length > 0 ? (
                  <div className="order-documents">
                    {order.documents.map(doc => (
                      <a
                        href={`http://dev.opnplatform.com/api/v1/file/${
                          doc._id
                        }`}
                        target="_black"
                      >
                        {doc.filename}
                      </a>
                    ))}
                  </div>
                ) : (
                  'No documents'
                )}
              </div>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    order: state.order.order,
  };
};

export default connect(mapStateToProps)(Order);
