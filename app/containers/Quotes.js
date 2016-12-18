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

    get atts() {
        return this.props.atts;
    }

    get author() {
        return this.atts.author || this.atts['article:author'] || '';
    }

    get date() {
        return this.atts.pubdate || this.atts['og:pubdate'];
    }

    get title() {
        return this.atts['og:title'];
    }

    get url() {
        return this.atts['og:url'];
    }
  
  
	get APA_author(){
		var names = this.author.split(' ');
		if	(names.length == 0)
			return this.author;
			
		var s_name = names[names.length - 1];		
		var f_name = names[0];
		
		if(f_name.length > 0)
			f_name = f_name.charAt(0).toUpperCase();
		
		return s_name + ", " + f_name;
	}
	
	get MLA_author(){
		var names = this.author.split(' ');
		if	(names.length == 0)
			return this.author;
			
		var s_name = names[names.length - 1];		
		var f_name = names[0];
		
		return s_name + ", " + f_name;
	}
	
	
	get common_year(){
		var moment = require('moment');
		
		if (!moment().isValid(this.date))
			return this.date;
			
		return moment(this.date).year();
	}
	
	get common_date(){
		var moment = require('moment');
		
		if (!moment().isValid(this.date))
			return this.date;
			
		return moment(this.date).format("MMM. D, YYYY");
	}
	
	get MLA_site_name(){
		if(this.atts["og:site_name"])
			return this.atts["og:site_name"].trim();
			
		if(this.atts["site_title"]){
			var title = this.atts["site_title"];
			
			var title_parts = title.split("-");
			
			if(title_parts.length > 1)
				return title_parts[title_parts.length - 1].trim();
		}	
	
		if(this.atts['og:url']){
			var URL = require("url");
			var url_obj = URL.parse(this.atts['og:url']);
			if(url_obj)
				return url_obj.protocol + "//" + url_obj.host;
		}
		
		return "";
	}
	
	get common_URL(){
		if(this.atts["site_short_url"])
			return this.atts["site_short_url"];
			
		return this.url;
	}
  
	get self_error(){
		if(this.atts["self_error"]){
			return (
                <div>
                    <b>{this.atts["self_error"]}</b>
                    <br/><br/>
                </div>
            );
        }
	}
    
    get citation_jsx(){
        return(
            <div>
                Original:<br/> 
                {this.author.split(' ').reverse().join(', ')}. "{this.title}", {this.date}, {this.url}.
            
                <br/> <br/> 
                APA:<br/> 
                {this.APA_author}. ({this.common_year}) {this.title} Retrieved {this.common_date} from {this.common_URL}
            
                <br/> <br/> 
                MLA:<br/> 
                {this.MLA_author}, ({this.common_year}) "{this.title}" {this.MLA_site_name}, {this.common_date}. {this.common_URL}
            </div>
        );
    }
  
    /*
    A periodical (journal, magazine, newspaper article) should be in quotation marks:

    Bagchi, Alaknanda. "Conflicting Nationalisms: The Voice of the Subaltern in Mahasweta Devi's Bashai Tudu." Tulsa Studies in Women's Literature, vol. 15, no. 1, 1996, pp. 41-50.
   
	
	Extension Spits out:
	Cohn, Nate. “Latest Upshot Poll Shows Trump With a Lead in Florida”, ,http://www.nytimes.com/interactive/2016/10/30/upshot/florida-poll.html.
	
	We need it to spit out (APA):
	Cohen, N. (2016) Latest Upshot Poll Shows Trump With a Lead in Florida Retrieved Oct. 30, 2016 from http://nyti.ms/2e11Njq

	We need it to spit out (MLA):
	Cohen, Nate, (2016) ”Latest Upshot Poll Shows Trump With a Lead in Florida" The New York Times, Oct. 30, 2016. http://nyti.ms/2e11Njq
   
   
   */
    render() {     
        let dom = null;
        
        if (this.self_error)
            dom = this.self_error;
        else
            dom = this.citation_jsx;
    
        return (
            <div style={{fontFamily: 'courier'}}>
                {dom}
            </div>
        );
    }
}
