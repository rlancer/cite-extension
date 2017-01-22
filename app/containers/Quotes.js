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

import { Layout, Panel, Button, Link, Snackbar } from 'react-toolbox';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';

import CopyToClipboard from 'react-copy-to-clipboard';

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
        this.state = {
            copyApa: false,
            copyMla: false,
            noQuoteShown: false
        };
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
  
    get can_generate_cite(){
        return (this.APA_author && this.common_year && this.title && this.common_URL);
        //return true;
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
  
	get dom_error(){
		return this.atts["dom_error"];
	}
    
    get selection(){
        return this.atts['selection'];
    }
    
    get selected_quote() {
        var quote = this.selection;
    
        if(!quote)
            return "";
            
        quote = quote.trim();    
           
        if(quote.length > 0 && quote.indexOf('"') > 0)
            return quote;
    
        return '"' + quote + '"';
    }

    
    
    get jsx_no_dom(){
        return(
            <Panel>
            
                <Card className="cite-card-2">
                    <span className="cite-card-title"> Could not access web page contents. </span>
                    
                    <CardText className="cite-error-cardtext">
                        <p className="cite-cardtext-text">  
                            <br/>
                            Either the page is a special page like Settings, or the page was loaded before CiteShare was initialized. <br/><br/>
                            Please reload the page and try again. 
                        </p>
                    </CardText>
                    
                </Card>
                
            </Panel>

        );
    }
    
    get jsx_no_citation(){
        return(
            <Panel>
            
                <Card className="cite-card-2">
                    <span className="cite-card-title"> Could not generate citation. </span>
                    
                    <CardText className="cite-error-cardtext">
                        <p className="cite-cardtext-text">  
                            <br/>
                            No OpenGraph metadata fields have been found on this page. <br/><br/>
                            Please contact the owners of the web site to make it compatible with CiteShare.
                        </p>
                    </CardText>
                    
                </Card>
                
            </Panel>

        );
    }
    
    get jsx_citation(){
        return(
            <Panel>
                <Card className="cite-card">
                    <span className="cite-card-title"> APA </span>
                    
                    <CardText className="cite-cardtext">{this.jsx_apa}</CardText>
                    
                    <CardActions>
                        <CopyToClipboard text={this.copy_apa} onCopy={this.onCopyApa}>
                            <Button className="cite-card-button" label="Copy" raised primary/>
                        </CopyToClipboard>
                    </CardActions>
                </Card>
                
                
                <Card className="cite-card-2">
                    <span className="cite-card-title"> MLA </span>
                    
                    <CardText className="cite-cardtext">{this.jsx_mla}</CardText>
                    
                    <CardActions>
                        <CopyToClipboard text={this.copy_mla} onCopy={this.onCopyMla}>
                            <Button className="cite-card-button" label="Copy" raised primary/>
                        </CopyToClipboard>
                    </CardActions>
                </Card>
                
                <Snackbar action='OK' active={this.shouldShowSnackbar} label={this.getSnackbarMsg}
                    timeout={1000} onClick={this.handleSnackbarDismiss} onTimeout={this.handleSnackbarDismiss} type='accept'/>
            </Panel>
        );
    }
    
    get jsx_original(){
        return(
            <div>
                <b>Original:</b><br/> 
                {this.author.split(' ').reverse().join(', ')}. "{this.title}", {this.date}, {this.url}.
            </div>
        );
    }
    
    
    get jsx_apa(){
        let quote = this.selected_quote;
        quote = (quote.length > 0 ? (<span>{quote} <br/><br/></span>) : "");
    
        return(
            <p className="cite-cardtext-text">  
                {/*{this.APA_author}. ({this.common_year}). {this.title}. Retrieved {this.common_date} from {this.common_URL}*/}
                {quote}
                {this.raw_apa}
            </p>
        );
    }
    
    get copy_apa(){
        var quote = this.selected_quote;
        quote = (quote.length > 0 ? quote + "\n\n" : "");
        
        return (`${quote}${this.raw_apa}`);
    }
    
    get raw_apa(){
        return (`${this.APA_author}. (${this.common_year}). ${this.title}. Retrieved ${this.common_date} from ${this.common_URL}`);
    }
    
    
    
    get jsx_mla(){
        let quote = this.selected_quote;
        quote = (quote.length > 0 ? (<span>{quote} <br/><br/></span>) : "");
    
        return(
            <p className="cite-cardtext-text">
                {/*{this.MLA_author}, ({this.common_year}) "{this.title}" {this.MLA_site_name}, {this.common_date}. {this.common_URL}*/}
                {quote}
                {this.raw_mla}
            </p>
        );
    }
    
    get copy_mla(){
        var quote = this.selected_quote;
        quote = (quote.length > 0 ? quote + "\n\n" : "");
        
        return (`${quote}${this.raw_mla}`);
    }
    
    get raw_mla(){
        return(`${this.MLA_author}, (${this.common_year}) "${this.title}" ${this.MLA_site_name}, ${this.common_date}. ${this.common_URL}`);
    }
    
    
    get shouldShowSnackbar(){
        return this.state.copyApa || this.state.copyMla || (!this.state.noQuoteShown && !this.selection);
    }
    
    
    get getSnackbarMsg(){
        if(this.state.copyApa || this.state.copyMla){
            if (this.state.copyApa){
                return "APA citation copied.";
            }else if (this.state.copyMla){
                return "MLA citation copied.";
            }
        }else if (!this.state.noQuoteShown && !this.selection){
            return "To add a quote, select text before loading CiteShare";
        }else{
            return "";
        }
    }
    
    onCopyApa = ()=> {
        //alert("APA copied");
        this.setState({copyApa: true});
    }
     
    onCopyMla = ()=> {
        //alert("MLA copied");
        this.setState({copyMla: true});
    } 
    
    handleSnackbarDismiss = (event, instance) => {
        this.setState({ 
            copyApa: false,
            copyMla: false,
            noQuoteShown: true
        });
    };
    
    
    /*
    A periodical (journal, magazine, newspaper article) should be in quotation marks:

    Bagchi, Alaknanda. "Conflicting Nationalisms: The Voice of the Subaltern in Mahasweta Devi's Bashai Tudu." Tulsa Studies in Women's Literature, vol. 15, no. 1, 1996, pp. 41-50.
   
	
	Extension Spits out:
	Cohn, Nate. “Latest Upshot Poll Shows Trump With a Lead in Florida”, ,http://www.nytimes.com/interactive/2016/10/30/upshot/florida-poll.html.
	
	We need it to spit out (APA):
	Cohen, N. (2016). Latest Upshot Poll Shows Trump With a Lead in Florida. Retrieved Oct. 30, 2016 from http://nyti.ms/2e11Njq

	We need it to spit out (MLA):
	Cohen, Nate, (2016) ”Latest Upshot Poll Shows Trump With a Lead in Florida" The New York Times, Oct. 30, 2016. http://nyti.ms/2e11Njq
   
   */
   
   
    render() {     
        let dom = null;
        
        if(this.state.genDom){
            dom = this.state.genDom;
        
        }
        
        if (this.dom_error){
            dom = this.jsx_no_dom;
        }else if(!this.can_generate_cite){
            dom = this.jsx_no_citation;
        }else{
            dom = this.jsx_citation;
        }
            
        return (
            <div>
                {dom}
            </div>
        );
    }
}
