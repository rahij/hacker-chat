Template.newRoom.events({
  'submit form': function(e) {
    rooms.insert({
      title: $(".new-room input[name=title]").val(),
      createdBy: Meteor.userId(),
      users: [Meteor.userId()]
    });

    e.preventDefault();
  }
});
