# Delphi System Designs

> Delphi System Designs is a back-end focused initiative that optimized inherited legacy code from Elysium Solutions. Elysium Solutions is a single page e-commerce web application, featuring a Product-Overview, a Related Items, a Questions and Answers, and a Ratings and Reviews module each within a service-oriented / microservices architecture. I Inherited the legacy front-end of the Ratings and Reviews service and was tasked with building out an optimized back-end that could handle high production-level web traffic.

## The Ratings and Reviews client rendering my created back end

![reviews-FE](https://github.com/Back-end-to-the-Future/ratings-and-reviews-module/blob/master/client/src/assets/images/Screen%20Shot%202020-09-19%20at%2013.20.09.png)

# Objectives for this initiative

## Scaling the Database

* I ultimately chose PostgresQL because of my preference towards object-relational SQL databases and because it is open source.

* I wrote three [data generation scripts](https://github.com/Back-end-to-the-Future/ratings-and-reviews-module/tree/master/database/data-generation) in order to generate over a total of 17 million records spread between the three tables I have in my [schema](https://github.com/Back-end-to-the-Future/ratings-and-reviews-module/blob/master/database/database-postgresQL/schema.sql).

### It took me only 209 seconds to generate the 10M records for my primary table!

![data-gen-shot](https://github.com/Back-end-to-the-Future/ratings-and-reviews-module/blob/master/client/src/assets/images/Screen%20Shot%202020-09-02%20at%2021.26.16.png)

## DBMS Benchmarking

* My goal was to optimize the back end in order to verify that the queries used by my API ran under 50ms.

### I got them running in under 7ms

![query-duration](https://github.com/Back-end-to-the-Future/ratings-and-reviews-module/blob/master/client/src/assets/images/Screen%20Shot%202020-09-03%20at%2019.39.38.png)

## Measured Performance

* Monitored response time / latency, throughput, and error rate using [New Relic](https://newrelic.com/)

![new-relic-shot](https://github.com/Back-end-to-the-Future/ratings-and-reviews-module/blob/master/client/src/assets/images/Screen%20Shot%202020-09-19%20at%2012.32.02.png)

![new-relic-shot1](https://github.com/Back-end-to-the-Future/ratings-and-reviews-module/blob/master/client/src/assets/images/Screen%20Shot%202020-09-19%20at%2012.32.23.png)

## Stress tested the service in development using the simulated data I created and realistic requests to the API by scaling the number of request per second (RPS): 1, 10, 100, 1K via [Artiller.io](https://artillery.io/)

* Blew passed my goal of reaching 1k RPS with low latency times

![rps-shot](https://github.com/Back-end-to-the-Future/ratings-and-reviews-module/blob/master/client/src/assets/images/SDC%20Metrics%20top.png)

# Reviews API

### List Reviews
Returns a list of reviews for a particular product.  This list *does not* include any reported reviews.
`GET /reviews/:product_id/list`

Parameters

| Parameter  | Type    | Description                                                  |
| ---------- | ------- | ------------------------------------------------------------ |
| product_id | integer | Specifies the product for which to retrieve reviews.         |
| page       | integer | Selects the page of results to return.  Default 1.           |
| count      | integer | Specifies how many results per page to return. Default 5.    |
| sort       | text    | Changes the sort order of reviews to be based on "newest", "helpful", or "relevant" |

Response

`Status: 200 OK `

```json
{
  "product": "2",
  "page": 0,
  "count": 5,
  "results": [
    {
      "review_id": 5,
      "rating": 3,
      "summary": "I'm enjoying wearing these shades",
      "recommend": 0,
      "response": "",
      "body": "Comfortable and practical.",
      "date": "2019-04-14T00:00:00.000Z",
      "reviewer_name": "shortandsweeet",
      "helpfulness": 5,
      "photos": [{
          "id": 1,
          "url": "urlplaceholder/review_5_photo_number_1.jpg"
        },
        {
          "id": 2,
          "url": "urlplaceholder/review_5_photo_number_2.jpg"
        },
        // ...
      ]
    },
    {
      "review_id": 3,
      "rating": 4,
      "summary": "I am liking these glasses",
      "recommend": 0,
      "response": "Glad you're enjoying the product!",
      "body": "They are very dark. But that's good because I'm in very sunny spots",
      "date": "2019-06-23T00:00:00.000Z",
      "reviewer_name": "bigbrotherbenjamin",
      "helpfulness": 5,
      "photos": [],
    },
    // ...
  ]
}
```



### Get Review Metadata

Returns review metadata for a given product.

`GET /reviews/:product_id/meta`

Parameters

| Parameter  | Type    | Description                                                  |
| ---------- | ------- | ------------------------------------------------------------ |
| product_id | integer | Required ID of the product for which data should be returned |

Response

`Status: 200 OK `

```json
{
  "product_id": "2",
  "ratings": {
    2: 1,
    3: 1,
    4: 2,
    // ...
  },
  "recommended": {
    0: 5
    // ...
  },
  "characteristics": {
    "Size": {
      "id": 14,
      "value": "4.0000"
    },
    "Width": {
      "id": 15,
      "value": "3.5000"
    },
    "Comfort": {
      "id": 16,
      "value": "4.0000"
    },
    // ...
}
```



### Add a Review

Adds a review for the given product.

`POST /reviews/:product_id`

Parameters

| Parameter  | Type    | Description                                       |
| ---------- | ------- | ------------------------------------------------- |
| product_id | integer | Required ID of the product to post the review for |

Body Parameters

| Parameter       | Type   | Description                                                  |
| --------------- | ------ | ------------------------------------------------------------ |
| rating          | int    | Integer (1-5) indicating the review rating                   |
| summary         | text   | Summary text of the review                                   |
| body            | text   | Continued or full text of the review                         |
| recommend       | bool   | Value indicating if the reviewer recommends the product      |
| name            | text   | Username for question asker                                  |
| email           | text   | Email address for question asker                             |
| photos          | [text] | Array of text urls that link to images to be shown           |
| characteristics | object | Object of keys representing characteristic_id and values representing the review value for that characteristic. { "14": 5, "15": 5 //...} (must send at least an empty object)|

Response

`Status: 201 CREATED `

### Mark Review as Helpful

Updates a review to show it was found helpful.

`PUT /reviews/helpful/:review_id`

Parameters

| Parameter | Type    | Description                         |
| --------- | ------- | ----------------------------------- |
| reveiw_id | integer | Required ID of the review to update |

Response

`Status: 204 NO CONTENT `



### Report Review

Updates a review to show it was reported. Note, this action does not delete the review, but the review will not be returned in the above GET request.

`PUT /reviews/report/:review_id`

Parameters

| Parameter | Type    | Description                         |
| --------- | ------- | ----------------------------------- |
| review_id | integer | Required ID of the review to update |

Response

`Status: 204 NO CONTENT `

