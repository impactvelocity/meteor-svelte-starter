/* global Meteor */
import { check } from 'meteor/check'
import { TaskLists } from '/imports/api/collections/tasklists'

// get all tasks
Meteor.publish('tasklists', function tasksPublication() {
  return TaskLists.find();
});

// methods
Meteor.methods({
  'tasklists.insert'(title) {

    console.log('create a new list');
    check(title, String);

    TaskLists.insert({
      title,
      list: [{ id: 'x2as', title: 'First Created', complete: false }]
    });
  },
  'tasklists.addTask'(taskId, newList) {
    check(taskId, String);
    check(newList, Object);

    console.log(taskId);
    console.log(newList);

    TaskLists.update({ _id: taskId }, { $addToSet: { list: newList } });

  },


});

TaskLists.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  },
})
