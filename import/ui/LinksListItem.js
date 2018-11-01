import React from 'react';
import PropTypes from 'prop-types';
import ClipBoard from 'clipboard';
import {Meteor} from 'meteor/meteor';
import moment from 'moment';


export default class LinksListItem extends React.Component{
 constructor(props){
   super(props);
   this.state = {
       justCopied : false
   };
 }

 componentDidMount(){
   this.clipboard = new ClipBoard(this.refs.copy);
    this.clipboard.on('success',() =>{
 alert('Its working');
   this.setState({
      justCopied:true
   });

   setTimeout(()=>{
    this.setState({
        justCopied:false
     });

   },1000);
    }).on('error',() => {
        alert('its not working ,Please do manual');
    });
 } 

 componentWillUnmount(){
    this.clipboard .destroy();
 }

 renderStats(){
     const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits';
     let visitedMessage = null;
     if(typeof this.props.lastVisitedAt === 'number' ){
         let momentNow = moment(this.props.lastVisitedAt);
        visitedMessage = `(visited ${momentNow.fromNow()} )`;
     }

    return <p className="item__message">{this.props.visitedCount} {visitMessage} - {visitedMessage}</p>;
 }

render(){
     return(
        <div className="item">
        <h2>{this.props.url}</h2>
        <p className="item__message" key={this.props._id}>{this.props.shortUrl}</p>
        {this.renderStats()}
        <a href={this.props.shortUrl} className="button button--pill button--link" target='_blank'>
        Visit
        </a>
        <button ref="copy" className="button button--pill" data-clipboard-text={this.props.shortUrl} >{this.state.justCopied? 'Copied' : 'Copy'}</button>
        <button className="button button--pill" onClick={()=> Meteor.call('links.setVisibility',this.props._id,!this.props.visible)} >{this.props.visible? 'Hide' : 'Visible'}</button>  
        </div> 
     );
 }

}

LinksListItem.propTypes = {
    _id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    shortUrl: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    visitedCount:PropTypes.number.isRequired,
    lastVisitedAt:PropTypes.number
  };