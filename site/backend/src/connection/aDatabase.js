const mongoose = require('mongoose');

const database = () => {
    var DB_URL
        
    switch (process.env.CORPORATION) {
        case 'BeehiveCorporation':
    
            switch (process.env.ORGANISATION) {
                case 'AndromedaOrganisation':
                    
                    switch (process.env.ENTERPRISE) {
                        case 'AcruxEnteprise':

                            switch (process.env.APPLICATION) {
                                case 'ArionApplication':
                                    DB_URL = "mongodb+srv://AlwaysCoolUser:AlwaysCool@apurvchatur.ods89az.mongodb.net/ArionApplication"
                                    break;
                                case 'AnkasApplication':
                                    DB_URL = "mongodb+srv://AlwaysCoolUser:AlwaysCool@apurvchatur.ods89az.mongodb.net/AnkasApplication"
                                    break;
                                case 'AbolApplication':
                                    DB_URL = "mongodb+srv://AlwaysCoolUser:AlwaysCool@apurvchatur.ods89az.mongodb.net/AbolApplication"
                                    break;
                                default:
                                    break;
                            }   
                            break;

                        case 'AnserEnteprise':
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
                        case 'AcruxApplication':
                            DB_URL = "mongodb+srv://AlwaysCoolUser:AlwaysCool@apurvchatur.ods89az.mongodb.net/AcruxApplication"
                            break;
                        case 'AnserApplication':
                            DB_URL = "mongodb+srv://AlwaysCoolUser:AlwaysCool@apurvchatur.ods89az.mongodb.net/AnserApplication"
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
                        case 'AquilaEnteprise':
                            break;

                        case 'BellatrixEnteprise':
                            
                            switch (process.env.APPLICATION) {
                                case 'TechfolioApplication':

                                    switch (process.env.APPLICATION1) {
                                        case 'Self':
                                            DB_URL = "mongodb+srv://AlwaysCoolUser:AlwaysCool@apurvchatur.ods89az.mongodb.net/TechfolioApplication"
                                            break;
                                        case 'ApurvChaturApplication':
                                            DB_URL = "mongodb+srv://AlwaysCoolUser:AlwaysCool@apurvchatur.ods89az.mongodb.net/ApurvChaturApplication"
                                            break;
                                        case 'AnushreeMandapeApplication':
                                            DB_URL = "mongodb+srv://AlwaysCoolUser:AlwaysCool@apurvchatur.ods89az.mongodb.net/AnushreeMandapeApplication"
                                            break;
                                        case 'SofieBerkinApplication':
                                            DB_URL = "mongodb+srv://AlwaysCoolUser:AlwaysCool@apurvchatur.ods89az.mongodb.net/SofieBerkinApplication"
                                            break;
                                        default:
                                            break;
                                    }   
                                    break;
                                default:
                                    break;
                            }   
                            break;
                            
                        case 'CapellaEnteprise':
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