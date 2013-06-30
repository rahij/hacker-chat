    Template.footer.rendered= function(){
    // hide all objects that are not to be shown when logged in
        // $('.chat').hide();
        $('.profile').hide();
        // check that user has a profile if not show inital survey
        
        // $('.initialSurvey').hide();
        
    };

    Template.initialSurvey.events({
        'click .submit_survey' : function (){
            alert('you are submitting your inital survey');
        }

    });

    Template.chat.events({
        'click .show_chatroom' : function(evt,tmpl){
            Session.set('room_id',this._id);
//            console.log(room_id);
            // do jquery stuff to show the chatrooms in tab format
        },
        'click .submit_chat' : function (evt, tmpl){
            // probably set a session variable that refers to the
            // appropriate chat room
            var room_id = Session.get('room_id'), user_id = Meteor.userId();
            if(room_id && user_id){
                msg = tmpl.find('.chat-new-message-content').value;
                if(msg){
                    console.log('inserting');
                    chat.insert({msg : msg, room_id:room_id,user_id :user_id});
                    }
            }
        }

    });

    Template.chat.getMessages = function(){
        var room_id = Session.get('room_id');
        
        if(room_id){
            var q =chat.find({room_id : room_id}).fetch();
            var z = [];
            console.log(q);
            for(var i = 0; i < q.length; i++){
                console.log(q[i]);
                z.push({email:email, msg:q[i].msg});
            }
            return z;
        }
    };

    Template.chat.showRooms = function(){
      return rooms.find({ $where: function() {
        return this.users.indexOf(Meteor.userId()) > -1;
      }});
    }


    Template.announcements.getMsg = function (){
        return announcements.find({});
    };

    Template.dashboard.events({
        'click .show_profile' : function(){
            alert('show profile using userId');
            // do jquery stuff to show the chatrooms in tab format
            // from here go to settings template ....
        },
        'click .show_settings' : function(){
            
        
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
