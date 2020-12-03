const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

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

module.exports = router
