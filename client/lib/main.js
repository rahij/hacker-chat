    Template.hello.greeting = function () {
        return "Welcome to cloaked-hipster.";
    };

    Template.hello.events({
        'click input' : function () {
        // template data, if any, is available in 'this'
        if (typeof console !== 'undefined')
        console.log("You pressed the button");
        }
    });

    Template.intial_survey.events({
        'click .submit_survey' : function (){
            alert('you are submitting your inital survey');
        }

    });

    Template.chat.events({
        'click .submit_chat' : function (){
            // probably set a session variable that refers to the
            // appropriate chat room
            alert('you are writing to chat database ');
        }

    });

    Template.chat.showRooms = function(){
    // example json response (mongo) for available chat rooms
        return [
            { _id : 'asv-sasz', title: 'Chat room 1', location: 'San Francisco'},
            { _id : 'asdx-sasz', title: 'Chat room 2', location: 'San Francisco'}
            ];
            
    
    }

    Template.dashboard.events({
        'click .show_chatrooms' : function(){
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

