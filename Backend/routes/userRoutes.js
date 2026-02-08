import express from "express";
import {acceptConntectionrequest, discoverUsers,followUsers, getUserConntections, getUserData, getUserProfiles, sendConnectionRequest, unfollowUsers, updateUserData} from "../controllers/userController.js";
import {protect} from "../middleware/authMiddleware.js";
import {upload} from "../config/multer.js";
import { getUserRecentMessage } from "../controllers/messageController.js";

const userRouter = express.Router();

userRouter.get("/data",protect,getUserData);
userRouter.post("/update",protect,upload.fields([{ name: "profile", maxCount: 1 },{ name: "cover", maxCount: 1 }]),updateUserData);
userRouter.post("/discover",protect ,discoverUsers);
userRouter.post("/follow",protect ,followUsers);
userRouter.post("/unfollow",protect , unfollowUsers);
userRouter.post('/connect', protect, sendConnectionRequest);
userRouter.post('/accept', protect, acceptConntectionrequest);
userRouter.get('/connections', protect, getUserConntections);
userRouter.post('/profiles', getUserProfiles);
userRouter.get('/recent-messages', getUserRecentMessage);


export default userRouter;