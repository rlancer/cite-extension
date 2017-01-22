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

import { AppBar, Layout, Panel, Avatar, ProgressBar } from 'react-toolbox';

/*
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import AppBar from 'material-ui/AppBar';
*/

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
        //this.doStuff();
        this.state = {atts: false};
    }

    static propTypes = {
        actions: PropTypes.object.isRequired
    };
  
  
	doStuffWithDom = (domContent) => {
        try {
            const atts = {};

            var cheerio = require('cheerio');
            
            //this.log("doStuffWithDom DOM content: " + domContent);
            this.log("doStuffWithDom DOM content: " + typeof(domContent));
            
            if(!domContent){
                atts["dom_error"] = true;

                atts["loaded"] = true;  // FIX: don't add timeout recursively
                this.setState({atts});
                
            }else{
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
                
                var dz = this;
                                
                chrome.tabs.executeScript({  code: "window.getSelection().toString();"  }, 
                    function(selection) {
                        atts["selection"] = selection[0]; 
                        atts["loaded"] = true;  // FIX: don't add timeout recursively
                        
                        dz.log("Selection = " + selection[0]);

                        dz.setState({atts});
                    }
                );
            }

            

        } catch (err) {
          console.error("App.js doStuffWithDom: " + err);
        }
	};

    log(object) {
        console.log('App.js', object);
        chrome.extension.getBackgroundPage().console.log(object);
    }


    doStuff = ()=> {
        try {
            this.setState(oldState=> ({x: oldState.x + 1}));

            chrome.tabs.query({currentWindow: true, active: true}, (tabs)=> {
                this.log("URL: " + tabs[0].url);
                this.log("Tab object: ");
                this.log(tabs[0]);

                this.log('Sending message', tabs[0].id);
                chrome.tabs.sendMessage(tabs[0].id, {text: 'report_back'}, this.doStuffWithDom);
                
            });
            
            /*
                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                    <div>
                        <AppBar
                            title={<b>Title</b>}
                            iconElementLeft={<img src="/img/icon-48.png" alt="CiteShare"></img>}
                          />
                        <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
                                {atts ? <Quotes atts={this.state.atts}/> : false}
                        </div>
                    </div>
                </MuiThemeProvider>
            */

        } catch (err) {
            console.error("App.js doStuff: " + err);
        }
    };
    
    doStuffAfterTimeout = ()=> {
        if(!this.state.atts["loaded"])
            setTimeout(this.doStuff, 500);
    }

    render() {
        const
            {todos, actions} = this.props,
            {atts} = this.state;

        const AppIcon = () => (
            
            <img className="app-icon" src="/img/icon-48.png" width='32' height='32'/>
        );    
        
        const LoadProgressBar = () => (
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
                <ProgressBar mode='indeterminate' />
            </div>
        );
        
        this.doStuffAfterTimeout();
            
        return (
            
            <Layout>
                <Panel>
                    <AppBar leftIcon={<AppIcon />} title="CiteShare">
                    </AppBar>
                    
                    <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
                        {atts ? <Quotes atts={this.state.atts}/> : <LoadProgressBar />}
                    </div>
                </Panel>
            </Layout>
        ); 
    }
}
