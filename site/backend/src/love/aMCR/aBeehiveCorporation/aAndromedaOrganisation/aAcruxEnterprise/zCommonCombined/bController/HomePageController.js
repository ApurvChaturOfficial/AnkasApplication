const cloudinary = require("cloudinary")
const catchAsyncError = require("../../../../../../bFunction/aCatchAsyncError")
const ErrorHandler = require("../../../../../../bFunction/bErrorHandler")
const handleImage = require("../../../../../../bFunction/hHandleImage")
const SearchFilterPaginate = require("../../../../../../bFunction/fSearchFilterPaginate")
const HeroModel = require("../../zCommon/aModel/cMain/aHeroModel")
const CounterModel = require("../../zCommon/aModel/cMain/bCounterModel")


exports.homePageController = (Label= 'Home Page') => {
	return {
		// Retrieve Controller
		retrieve: catchAsyncError(async (request, response, next) => {
      let hero_retrieve = {
        admin: await HeroModel.findOne({ dType: "Admin" }).sort({ _id: -1 }),
        frontend: await HeroModel.findOne({ dType: "Frontend" }).sort({ _id: -1 }),
      };
      let counter_list = await CounterModel.find().sort({ _id: -1 }).limit(3);

      // Not Found
      // if (!home_retrieve) next(new ErrorHandler(`Home Not Found`, 404))
  
      // Response
      response.status(200).json({
        success: true,
        message: `${Label} Reterived Successfully`,
        retrieve: {
          hero_retrieve,
          counter_list,
        }
      })
    }),
	}
}
