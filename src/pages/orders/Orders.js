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

class Orders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clientId: null,
    };
  }

  componentDidMount() {
    axios
      .get('https://dev.opnplatform.com/api/v1/client/id')
      .then(res => {
        this.setState({ clientId: res.data.result.clientId });
      })
      .then(() =>
        axios
          .post('https://dev.opnplatform.com/api/v1/user/login', {
            clientId: this.state.clientId,
            email: 'OPNAdmin@opnplatform.com',
            password: '8wsBua9Q9a9Y',
          })
          .then(res => {
            this.setState({ access_token: res.data.result.access_token.token });
          }),
      )
      .then(() =>
        axios
          .post('https://dev.opnplatform.com/api/v1/orders/get/2/all', {
            clientId: this.state.clientId,
            access_token: this.state.access_token,
            count: 250,
            offset: 1,
          })
          .then(res => {
            this.setState({ orders: res.data.result });
          }),
      )
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
                      {/* <th>Parameters</th> */}
                      <th>Requirements</th>
                      <th>Documents</th>
                      <th>Description</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, key) => (
                      <tr key={order.created_at}>
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
                              <p className="text-muted"> {key}</p>
                            </small>
                          </div>
                          <div className="mb-0">
                            <small>
                              <span className="fw-semi-bold">Product:</span>
                              <p className="text-muted">
                                {order.name ? order.name : '-'}
                              </p>
                            </small>
                          </div>
                          <div className="mb-0">
                            <small>
                              <span className="fw-semi-bold">
                                Title of propose:
                              </span>
                              <p className="text-muted">
                                {order.proposeTitle ? order.proposeTitle : '-'}
                              </p>
                            </small>
                          </div>
                          <div className="mb-0">
                            <small>
                              <span className="fw-semi-bold">
                                Currency/Price:
                              </span>
                              <p className="text-muted">
                                {order.currency === 'USD' ? '$' : '-'}{' '}
                                {order.price / 100}
                              </p>
                            </small>
                          </div>
                          <div className="mb-0">
                            <small>
                              <span className="fw-semi-bold">Action:</span>
                              <span className="text-muted">
                                <Badge color="info">
                                  {order.purpose ? order.purpose : '-'}
                                </Badge>
                              </span>
                            </small>
                          </div>
                        </td>

                        <td>
                          <div className="mb-0">
                            <small>
                              <span className="fw-semi-bold">Name:</span>
                              <p className="text-muted">
                                {order.user && order.user.company_name
                                  ? order.user.company_name
                                  : '-'}
                              </p>
                            </small>
                          </div>
                          <div className="mb-0">
                            <small>
                              <span className="fw-semi-bold">Country:</span>
                              <p className="text-muted">
                                {' '}
                                {order.country ? order.country : '-'}
                              </p>
                            </small>
                          </div>
                        </td>

                        <td>
                          <div className="mb-0">
                            <small>
                              <span className="fw-semi-bold">Term:</span>
                              <p className="text-muted">
                                {order.delivery.term
                                  ? order.delivery.term
                                  : '-'}
                              </p>
                            </small>
                          </div>
                          <div className="mb-0">
                            <small>
                              <span className="fw-semi-bold">Variants:</span>
                              <p className="text-muted">
                                {order.delivery.variant
                                  ? order.delivery.variant
                                  : '-'}
                              </p>
                            </small>
                          </div>
                        </td>

                        <td className="text-semi-muted">
                          {moment(order.auction.start).format('DD.MM.YYYY')}
                          <br />
                          {moment(order.auction.start).format('HH:mm')}
                        </td>

                        {/* <td>{order.parameters ? order.parameters : '-'}</td> */}

                        <td>{order.requirements ? order.requirements : '-'}</td>

                        <td>
                          <div className="mb-0">
                            <small>
                              <span className="fw-semi-bold">Documents:</span>
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

const mapDispatchToProps = dispatch => {
  return {
    setOrder: order => {
      dispatch(setOrder(order));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(Orders);
