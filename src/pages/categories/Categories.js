import React, { Component } from 'react'
import axios from 'axios';
import {
    Row,
    Col,
    Breadcrumb,
    BreadcrumbItem,
    Badge,
    Button,
    Table,
  } from 'reactstrap';
import { Link } from 'react-router-dom';
import Widget from '../../components/Widget';
import { connect } from 'react-redux';
/* Actions */
import { setCategory } from '../../actions/category';
import { logOut } from '../../actions/user';
/* Dropdown */
import Container from '../order/DropdownContainer';
/* Notifications */
import NotificationSystem from 'react-notification-system';
/* Api url */
const api_url = process.env.API_URL;

class Categories extends Component {
    constructor(props){
        super(props);
        this.state = {
            treeInput: "",
            subCatInput: "",
            kindCatInput: "",
            categories: [],
            treeList: [],
            treeChoose: "",
            subCatList: [],
            kindCatList: [],
        }
    }

    componentDidMount() {
        this.getCategoryList();
    };

    createNotification = (type, message) => {
        this.refs.tariffNotification.addNotification({
          message: message,
          level: type,
        });
    };

    handleInputs = name => event => {
      this.setState({ [name]: event.target.value });
    };
  

    getCategoryList = () => {
        axios.post(`${api_url}/category/list/all`, {
            clientId: localStorage.getItem('clientId'),
            access_token: localStorage.getItem('access_token'),
        })
        .then(res => {
            this.setState({
            categories: res.data.result
            })
        })
        .catch(err => {
          console.log(err)
          if(err.response.status === 401){
            this.props.logOut()
          }
        })
    }

    deleteCategoryTree = (id) => {
        let reqData = {
            clientId: localStorage.getItem('clientId'),
            access_token: localStorage.getItem('access_token'),
            id
        }
        console.log(reqData)
        axios.delete(`${api_url}/category/delete`, reqData)
        .then(res => {
            console.log(res);
            if(res.status === 200){
                this.createNotification('success', res.data.result);
                this.getCategoryList();
            }
        })
    }

    addCategoryTree = () => {
        let reqData = {
            clientId: localStorage.getItem('clientId'),
            access_token: localStorage.getItem('access_token'),
            name: this.state.treeInput
        }
        console.log(reqData)
        axios.delete(`${api_url}/category/insert/tree`, reqData)
        .then(res => {
            console.log(res);
            if(res.status === 200){
                this.createNotification('success', res.data.result);
                this.getCategoryList();
            }
        })
        .catch(err => {
          console.log(err)
        })
    }


  render() {
      const { categories } = this.state;
    return (
      <div>
        <Breadcrumb>
          <BreadcrumbItem active>Categories</BreadcrumbItem>
        </Breadcrumb>

        <h2 className="page-title mb-lg">Categories</h2>

        <Row>
          <Col sm={12}>
            <Widget settings close>
              <div className="table-responsive">
                <Table borderless className="table-hover mainTable">
                  <thead>
                    <tr>
                      {/* <th className="hidden-sm-down">#</th> */}
                      <th>Category name</th>
                      <th>ID</th>
                      <th>Subcategories count</th>
                      <th />
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map(category => (
                      <tr key={category._id}>

                        <td>
                          <div className="mb-0">
                            <small>
                              <span className="fw-semi-bold">Name:</span>
                              <p className="text-muted">{category.name}</p>
                            </small>
                          </div>
                        </td>

                        <td>
                            <div className="mb-0">
                                <small>
                                <span className="fw-semi-bold">ID:</span>
                                <p className="text-muted">{category._id}</p>
                                </small>
                            </div>
                        </td>

                        <td>
                            <div className="mb-0">
                                <small>
                                <span className="fw-semi-bold">
                                    Sub categories count:
                                </span>
                                <p className="text-muted">
                                    {category.children.length} 
                                </p>
                                </small>
                            </div>
                        </td>

                        <td>
                          <Link to={`/admin/category_edit/${category._id}`}>
                            <Button
                              color="primary"
                              className="width-100 mb-xs mr-xs"
                              onClick={() => this.props.setCategory(category)}
                            >
                              Edit
                            </Button>
                          </Link>
                        </td>
                        

                        <td>
                            <Button
                              color="danger"
                              className="width-100 mb-xs mr-xs"
                              onClick={() => this.deleteCategoryTree(category._id)}
                            >
                              Delete
                            </Button>
                        </td>

                        
                      </tr>
                    ))}
                  </tbody>
                </Table>
                    <input
                      name="treeCat"
                      type="text"
                      onChange={() => this.handleInputs("treeInput")}
                    />
                
                    <Button
                        color="success"
                        className="width-100 mb-xs mr-xs"
                        onClick={this.addCategoryTree}
                    >
                        Add new
                    </Button>
                
              </div>
            </Widget>
          </Col>
        </Row>
        <NotificationSystem ref="tariffNotification" />
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => {
    return {
        setCategory: category => {
            dispatch(setCategory(category));
        },
        logOut: () => {
            dispatch(logOut());
        },
    };
};

export default connect(
null,
mapDispatchToProps,
)(Categories);