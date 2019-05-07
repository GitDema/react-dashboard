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
import EditCategoryName from './components/EditCategoryName';
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
            categories: [],
            treeList: [],
            treeChoose: "",
            subCatList: [],
            kindCatList: [],
            treeName: "",
            displayForm: false,
        }
    }

    componentDidMount() {
        this.getCategoryList();
    };

    toggle = () => {
      this.setState({
        displayForm: !this.state.displayForm
      })
    }

    createNotification = (type, message) => {
        this.refs.tariffNotification.addNotification({
          message: message,
          level: type,
        });
    };

    handleInputs = name => event => {
      console.log(name, event.target.value)
      this.setState({ [name]: event.target.value });
    };
  

    getCategoryList = () => {
        axios.post(`${api_url}/category/list/all`, {
            clientId: localStorage.getItem('clientId'),
            access_token: localStorage.getItem('access_token'),
        })
        .then(res => {
            this.setState({
              categories: res.data.result,
            })
        })
        .catch(err => {
          console.log(err)
          if(err.response){
            if(err.response.status === 401){
              this.props.logOut()
            } 
          }
          
        })
    }

    deleteCategory = (id) => {
      let data = {
        clientId: localStorage.getItem('clientId'),
        access_token: localStorage.getItem('access_token'),
        id
      }
      let headers = {
        "Content-Type": "application/json"
      }
      fetch(`${api_url}/category/delete`, {
          method: "DELETE",
          headers: headers,
          body:  JSON.stringify(data)
      })
      .then(response => { 
        console.log(response)
        
        return response.json(); 
      })
      .then(data =>{ 
          this.createNotification('success', data.result);
          this.getCategoryList();
          console.log(data)
      });
      
    }

    addCategoryTree = () => {
        let reqData = {
            clientId: localStorage.getItem('clientId'),
            access_token: localStorage.getItem('access_token'),
            name: this.state.treeName
        }
        console.log(reqData)
        axios.post(`${api_url}/category/insert/tree`, reqData)
        .then(res => {
            console.log(res);
            if(res.status === 200){
                this.createNotification('success', 'Added successfully');
                this.setState({
                  treeName: '',
                  displayForm: false,
                })
                this.getCategoryList();
            }
        })
        .catch(err => {
          console.log(err);
          if(err.response && err.response !== undefined){
            if(err.response.status === 400){
              this.createNotification('error', err.response.data.error_message); 
            }  
          }
        })
    }


  render() {
      const { categories, displayForm } = this.state;
      console.log(this.state.treeName)
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
                              Edit subcategorys
                            </Button>
                          </Link>
                        </td>  

                        <td>
                          <EditCategoryName 
                            id={category._id}
                          />
                        </td>                   

                        <td>
                            <Button
                              color="danger"
                              className="width-100 mb-xs mr-xs"
                              onClick={() => this.deleteCategory(category._id)}
                            >
                              Delete
                            </Button>
                        </td>

                        
                      </tr>
                    ))}
                  </tbody>
                </Table>
                { displayForm 
                  ?(
                    <div>
                      <label htmlFor="new_cat_name">Category name:</label>
                        <br />
                        <input
                          type="text"
                          id="new_cat_name"
                          onChange={this.handleInputs("treeName")}
                        />
                        <br />
                        <br />
                        <Button
                            color="success"
                            className="width-100 mb-xs mr-xs"
                            onClick={this.addCategoryTree}
                        >
                            Add new
                        </Button>
                    </div>
                  ) : (
                    <Button
                      color="success"
                      className="width-100 mb-xs mr-xs"
                      onClick={this.toggle}
                    >
                      Add
                    </Button>
                  )
                }
                
                    
                
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