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
  var str = req.session.data['full-name']
  if (str === '') {
    errors.push({
      text: 'Enter full name',
      href: '#full-name'
    })
    res.render('service/applicant-details', {
      errorName: true,
      errorList: errors
    })
  } else {
    res.redirect('document-details')
  }
})

module.exports = router
