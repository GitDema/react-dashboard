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

import Widget from '../../components/Widget';

class Orders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tableStyles: [
        {
          id: 43560,
          name: 'Acetone',
          picture: require('../../images/tables/thumbBox.png'), // eslint-disable-line global-require
          description:
            'Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ',
          date: new Date('11. 12. 2019'),
          price: 2200,
        },
        {
          id: 43561,
          name: 'Acetone',
          picture: require('../../images/tables/thumbBox.png'), // eslint-disable-line global-require
          description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident voluptas nulla id aut, eum odio fugiat libero, voluptatibus distinctio commodi eaque laudantium? Ullam eveniet, ipsam accusantium consequatur ab maxime eos?',
          date: new Date('06. 12. 2019'),
          price: 2000,
        },
        {
          id: 43562,
          name: 'Acetone',
          picture: require('../../images/tables/thumbBox.png'), // eslint-disable-line global-require
          description:
            'Lorem ipsum, dolor sit? Ullam eveniet, ipsam accusantium consequatur ab maxime eos?',
          label: {
            colorClass: 'success',
            text: 'Proved',
          },
          date: new Date('10. 12. 2019'),
          price: 1800,
        },
      ],
    };
  }

  parseDate(date) {
    this.dateSet = date.toDateString().split(' ');
    return `${date.toLocaleString('en-us', { month: 'long' })} ${
      this.dateSet[2]
    }, ${this.dateSet[3]}`;
  }

  render() {
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
                      <th className="hidden-sm-down">#</th>
                      <th>Picture</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th className="hidden-sm-down">Date</th>
                      <th className="hidden-sm-down">Price</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.tableStyles.map(row => (
                      <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>
                          <img
                            className="img-rounded"
                            src={row.picture}
                            alt=""
                            height="60"
                          />
                        </td>
                        <td>{row.name}</td>
                        <td>
                          {row.description}
                          {row.label && (
                            <div>
                              <Badge color={row.label.colorClass}>
                                {row.label.text}
                              </Badge>
                            </div>
                          )}
                        </td>
                        <td className="text-semi-muted">
                          {this.parseDate(row.date)}
                        </td>
                        <td className="text-semi-muted">{row.price}</td>
                        <td>
                          <Link to={`/admin/order/${row.id}`}>
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
