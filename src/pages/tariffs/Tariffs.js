import React, { Component } from 'react';
import {
  Row,
  Col,
  Table,
  Progress,
  Button,
  UncontrolledDropdown,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
  Label,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap';
import Widget from '../../components/Widget';

/* request data */
import axios from 'axios';
const api_url = process.env.API_URL;

/* Messages */
import 'imports-loader?$=jquery,this=>window!jquery';
import 'imports-loader?$=jquery,this=>window!messenger/build/js/messenger';
const {Messenger} = window;


function initializationMessengerCode() {
  (function () {
    let $,
      FlatMessage,
      spinner_template,
      __hasProp = {}.hasOwnProperty,
      __extends = function (child, parent) {
        for (const key in parent) {
          if (__hasProp.call(parent, key)) child[key] = parent[key];
        }

        function ctor() {
          this.constructor = child;
        }

        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      };

    $ = jQuery;

    spinner_template = '<div class="messenger-spinner">\n    <span class="messenger-spinner-side messenger-spinner-side-left">\n        <span class="messenger-spinner-fill"></span>\n    </span>\n    <span class="messenger-spinner-side messenger-spinner-side-right">\n        <span class="messenger-spinner-fill"></span>\n    </span>\n</div>';

    FlatMessage = (function (_super) {
      __extends(FlatMessage, _super);

      function FlatMessage() {
        return FlatMessage.__super__.constructor.apply(this, arguments);
      }

      FlatMessage.prototype.template = function (opts) {
        let $message;
        $message = FlatMessage.__super__.template.apply(this, arguments);
        $message.append($(spinner_template));
        return $message;
      };

      return FlatMessage;
    }(Messenger.Message));

    Messenger.themes.air = {
      Message: FlatMessage,
    };
  }).call(window);
}
/* Messages  ends */


export default class Tariffs extends Component {
  constructor(props){
    super(props);
    this.state = {
      companies: [],
      dropdownOpen: false,
      message: ""
    }
    this.toggle = this.toggle.bind(this)
  }

  componentDidMount = () => {
    /* Get Data */
    this.getCompaniesList();
    /* Init messages */
    initializationMessengerCode();
    Messenger.options = {
      extraClasses: this.state.locationClasses,
      theme: 'air',
    };
  }
  
  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  addErrorNotification = (message) => {
    Messenger().post({
      extraClasses: this.state.locationClasses,
      message: message,
      type: 'error',
      showCloseButton: true,
    });
    return false;
  }

  addSuccessNotification = (message) => {
    Messenger().post({
      extraClasses: this.state.locationClasses,
      message: message,
      type: 'success',
      showCloseButton: true,
    });
    return false;
  }

  getCompaniesList = () => {
    axios.post(`${api_url}/company/list`, {
      clientId: localStorage.getItem('clientId'),
      access_token: localStorage.getItem('access_token'),
      count: 250,
      offset: 0,
    })
    .then(res => {
      console.log(res);
      if(res.status === 200){
        this.setState({
          companies: res.data.result
        }) 
      }
    })
    .catch(error => {
      console.log(error)
      this.addErrorNotification(error.response.message)
    })
  }

  setTariff = (id, plan) => {
    axios.put(`${api_url}/company/set/tariff`, {
      clientId: localStorage.getItem('clientId'),
      access_token: localStorage.getItem('access_token'),
      tariff: plan,
      company: id
    })
    .then(res => {
      console.log(res);
      if(res.status === 200){
        this.setState({
          message: res.data.result
        })
        this.addSuccessNotification(res.data.result)
      }
    })
    .catch(error => {
      console.log(error.response.data);
      if(error.response.data){
        this.addErrorNotification(error.response.data.error_message[0].message)
      } else {
        this.addErrorNotification(error.response.data.error_message)
      }
    })
  }
    

  render() {
    const { companies } = this.state;
    return (
      <div>
        <Breadcrumb>
          <BreadcrumbItem active>Tariffs</BreadcrumbItem>
        </Breadcrumb>

        <h2 className="page-title mb-lg">Tariffs</h2>

        <Row>
          <Col sm={12}>
            <Widget settings close>
              <div className="table-responsive">
                <Table borderless className="table-hover mainTable">
                  <thead>
                    <tr>
                      <th>Company</th>
                      <th>Email</th>
                      <th>Tariff plan</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {companies.map(company => (
                      <tr key={company.index}>
                        <td>
                          <div className="mb-0">
                            <small>
                              <span className="fw-semi-bold">Name:</span>
                              <p className="text-muted">{company.profile.name}</p>
                            </small>
                          </div>
                        </td>

                        <td>
                          <div className="mb-0">
                            <small>
                              <span className="fw-semi-bold">Email:</span>
                              <p className="text-muted">{company.profile.contacts.email}</p>
                            </small>
                          </div>
                        </td>

                        <td>
                          <div className="mb-0">
                            <small>
                              <span className="fw-semi-bold">Plan:</span>
                              <p className="text-muted">{company.tariff}</p>
                            </small>
                          </div>
                        </td>

                        <td>
                          <div className="mb-0">
                            <UncontrolledDropdown>
                              <DropdownToggle caret>
                                Change tariff
                              </DropdownToggle>
                              <DropdownMenu>
                                <DropdownItem onClick={() => this.setTariff(company._id, "BASIC")}>Basic</DropdownItem>
                                <DropdownItem onClick={() => this.setTariff(company._id, "BUSINESS")}>Business</DropdownItem>
                                <DropdownItem onClick={() => this.setTariff(company._id, "ENTERPRISE")}>Enterprise</DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </div>
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
    )
  }
}
