import 'meteor/aldeed:collection2'
import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { Tracker } from 'meteor/tracker'
import { check } from 'meteor/check'
import SimpleSchema from 'simpl-schema'

export const TaskSchema = new SimpleSchema({
  title: {
    type: String,
    trim: false
  },

  complete: {
    type: Boolean
  },
  owner: {
    type: String
  }
}, {
  check,
  tracker: Tracker
})

export const Tasks = new Mongo.Collection('tasks')

Tasks.attachSchema(TaskSchema)

// export const TasksOffline = Tasks

// For SSR, we need to query the database directly.
// This has security implications since it bypasses the publication checks!
// export const TasksOffline = Meteor.isServer
//   ? Tasks
//   : new GroundDB.Ground.Collection('tasks-offline')


// if (Meteor.isClient) {
//   TasksOffline.observeSource(Tasks.find())
// }
