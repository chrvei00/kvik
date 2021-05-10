const express = require("express");
const router = express.Router();
const feedbackForm = require("../models/feedbackSchema");

//Routes
router.get("/", (req, res) => {
  res.render("./dashboard/index.ejs");
});

router.get("/admin", (req, res) => {
  res.render("./dashboard/adminDash.ejs");
});

router.get("/feedback", async (req, res) => {
  try {
    const forms = await feedbackForm.find();
    let q1Bra = 0;
    let q1Nøytral = 0;
    let q1Dårlig = 0;
    let q2Ja = 0;
    let q2Usikker = 0;
    let q2Nei = 0;
    let total = 0;
    forms.forEach((form) => {
      total += 1;
      let q1 = form.q1Radio;
      let q2 = form.q2Radio;
      if (q1 == "Bra") {
        q1Bra += 1;
      } else if (q1 == "Nøytral") {
        q1Nøytral += 1;
      } else {
        q1Dårlig += 1;
      }
      if (q2 == "Ja") {
        q2Ja += 1;
      } else if (q2 == "Usikker") {
        q2Usikker += 1;
      } else {
        q2Nei += 1;
      }
    });

    res.status(200).render("./dashboard/feedbackDash.ejs", {
      feedbackForms: forms.reverse(),
      q1Bra: q1Bra,
      q1Nøytral: q1Nøytral,
      q1Dårlig: q1Dårlig,
      q2Ja: q2Ja,
      q2Usikker: q2Usikker,
      q2Nei: q2Nei,
      total: total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/reklamasjon", (req, res) => {
  res.render("./dashboard/reklamasjonDash.ejs");
});

router.get("/user", (req, res) => {
  res.render("./dashboard/usersDash.ejs");
});

module.exports = router;
