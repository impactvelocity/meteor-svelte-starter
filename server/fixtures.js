/* global Meteor */
import { Pages } from '/imports/api/collections/pages'

Meteor.startup(() => {
  if (Pages.find({ slug: 'about-us' }).count() <= 0) {
    Pages.insert({
      title: 'About Us',
      slug: 'about-us',
      content: 'Wut.'
    })
  }
})
