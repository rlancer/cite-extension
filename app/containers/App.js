import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as TodoActions from '../actions/todos';
import style from './App.css';
import htmlparser2 from 'htmlparser2';
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
    this.state = {x: 1};
  }

  static propTypes = {
    actions: PropTypes.object.isRequired
  };

  doStuffWithDom = (domContent) => {

    const atts = {};

    const parser = new htmlparser2.Parser({
        onopentag: (name, attribs) => {
          if (name === "meta")
            if (attribs.name || attribs.property)
              atts[attribs.name || attribs.property] = attribs.content;
        },
        onend: ()=>this.setState({atts})
      },
      {decodeEntities: true});
    parser.write(domContent);
    parser.end();
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
    const {todos, actions} = this.props;

    return (
      <div style={{backgroundColor: 'red', height: '20rem'}}>
        <div style={{padding: '2rem', backgroundColor: 'pink', cursor: 'pointer', color: 'white'}}
             onClick={this.doStuff}>DO STUFF
        </div>
        <Quotes atts={this.state.atts}/>
      </div>
    );
  }
}
