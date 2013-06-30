Template.footer.rendered= function(){
// hide all objects that are not to be shown when logged in
    // $('.chat').hide();
    
    
    $('.profile').hide();
    
    $('.add_announcements').hide();
    
    $('.new_announcement').hide();

    // check that user has a profile if not show inital survey
    $('.initialSurvey').hide();
    
};

Template.chat.events({
<<<<<<< HEAD
    'click .show_chatroom' : function(evt,tmpl){
        Session.set('room_id',this._id);
    },
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
    },
    'click .side-menu a' : function(evt, tmpl){
        var ele = evt.target || evt.srcElement;
        $(".side-menu li").removeClass("active");
        $(ele).addClass('active');
    }

=======
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
  },

  'change input[name=search]': function() {
    $(".results-list").html(Meteor.render(Template.addUsers));
  }
>>>>>>> 57191ae3f93ec2accbf286737ee4cdb4db0bb6b3
});

Template.chat.getMessages = function(){
    var room_id = Session.get('room_id');
    
    if(room_id){
        var q =chat.find({room_id : room_id}).fetch();
        return q;
    }
};

Template.main.activeRooms = function(){
  return rooms.find({ $where: function() {
    return this.users.indexOf(Meteor.userId()) > -1;
  }});
};

Template.main.rendered = function() {
  $("section").hide();
  $("section#chat").show();
  if (Session.get("room_id")) {
    $("a[data-room-id=" + Session.get("room_id") + "] li").addClass("active");
  }
};

Template.main.events({
  'click .side-menu a': function(e) {
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
    return announcements.find();
}

Template.new_announcement.events({
    'click .cancel' : function(evt,tmpl){
        $('.new_announcement').hide();

    },

    'click .add_announcement': function(evt,tmpl){
          
          var msg=tmpl.find(".msg").value,
          msg=tmpl.find(".msg").value, visiblity=tmpl.find(".visibility").value;
          
          if(typeof visibility != 'undefined'){
              var q = announcements.insert({msg:msg,visibility:visibility,user_id: Meteor.userId()});
          }else
              var q = announcements.insert({msg:msg,user_id: Meteor.userId()});

          
//What does pepsi wild cherry taste like with crown royal?
          
          if(typeof q == 'undefined' || !q)
            alert('Problem with insertion');
          else
            // Mongo query insertions always return mongo_id of the record
            Session.set('last_insert',q);
          
         $('.new_announcement').hide();

    }
    

});


Template.dashboard.events({
    'click .show_profile' : function(){
        alert('show profile using userId');
        // do jquery stuff to show the chatrooms in tab format
        // from here go to settings template ....
    },
    
    'click .show_settings' : function(){
        
    
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
