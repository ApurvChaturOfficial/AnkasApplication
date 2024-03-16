// Imports
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const errorHandler = require('../../../../../love/cMiddleware/aError');

const baseRoute = require('../../../../../love/aMCR/bCommon/cRoute/aSetting/aBaseRoute');
const adminHeroRoute = require('../../../../../love/aMCR/bCommon/cRoute/aSetting/bAdminHeroRoute');
const menuRoute = require('../../../../../love/aMCR/bCommon/cRoute/bAdministration/cMenuRoute');
const roleRoute = require('../../../../../love/aMCR/bCommon/cRoute/bAdministration/bRoleRoute');
const userRoute = require('../../../../../love/aMCR/bCommon/cRoute/bAdministration/aUserRoute');
const heroRoute = require('../../../../../love/aMCR/aBeehiveCorporation/aAndromedaOrganisation/aAcruxEnterprise/zCommon/cRoute/cMain/aHeroRoute');
const counterRoute = require('../../../../../love/aMCR/aBeehiveCorporation/aAndromedaOrganisation/aAcruxEnterprise/zCommon/cRoute/cMain/bCounterRoute');
const programSectionRoute = require('../../../../../love/aMCR/aBeehiveCorporation/aAndromedaOrganisation/aAcruxEnterprise/zCommon/cRoute/cMain/cProgramSectionRoute');
const programRoute = require('../../../../../love/aMCR/aBeehiveCorporation/aAndromedaOrganisation/aAcruxEnterprise/zCommon/cRoute/cMain/dProgramRoute');
const staticDataRoute = require('../../../../../love/aMCR/bCommon/cRoute/dAsset/aStaticDataRoute');

const homePageRoute = require('../../../../../love/aMCR/aBeehiveCorporation/aAndromedaOrganisation/aAcruxEnterprise/zCommonCombined/cRoute/HomePageRoute');

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
    "https://arion-admin.netlify.app",
    "https://arion-frontend.netlify.app",
  ] : 
  [
    "http://localhost:5173",
    "http://localhost:5174",
  ], 
credentials: true }))

app.use("/api/v1/base", baseRoute)
app.use("/api/v1/admin-hero", adminHeroRoute)
app.use("/api/v1/menu", menuRoute)
app.use("/api/v1/role", roleRoute)
app.use("/api/v1/user", userRoute)
app.use("/api/v1/hero", heroRoute)
app.use("/api/v1/counter", counterRoute)
app.use("/api/v1/program-section", programSectionRoute)
app.use("/api/v1/program", programRoute)
app.use("/api/v1/static-data", staticDataRoute)

app.use("/api/v1/home-page", homePageRoute)

app.use(errorHandler)


module.exports = app
