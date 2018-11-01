import React from 'react';
import {Links} from  '../api/links';
import {Tracker} from 'meteor/tracker';
import {Meteor} from 'meteor/meteor';
import LinksListItem from './LinksListItem';
import {Session} from 'meteor/session';
import FlipMove from 'react-flip-move';

export default class LinksList extends React.Component{
constructor(props){
  super(props);
  this.state = {
    links :[]
  };
}
componentDidMount(){
  this.linksTracker = Tracker.autorun(() =>{
  Meteor.subscribe('links');
  const links = Links.find({visible:Session.get('showVisible')}).fetch();
  this.setState({
    links
  });
  });
}
componentWillUnMount(){
  this.linksTracker.stop();
  console.log('componentWillUnmount LinksLIst');
}

renderLinksListItems(){
  if(this.state.links.length === 0){
    return (
      <div className="item">
        <p className="item__status-message">Link Not Found</p>
      </div>
    );
  
  }
  return this.state.links.map((link) => {
    let shortUrl = Meteor.absoluteUrl(link._id);
    return (
      <LinksListItem key={link._id} shortUrl={shortUrl} {...link}/>
    );
  });
}

  render(){
    return(
      <div>
        <FlipMove maintainContainerHeight={true}>
       {this.renderLinksListItems()}
       </FlipMove>
      </div>
    );
  }
}
