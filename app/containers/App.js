//
//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//
//					 BUG FREE BUDDHA


import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as TodoActions from '../actions/todos';
import style from './App.css';
import Quotes from './Quotes';

@connect(
  state => ({
    todos: state.todos
  }),
  dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
  })
)
export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {atts: false};
  }

  static propTypes = {
    actions: PropTypes.object.isRequired
  };
  
  
	doStuffWithDom = (domContent) => {

		const atts = {};

		var dz = this;
		var cheerio = require('cheerio');
		
		if(!domContent){
			atts["self_error"] = "Null DOM";
			return;
		}
		
		var $ = cheerio.load(domContent);
		if($('title', 'head').text())
			atts["site_title"] = $('title','head').text();
		
		$('meta', 'head').map(function(i, el) {
			if ($(el).attr("name") || $(el).attr("property")){
				atts[$(el).attr("name") || $(el).attr("property")] = $(el).attr("content");
			}

		});
		
		
		/* NY Times Patch */
		if($('span.story-short-url a').attr('href')){
			atts["site_short_url"] = $('span.story-short-url a').attr('href');
		}
		
		
		this.setState({atts});
	};

  log(object) {
    console.log('log', object);
    chrome.extension.getBackgroundPage().console.log(object);
  }


  doStuff = ()=> {
    try {
      this.setState(oldState=> ({x: oldState.x + 1}));

      chrome.tabs.query({currentWindow: true, active: true}, (tabs)=> {
        this.log(tabs[0].url);
        this.log(tabs[0]);

        this.log('sending message', tabs[0].id);
        chrome.tabs.sendMessage(tabs[0].id, {text: 'report_back'}, this.doStuffWithDom);

      });

    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const
      {todos, actions} = this.props,
      {atts} = this.state;

    return (
      <div style={{height: '20rem'}}>
        <div style={{padding: '2rem', backgroundColor: '#fff', cursor: 'pointer'}} onClick={this.doStuff}>DO STUFF</div>
        {atts ? <Quotes atts={this.state.atts}/> : false}
      </div>
    ); 
  }
}
