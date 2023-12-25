const cloudinary = require("cloudinary")
const catchAsyncError = require("../../../../../../../../../bFunction/aCatchAsyncError")
const ErrorHandler = require("../../../../../../../../../bFunction/bErrorHandler")
const handleImage = require("../../../../../../../../../bFunction/hHandleImage")
const SearchFilterPaginate = require("../../../../../../../../../bFunction/fSearchFilterPaginate")
const HeroModel = require("../../../aModel/cMain/aHeroModel")
const AboutModel = require("../../../aModel/cMain/bAboutModel")
const ExperienceModel = require("../../../aModel/cMain/cExperienceModel")
const ServiceModel = require("../../../aModel/cMain/dServiceModel")
const PortfolioModel = require("../../../aModel/cMain/ePortfolioModel")
const EventModel = require("../../../aModel/cMain/gEventModel")
const BlogModel = require("../../../aModel/cMain/iBlogModel")
const PortfolioCardModel = require("../../../aModel/cMain/fPortfolioCardModel")
const EventCardModel = require("../../../aModel/cMain/hEventCardModel")
const BlogCardModel = require("../../../aModel/cMain/jBlogCardModel")


exports.homePageController = (Label= 'Home Page') => {
	return {
		// Retrieve Controller
		retrieve: catchAsyncError(async (request, response, next) => {
      let hero_retrieve = await HeroModel.findOne().sort({ _id: -1 });
      let about_retrieve = await AboutModel.findOne().sort({ _id: -1 });
      let experience_retrieve = await ExperienceModel.findOne().sort({ _id: -1 });
      let service_retrieve = await ServiceModel.findOne().sort({ _id: -1 });
      let portfolio_retrieve = await PortfolioModel.findOne().sort({ _id: -1 }).populate({
        path: 'cPortfolioCards',
        model: PortfolioCardModel,
      });
      let event_retrieve = await EventModel.findOne().sort({ _id: -1 }).populate({
        path: 'cEventCards',
        model: EventCardModel,
      });
      let blog_retrieve = await BlogModel.findOne().sort({ _id: -1 }).populate({
        path: 'cBlogCards',
        model: BlogCardModel,
      });

      // Not Found
      // if (!home_retrieve) next(new ErrorHandler(`Home Not Found`, 404))
  
      // Response
      response.status(200).json({
        success: true,
        message: `${Label} Reterived Successfully`,
        retrieve: {
          hero_retrieve,
          about_retrieve,
          experience_retrieve,
          service_retrieve,
          portfolio_retrieve,
          event_retrieve,
          blog_retrieve
        }
      })
    }),
	}
}
