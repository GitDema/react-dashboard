/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import { Row, Col, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';

import Widget from '../../components/Widget';

class Order extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     order: {
  //       id: 43562,
  //       name: 'Acetone',
  //       picture: require('../../images/tables/thumbBox.png'), // eslint-disable-line global-require
  //       description:
  //         'Lorem ipsum, dolor sit? Ullam eveniet, ipsam accusantium consequatur ab maxime eos?',
  //       label: {
  //         colorClass: 'success',
  //         text: 'Proved',
  //       },
  //       date: new Date('10. 12. 2019'),
  //       price: 1800,
  //     },
  //   };
  // }

  // componentDidMount() {
  //   // get order
  //   //  order: location.pathname.substr(location.pathname.lastIndexOf('/') + 1)
  // }

  render() {
    // const { order } = this.state;
    return (
      <div>
        <Breadcrumb>
          <BreadcrumbItem active>Order</BreadcrumbItem>
        </Breadcrumb>

        <h1 className="page-title mb-lg">
          Edit order #{/* eslint-disable-next-line no-restricted-globals */}
          {location.pathname.substr(location.pathname.lastIndexOf('/') + 1)}
        </h1>

        <Row>
          <Col sm="6">
            <Widget settings close>
              <form>
                <label htmlFor="name">Name:</label>
                <br />
                <input type="text" id="name" />
                <br />
                <br />

                <label htmlFor="desc">Description:</label>
                <br />
                <input type="text" id="desc" />
                <br />

                <br />
                <br />

                <Button
                  color="warning"
                  className="btn-rounded width-100 mb-xs mr-xs"
                >
                  Cancel
                </Button>
                <Button color="success" className="width-100 mb-xs mr-xs">
                  Save
                </Button>
              </form>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Order;
