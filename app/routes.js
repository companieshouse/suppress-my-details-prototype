const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

router.get('/', function (req, res) {
  req.session.destroy()
  res.render('index', {
  })
})

// Branching
router.post('/service/applicant-acting-answer', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  const applicantacting = req.session.data['applicant-acting']

  if (applicantacting === 'false') {
    res.redirect('contact-address')
  } else {
    res.redirect('replacement-address')
  }
})

// Applicant-details

router.post('/service/applicant-details', function (req, res) {
  var errors = []
  var nameHasError = false
  var changednameHasError = false
  var dobHasError = false

  if (req.session.data['full-name'] === '') {
    nameHasError = true
    errors.push({
      text: 'Enter full name',
      href: '#full-name'
    })
  }

  if (typeof req.session.data['changed-name'] === 'undefined') {
    changednameHasError = true
    errors.push({
      text: 'Enter changed name',
      href: '#changed-name'
    })
  }

  if (req.session.data['dob-year'] === '') {
    dobHasError = true
    errors.push({
      text: 'Date of birth must include a year',
      href: '#year'
    })
  }

  if (nameHasError || changednameHasError || dobHasError) {
    res.render('service/applicant-details', {
      errorName: nameHasError,
      errorPreviousname: changednameHasError,
      errorDob: dobHasError,
      errorList: errors
    })
  } else {
    res.redirect('document-details')
  }
})

// Document-details

router.post('/service/document-details', function (req, res) {
  var errors = []
  var descriptionHasError = false

  if (typeof req.session.data['document'] === 'undefined') {
    descriptionHasError = true
    errors.push({
      text: 'Select a description',
      href: '#document'
    })
  }

  if (descriptionHasError) {
    res.render('service/document-details', {
      errorDocument: descriptionHasError,
      errorList: errors
    })
  } else {
    res.redirect('/service/home-address')
  }
})

module.exports = router
