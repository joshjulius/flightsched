import express from 'express';
const router = express.Router();

import Slot from '../../models/Slot.model.js';

// @route GET api/slots
// @desc Get all slots
// @access public
router.get('/', (req, res) => {
    Slot.find({})
        .sort({ date: -1 })
        .then(slots => res.json(slots));
});

// @route GET api/slots/:id
// @desc Get a slot by id
// @access public
router.get('/:id', (req, res) => {
    Slot.findById(req.params.id)
        .then(slot => res.json(slot))
        .catch(err => res.status(404).json({ success: false }));;
});

// @route GET api/slots/:customer
// @desc Get a slot by customer
// @access public
// router.get('/:customer', (req, res) => {
//     Slot.find({ customer: req.params.customer }).exec()
//         .then(slot => res.json(slot))
//         .catch(err => res.status(404).json({ success: false }));;
// });

// @route POST api/slots
// @desc Post a slot
// @access public
router.post('/', (req, res) => {
    const newSlot = new Slot({
        location: req.body.location,
        activityType: req.body.activityType,
        startTime: new Date(req.body.startTime),
        endTime: new Date(req.body.endTime),
        customer: req.body.customer,
        displayName: req.body.displayName,
        aircraft: req.body.aircraft,
        instructor: req.body.instructor,
        flightType: req.body.flightType,
        flightRoute: req.body.flightRoute,
        comments: req.body.comments,
        internalComments: req.body.internalComments,
    });

    newSlot.save().then(slot => res.json(slot));
});

// @route DELETE api/slots/:id
// @desc Delete a slot
// @access public
router.delete('/:id', (req, res) => {
    Slot.findById(req.params.id)
        .then(slot => slot.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

export default router;