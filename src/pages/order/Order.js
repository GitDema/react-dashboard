/* eslint-disable jsx-a11y/label-has-for */
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
  Badge,
  Button,
} from 'reactstrap';
import axios from 'axios';
import moment from 'moment';

import Widget from '../../components/Widget';

const api_url = process.env.API_URL;

const inputsCss = {
  width: '100%',
};

class Order extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order: null,
      orderName: '',
      orderRequirements: '',
      orderDescription: '',
      orderMainCategory: '',
      orderSubCategory: '',
      orderKindCategory: '',
      orderPhotos: [],
      docUrl: [],
    };

    this.handleInputs = this.handleInputs.bind(this);
    this.dispatchOrder = this.dispatchOrder.bind(this);
    this.handleRemovePhoto = this.handleRemovePhoto.bind(this);
    this.handleRemoveDoc = this.handleRemoveDoc.bind(this);
  }

  componentDidMount() {
    this.updateData();
  }

  updateData = () => {
    const order = JSON.parse(localStorage.getItem('order'));

    const imagesId = [];
    order.photos.length > 0
      ? order.photos.map(photo => imagesId.push(photo._id))
      : null;

    const docsId = [];
    order.documents.length > 0
      ? order.documents.map(doc => docsId.push(doc._id))
      : null;

    this.setState({
      order: order,
      orderName: order.name,
      orderRequirements: order.requirements,
      orderDescription: order.description,
      orderMainCategory: order.category.main,
      orderSubCategory: order.category.sub,
      orderKindCategory: order.category.kind,
      orderPhotos: imagesId,
      docUrl: docsId,
    });
  };

  handleRemovePhoto = photoId => {
    const updatedList = this.state.orderPhotos;

    updatedList.splice(updatedList.indexOf(photoId), 1);

    axios
      .put(`${api_url}/orders/edit/${this.state.order._id}`, {
        clientId: localStorage.getItem('clientId'),
        access_token: localStorage.getItem('access_token'),
        photos: updatedList,
      })
      .then(res => {
        if (res.status === 200) {
          axios
            .post(`${api_url}/orders/get/2/${this.state.order._id}`, {
              clientId: localStorage.getItem('clientId'),
              access_token: localStorage.getItem('access_token'),
            })
            .then(res => {
              localStorage.setItem('order', JSON.stringify(res.data.result[0]));
              this.updateData();
            });
        }
      })
      .catch(err => console.log(err));
  };

  handleRemoveDoc = docId => {
    const updatedList = this.state.docUrl;

    updatedList.splice(updatedList.indexOf(docId), 1);

    axios
      .put(`${api_url}/orders/edit/${this.state.order._id}`, {
        clientId: localStorage.getItem('clientId'),
        access_token: localStorage.getItem('access_token'),
        documents: updatedList,
      })
      .then(res => {
        if (res.status === 200) {
          axios
            .post(`${api_url}/orders/get/2/${this.state.order._id}`, {
              clientId: localStorage.getItem('clientId'),
              access_token: localStorage.getItem('access_token'),
            })
            .then(res => {
              localStorage.setItem('order', JSON.stringify(res.data.result[0]));
              this.updateData();
            });
        }
      })
      .catch(err => console.log(err));
  };

  handleInputs = name => event => {
    this.setState({ [name]: event.target.value });
  };

  getHash = href => {
    let path = href.split('/');
    let res = path[path.length - 1];
    return res;
  };

  uploadImges = event => {
    let formData = new FormData();
    formData.append('access_token', localStorage.getItem('access_token'));
    formData.append('clientId', localStorage.getItem('clientId'));

    let files = event.target.files;
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      formData.append('img', file);
    }

    axios
      .post(`${api_url}/file/public/img`, formData)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            orderPhotos: [
              ...this.state.orderPhotos,
              this.getHash(res.data.result.url),
            ],
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  uploadDoc = event => {
    let docsData = new FormData();
    docsData.append('access_token', localStorage.getItem('access_token'));
    docsData.append('clientId', localStorage.getItem('clientId'));

    let files = event.target.files;
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      docsData.append('doc', file);
      docsData.append('name', file.name);
    }

    axios
      .post(`${api_url}/file/public/doc`, docsData)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            docUrl: [...this.state.docUrl, res.data.result._id],
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  dispatchOrder = status => {
    /**
     * for approve : status =1
     * for reject  : status = 0
     */

    axios
      .put(`${api_url}/orders/dispatch/${this.state.order._id}`, {
        clientId: localStorage.getItem('clientId'),
        access_token: localStorage.getItem('access_token'),
        good: status,
      })
      .then(res => {
        if (res.status === 200) {
          alert(res.data.result);
        }
        this.updateData();
      })
      .catch(err => console.log(err));
  };

  editOrder = () => {
    const data = {
      clientId: localStorage.getItem('clientId'),
      access_token: localStorage.getItem('access_token'),
      title: this.state.orderName,
      requirements: this.state.orderRequirements,
      description: this.state.orderDescription,
      product: {
        main: this.state.orderMainCategory,
        sub: this.state.orderSubCategory,
        kind: this.state.orderKindCategory,
      },
    };

    if (this.state.orderPhotos.length > 0) {
      data.photos = this.state.orderPhotos;
    }

    if (this.state.docUrl.length > 0) {
      data.documents = this.state.docUrl;
    }

    axios
      .put(`${api_url}/orders/edit/${this.state.order._id}`, data)
      .then(res => {
        if (res.status === 200) {
          alert(res.data.result);
          axios
            .post(`${api_url}/orders/get/2/${this.state.order._id}`, {
              clientId: localStorage.getItem('clientId'),
              access_token: localStorage.getItem('access_token'),
            })
            .then(res => {
              localStorage.setItem('order', JSON.stringify(res.data.result[0]));
              this.updateData();
            });
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    const {
      order,
      orderName,
      orderRequirements,
      orderDescription,
      orderMainCategory,
      orderSubCategory,
      orderKindCategory,
    } = this.state;

    if (!order) {
      return (
        <p style={{ textAlign: 'center', fontSize: '22px' }}>Loading...</p>
      );
    }

    return (
      <div>
        <Breadcrumb>
          <BreadcrumbItem active>Order</BreadcrumbItem>
        </Breadcrumb>

        <h2 className="page-title mb-lg">Edit order #{order._id}</h2>

        <Row>
          <Col sm="6">
            <Widget settings close>
              <h3>Available for change</h3>
              <br />

              <div>
                <label htmlFor="name">Product name:</label>
                <br />
                <input
                  value={orderName}
                  onChange={this.handleInputs('orderName')}
                  type="text"
                  id="name"
                  style={inputsCss}
                />
                <br />
                <br />

                <label htmlFor="mainCategory">Main category:</label>
                <br />
                <input
                  value={orderMainCategory}
                  onChange={this.handleInputs('orderMainCategory')}
                  type="text"
                  id="mainCategory"
                  style={inputsCss}
                />
                <br />
                <br />

                <label htmlFor="subCategory">Sub category:</label>
                <br />
                <input
                  value={orderSubCategory}
                  onChange={this.handleInputs('orderSubCategory')}
                  type="text"
                  id="subCategory"
                  style={inputsCss}
                />
                <br />
                <br />

                <label htmlFor="kindCategory">Kind category:</label>
                <br />
                <input
                  value={orderKindCategory}
                  onChange={this.handleInputs('orderKindCategory')}
                  type="text"
                  id="kindCategory"
                  style={inputsCss}
                />
                <br />
                <br />

                <label htmlFor="req">Requirements:</label>
                <br />
                <textarea
                  value={orderRequirements}
                  onChange={this.handleInputs('orderRequirements')}
                  name="req"
                  id="req"
                  rows="8"
                  style={inputsCss}
                />
                <br />
                <br />

                <label htmlFor="req">Description:</label>
                <br />
                <textarea
                  value={orderDescription}
                  onChange={this.handleInputs('orderDescription')}
                  name="desc"
                  id="desc"
                  rows="8"
                  style={inputsCss}
                />
                <br />
                <br />

                <label htmlFor="photos">Photos:</label>
                <br />
                <input
                  type="file"
                  id="photos"
                  accept="image/png, image/jpeg, image/gif"
                  onChange={this.uploadImges}
                />
                <br />
                <br />

                <label htmlFor="docs">Documents:</label>
                <br />
                <input
                  type="file"
                  id="docs"
                  accept="application/pdf, application/xls"
                  onChange={this.uploadDoc}
                />
                <br />

                <br />
                <br />

                <div className="order-btns">
                  <div>
                    <Link to="/admin/orders">
                      <Button
                        color="danger"
                        className="btn-rounded width-100 mb-xs mr-xs"
                        onClick={() => alert('Order editing cancelled')}
                      >
                        Cancel
                      </Button>
                    </Link>

                    <Button
                      color="success"
                      className="width-100 mb-xs mr-xs"
                      onClick={this.editOrder}
                    >
                      Save
                    </Button>
                  </div>

                  <div>
                    {order.status.toLowerCase() === 'placed' ? (
                      <Fragment>
                        <Link to="/admin/orders">
                          <Button
                            className="width-100 mb-xs mr-xs"
                            color="danger"
                            outline
                            onClick={() => this.dispatchOrder(0)}
                          >
                            Reject
                          </Button>
                        </Link>

                        <Link to="/admin/orders">
                          <Button
                            className="width-100 mb-xs mr-xs"
                            color="success"
                            outline
                            onClick={() => this.dispatchOrder(1)}
                          >
                            Approve
                          </Button>
                        </Link>
                      </Fragment>
                    ) : order.status.toLowerCase() === 'approved' ? (
                      <Button
                        className="width-100 mb-xs mr-xs"
                        color="success"
                        disabled
                        outline
                      >
                        Approved
                      </Button>
                    ) : (
                      <Button
                        className="width-100 mb-xs mr-xs"
                        color="danger"
                        disabled
                        outline
                      >
                        Rejected
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Widget>
          </Col>

          <Col sm="6">
            <Widget settings close>
              <h3>Full information</h3>
              <br />

              <div>
                <div className="order-info-item">
                  <p>
                    <b>Product ID:</b>
                  </p>
                  <div>{order.index}</div>
                </div>

                <div className="order-info-item">
                  <p>
                    <b>Product name:</b>
                  </p>
                  <div>{order.name}</div>
                </div>

                <div className="order-info-item">
                  <p>
                    <b>Currency/Price:</b>
                  </p>
                  <div>
                    {order.currency} / {order.price / 100}
                  </div>
                </div>

                <div className="order-info-item">
                  <p>
                    <b>Purpose:</b>
                  </p>
                  <div>
                    <Badge color="info">{order.purpose}</Badge>
                  </div>
                </div>

                <hr />

                <div className="order-info-item">
                  <p>
                    <b>Main category:</b>
                  </p>
                  <div>
                    <div>{order.category.main}</div>
                  </div>
                </div>

                <div className="order-info-item">
                  <p>
                    <b>Sub category:</b>
                  </p>
                  <div>
                    <div>{order.category.sub}</div>
                  </div>
                </div>

                <div className="order-info-item">
                  <p>
                    <b>Kind category:</b>
                  </p>
                  <div>
                    <div>{order.category.kind}</div>
                  </div>
                </div>

                <hr />

                <div className="order-info-item">
                  <p>
                    <b>Company name:</b>
                  </p>
                  <div>{order.user.company_name}</div>
                </div>

                <div className="order-info-item">
                  <p>
                    <b>Country:</b>
                  </p>
                  <div>{order.country}</div>
                </div>

                <hr />

                <div className="order-info-item">
                  <p>
                    <b>Delivery term:</b>
                  </p>
                  <div>{order.delivery.term}</div>
                </div>

                <div className="order-info-item">
                  <p>
                    <b>Delivery variant:</b>
                  </p>
                  <div>{order.delivery.variant}</div>
                </div>

                <hr />

                <div className="order-info-item">
                  <p>
                    <b>Announce of propose:</b>
                  </p>
                  <div>
                    {moment(order.auction.start).format('DD.MM.YYYY HH:mm')}
                  </div>
                </div>

                <div className="order-info-item">
                  <p>
                    <b>Requirements:</b>
                  </p>
                  <div>{order.requirements}</div>
                </div>

                <div className="order-info-item">
                  <p>
                    <b>Description:</b>
                  </p>
                  <div>{order.description}</div>
                </div>

                <hr />

                <div className="order-info-item">
                  <p>
                    <b>Photos:</b>
                  </p>
                  {order.photos.length > 0 ? (
                    <div className="order-photos">
                      {order.photos.map(photo => (
                        <div className="order-photos__item" key={photo._id}>
                          <a
                            href={`http://dev.opnplatform.com/api/v1/file/${
                              photo._id
                            }`}
                            target="_black"
                          >
                            <img
                              src={`http://dev.opnplatform.com/api/v1/file/${
                                photo._id
                              }`}
                              width={100}
                              height={100}
                              style={{ objectFit: 'cover' }}
                            />
                          </a>
                          <p onClick={() => this.handleRemovePhoto(photo._id)}>
                            Remove
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    'No photos'
                  )}
                </div>
              </div>

              <div className="order-info-item">
                <p>
                  <b>Documents:</b>
                </p>
                {order.documents.length > 0 ? (
                  <div className="order-documents">
                    {order.documents.map(doc => (
                      <div className="order-documents__item" key={doc._id}>
                        <a
                          href={`http://dev.opnplatform.com/api/v1/file/${
                            doc._id
                          }`}
                          target="_black"
                        >
                          {doc.filename}
                        </a>
                        <p onClick={() => this.handleRemoveDoc(doc._id)}>
                          Remove
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  'No documents'
                )}
              </div>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Order;
