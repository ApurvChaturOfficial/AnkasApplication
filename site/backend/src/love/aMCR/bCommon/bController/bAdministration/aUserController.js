const crypto = require("crypto");
const catchAsyncError = require("../../../../bFunction/aCatchAsyncError")
const ErrorHandler = require("../../../../bFunction/bErrorHandler")
const handleImage = require("../../../../bFunction/hHandleImage")
const SearchFilterPaginate = require("../../../../bFunction/fSearchFilterPaginate")
const UserModel = require("../../aModel/bAdministration/aUserModel");
const generateCookie = require("../../../../bFunction/cGenerateCookie");
const RoleModel = require("../../aModel/bAdministration/bRoleModel");
const MenuModel = require("../../aModel/bAdministration/cMenuModel");
const sendEmail = require("../../../../bFunction/iSendEmail");
const sendMessage = require("../../../../bFunction/kSendMessage");
const companyToCompany = require("../../../../dStaticData/aEmailData/aCompanyToCompany");


exports.userController = (Model= UserModel, Label= 'User') => {
	return {
		// List Controller
		list: catchAsyncError(async (request, response, next) => {
			// API Feature
			const searchFilterPaginate = new SearchFilterPaginate(Model.find().populate(['bCreatedBy', 'bUpdatedBy']), request.query).search().filter().paginate(100)

			// List
			const object_list = await searchFilterPaginate.query

			// Response
			response.status(201).json({
				success: true,
				message: `${Label} Listed Successfully`,
				total_count: await Model.countDocuments(),
				page_count: object_list.length,
				list: object_list
			})
		}),

		// Create Controller
		create: catchAsyncError(async (request, response, next) => {
			// Personal Info
			request.body.bCreatedAt = new Date(Date.now()),
			request.body.bCreatedBy = request.user || "Lana Del Rel"

			// Image
			request.body.aImage && (
				request.body.aImage = await handleImage(
					request.body.aImage, 
					Label,
					'create'
				)
			)
			request.body.eImage && (
				request.body.eImage = await handleImage(
					request.body.eImage, 
					Label,
					'create'
				)
			)
			
			// Create
			const object_create = await Model.create(request.body)
	
			// Response
			response.status(201).json({
				success: true,
				message: `${Label} Created Successfully`,
				create: object_create
			})
		}),

		// Retrieve Controller
		retrieve: catchAsyncError(async (request, response, next) => {
			// Retrieve
			let object_retrieve = await Model.findById(request.params.id).populate({
        path: 'cRole',
        model: RoleModel,
        populate: {
          path: 'cMenus.menu',
          model: MenuModel,
        }
			})

			// Not Found
			if (!object_retrieve) next(new ErrorHandler(`${Label} Not Found`, 404))

			// Response
			response.status(200).json({
				success: true,
				message: `${Label} Reterived Successfully`,
				retrieve: object_retrieve
			})
		}),

		// Update Controller
		update: catchAsyncError(async (request, response, next) => {
			// Retrieve
			let object_retrieve = await Model.findById(request.params.id).populate({
        path: 'cRole',
        model: RoleModel,
        populate: {
          path: 'cMenus.menu',
          model: MenuModel,
        }
			})

			// Not Found
			if (!object_retrieve) next(new ErrorHandler(`${Label} Not Found`, 404))

			// Personal Info
			request.body.bUpdatedAt = new Date(Date.now()),
			request.body.bUpdatedBy = request.user || "Kiss Me Hard"

			// Image
			request.body.aImage && (
				request.body.aImage = await handleImage(
					request.body.aImage, 
					Label,
					'update',
					object_retrieve.aImage
				)      
			) 
			request.body.eImage && (
				request.body.eImage = await handleImage(
					request.body.eImage, 
					Label,
					'update',
					object_retrieve.eImage
				)
			)

			// Update
			object_retrieve = await Model.findByIdAndUpdate(
				request.params.id,
				request.body, {
					new: true,
					runValidators: true,
					useFindAndModify: false
				}
			)
	
			// Response
			response.status(200).json({
				success: true,
				message: `${Label} Updated Successfully`,
				update: object_retrieve
			})
		}),

		// Update Password Controller
		updatePassword: catchAsyncError(async (request, response, next) => {
			// Destructure Body
			const {old_password, new_password, confirm_password} = request.body

			// Retrieve
			const user = await Model.findById(request.params.id).select("+password").populate({
				path: 'cRole',
				model: RoleModel,
				populate: {
					path: 'cMenus.menu',
					model: MenuModel,
				}
			});

			// Not Found
			if (!user) next(new ErrorHandler(`${Label} Not Found`, 404))

			// Check 1
			if (!old_password, !new_password, !confirm_password) next(new ErrorHandler("Please enter old password, new password and confirm password", 400))

			// Check 2
			if (old_password === new_password)  next(new ErrorHandler("New password connot be same as old password", 404));

			// Check 3
			if (new_password !== confirm_password)  next(new ErrorHandler("Please match both password", 400));

			// Match Password 1
			const isPasswordMatched1 = await user.comparePassword(old_password)

			// Not Matched
			if (!isPasswordMatched1) next(new ErrorHandler("Old password is incorrect", 401))

			// // Match Password 2
			// const isPasswordMatched2 = await user.comparePassword(new_password)

			// // Not Matched
			// if (isPasswordMatched2) next(new ErrorHandler("New password connot be same as old password", 401))

			// Save
			user.password = new_password;
			await user.save();
			
			// Response
			generateCookie(201, `${Label} Profile Password Updated Successfully`, `profile_password_update`, user, response)
		}),		

		// Delete Controller
		delete: catchAsyncError(async (request, response, next) => {
			// Retrieve
			let object_retrieve = await Model.findById(request.params.id).populate({
        path: 'cRole',
        model: RoleModel,
        populate: {
          path: 'cMenus.menu',
          model: MenuModel,
        }
			})

			// Not Found
			if (!object_retrieve) next(new ErrorHandler(`${Label} Not Found`, 404))

			// Delete
			await object_retrieve.deleteOne({"_id": "_id"})

			// Response
			response.status(200).json({
				success: true,
				message: `${Label} Deleted Successfully`,
				delete: object_retrieve
			})
		}),
		
		///////////////////////// User Authentication Controller //////////////////////////
		// Register Controller
		register: catchAsyncError(async (request, response, next) => {
			// Personal Info
			request.body.bCreatedAt = new Date(Date.now()),
			request.body.bCreatedBy = request.user || "Lana Del Rel"

			// Image
			request.body.eImage && (
				request.body.eImage = await handleImage(
					request.body.eImage, 
					Label,
					'create'
				)
			)

			// Create
			const user = await Model.create(request.body)

			// Send Mail - Company To Company
			await sendEmail(option={
				from: companyToCompany,
				to: companyToCompany,
				subject: "Someone Signed Up",
				text: `User ${user.eEmail} has registered to our application`
			})
			
			// Response
			generateCookie(201, `User Registered Successfully`, `user_register`, user, response)
		}),

		// Login Controller
		login: catchAsyncError(async (request, response, next) => {
			// Destructure Body
			const {eEmail, ePassword} = request.body

			// Check
			if (!eEmail || !ePassword) next(new ErrorHandler("Please enter email & password", 400))

			// Retrieve
			const user = await Model.findOne({eEmail}).select("+ePassword")

			// Not Found
			if (!user) next(new ErrorHandler("Invalid email or password", 401))

			// Match Password
			const isPasswordMatched = await user.comparePassword(ePassword)

			// Not Matched
			if (!isPasswordMatched) next(new ErrorHandler("Invalid email or password", 401))

			// Send Mail - Company To Company
			await sendEmail(option={
				from: companyToCompany,
				to: companyToCompany,
				subject: "Someone Logged In",
				text: `User ${user.eEmail} has logged in to our application`
			})

			// Send Mail - To User
			// await sendEmail(option={
			// 	from: "boss",
			// 	to: user.eEmail,
			// 	subject: "Someone Logged In",
			// 	text: "Logged in Successfully"
			// })

			// Send Message
			// await sendMessage()

			// Response
			generateCookie(200, "User Logged In Successfully", "user_login", user, response)
		}),

		// Logout Controller
		logout: catchAsyncError(async (request, response, next) => {
			// Remove Token
			const options = {
					expires: new Date(Date.now()),
					httpOnly: true,
					secure: true,
					sameSite: "none"	
			}

			// Retrieve
			const user = await UserModel.findById(request.user._id).populate({
        path: 'cRole',
        model: RoleModel,
        populate: {
          path: 'cMenus.menu',
          model: MenuModel,
        }
			});

			// Not Found
			if (!user) next(new ErrorHandler("Invalid email or password", 401))

			// Send Mail - Company To Company
			await sendEmail(option={
				from: companyToCompany,
				to: companyToCompany,
				subject: "Someone Logged Out",
				text: `User ${user.eEmail} has logged out to our application`
			})
			
			// Response
			response.status(200).cookie('token', null, options).json({ 
				success: true,
				message: "User Logged Out Successfully",
				user_logout: request.user
			})
		}),

		// Forgot Password Controller
		forgotPassword: catchAsyncError(async (request, response, next) => {
			// Destructure Body
			const {eEmail} = request.body

			// Check
			if (!eEmail) next(new ErrorHandler("Please enter email", 400))

			// Retrieve
			const user = await Model.findOne({"eEmail": eEmail})

			// Not Found
			if (!user) next(new ErrorHandler("User Not Found", 404))
		
			// Get Reset Password Token
			const resetPasswordToken = await user.getResetPasswordToken();

			// Save 
			await user.save({ validateBeforeSave: false });
		
			// Message
			const textMessage = `Reset Password Token: ${resetPasswordToken}`;
				
			// Send Mail - Company To Company
			await sendEmail(option={
				from: companyToCompany,
				to: companyToCompany,
				subject: "Someone Forgot Password",
				text: `User ${user.eEmail} has forgot password to our application`
			})
			
			// Response
			response.status(200).json({
				success: true,
				message: textMessage,
				user_forgot_password: user,
				token: resetPasswordToken
			});

		}),

		// Reset Password
		resetPassword: catchAsyncError(async (request, response, next) => {
			// Destructure Body & Params
			const {token} = request.params
			const {new_password, confirm_password} = request.body

			// Hash Token
			const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");

			// Retrieve
			const user = await UserModel.findOne({'eResetPasswordToken': resetPasswordToken, 'eResetPasswordTokenExpire': { $gt: Date.now() }});
			
			// Not Found
			if (!user) next(new ErrorHandler("Reset password link is invalid or has been expired", 400));
			
			// Check 1
			if (!new_password, !confirm_password) next(new ErrorHandler("Please enter new password and confirm password", 400))

			// Check 2
			if (new_password !== confirm_password) next(new ErrorHandler("Please match both password", 400));
			
			// // Match Password 2
			// const isPasswordMatched = await user.comparePassword(new_password)

			// // Not Matched
			// if (isPasswordMatched) next(new ErrorHandler("New password connot be same as old password", 401))

			// Save
			user.ePassword = new_password;
			user.eResetPasswordToken = undefined;
			user.eResetPasswordTokenExpire = undefined;
			await user.save({ validateBeforeSave: false });
			
			// Send Mail - Company To Company
			await sendEmail(option={
				from: companyToCompany,
				to: companyToCompany,
				subject: "Someone Reset Password",
				text: `User ${user.eEmail} has reset password to our application`
			})
			
			// Response
			generateCookie(201, `Password Recovered Successfully`, `user_reset_password`, user, response)
		}),        

		// Profile Retrieve Controller
		profileRetrieve: catchAsyncError(async (request, response, next) => {
			// Retrieve
			const user = await UserModel.findById(request.user._id).populate({
        path: 'cRole',
        model: RoleModel,
        populate: {
          path: 'cMenus.menu',
          model: MenuModel,
        }
			});

			// Not Found
			if (!user) next(new ErrorHandler(`${Label} Not Found`, 404))
			
			response.status(200).json({
				success: true,
				message: `${Label} Profile Reterived Successfully`,
				profile_retrieve: user
			})
		}),

		// Profile Update Controller
		profileUpdate: catchAsyncError(async (request, response, next) => {
			// Retrieve
			let user = await Model.findById(request.user._id).populate({
        path: 'cRole',
        model: RoleModel,
        populate: {
          path: 'cMenus.menu',
          model: MenuModel,
        }
			})

			// Not Found
			if (!user) next(new ErrorHandler(`${Label} Not Found`, 404))

			// Personal Info
			request.body.bUpdatedAt = new Date(Date.now()),
			request.body.bUpdatedBy = request.user || "Kiss Me Hard"

			// Image
			request.body.aImage && (
				request.body.aImage = await handleImage(
					request.body.aImage, 
					Label,
					'update',
					user.aImage
				)      
			)  
			request.body.eImage && (
				request.body.eImage = await handleImage(
					request.body.eImage, 
					Label,
					'update',
					user.eImage
				)
			)    

			// Update
			user = await Model.findByIdAndUpdate(
				request.user,
				request.body, 
				{
					new: true,
					runValidators: true,
					useFindAndModify: false
				}
			)

			// Send Mail - Company To Company
			await sendEmail(option={
				from: companyToCompany,
				to: companyToCompany,
				subject: "Someone Updated Profile",
				text: `User ${user.eEmail} has updated profile to our application`
			})
			
			// Response
			response.status(200).json({
				success: true,
				message: `${Label} Profile Updated Successfully`,
				update: user
			})
		}),

		// Profile Update Password Controller
		profileUpdatePassword: catchAsyncError(async (request, response, next) => {
			// Destructure Body
			const {old_password, new_password, confirm_password} = request.body

			// Retrieve
			const user = await Model.findById(request.user._id).select("+ePassword").populate({
        path: 'cRole',
        model: RoleModel,
        populate: {
          path: 'cMenus.menu',
          model: MenuModel,
        }
			});

			// Not Found
			if (!user) next(new ErrorHandler(`${Label} Not Found`, 404))

			// Check 1
			if (!old_password, !new_password, !confirm_password) next(new ErrorHandler("Please enter old password, new password and confirm password", 400))

			// Check 2
			if (old_password === new_password)  next(new ErrorHandler("New password connot be same as old password", 404));

			// Check 3
			if (new_password !== confirm_password)  next(new ErrorHandler("Please match both password", 400));

			// Match Password 1
			const isPasswordMatched1 = await user.comparePassword(old_password)

			// Not Matched
			if (!isPasswordMatched1) next(new ErrorHandler("Old password is incorrect", 401))

			// // Match Password 2
			// const isPasswordMatched2 = await user.comparePassword(new_password)

			// // Not Matched
			// if (isPasswordMatched2) next(new ErrorHandler("New password connot be same as old password", 401))

			// Save
			user.ePassword = new_password;
			await user.save();
			
			// Send Mail - Company To Company
			await sendEmail(option={
				from: companyToCompany,
				to: companyToCompany,
				subject: "Someone Updated Password",
				text: `User ${user.eEmail} has updated password to our application`
			})
			
			// Response
			generateCookie(201, `${Label} Profile Password Updated Successfully`, `profile_password_update`, user, response)
		}),

		// Profile Delete Controller
		profileDelete: catchAsyncError(async (request, response, next) => {
			// Retrieve
			let user = await Model.findById(request.user._id).populate({
				path: 'cRole',
				model: RoleModel,
				populate: {
					path: 'cMenus.menu',
					model: MenuModel,
				}
			})

			// Not Found
			if (!user) next(new ErrorHandler(`${Label} Not Found`, 404))

			// Delete
			await user.deleteOne({"_id": "_id"})

			// Send Mail - Company To Company
			await sendEmail(option={
				from: companyToCompany,
				to: companyToCompany,
				subject: "Someone Closed Account",
				text: `User ${user.eEmail} has closed account to our application`
			})
			
			// Response
			response.status(200).json({
				success: true,
				message: `${Label} Profile Deleted Successfully`,
				delete: user
			})
		}),

	}   
}
