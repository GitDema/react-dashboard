import React, { Component } from 'react';
import {
  Row,
  Col,
  Table,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap';
import { refresh } from '../../actions/user';
import { connect } from 'react-redux';
import Widget from '../../components/Widget';
import NotificationSystem from 'react-notification-system';
import axios from 'axios';

const api_url = process.env.API_URL;

class Tariffs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      dropdownOpen: false
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount = () => {
    /* Get Data */
    this.getCompaniesList();

    /* Bind tariff notification */
    this._tariffNotification = this.refs.tariffNotification;
  };

 /*  _addNotification = event => {
    event.preventDefault();
    this._tariffNotification.addNotification({
      message: 'Notification message',
      level: 'success',
    });
  }; */

  createNotification = (type, message) => {
    this._tariffNotification.addNotification({
      message: message,
      level: type,
    });
  };

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  };

  getCompaniesList = () => {
    axios
      .post(`${api_url}/company/list`, {
        clientId: localStorage.getItem('clientId'),
        access_token: localStorage.getItem('access_token'),
        count: 250,
        offset: 0,
      })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            companies: res.data.result,
          });
        }
      })
      .catch(err => {
        if(err.response !== undefined 
          && err.response.status !== undefined){
          if(err.response.status === 401 || err.respponse.status === 400){
            this.props.refresh();
          }
        }
      });
  };

  setTariff = (id, plan) => {
    axios
      .put(`${api_url}/company/set/tariff`, {
        clientId: localStorage.getItem('clientId'),
        access_token: localStorage.getItem('access_token'),
        tariff: plan,
        company: id,
      })
      .then(res => {
        () => NotificationManager.success(res.data.result);
        if (res.status === 200) {
          this.createNotification('success', res.data.result);
          this.getCompaniesList();
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

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
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {companies.map(company => (
                      <tr key={company._id}>
                        <td>
                          <div className="mb-0">
                            <small>
                              <span className="fw-semi-bold">Name:</span>
                              <p className="text-muted">
                                {company.profile.name}
                              </p>
                            </small>
                          </div>
                        </td>

                        <td>
                          <div className="mb-0">
                            <small>
                              <span className="fw-semi-bold">Email:</span>
                              <p className="text-muted">
                                {company.profile.contacts.email}
                              </p>
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
                                <DropdownItem
                                  onClick={() =>
                                    this.setTariff(company._id, 'BASIC')
                                  }
                                >
                                  Basic
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() =>
                                    this.setTariff(company._id, 'BUSINESS')
                                  }
                                >
                                  Business
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() =>
                                    this.setTariff(company._id, 'ENTERPRISE')
                                  }
                                >
                                  Enterprise
                                </DropdownItem>
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

        <NotificationSystem ref="tariffNotification" />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return{
    refresh: () => {
      dispatch(refresh())
    }
  }
}

export default connect(null, mapDispatchToProps)(Tariffs);