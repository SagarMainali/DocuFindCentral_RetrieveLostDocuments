const router = require('express').Router();
const upload = require('../middlewares/multerMiddleware');

const ticketCreationAndMatching = require('../controllers/ticketCreationAndMatching');
const getUnsolvedTickets = require('../controllers/getUnsolvedTickets');
const getSolvedTickets = require('../controllers/getSolvedTickets');
const feedbackSubmission = require('../controllers/feedbackSubmission');

// route to receive formdata and perform necessary operation on that data to search and match tickets
router.post('/post/tickets/', upload.single('imageFile'), ticketCreationAndMatching);

// route to get all the unsolved_tickets from the database
router.get('/get/unsolved_tickets/', getUnsolvedTickets);

// route to get all the solved_tickets from the database
router.get('/get/solved_tickets/', getSolvedTickets);

// route for posting feedbacks
router.post('/post/feedbacks/', feedbackSubmission);

module.exports = router;