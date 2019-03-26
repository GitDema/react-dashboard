/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';

import Widget from '../../components/Widget';

/* 

-product name
-title of propose
-parameters
-requirements
-photos
-documents

*/

const inputs = {
  width: '100%',
};

class Order extends Component {
  render() {
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
                <label htmlFor="name">Product name:</label>
                <br />
                <input type="text" id="name" style={inputs} />
                <br />
                <br />

                <label htmlFor="desc">Title of propose:</label>
                <br />
                <input type="text" id="desc" style={inputs} />
                <br />
                <br />

                <label htmlFor="param">Parameters:</label>
                <br />
                <input type="text" id="param" style={inputs} />
                <br />
                <br />

                <label htmlFor="req">Requirements:</label>
                <br />
                <textarea name="req" id="req" rows="8" style={inputs} />
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
                <Link to="/admin/orders">
                  <Button
                    color="warning"
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
              </form>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Order;
