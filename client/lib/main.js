Template.twitter.rendered = function() {

!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
  if(Meteor.userId() && profiles.findOne({ user_id: Meteor.userId() }) === undefined) {
    $("form.profile").foundation("reveal", "open").find("form").show();
  };
}

Template.chat.events({
  'click .submit_chat' : function (evt, tmpl){
      // probably set a session variable that refers to the
      // appropriate chat room
      var room_id = Session.get('room_id'), user_id = Meteor.userId();
      if(room_id && user_id){
          msg = tmpl.find('.chat-new-message-content').value;
          if(msg){
              console.log('inserting');
              var user = Meteor.users.findOne({ _id: Meteor.userId() });
              chat.insert({msg : msg, room_id:room_id,user_id :user.emails[0].address});
              }
      }
      Session.set("render", "#chat");
      evt.preventDefault();
  },

  'change input[name=search]': function() {
    $(".results-list").html(Meteor.render(Template.addUsers));
    Session.set("render", "#chat");
  }
});

Template.chat.profiles = function() {
  if (Session.get("room_id")) {
    var users = rooms.findOne({ _id: Session.get("room_id") }).users;
    return profiles.find({ user_id: { $in: users } });
  };
};

Template.chat.getMessages = function(){
    var room_id = Session.get('room_id');
    
    if(room_id){
        var q =chat.find({room_id : room_id}).fetch();
        return q;
    }
};

Template.chat.emailHash = function() {
  return md5(this.user_id);
};

Template.main.activeRooms = function(){
  return rooms.find({ $where: function() {
    return this.users.indexOf(Meteor.userId()) > -1;
  }});
};

Template.main.rendered = function() {
  $('.new_announcement').hide();
  $("section").hide();

  console.log(Session.get("render"));
  if(Session.get("render")) {
    $(Session.get("render")).show();
  } else {
    $("section#dashboard").show();
  }
};

Template.main.events({
  'click .side-menu a': function(e) {
    Session.set("render", "#" + $(e.target).parent().data("target"));

    $("section").hide();
    $("section#" + $(e.target).parent().data("target")).show();

    $(".side-menu li").removeClass("active");
    $(e.srcElement).addClass('active');
  },

  'click .show_chatroom' : function(evt,tmpl){
    Session.set('room_id', $(evt.target).parent().data("roomId"));
    evt.preventDefault();
  }
});

Template.announcements.getMsg = function (){
    return announcements.find({});
};

Template.announcements.events({
    'click .cancel' : function(evt,tmpl){
        $('.new_announcement').hide();
    }
});

Template.announcements.getAnnouncements = function(){
    return announcements.find({}, { sort: { createdAt: -1 } });
}

Template.new_announcement.events({
    'click .cancel' : function(evt,tmpl){
        $('.new_announcement').hide();
    },

  'click .add_announcement': function(evt,tmpl){
    evt.preventDefault();
    var msg=tmpl.find(".msg").value;
    announcements.insert({msg: msg, user_id: Meteor.userId(), createdAt: new Date()});
    //What does pepsi wild cherry taste like with crown royal?
    $('.new_announcement').hide();
    Session.set("render", "#announcements");
  }
});


Template.dashboard.events({
    'click .show_profile' : function(){
        alert('show profile using userId');
        // do jquery stuff to show the chatrooms in tab format
        // from here go to settings template ....
    },
    
    'click .show_announcements' : function(){
      $('.announcements').show();
    },
    
    'click .new_announcements' : function(){
      $('.new_announcement').show();
    }
});

Template.profile.events({
    'click .save_profile': function(){
        // save profile to mongo, use session id to determine what record
        // this is based on users' userId
    
    }


});

Template.profile.userProfile= function(){
        // get userId to load from user profile collection
};

Accounts.ui.config({ 
    passwordSignupFields: 'EMAIL_ONLY'
});
