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
    Form,
    InputGroup,
  } from 'reactstrap';
import { Link } from 'react-router-dom';
import Widget from '../../components/Widget';
import { connect } from 'react-redux';
/* Actions */
import { setCategory } from '../../actions/category';
import { logOut } from '../../actions/user';
/* Notifications */
import NotificationSystem from 'react-notification-system';
/* Api url */
const api_url = process.env.API_URL;

class CategorieEdit extends Component {
  constructor(props){
    super(props);
    this.state = {
      category: null,
      categoryName: "",
      categoryId: "",
      categoryChildren:  [],
      categoryParent: "",
      displayForm: false,
      showModal: false,
      newcatName: "",
    }
  }

  componentDidMount() {
    this.updateData();
  };
  

  updateData = () => {
    const category = JSON.parse(localStorage.getItem('category'));
    console.log(category)
    this.setState({
      category: category,
      categoryName: category.name || "",
      categoryId: category._id || "",
      categoryChildren: category.children || "",
      categoryParent: category.parent || "",
      showModal: false,
    });
  };

  onEditClick = (child) => {
    this.props.setCategory(child);
    this.updateData()
  }

 /*  addKindCategory = () =>{
    axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.post(`${api_url}/category/insert/subcategory`,{
      clientId: localStorage.getItem('clientId'),
      access_token: localStorage.getItem('access_token'),
      name: this.state.newcatName,
      parent: this.state.categoryParent
    })
    .then(res => {
      console.log(res);
      if(res.status === 200){
        this.setState({
          displayForm: !this.state.displayForm
        })
      }
    })
    .catch(err => {
      console.log(err)
    })
  } */

  addSubCategory = () =>{
    let headers = { 
      /* 'Access-Control-Allow-Headers': 'true',
      'Access-control-allow-origin': 'http://localhost:3002',
      'Access-Control-Allow-Methods': "POST" ,
      'Access-Control-Allow-Credentials': ' true', */
      "Content-Type": "application/json"
    }
    let data = {
      'clientId': localStorage.getItem('clientId'),
      'access_token': localStorage.getItem('access_token'),
      'name': this.state.newcatName,
      'parent': this.state.category._id
    }
    console.log(localStorage.getItem('clientId'))
    fetch(`${api_url}/category/insert/category`, {
      headers: headers,
      method: "POST",
      body:  JSON.stringify(data)
    })
    .then(function(response){ 
        return response.json(); 
    })
    .then(function(data){ 
        console.log(data)
    });

    
  }

  showForm = () =>{
    this.setState({
      displayForm: !this.state.displayForm
    })
  }

  handleInputs = name => event => {
    this.setState({ [name]: event.target.value });
  };


  render() {
    const { 
      category, 
      categoryName, 
      categoryChildren, 
      displayForm,
     } = this.state;

    if(categoryChildren.length !== 0){
      return (
        <div>
          <Breadcrumb>
            <BreadcrumbItem active>Edit category tree: </BreadcrumbItem>
          </Breadcrumb>
  
          <h2 className="page-title mb-lg">{categoryName}</h2>
  
          <Row>
            <Col sm={12}>
              <Widget settings close>
                  <div className="table-responsive">
                    <Table borderless className="table-hover mainTable">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>ID</th>
                          <th>Parent name</th>
                          <th>Parent ID</th>
                          <th />
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                      {categoryChildren.map(child => (
                        <tr key={child._id}>
                          <td>
                            <div className="mb-0">
                              <small>
                                <span className="fw-semi-bold">ID:</span>
                                <p className="text-muted">{child._id}</p>
                              </small>
                            </div>
                          </td>

                          <td>
                            <div className="mb-0">
                              <small>
                                <span className="fw-semi-bold">Category name:</span>
                                <p className="text-muted">{child.name}</p>
                              </small>
                            </div>
                          </td>

                          <td>
                            <div className="mb-0">
                              <small>
                                <span className="fw-semi-bold">Parent category:</span>
                                <p className="text-muted">{categoryName}</p>
                              </small>
                            </div>
                          </td>

                          <td>
                            <div className="mb-0">
                              <small>
                                <span className="fw-semi-bold">Parent category ID:</span>
                                <p className="text-muted">{child.parent}</p>
                              </small>
                            </div>
                          </td>

                          <td>
                            <Link to={`/admin/category_edit/${child._id}`}>
                              {/* eslint-disable-line */}
                              <Button
                                color="primary"
                                className="width-100 mb-xs mr-xs"
                                onClick={() => this.onEditClick(child)}
                              >
                                Edit
                              </Button>
                            </Link>
                          </td>

                          <td>
                              <Button
                                color="danger"
                                className="width-100 mb-xs mr-xs"
                                onClick={() => this.deleteCategoryTree(child._id)}
                              >
                                Delete
                              </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  {
                    displayForm
                      ?(
                        <React.Fragment>
                          <label htmlFor="new_cat_name">Category name:</label>
                          <br />
                          <input
                            type="text"
                            id="new_cat_name"
                            onChange={this.handleInputs("newcatName")}
                          />
                          <br />
                          <br />
                          <Button
                            color="success"
                            className="width-100 mb-xs mr-xs"
                            onClick={this.addSubCategory}
                          >
                            Add new subcategory
                          </Button>
                        </React.Fragment>
                      )
                      :(
                        <Button
                          color="success"
                          className="width-100 mb-xs mr-xs"
                          onClick={this.showForm}
                        >
                          Add
                        </Button>
                      )
                  }
                  
                </div>
              </Widget>
            </Col>
          </Row>
        </div>
      )
    } else {
      return(
        <div>
          <p>This item has no subcatgories</p>
          {displayForm 
            ? (
              <div>
                <label htmlFor="new_cat_name">Category name:</label>
                  <br />
                  <input
                    type="text"
                    id="new_cat_name"
                    onChange={this.handleInputs("newcatName")}
                  />
                  <br />
                  <br />
                  <Button
                    color="success"
                    className="width-100 mb-xs mr-xs"
                    onClick={this.addKindCategory}
                  >
                    Add new Subcategory
                  </Button>
              </div>
            )
            : (
              <Button
              color="primary"
              className="width-100 mb-xs mr-xs"
              onClick={this.showForm}
            >
              Add 
            </Button>
            )
          }
         
         
        </div>  
      )
      
    }

   
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
)(CategorieEdit);