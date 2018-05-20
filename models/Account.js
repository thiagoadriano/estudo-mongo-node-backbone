let crypto = require('crypto');

function _sendMail(config, nodemailer, resetPasswordUrl, doc, callback){
    let smtpTransport = nodemailer.createTransport('SMTP', config.email);
    resetPasswordUrl += '?account=' + doc._id;
    
    smtpTransport.sendMail({
        from: 'thisapp@exemple.com',
        to: doc.email,
        subject: 'SocialNet Password Request',
        text: 'Click here to reset your password: ' + resetPasswordUrl
    }, (err) => {
        if(err){
            return callback(false);
        }
        callback(true);
    });
}

function accountSchema(mongoose) {
    return new mongoose.Schema({
        email: {type: String, unique: true},
        password: {type: String},
        name: {
            first: {type: String},
            last: {type: String}
        },
        birthday: {
            day: {type: Number, min: 1, max: 31, required: false},
            month: {type: Number, min: 1, max: 12, required: false},
            year: {type: Number}
        },
        photoUrl: {type: String},
        biography: {type: String}
    });
}

function changePassword(accountId, newPassword, Account) {
    let shaSum = crypto.createHash('sha256'),
        hashedPassword = null;

    shaSum.update(newPassword);
    hashedPassword = shaSum.digest('hex');
    
    Account.update(
        {_id: accountId}, 
        {$set: {password: hashedPassword}}, 
        {upsert: false}, 
        (err) => {
            if(err) {
                return console.log(err)
            }
            console.log('Change password done for account ' + accountId);
        }
    );
}

function forgotPassword(config, nodemailer, email, resetPasswordUrl, Account, callback){
    Account.findOne(
        {email},
        (err, doc) => {
            if(err) {
                return callback(false);
            }
            _sendMail(config, nodemailer, resetPasswordUrl, doc, callback);
        }
    );
}

function login(email, password, Account, callback) {
    let shaSum = crypto.createHash('sha256');
    shaSum.update(password);
    Account.findOne(
        {email, password: shaSum.digest('hex')},
        (err, doc) => {
            callback(null !== doc);
        }
    );
}

function registerCallback(err) {
    if(err) {
        return console.log(err);
    }
    return console.log('Account was created');
}

function register(email, password, firsName, lastName, account){
    let shaSum = crypto.createHash('sha256');
    shaSum.update(password);
    console.log('Registering ' + email);
}

function AccountConf(config, mongoose, nodemailer) {
    let Account = mongoose.model('Account', accountSchema(mongoose));

    return {
        register: register.bind(null, ),
        forgotPassword: forgotPassword.bind(null, config, nodemailer,),
    }
}

module.exports = AccountConf;
