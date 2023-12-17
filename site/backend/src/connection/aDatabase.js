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
                                    DB_URL = "mongodb+srv://AlwaysCoolUser:AlwaysCool@apurvchatur.ods89az.mongodb.net/ArionApplicationUltimate"
                                    break;
                                case 'AnkasApplication':
                                    DB_URL = "mongodb+srv://AlwaysCoolUser:AlwaysCool@apurvchatur.ods89az.mongodb.net/AnkasApplicationUltimate"
                                    break;
                                case 'AbolApplication':
                                    DB_URL = "mongodb+srv://AlwaysCoolUser:AlwaysCool@apurvchatur.ods89az.mongodb.net/AbolApplicationUltimate"
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
                            DB_URL = "mongodb+srv://AlwaysCoolUser:AlwaysCool@apurvchatur.ods89az.mongodb.net/BeehiveApplicationUltimate"
                            break;
                        case 'AndromedaApplication':
                            DB_URL = "mongodb+srv://AlwaysCoolUser:AlwaysCool@apurvchatur.ods89az.mongodb.net/AndromedaApplicationUltimate"
                            break;
                        case 'PinwheelApplication':
                            DB_URL = "mongodb+srv://AlwaysCoolUser:AlwaysCool@apurvchatur.ods89az.mongodb.net/PinwheelApplicationUltimate"
                            break;
                        case 'TadpoleApplication':
                            DB_URL = "mongodb+srv://AlwaysCoolUser:AlwaysCool@apurvchatur.ods89az.mongodb.net/TadpoleApplicationUltimate"
                            break;
                        case 'AcruxApplication':
                            DB_URL = "mongodb+srv://AlwaysCoolUser:AlwaysCool@apurvchatur.ods89az.mongodb.net/AcruxApplicationUltimate"
                            break;
                        case 'AnserApplication':
                            DB_URL = "mongodb+srv://AlwaysCoolUser:AlwaysCool@apurvchatur.ods89az.mongodb.net/AnserApplicationUltimate"
                            break;
                        case 'AquilaApplication':
                            DB_URL = "mongodb+srv://AlwaysCoolUser:AlwaysCool@apurvchatur.ods89az.mongodb.net/AquilaApplicationUltimate"
                            break;
                        case 'BellatrixApplication':
                            DB_URL = "mongodb+srv://AlwaysCoolUser:AlwaysCool@apurvchatur.ods89az.mongodb.net/BellatrixApplicationUltimate"
                            break;
                        case 'CapellaApplication':
                            DB_URL = "mongodb+srv://AlwaysCoolUser:AlwaysCool@apurvchatur.ods89az.mongodb.net/CapellaApplicationUltimate"
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
                            
                            switch (process.env.FIRM) {
                                case 'TechfolioFirm':

                                    switch (process.env.APPLICATION) {
                                        case 'TechfolioApplication':
                                            DB_URL = "mongodb+srv://AlwaysCoolUser:AlwaysCool@apurvchatur.ods89az.mongodb.net/TechfolioApplicationUltimate"
                                            break;
                                        case 'ApurvChaturApplication':
                                            DB_URL = "mongodb+srv://AlwaysCoolUser:AlwaysCool@apurvchatur.ods89az.mongodb.net/ApurvChaturApplicationUltimate"
                                            break;
                                        case 'AnushreeMandapeApplication':
                                            DB_URL = "mongodb+srv://AlwaysCoolUser:AlwaysCool@apurvchatur.ods89az.mongodb.net/AnushreeMandapeApplicationUltimate"
                                            break;
                                        case 'SofieBerkinApplication':
                                            DB_URL = "mongodb+srv://AlwaysCoolUser:AlwaysCool@apurvchatur.ods89az.mongodb.net/SofieBerkinApplicationUltimate"
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