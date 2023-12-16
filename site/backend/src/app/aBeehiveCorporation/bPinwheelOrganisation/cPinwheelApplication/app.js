// Imports
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const errorHandler = require('../../../../love/cMiddleware/aError');

const baseRoute = require('../../../../love/aMCR/bCommon/cRoute/aSetting/aBaseRoute');
const menuRoute = require('../../../../love/aMCR/bCommon/cRoute/bAdministration/cMenuRoute');
const roleRoute = require('../../../../love/aMCR/bCommon/cRoute/bAdministration/bRoleRoute');
const userRoute = require('../../../../love/aMCR/bCommon/cRoute/bAdministration/aUserRoute');
const heroRoute = require('../../../../love/aMCR/bCommon/cRoute/cMain/aHeroRoute');
const counterRoute = require('../../../../love/aMCR/bCommon/cRoute/cMain/bCounterRoute');
const aboutRoute = require('../../../../love/aMCR/bCommon/cRoute/cMain/cAboutRoute');
const serviceRoute = require('../../../../love/aMCR/bCommon/cRoute/cMain/dServiceRoute');
const branchRoute = require('../../../../love/aMCR/bCommon/cRoute/cMain/eBranchRoute');
const subBranchRoute = require('../../../../love/aMCR/bCommon/cRoute/cMain/fSubBranchRoute');
const subSubBranchRoute = require('../../../../love/aMCR/bCommon/cRoute/cMain/gSubSubBranchRoute');
const projectSectionRoute = require('../../../../love/aMCR/bCommon/cRoute/cMain/hProjectSectionRoute');
const projectGroupRoute = require('../../../../love/aMCR/bCommon/cRoute/cMain/iProjectGroupRoute');
const projectRoute = require('../../../../love/aMCR/bCommon/cRoute/cMain/jProjectRoute');

const homePageRoute = require('../../../../love/aMCR/cCommonCombined/cRoute/HomePageRoute');

// App
const app = express()

// Use
app.use(express.json({
  limit: '50mb'
}))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())
app.use(cors({ origin:  
  process.env.ENVIRONMENT === "Production" ?
  [
    "https://pinwheel-admin.netlify.app",
    "https://pinwheel-frontend.netlify.app",
  ] : 
  [
    "http://localhost:5173",
    "http://localhost:5174",
  ], 
credentials: true }))

app.use("/api/v1/base", baseRoute)
app.use("/api/v1/menu", menuRoute)
app.use("/api/v1/role", roleRoute)
app.use("/api/v1/user", userRoute)
app.use("/api/v1/hero", heroRoute)
app.use("/api/v1/counter", counterRoute)
app.use("/api/v1/about", aboutRoute)
app.use("/api/v1/service", serviceRoute)
app.use("/api/v1/branch", branchRoute)
app.use("/api/v1/sub-branch", subBranchRoute)
app.use("/api/v1/sub-sub-branch", subSubBranchRoute)
app.use("/api/v1/project-section", projectSectionRoute)
app.use("/api/v1/project-group", projectGroupRoute)
app.use("/api/v1/project", projectRoute)

app.use("/api/v1/home-page", homePageRoute)

app.use(errorHandler)


module.exports = app
