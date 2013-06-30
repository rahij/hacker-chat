profiles = new Meteor.Collection("profiles");

chat = new Meteor.Collection("chat");

rooms = new Meteor.Collection("rooms");

events = new Meteor.Collection("events");

teams = new Meteor.Collection("teams");

announcements = new Meteor.Collection("announcements");

Questions = new Meteor.Collection("questions");
Answers = new Meteor.Collection("answers");

Meteor.methods({
  ask: function(params) {
    var room_id = rooms.insert({
      title: params.text,
      createdBy: Meteor.user()._id,
      users: []
    });

    Questions.insert({
      text: params.text,
      askedBy: Meteor.user()._id,
      answeredBy: [],
      room_id: room_id
    });
  },

  answer: function(params) {
    var question = Questions.findOne({ _id: params.question_id });
    question.answeredBy.push(Meteor.user()._id);

    Questions.update(params.question_id, {
      $set: {
        answeredBy: question.answeredBy 
      }
    });

    Answers.insert({
      question_id: params.question_id,
      user_id: Meteor.user()._id,
      answer: params.answer
    });

    if (params.answer) {
      room = rooms.findOne({ _id: question.room_id });
      room.users.push(Meteor.user()._id);

      rooms.update(room._id, {
        $set: {
          users: room.users
        }
      });
    }
  },

  saveProfile: function(params) {
    return profiles.insert({
      user_id: Meteor.user()._id,
      name: params.name,
      school: params.school,
      company: params.company,
      title: params.title,
      bio: params.bio,
      keywords: [ params.name, params.school, params.company, params.title, params.bio ]
    });
  }
});

// fixtures 

if (rooms.find().count() === 0) {
  rooms.insert({ title: "Room 1", location: "San Francisco", users: [] });
  rooms.insert({ title: "Room 2", location: "San Francisco", users: [] });
}
