import React, { Component } from 'react';
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

class Orders extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    axios
      .post('https://dev.opnplatform.com/api/v1/orders/get/1/all', {
        clientId: 'b00cf4559c8819ada37011b4cda071135dc82d73',
        access_token:
          '8b65edd00728e8f5a3dc93d5e4c24eb4fb42058bcc386382a6b719b9f5133b3e3f1933ee28190717487ca392981db548a196444a190f85aaf975bf11d709a02e7ea3a104c1ac4acb2f2a592a5f0381ad6b806330ac917a1574f145dd9285b2fe',
        count: 250,
        offset: 1,
      })
      .then(res => {
        this.setState({ orders: res.data.result });
      });
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

        <h1 className="page-title mb-lg">Orders</h1>

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
                      <th>Parameters</th>
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
                              src={order.photos[0].path}
                              alt=""
                              height="60"
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
                                {order.price}
                              </p>
                            </small>
                          </div>
                          <div className="mb-0">
                            <small>
                              <span className="fw-semi-bold">Action:</span>
                              <span className="text-muted">
                                {' '}
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

                        <td>{order.parameters ? order.parameters : '-'}</td>

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
                          <Link to={`/admin/order/${order._id}`}>{/* eslint-disable-line */}
                            <Button
                              color="primary"
                              className="width-100 mb-xs mr-xs"
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

export default Orders;
