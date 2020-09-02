/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line object-curly-newline
import { Container, Row, Col, Button, Modal, Form, InputGroup, ToggleButton } from 'react-bootstrap';
import Rating from '@material-ui/lab/Rating';
import regeneratorRuntime from 'regenerator-runtime';
import axios from 'axios';

// const url = 'http://52.26.193.201:3000';

// COMPONENTS
import Review from '../Review/Review.jsx';
import Summary from '../Summary/Summary.jsx';
import style from './app.css';

const getData = async (param, fn) => {
  // Get review data
  axios.get(`/rrmodule/reviews/${param}/list`)
    .then((response) => {
      fn(response.data.results);
    });
};

const getMeta = async (param, fn) => {
  // Get meta data
  axios.get(`/rrmodule/reviews/${param}/meta`)
    .then((response) => {
      fn(response.data.characteristics);
    });
};

const App = () => {
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState(null);
  const [renderCount, setRenderCount] = useState(2);
  const [show, setShow] = useState(false);
  const [newReview, setNewReview] = useState({
    product_id: null,
    rating: null,
    summary: null,
    body: null,
    recommend: null,
    name: null,
    email: null,
    photos: null,
    characteristics: null,
  });
  // const [reviews, setReviews] = useState([]);
  const param = 1;
  // use 2, 18, 24 for demo

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Creates the list of review tiles to be rendered
  const renderReviews = () => {
    const reviewsList = [];

    for (let i = 0; i < renderCount; i += 1) {
      if (data[i] !== undefined) {
        reviewsList.push(
          <Review
            data={data[i]}
            key={data[i].review_id}
            setData={setData}
            param={param}
            getData={getData}
          />,
        );
      }
    }
    return reviewsList;
  };

  // Api call to get data
  useEffect(() => {
    getData(param, setData);
    getMeta(param, setMeta);
    // [] argument below ensures this only occurs on mount not on update
  }, []);

  // Gets 2 more reviews when button is clicked
  const getMoreReviews = () => {
    setRenderCount(renderCount + 2);
    renderReviews();
  };

  // Controls conditional rendering of more reviews button
  const getMoreReviewsButton = () => {
    if (data.length < 2) {
      return null;
    }
    if (data.length === renderCount || renderCount > data.length) {
      return null;
    }
    return <Button id="moreReviews" className="mr-3 mt-4" variant="outline-dark" onClick={getMoreReviews}>More Reviews</Button>;
  };

  const createModalFormRadios = () => {
    const features = meta !== null ? Object.keys(meta) : null;
    const result = [];
    const radios = [];

    for (let i = 0; i < 5; i += 1) {
      radios.push(<input type="radio" className="mr-1" key={i} value={i + 1} onChange={(e) => console.log(e.target.value)} />);
    }

    if (features !== null) {
      for (let i = 0; i < features.length; i += 1) {
        result.push(
          <Row key={`${features[i]}-rating`} className={`${style.radioRows} mb-1 justify-content-center`}>
            <Col xs={2} className="d-flex justify-content-end pr-0">
              <span>{features !== null ? `${features[i]}:` : ''}</span>
            </Col>
            <Col xs={6}>
              <span className={`${style.spanFont} mr-1`}>Poor</span>
              {radios}
              <span className={`${style.spanFont} ml-1`}>Great</span>
            </Col>
          </Row>,
        );
      }
    }
    return result;
  };

  return (
    <Container>
      <Row>
        <Col xs={12} md={6} lg={4}>
          <Summary data={data} meta={meta} />
        </Col>
        <Col xs={12} lg={8} id="reviewsContainer" className={style.container}>
          {renderReviews()}
          {getMoreReviewsButton()}
          <Button className="mt-4" variant="outline-dark" onClick={handleShow}>Add A Review &#43;</Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add A Review</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <Container>
                  <Row className="justify-content-center">
                    <span>Overall Rating: </span>
                    <Rating name="overall-rating" onChange={(e) => console.log(e.target.value)} />
                  </Row>
                  <Row className="justify-content-center">
                    <Col xs={4} className="mb-1">
                      <span className="mr-1">Yes:</span>
                      <input type="radio" className="mr-2" value="yes" onChange={(e) => console.log(e.target.value)} />
                      <span className="mr-1">No:</span>
                      <input type="radio" value="no" onChange={(e) => console.log(e.target.value)} />
                    </Col>
                  </Row>
                  {createModalFormRadios()}
                </Container>
                <Form.Control as="textarea" rows="3" placeholder="Write a review here..." />
              </form>
            </Modal.Body>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
