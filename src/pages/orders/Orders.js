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
import axios from 'axios';

import Widget from '../../components/Widget';

class Orders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [
        {
          id: 43560,
          productName: 'Acetone',
          photos: require('../../images/tables/thumbBox.png'), // eslint-disable-line global-require
          documents: ['doc.pdf', 'stats.doc'],
          proposeTitle: 'Propose title',
          action: 'Buy',
          companyName: 'companyName',
          country: 'country',
          deliveryTerms: '3 days',
          proposeAnnounce: new Date('11. 12. 2019'),
          deliveryVariants: 'by car',
          requirements: 'participantsRequirements',
          parameters: 'parameters',
          money: {
            currency: '$',
            price: 2000,
          },
          description:
            'Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ',
        },
        {
          id: 43561,
          productName: 'Acetone',
          photos: require('../../images/tables/thumbBox.png'), // eslint-disable-line global-require
          documents: ['doc.pdf'],
          proposeTitle: 'Propose title',
          action: 'Sell',
          companyName: 'companyName',
          country: 'country',
          deliveryTerms: '2 days',
          proposeAnnounce: new Date('06. 12. 2019'),
          deliveryVariants: 'by car',
          requirements: 'participantsRequirements',
          parameters: 'parameters',
          money: {
            currency: '$',
            price: 2000,
          },
          description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident voluptas nulla id aut, eum odio fugiat libero, voluptatibus distinctio commodi eaque laudantium? Ullam eveniet, ipsam accusantium consequatur ab maxime eos?',
        },
        {
          id: 43562,
          productName: 'Acetone',
          photos: require('../../images/tables/thumbBox.png'), // eslint-disable-line global-require
          documents: ['doc.pdf', 'stats.xls'],
          proposeTitle: 'Propose title',
          action: 'Buy',
          companyName: 'companyName',
          country: 'country',
          deliveryTerms: '1 day ',
          proposeAnnounce: new Date('10. 12. 2019'),
          deliveryVariants: 'by car',
          requirements: 'participantsRequirements',
          parameters: 'parameters',
          money: {
            currency: '$',
            price: 2000,
          },
          description:
            'Lorem ipsum, dolor sit? Ullam eveniet, ipsam accusantium consequatur ab maxime eos?',
        },
      ],
    };
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
        this.setState({ orders: res.result });
        // eslint-disable-next-line no-console
        console.log(res);
        // eslint-disable-next-line no-console
        console.log(res.data);
      });
  }

  parseDate(date) {
    this.dateSet = date.toDateString().split(' ');
    return `${date.toLocaleString('en-us', { month: 'long' })} ${
      this.dateSet[2]
    }, ${this.dateSet[3]}`;
  }

  render() {
    const { orders } = this.state;

    if (!orders) {
      return 'wait...';
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
                          <img
                            className="img-rounded"
                            src={order.photos}
                            alt=""
                            height="60"
                          />
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
                              <p className="text-muted">{order.productName}</p>
                            </small>
                          </div>
                          <div className="mb-0">
                            <small>
                              <span className="fw-semi-bold">
                                Title of propose:
                              </span>
                              <p className="text-muted">{order.proposeTitle}</p>
                            </small>
                          </div>
                          <div className="mb-0">
                            <small>
                              <span className="fw-semi-bold">
                                Currency/Price:
                              </span>
                              <p className="text-muted">
                                {order.money.currency} {order.money.price}
                              </p>
                            </small>
                          </div>
                          <div className="mb-0">
                            <small>
                              <span className="fw-semi-bold">Action:</span>
                              <span className="text-muted">
                                {' '}
                                <Badge color="info">
                                  {order.action.toUpperCase()}
                                </Badge>
                              </span>
                            </small>
                          </div>
                        </td>

                        <td>
                          <div className="mb-0">
                            <small>
                              <span className="fw-semi-bold">Name:</span>
                              <p className="text-muted">{order.companyName}</p>
                            </small>
                          </div>
                          <div className="mb-0">
                            <small>
                              <span className="fw-semi-bold">Country:</span>
                              <p className="text-muted"> {order.country}</p>
                            </small>
                          </div>
                        </td>

                        <td>
                          <div className="mb-0">
                            <small>
                              <span className="fw-semi-bold">Terms:</span>
                              <p className="text-muted">
                                {order.deliveryTerms}
                              </p>
                            </small>
                          </div>
                          <div className="mb-0">
                            <small>
                              <span className="fw-semi-bold">Variants:</span>
                              <p className="text-muted">
                                {order.deliveryVariants}
                              </p>
                            </small>
                          </div>
                        </td>

                        <td className="text-semi-muted">
                          {this.parseDate(order.proposeAnnounce)}
                        </td>

                        <td>{order.parameters}</td>

                        <td>{order.requirements}</td>

                        <td>
                          <div className="mb-0">
                            <small>
                              <span className="fw-semi-bold">Documents:</span>
                              {order.documents.map(doc => (
                                <p
                                  key={doc}
                                  className="text-muted"
                                  style={{ margin: 0 }}
                                >
                                  {doc}
                                </p>
                              ))}
                            </small>
                          </div>
                        </td>

                        <td>{order.description}</td>

                        <td>
                          <Link to={`/admin/order/${order.id}`}>
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
