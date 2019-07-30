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
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap';
import NotificationSystem from 'react-notification-system';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

import { logOut } from '../../actions/user';
import Widget from '../../components/Widget';
import icon from '../../components/Icon/icons/index';

const api_url = process.env.API_URL;

class Tariffs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      dropdownOpen: false,
      companiesPerPage: 20,
      offsetPagination: 0,
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount = () => {
    /* Get Data */
    this.getCompaniesList();

    /* Bind tariff notification */
    this._tariffNotification = this.refs.tariffNotification;
  };

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
        count: this.state.companiesPerPage,
        offset: this.state.offsetPagination,
      })
      .then(res => {
        if (res.status === 200) {
          if (res.data.result.length === 0) {
            this.setState(
              {
                offsetPagination:
                  this.state.offsetPagination - this.state.companiesPerPage,
              },
              this.getCompaniesList,
            );
          } else {
            this.setState({
              companies: res.data.result,
            });
          }
        }
      })
      .catch(err => {
        if (err.response !== undefined && err.response.status !== undefined) {
          if (err.response.status === 401 || err.respponse.status === 400) {
            this.props.logOut();
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

  setItemCountPerPage = count => {
    this.setState(
      {
        companiesPerPage: count,
      },
      this.getCompaniesList,
    );
  };

  selectNextPage = () => {
    this.setState(
      {
        offsetPagination:
          this.state.offsetPagination + this.state.companiesPerPage,
      },
      this.getCompaniesList,
    );
  };

  selectPrevPage = () => {
    this.setState(
      {
        offsetPagination:
          this.state.offsetPagination - this.state.companiesPerPage,
      },
      this.getCompaniesList,
    );
  };

  render() {
    const { companies } = this.state;
    console.log(companies.sort());
    return (
      <div className="tariff">
        <Breadcrumb>
          <BreadcrumbItem active>Tariffs</BreadcrumbItem>
        </Breadcrumb>

        <h2 className="page-title mb-lg">Tariffs</h2>

        <Row>
          <Col sm={12}>
            <Widget settings close>
              <div>
                <UncontrolledDropdown>
                  <DropdownToggle
                    caret
                    color="secondary"
                    style={{ marginBottom: '20px' }}
                  >
                    Items per page
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => this.setItemCountPerPage(20)}>
                      20
                    </DropdownItem>
                    <DropdownItem onClick={() => this.setItemCountPerPage(50)}>
                      50
                    </DropdownItem>
                    <DropdownItem onClick={() => this.setItemCountPerPage(100)}>
                      100
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
              <div className="table-responsive">
                <Table borderless className="table-hover mainTable">
                  <thead>
                    <tr>
                      <th>
                        Company{' '}
                        {/* <img src={icon.arrow} className="table-icon" /> */}
                      </th>
                      <th>
                        Email{' '}
                        {/* <img src={icon.arrow} className="table-icon" /> */}
                      </th>
                      <th>
                        Date of registration{' '}
                        {/* <img src={icon.arrow} className="table-icon" /> */}
                      </th>
                      <th>
                        Products{' '}
                        {/* <img src={icon.arrow} className="table-icon" /> */}
                      </th>
                      <th>
                        Requests{' '}
                        {/* <img src={icon.arrow} className="table-icon" /> */}
                      </th>
                      <th>
                        Tariff plan{' '}
                        {/* <img src={icon.arrow} className="table-icon" /> */}
                      </th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {companies.map(company => (
                      <tr key={company._id}>
                        <td>
                          <div className="mb-0">
                            <small>
                              <span className="fw-semi-bold">Company:</span>
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
                              <span className="fw-semi-bold">
                                Date of registration:
                              </span>
                              <p className="text-muted">
                                {moment(company.created_at).format(
                                  'DD.MM.YYYY',
                                )}
                              </p>
                            </small>
                          </div>
                        </td>

                        <td>
                          <div className="mb-0">
                            <small>
                              <span className="fw-semi-bold">Products:</span>
                              <p className="text-muted">
                                {company.financialInfo.products.length}
                              </p>
                            </small>
                          </div>
                        </td>

                        <td>
                          <div className="mb-0">
                            <small>
                              <span className="fw-semi-bold">Requests:</span>
                              <p className="text-muted">
                                {company.financialInfo.orders.length}
                              </p>
                            </small>
                          </div>
                        </td>

                        <td>
                          <div className="mb-0">
                            <small>
                              <span className="fw-semi-bold">Tariff plan:</span>
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

            <Pagination aria-label="Page navigation example">
              <PaginationItem>
                <PaginationLink
                  style={{ marginRight: '10px' }}
                  previous
                  onClick={this.selectPrevPage}
                >{`<< Previous page`}</PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationLink
                  next
                  onClick={this.selectNextPage}
                >{`Next page >>`}</PaginationLink>
              </PaginationItem>
            </Pagination>
          </Col>
        </Row>

        <NotificationSystem ref="tariffNotification" />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => {
      dispatch(logOut());
    },
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(Tariffs);
