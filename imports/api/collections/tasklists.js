import 'meteor/aldeed:collection2'
import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { Tracker } from 'meteor/tracker'
import { check } from 'meteor/check'
import SimpleSchema from 'simpl-schema'

export const TaskListSchema = new SimpleSchema({
  title: {
    type: String,
    trim: false
  },

  list: {
    type: Array
  },
  'list.$': Object,
  'list.$.id': String,
  'list.$.title': String,
  'list.$.complete': Boolean,
}, {
  check,
  tracker: Tracker
})

export const TaskLists = new Mongo.Collection('tasklists')

TaskLists.attachSchema(TaskListSchema)
