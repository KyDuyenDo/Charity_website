const router = require("express").Router();
const passport = require("passport");
const Fundraiser = require("../models/fundraiser.model");

const {
  addUser,
  signin,
  logout,
  protected,
  refreshToken,
  getUser,
  updateInfo,
  getAllMember,
  getMemberDetail,
  becomeFundraiser,
  upLoadImageFundraiser,
} = require("../controllers/user.controller");

const { sendVerificationEmail } = require("../middleware/users/verifyEmail");

const requireAuth = passport.authenticate("jwt", { session: false }, null);
const requireAdminAuth = require("../middleware/adminAuth");
const requireFundraiserAuth = require("../middleware/fundraiserAuth");
const decodeToken = require("../middleware/decodeToken");

router.get("/:id", getUser);

router.post("/signup", addUser, sendVerificationEmail);
router.post("/refresh-token", refreshToken);
router.post("/signin", signin);

router.post("/logout", logout);
router.post("/protected", requireAuth, decodeToken, protected);
router.get(
  "/protected/isFundraiserAuth",
  requireAuth,
  requireFundraiserAuth,
  async (req, res) => {
    try {
      const userId = req.userId;
      if (userId !== null) {
        return res.json({ success: true, message: "you are fundraiser." });
      }
      res.json({ success: false, message: "you are not fundraiser." });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
);
router.put("/:id", requireAuth, decodeToken, updateInfo);

router.post("/become/fundraiser", requireAuth, decodeToken, becomeFundraiser);
router.put("/fund/image", requireAuth, decodeToken, upLoadImageFundraiser);
router.get("/fundraiser", getAllMember);
router.get("/fundraiser/:id", getMemberDetail);
router.get("/fundraiser/get/name", async (req, res) => {
  const { userId } = req.body;
  const fund = Fundraiser.findOne({ userId: userId });
  if (!fund) {
    return res.status(404).json({ message: "Not Fund" });
  }
  res.status(200).json(fund.groupName);
});

module.exports = router;
