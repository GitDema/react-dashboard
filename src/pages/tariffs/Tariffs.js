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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
/* request data */
import axios from 'axios';
const api_url = process.env.API_URL;



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
   
  }

  createNotification = (type, message) => {
    console.log(message)
    alert(message)
  };
  
  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  getCompaniesList = () => {
    axios.post(`${api_url}/company/list`, {
      clientId: localStorage.getItem('clientId'),
      access_token: localStorage.getItem('access_token'),
      count: 250,
      offset: 0,
    })
    .then(res => {
      if(res.status === 200){
        this.setState({
          companies: res.data.result
        }) 
      }
    })
    .catch(error => {
      console.log(error)
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
      () => NotificationManager.success(res.data.result);
      if(res.status === 200){
        this.createNotification('success', res.data.result)
        this.getCompaniesList()
      }
    })
    .catch(error => {
      console.log(error)
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
