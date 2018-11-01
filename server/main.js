import { Meteor } from 'meteor/meteor';
import '../import/api/users';
import {Links} from '../import/api/links';
import {WebApp} from 'meteor/webapp';

import moment from 'moment';

import '../import/startup/simple-schema-configuration.js';

const rediectGoogle = (res) => {
  res.statusCode = 302;
   res.setHeader('Location','http://www.google.com');
   //res.write('<h1>This is from my custom middleware</h1>');
   //next();
   res.end();
};
Meteor.startup(() => {
let momentNow = moment();
console.log(momentNow.format('h:mm a'));
  WebApp.connectHandlers.use((req,res,next) => {
  const _id = req.url.slice(1);
  const link = Links.findOne({_id});
  if(link){
    console.log('Server Main JS',link);
    res.statusCode = 302;
     res.setHeader('Location',link.url);
     res.end();
     Meteor.call('links.trackVisit',_id,(err,res)=>{
       console.log(err);
     });
  }else{
    next();
  }
  });


//
  // code to run on server at startup
/*  const petSchema = new SimpleSchema({
    name:{
      type:String
    }
  });

  petSchema.validate({
    name:'saleem'
  });
});


const empSchema = new SimpleSchema({
  name :{
    type:String,
    min :1,
    max :200
  },
  hourlyWage:{
    type : Number,
    min : 0
  },
  email:{
    type :String,
    regEx : SimpleSchema.RegEx.Email

  }
});

empSchema.validate({
  name:'saleem',
  hourlyWage:2,
  email:'saleem@gmail.com'
});*/
});
