/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import style from './summary.css';
import { averageRating, recommendedPercentage } from '../../helpers/helpers.js';

import RatingBars from '../RatingBars/RatingBars.jsx';

const Summary = (props) => {
  const { data } = props;
  const [avgRating, setAvgRating] = useState('-');
  const [recommendedPct, setRecommendedPct] = useState(0);

  // Runs average Rating function to generate number to display
  useEffect(() => {
    if (data.length > 0) {
      setAvgRating(averageRating(data));
      setRecommendedPct(recommendedPercentage(data));
    }
  });

  return (
    <Container className={style.ratingContainer}>
      <Row>
        <Col>
          <h2>RATINGS & REVIEWS</h2>
        </Col>
      </Row>
      <Row>
        <Col xs={6} lg={5}>
          <span id="avgRating" className={style.rating}>{ `${avgRating}` }</span>
        </Col>
        <Col xs={5} className={style.starsPlaceholder}>Stars</Col>
      </Row>
      <Row>
        <Col xs={12}>
          <span id="recommendedPct" className={style.spanFont}>{`${recommendedPct}% of reviews recommend this product`}</span>
        </Col>
      </Row>
      <RatingBars data={data} />
    </Container>
  );
};

Summary.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

Summary.defaultProps = {
  data: [{ body: 'default' }],
};

// module.exports = averageRating;
export default Summary;
