Template.initialSurvey.rendered = function() {

}

Template.initialSurvey.events({
  'submit .profile': function(e) {
    Meteor.call("saveProfile", {
      name: $(".profile input[name=name]").val(),
      school: $(".profile input[name=school]").val(),
      company: $(".profile input[name=company]").val(),
      title: $(".profile input[name=title]").val(),
      bio: $(".profile input[name=bio]").val()
    });
    $("form.profile").foundation("reveal", "close");
    e.preventDefault();
  }
});

