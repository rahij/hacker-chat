Template.questions.unansweredQuestions = function() {
  return Questions.find({ $where: function() {
    return this.answeredBy.indexOf(Meteor.userId()) < 0;
  }});
};

Template.questions.answers = function() {
  return Answers.find({ user_id: Meteor.userId() });
};

Template.questions.events({
  'submit .new-question': function(e) {
    Meteor.call("ask", { text: $("input[name=text]").val() }, function(error, id) {
    });
    e.preventDefault();
  }
});

Template.question.answer = function() {
  var answer = Answers.findOne({
    question_id: this._id,
    user_id: Meteor.user()._id });
  if (answer !== undefined) {
    return answer
  } else {
    return { answer: undefined }
  }
};

Template.question.events({
  'click .answer': function(e) {
    var answer = $(e.toElement).data("answer");
    Meteor.call("answer", { question_id: this._id, answer: answer }, function(error, id) {
    });
  }
});

Template.answer.text = function() {
  return Questions.findOne({ _id: this.question_id }).text;
};

Template.answer.secondaryOrSuccess = function() {
  if (this.answer) {
    return "success";
  } else {
    return "secondary";
  }
};

Template.answer.secondaryOrAlert = function() {
  if (this.answer) {
    return "secondary";
  } else {
    return "alert";
  }
};

