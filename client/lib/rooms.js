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

Template.addUsers.searchResults = function() {
  return profiles.find({
    keywords: $("input[name=search]").val()
  });
};

Template.addUsers.events({
  'click a[data-user-id]': function(e) {
    var room = rooms.findOne(Session.get("room_id"));
    var user_id = $(e.srcElement).data("user-id");
    if(room.users.indexOf(user_id) < 0) {
      room.users.push(user_id);
      rooms.update(room._id, { $set: { users: room.users } });
    }
  },

});

