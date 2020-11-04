/* global Meteor */
import { check } from 'meteor/check'
import { Tasks } from '/imports/api/collections/tasks'

// get all tasks
if (Meteor.isServer) {
  // Meteor.publish('tasks', function tasksPublication() {
  //   return Tasks.find();
  // });

  Meteor.publish('tasks', function tasksPublication() {
    return Tasks.find({ "owner": { "$eq": this.userId } });
  });

}

// methods
Meteor.methods({
  'tasks.insert'(title) {
    console.log('method - insert?');
    check(title, String);

    // Make sure the user is logged in before inserting a task
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }


    Tasks.insert({
      title,
      owner: this.userId,
      complete: false
    });
  },
  'tasks.toggleComplete'(taskId, complete) {
    console.log('toggle complete?');
    check(taskId, String);
    check(complete, Boolean);

    const task = Tasks.findOne(taskId);
    if (task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Tasks.update(taskId, { $set: { complete: complete } });
  },

  'tasks.remove'(taskId) {
    console.log('remove!');
    check(taskId, String);

    const task = Tasks.findOne(taskId);
    if (task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Tasks.remove(taskId);
  },

});
