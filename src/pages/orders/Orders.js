import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Table,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
} from 'reactstrap';
import moment from 'moment';
import axios from 'axios';

import Widget from '../../components/Widget';
import { setOrder } from '../../actions/order';

const api_url = process.env.API_URL;

class Orders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
    };
  }

  componentDidMount() {
    axios
      .post(`${api_url}/orders/get/2/all`, {
        clientId: localStorage.getItem('clientId'),
        access_token: localStorage.getItem('access_token'),
        count: 250,
        offset: 0,
      })
      .then(res => {
        this.setState({ orders: res.data.result });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { orders } = this.state;

    if (!orders) {
      return (
        <p style={{ textAlign: 'center', fontSize: '22px' }}>Loading...</p>
      );
    }

    return (
      <div>
        <Breadcrumb>
          <BreadcrumbItem active>Orders</BreadcrumbItem>
        </Breadcrumb>

        <h2 className="page-title mb-lg">Orders</h2>

        <Row>
          <Col sm={12}>
            <Widget settings close>
              <div className="table-responsive">
                <Table borderless className="table-hover mainTable">
                  <thead>
                    <tr>
                      {/* <th className="hidden-sm-down">#</th> */}
                      <th>Photos</th>
                      <th>Details</th>
                      <th>Company</th>
                      <th>Delivery</th>
                      <th>Announce of propose</th>
                      <th>Requirements</th>
                      <th>Documents</th>
                      <th>Description</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.index}>
                        <td>
                          {order.photos.length > 0 && (
                            <img
                              className="img-rounded"
                              width="60"
                              height="60"
                              style={{ objectFit: 'cover' }}
                              src={`${location.protocol}//${
                                location.hostname == 'localhost'
                                  ? 'dev.opnplatform.com'
                                  : location.hostname
                              }/api/v1/file/${order.photos[0]._id}`}
                              alt="Product photo"
                            />
                          )}
                        </td>

                        <td>
                          <div className="mb-0">
                            <small>
                              <span className="fw-semi-bold">ID:</span>
                              <p className="text-muted">{order.index}</p>
                            </small>
                          </div>
                          <div className="mb-0">
                            <small>
                              <span className="fw-semi-bold">Product:</span>
                              <p className="text-muted">{order.name}</p>
                            </small>
                          </div>
                          <div className="mb-0">
                            <small>
                              <span className="fw-semi-bold">
                                Currency/Price:
                              </span>
                              <p className="text-muted">
                                {order.currency} {order.price / 100}
                              </p>
                            </small>
                          </div>
                          <div className="mb-0">
                            <small>
                              <span className="fw-semi-bold">Propose:</span>
                              <p className="text-muted">
                                <Badge color="info">{order.purpose}</Badge>
                              </p>
                            </small>
                          </div>
                        </td>

                        <td>
                          <div className="mb-0">
                            <small>
                              <span className="fw-semi-bold">Name:</span>
                              <p className="text-muted">
                                {order.user.company_name}
                              </p>
                            </small>
                          </div>
                          <div className="mb-0">
                            <small>
                              <span className="fw-semi-bold">Country:</span>
                              <p className="text-muted">{order.country}</p>
                            </small>
                          </div>
                        </td>

                        <td>
                          <div className="mb-0">
                            <small>
                              <span className="fw-semi-bold">Term:</span>
                              <p className="text-muted">
                                {order.delivery.term}
                              </p>
                            </small>
                          </div>
                          <div className="mb-0">
                            <small>
                              <span className="fw-semi-bold">Variants:</span>
                              <p className="text-muted">
                                {order.delivery.variant}
                              </p>
                            </small>
                          </div>
                        </td>

                        <td className="text-semi-muted">
                          {moment(order.auction.start).format('DD.MM.YYYY')}
                          <br />
                          {moment(order.auction.start).format('HH:mm')}
                        </td>

                        <td>{order.requirements}</td>

                        <td>
                          <div className="mb-0">
                            <small>
                              {order.documents.map(doc => (
                                <p
                                  key={doc.filename}
                                  className="text-muted"
                                  style={{ margin: 0 }}
                                >
                                  {doc.filename}
                                </p>
                              ))}
                            </small>
                          </div>
                        </td>

                        <td>{order.description}</td>

                        <td>
                          <Link to={`/admin/order/${order._id}`}>
                            {/* eslint-disable-line */}
                            <Button
                              color="primary"
                              className="width-100 mb-xs mr-xs"
                              onClick={() => this.props.setOrder(order)}
                            >
                              Edit
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
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
    clientId: state.auth.clientId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setOrder: order => {
      dispatch(setOrder(order));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Orders);
