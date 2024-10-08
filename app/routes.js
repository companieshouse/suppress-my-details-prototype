//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here


router.get('/', function (req, res) {
  req.session.destroy()
  res.render('index', {
  })
})

// company-number
router.post('/service/company-details', function (req, res) {
  var errors = []
  var numberHasError = false

  if (req.session.data['company-number'] === '') {
    numberHasError = true
    errors.push({
      text: 'Enter a company number',
      href: '#company-number'
    })
  }

  if (numberHasError) {
    res.render('service/company-details', {
      errorNumber: numberHasError,
      errorList: errors
    })
  } else {
    res.redirect('/service/confirm-company-details')
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
      text: "Enter the applicant's full name",
      href: '#full-name'
    })
  }

  if (typeof req.session.data['changed-name'] === 'undefined') {
    changednameHasError = true
    errors.push({
      text: "Select yes if the applicant's name has changed",
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
      text: 'Select a document filing type and description',
      href: '#document-conditional'
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

// home-address-details

router.post('/service/home-address', function (req, res) {
  var errors = []
  var postcodeHasError = false

  if (req.session.data['postcode'] === '') {
    postcodeHasError = true
    errors.push({
      text: 'Enter a postcode',
      href: '#postcode'
    })
  }

  if (postcodeHasError) {
    res.render('service/home-address', {
      errorPostcode: postcodeHasError,
      errorList: errors
    })
  } else {
    res.redirect('/service/confirm-home-address')
  }
})

// current-officer-details

router.post('/service/applicant-acting', function (req, res) {
  var errors = []
  var currentofficerHasError = false

  if (typeof req.session.data['current-officer'] === 'undefined') {
    currentofficerHasError = true
    errors.push({
      text: 'Select yes if the applicant is a current officer',
      href: '#current-officer'
    })
  }

  if (currentofficerHasError) {
    res.render('service/applicant-acting', {
      errorCurrentofficer: currentofficerHasError,
      errorList: errors
    })
    // Branching based on answer
  } else {
    if (req.session.data['current-officer'] === 'no') {
      res.redirect('check-your-answers')
    }
    res.redirect('replacement-address')
  }
})

// replacement-address-details

router.post('/service/replacement-address', function (req, res) {
  var errors = []
  var postcodeHasError = false

  if (req.session.data['uk-postcode'] === '') {
    postcodeHasError = true
    errors.push({
      text: 'Enter a postcode',
      href: '#uk-postcode'
    })
  }

  if (postcodeHasError) {
    res.render('service/replacement-address', {
      errorPostcode: postcodeHasError,
      errorList: errors
    })
  } else {
    res.redirect('/service/confirm-replacement-address')
  }
})

