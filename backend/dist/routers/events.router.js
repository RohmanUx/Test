"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRouter = void 0;
const events_controller_1 = require("../controllers/events.controller");
const uploader_1 = require("../middleware/uploader");
const verifyToken_1 = require("../middleware/verifyToken");
const express_1 = require("express");
class EventRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.eventController = new events_controller_1.EventController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        //Used bind to ensure that "this" inside getEvent, addEvent, and updateEvent points to the EventController instance.
        //When you pass a method as a callback, "this" value may get lost.
        //Using .bind(this.eventController) ensures that the method retains the correct this context when it's called by Express.
        // this.router.get(
        //   '/user-event', 
        //   verifyToken,
        //   this.eventController.getUserEvent.bind(this.eventController), 
        // );
        this.router.get('/events-users/', verifyToken_1.verifyToken, this.eventController.getEventByAdmin);
        this.router.get('/events-all/:eventId', this.eventController.getAllEvents);
        this.router.get('/events-id/:eventId', this.eventController.getEvent);
        this.router.post('/events-post', verifyToken_1.verifyToken, (0, uploader_1.uploader)('/product', 'EVE').array('eve', 3), this.eventController.addEvent.bind(this.eventController));
        this.router.patch('/events-update/:eventId', verifyToken_1.verifyToken, (0, uploader_1.uploader)('/product', 'EVE').array('eve', 3), this.eventController.updateEvent.bind(this.eventController));
        this.router.delete('/events-delete/:eventId', verifyToken_1.verifyToken, this.eventController.deleteEvent);
    }
    getRouter() {
        return this.router;
    }
}
exports.EventRouter = EventRouter;
