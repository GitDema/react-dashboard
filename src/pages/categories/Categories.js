import React, { Component } from 'react'
import axios from 'axios';
import {
    Row,
    Col,
    Breadcrumb,
    BreadcrumbItem,
    Badge,
    Button,
  } from 'reactstrap';

  import Widget from '../../components/Widget';
  import NotificationSystem from 'react-notification-system';


export default class Categories extends Component {
    constructor(props){
        super(props);
        this.state = {
            tree: "",
            subCat: "",
            kindCat: ""
        }
    }

    handleInputs = name => event => {
        this.setState({ [name]: event.target.value });
    };
    

  render() {
    return (
      <div>
        <Breadcrumb>
          <BreadcrumbItem active>Order</BreadcrumbItem>
        </Breadcrumb>


        <Row>
          <Col sm="12">
            <Widget settings close>
              <h3>Available for change</h3>
              <br />

              <div>


                <input
                  type="text"
                  id="tree"
                  onChange={this.handleInputs('tree')}
                />
                <br />
                <Button
                    className="width-100 mb-xs mr-xs"
                    color="success"
                    disabled
                    outline
                >
                    Add Tree
                </Button>
                <br />
                <br />

                <label htmlFor="subCat">Subcategory:</label>
                <br />
                <input
                  type="text"
                  id="subCat"
                  onChange={this.handleInputs('subCat')}
                />
                <br />
                <br />

                <label htmlFor="kindCat">Child Subcategory:</label>
                <br />
                <input
                  type="text"
                  id="kindCat"
                  onChange={this.handleInputs('kindCat')}
                />
                <br />
                

                <br />
                <br />

               
              </div>
            </Widget>
          </Col>

          
        </Row>
        <NotificationSystem ref="tariffNotification" />
      </div>
    )
  }
}
