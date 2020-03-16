// External dependencies
const express = require('express');
const router = express.Router();

// Add your routes here - above the module.exports line

// Passing data example
router.get('/examples/passing-data', function (req, res) {
  res.render('examples/passing-data/index')
});

// Branching example
router.post('/examples/branching/answer', function (req, res) {
  let nhsNumber = req.body.nhsNumber;

  if (nhsNumber === 'Yes') {
    res.redirect('/examples/branching/answer-yes')
  } else {
    res.redirect('/examples/branching/answer-no')
  }
});


// Route the user to the correct data entry page depending on whether they select 'phone' or 'email'
router.post('/account/v7/other/other-add-next', function (req, res) {
  var patientEmail = req.session.data['patient-email']
  var patientMobile = req.session.data['patient-mobile']
  if (patientEmail == "" && patientMobile == ""){
    res.redirect('/account/v7/other/other-type')
  }
  else {
    res.redirect('/account/v7/index')
  }
})

router.post('/account/v9/more/more-add-3', function (req, res) {
  var patientEmail = req.session.data['patient-email']
  var patientMobile = req.session.data['patient-mobile']
  if (patientEmail == "" && patientMobile == ""){
    res.redirect('/account/v9/more/more-type')
  }
  else {
    res.redirect('/account/v9/index')
  }
})

router.post('/account/v9/more/more-type-', function (req, res) {
  var type = req.session.data['more-type']
  if (type == "address"){
    res.redirect('/account/v9/address/address-add')
  }
  else if (type == "phone"){
    res.redirect('/account/v9/phone/phone-add')
  }
  else if (type == "email"){
    res.redirect('/account/v9/email/email-add')
  }
  else {
  }
})

router.post('/account/v9/phone/patient-change-login-mobile', function (req, res) {
  var choice = req.session.data['patient-change-login-mobile']
  if (choice == "yes"){
    res.redirect('/account/v9/manage-login?patient-mobile=')
  }
  else if (choice == "no"){
    res.redirect('/account/v9/index?patient-mobile=')
  }
})

router.post('/account/v9/email/patient-change-login-email', function (req, res) {
  var choice = req.session.data['patient-change-login-email']
  if (choice == "yes"){
    res.redirect('/account/v9/manage-login?patient-email=')
  }
  else if (choice == "no"){
    res.redirect('/account/v9/index?patient-email=')
  }
})



// The patient is choosing whether their login email/phone should be added to their contact details or not (email-change-done.html and phone-change-done.html)
router.post('/account/*/login/email-add-to-contact', function (req, res) {
  var choice = req.session.data['email-add-to-contact']
  if (choice == "yes"){
    res.redirect('email-change-done-done')
  }
  else if (choice == "no"){
    res.redirect('../manage-login')
  }
})

router.post('/account/*/login/phone-add-to-contact', function (req, res) {
  var choice = req.session.data['phone-add-to-contact']
  if (choice == "yes"){
    res.redirect('phone-change-done-done')
  }
  else if (choice == "no"){
    res.redirect('../manage-login')
  }
})




// The patient is choosing whether they want to review their contact details or not (prompt-1.html)
router.post('/account/*/prompt-', function (req, res) {
  var choice = req.session.data['prompt-review']
  if (choice == "yes"){
    res.redirect('../index?patient-mobile-unverified=07788995544')
  }
  else if (choice == "no"){
    res.redirect('../app')
  }
})



// The patient is choosing whether to add their email or phone to their contact details, or enter one.
router.post('/account/*/prompt-2-email-', function (req, res) {
  var choice = req.session.data['prompt-email']
  if (choice == "yes"){
    res.redirect('prompt-2-phone')
  }
  else if (choice == "no"){
    res.redirect('prompt-2-email-enter')
  }
})

router.post('/account/*/prompt-2-phone-', function (req, res) {
  var choice = req.session.data['prompt-phone']
  if (choice == "yes"){
    res.redirect('prompt-2-complete')
  }
  else if (choice == "no"){
    res.redirect('prompt-2-phone-enter')
  }
})



// The patient is choosing whether they want to add their new login email/phone to their contact details (more-add.html and more-add-2.html)
router.post('/account/*/email/add-login-email', function (req, res) {
  var patientEmail = req.session.data['patient-email']
  if (patientEmail == ""){
    res.redirect('../email/email-add?has-added-login-email=y')
  }
  else {
    res.redirect('../email/email-add-done?has-added-login-email=y')
  }
})

router.post('/account/*/phone/add-login-mobile', function (req, res) {
  var patientMobile = req.session.data['patient-mobile']
  if (patientMobile == ""){
    res.redirect('../phone/phone-add?has-added-login-phone=y')
  }
  else {
    res.redirect('../phone/phone-add-done?has-added-login-phone=y')
  }
})


// Clear all session data
router.get('/clear', (req, res) => {
	req.session.data = {}
	res.redirect('/account/v11/scenarios')
})

module.exports = router;

// Change email routing
router.get('/account/v2', function (req, res) {
  res.render('account/v2/index')
});


// Dev Mode

function devModeRoute(req, res, next) {
  if (!req.session.data['devMode']) {
    console.log('no data found');
    var devMode = req.query.devMode;
    if (devMode === 'true') {
      console.log('devmode detected');
      req.session.data['devMode'] = 'true'
      console.log('local storage updated');
    } else {
      console.log('devmode not detected');
    }
  } else {
    console.log('data found and set to ' + req.session.data['devMode'])
  }
  next()
}

router.get("/*", devModeRoute);
router.get("/", devModeRoute);