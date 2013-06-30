Template.initialSurvey.hasProfile = function() {
  return profiles.find({ user_id: Meteor.userId() }).count() > 0;
};

Template.initialSurvey.profile = function() {
  return profiles.findOne({ user_id: Meteor.userId() });
};

Template.initialSurvey.events({
  'submit .profile': function(e) {
    Meteor.call("saveProfile", {
      name: $(".profile input[name=name]").val(),
      school: $(".profile input[name=school]").val(),
      company: $(".profile input[name=company]").val(),
      title: $(".profile input[name=title]").val(),
      bio: $(".profile input[name=bio]").val()
    });
    Session.set("render", "#dashboard");
    e.preventDefault();
  }
});

