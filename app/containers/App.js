import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import * as TodoActions from '../actions/todos';
import style from './App.css';

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
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  doStuffWithDom = (domContent) => {
    this.log('I received the following DOM content:\n' + domContent);
  };

  log(object) {
    console.log('log', object);
    chrome.extension.getBackgroundPage().console.log(object);
  }


  doStuff = ()=> {
    try {
      this.log('ta', {x: 2});
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
        <div>{this.state.x}</div>
        {/*<Header addTodo={actions.addTodo} />
         <MainSection todos={todos} actions={actions} />*/}
        GET QOUTES AND STUFF HEREjjjj;;;;;
        {this.state.tab}
      </div>
    );
  }
}
