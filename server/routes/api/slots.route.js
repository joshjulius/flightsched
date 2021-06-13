import express from "express";
const router = express.Router();

import Slot from "../../models/Slot.model.js";

// @route GET api/slots
// @desc Get all slots
// @access public
router.get("/", (req, res) => {
  Slot.find({})
    .sort({ date: -1 })
    .then((slots) => res.json(slots));
});

// @route GET api/slots/:startDate
// @desc Get a slot by start date
// @access public
router.get("/:startDate", (req, res) => {
  Slot.find({ startDate: req.params.startDate })
    .exec()
    .then((slot) => res.json(slot))
    .catch((err) => res.status(404).json({ success: false }));
});

// @route GET api/slots/:id
// @desc Get a slot by id
// @access public
// router.get('/:id', (req, res) => {
//     Slot.findById(req.params.id)
//         .then(slot => res.json(slot))
//         .catch(err => res.status(404).json({ success: false }));;
// });

// @route POST api/slots
// @desc Post a slot
// @access public
router.post("/", (req, res) => {
  // console.log(new Date(`${req.body.startTime} UTC`).toString().slice(4,15).replace(' ','_'));
  const newSlot = new Slot({
    location: req.body.location,
    activityType: req.body.activityType,
    startTime: new Date(`${req.body.startTime} UTC`),
    startDate: new Date(`${req.body.startTime} UTC`).toString().slice(4,15).replace(/ /g,'_'),
    endTime: new Date(`${req.body.endTime} UTC`),
    endDate: new Date(`${req.body.endTime} UTC`).toString().slice(4,15).replace(/ /g,'_'),
    customer: req.body.customer,
    displayName: req.body.displayName,
    aircraft: req.body.aircraft.slice(0, 6),
    type: req.body.aircraft.slice(7, req.body.aircraft.length),
    instructor: req.body.instructor,
    flightType: req.body.flightType,
    flightRoute: req.body.flightRoute,
    comments: req.body.comments,
    internalComments: req.body.internalComments,
  });

  newSlot.save().then(res.redirect('/')).catch(err => console.log(err));
});

// @route DELETE api/slots/:id
// @desc Delete a slot
// @access public
router.delete("/:id", (req, res) => {
  Slot.findById(req.params.id)
    .then((slot) => slot.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

export default router;
