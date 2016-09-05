import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as TodoActions from '../actions/todos';
import style from './App.css';
import htmlparser2 from 'htmlparser2';

const x = {
  "viewport": "width=device-width, initial-scale=1.0, minimum-scale=1.0",
  "section": "asia",
  "og:pubdate": "2016-09-05T01:57:32Z",
  "pubdate": "2016-09-05T01:57:32Z",
  "lastmod": "2016-09-05T05:47:15Z",
  "og:url": "http://www.cnn.com/2016/09/04/asia/hong-kong-legco-election/index.html",
  "author": "James Griffiths and Vivian Kam, CNN",
  "og:title": "Flying 6,000 miles to vote: Hong Kong sees record turnout",
  "og:description": "Hong Kongers flew in from around the world, lined up until the early hours and turned out in record numbers to vote in elections for the city's parliament Sunday. ",
  "description": "Hong Kongers flew in from around the world, lined up until the early hours and turned out in record numbers to vote in elections for the city's parliament Sunday. ",
  "keywords": "hong kong, legco, legco2016, nathan law, asia, Flying 6,000 miles to vote: Hong Kong sees record turnout - CNN.com",
  "og:site_name": "CNN",
  "twitter:card": "summary_large_image",
  "og:type": "article",
  "og:image": "http://i2.cdn.turner.com/cnnnext/dam/assets/160905091634-nathan-law-hong-kong-election-large-tease.jpg",
  "thumbnail": "http://i2.cdn.turner.com/cnnnext/dam/assets/160905091634-nathan-law-hong-kong-election-large-tease.jpg",
  "vr:canonical": "http://www.cnn.com/2016/09/04/asia/hong-kong-legco-election/index.html",
  "fb:app_id": "80401312489",
  "fb:pages": "5550296508,18793419640",
  "template-top": "asia,art-img"
};

export default class Quotes extends Component {

  constructor(props) {
    super(props);
  }


  log(object) {
    console.log('log', object);
    chrome.extension.getBackgroundPage().console.log(object);
  }

  render() {
    return (
      <div>{JSON.stringify(this.props.atts)}</div>
    );
  }
}
