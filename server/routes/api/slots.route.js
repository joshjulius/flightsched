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
router.post("/", async (req, res) => {

  // finds all bookings with the desired registration, customer or instructor
  const slot = await Slot.find(
    { $or : [
      { aircraft: req.body.aircraft.slice(0, 6) },
      { instructor: req.body.instructor },
      { customer: req.body.customer }
    ]}
  );

  // check against slot whether if times conflict
  let isBookable = '';
  if (slot.length === 0) {
    isBookable = true;
  } else {
    for (let i = 0; i < slot.length ; i++) {
      const existingStartMs = slot[i].startMilisecond;
      const existingEndMs = slot[i].endMilisecond;
      const newStartMs = new Date(`${req.body.startDate}`).getTime();
      const newEndMs = new Date(`${req.body.endDate}`).getTime();
  
      if ((newStartMs >= existingEndMs) || (newEndMs <= existingStartMs)) {
        isBookable = true;
      } else {
        isBookable = false;
        break;
      }
    }
  }

  if (isBookable) {
    const newSlot = new Slot({
      location: req.body.location,
      activityType: req.body.activityType,
      startTime: new Date(`${req.body.startDate}`).toString(),
      startDate: new Date(`${req.body.startDate}`).toString().slice(4,15).replace(/ /g,'_'),
      startMilisecond: new Date(`${req.body.startDate}`).getTime(),
      endTime: new Date(`${req.body.endDate}`).toString(),
      endDate: new Date(`${req.body.endDate}`).toString().slice(4,15).replace(/ /g,'_'),
      endMilisecond: new Date(`${req.body.endDate}`).getTime(),
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
  
    newSlot.save().then().catch(err => console.log(err));
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
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
