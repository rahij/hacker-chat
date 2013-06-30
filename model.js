profiles = new Meteor.Collection("profiles");

chat = new Meteor.Collection("chat");

rooms = new Meteor.Collection("rooms");

events = new Meteor.Collection("events");

teams = new Meteor.Collection("teams");

Questions = new Meteor.Collection("questions");
Answers = new Meteor.Collection("answers");

Meteor.methods({
  answer: function(params) {
    var question = Questions.findOne({ _id: params.question_id });
    question.answeredBy.push(Meteor.user()._id);

    Questions.update(params.question_id, {
      $set: {
        answeredBy: question.answeredBy } } );

    Answers.insert({
      question_id: params.question_id,
      user_id: Meteor.user()._id,
      answer: params.answer});
  }
});

// fixtures 

if (rooms.find().count() === 0) {
  rooms.insert({ title: "Room 1", location: "San Francisco" });
  rooms.insert({ title: "Room 2", location: "San Francisco" });
}
