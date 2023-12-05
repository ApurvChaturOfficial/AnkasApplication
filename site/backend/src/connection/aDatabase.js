const mongoose = require('mongoose');

const database = () => {
    var DB_URL
        
    switch (process.env.CORPORATION) {
        case 'BeehiveCorporation':
    
            switch (process.env.ORGANISATION) {
                case 'AndromedaOrganisation':
                    
                    switch (process.env.APPLICATION) {
                        case 'AcruxApplication':
                            DB_URL = "mongodb+srv://AlwaysCoolUser:AlwaysCool@apurvchatur.ods89az.mongodb.net/AcruxApplication"
                            break;
                        case 'AlberioApplication':
                            DB_URL = "mongodb+srv://AlwaysCoolUser:AlwaysCool@apurvchatur.ods89az.mongodb.net/AlberioApplication"
                            break;
                        case 'AlhenaApplication':
                            DB_URL = "mongodb+srv://AlwaysCoolUser:AlwaysCool@apurvchatur.ods89az.mongodb.net/AlhenaApplication"
                            break;
                        default:
                            break;
                    }   
                    break;
    
                case 'PinwheelOrganisation':
    
                    switch (process.env.APPLICATION) {
                        case 'BeehiveApplication':
                            DB_URL = "mongodb+srv://AlwaysCoolUser:AlwaysCool@apurvchatur.ods89az.mongodb.net/BeehiveApplication"
                            break;
                        case 'AndromedaApplication':
                            DB_URL = "mongodb+srv://AlwaysCoolUser:AlwaysCool@apurvchatur.ods89az.mongodb.net/AndromedaApplication"
                            break;
                        case 'PinwheelApplication':
                            DB_URL = "mongodb+srv://AlwaysCoolUser:AlwaysCool@apurvchatur.ods89az.mongodb.net/PinwheelApplication"
                            break;
                        case 'TadpoleApplication':
                            DB_URL = "mongodb+srv://AlwaysCoolUser:AlwaysCool@apurvchatur.ods89az.mongodb.net/TadpoleApplication"
                            break;
                        case 'AquilaApplication':
                            DB_URL = "mongodb+srv://AlwaysCoolUser:AlwaysCool@apurvchatur.ods89az.mongodb.net/AquilaApplication"
                            break;
                        case 'BellatrixApplication':
                            DB_URL = "mongodb+srv://AlwaysCoolUser:AlwaysCool@apurvchatur.ods89az.mongodb.net/BellatrixApplication"
                            break;
                        case 'CapellaApplication':
                            DB_URL = "mongodb+srv://AlwaysCoolUser:AlwaysCool@apurvchatur.ods89az.mongodb.net/CapellaApplication"
                            break;
                        default:
                            break;
                    }   
                    break;
    
                case 'TadpoleOrganisation':
    
                    switch (process.env.ENTERPRISE) {
                        case 'BellatrixEnteprise':
                            break;
                        case 'BellatrixEnteprise':
                            break;
                        case 'BellatrixEnteprise':
                            break;
                        default:
                            break;
                    }   
                    break;
            }  
            break;
    
        default:
            DB_URL = "mongodb+srv://AlwaysCoolUser:AlwaysCool@apurvchatur.ods89az.mongodb.net/SomeOtherStuff"
            break;
    }
    

    mongoose.set('strictQuery', true);
    mongoose
    .connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(response => {
        console.log(`Great!... Mongo DB connected with ${process.env.APPLICATION} on server: ${response.connection.host}`)
    })
    // .catch(error => {
    //     console.log(error)
    // })    
}

module.exports = database