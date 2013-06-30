    Template.footer.rendered= function(){
    // hide all objects that are not to be shown when logged in
        // $('.chat').hide();
        $('.profile').hide();
        // check that user has a profile if not show inital survey
        $('.inital_survey').hide();
        
    };

    Template.modals.events({
        'click .submit_survey' : function (){
            alert('you are submitting your inital survey');
        }

    });

    Template.chat.events({
        'click .submit_chat' : function (evt, tmpl){
            // probably set a session variable that refers to the
            // appropriate chat room
            alert('you are writing to chat database ');
            var room_id = Session.get('room_id'), user_id = Meteor.userId();
                
            if(room_id && user_id){
                msg = tmpl.find('.chat-new-message-content').value;
                if(msg){
                    console.log('inserting');
                    chat.insert({msg : msg, room_id:room_id,user_id :user_id});
                    }
                
            }
            
//            console.log(tmpl.find(".chat-new-message-content").value);
        }

    });

    Template.chat.getMessages = function(){
        var room_id = Session.get('room_id');
        if(room_id){
            return chat.find({room_id : room_id});
        }
    };

    Template.dashboard.showRooms = function(){
    // example json response (mongo) for available chat rooms
        return [
            { _id : 'asv-sasz', title: 'Chat room 1', location: 'San Francisco'},
            { _id : 'asdx-sasz', title: 'Chat room 2', location: 'San Francisco'}
            ];
    }

    Template.dashboard.events({
        'click .show_chatroom' : function(evt,tmpl){
            console.log(tmpl.data);
            var room_id = tmpl.find('.show_chatroom').id;
            console.log(room_id);
            alert('setting session to ' + room_id);
            Session.set('room_id',room_id);
            console.log(room_id);
            // do jquery stuff to show the chatrooms in tab format
            alert('show chat rooms based on all available chat rooms');
        },
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
