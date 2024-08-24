/*
// This example is for Typescript-node

var SibApiV3Sdk = require('sib-api-v3-typescript');

var apiInstance = new SibApiV3Sdk.SMTPApi()

// Configure API key authorization: api-key

var apiKey = apiInstance.authentications['apiKey'];
apiKey.apiKey = "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"

// Configure API key authorization: partner-key

var partnerKey = apiInstance.authentications['partnerKey'];
partnerKey.apiKey = "YOUR API KEY"

var sendSmtpEmail = {
    to: [{
        email: 'testmail@example.com',
        name: 'John Doe'
    }],
    templateId: 6,
    params: {
        name: 'John',
        surname: 'Doe'
    },
    headers: {
        'X-Mailin-custom': 'custom_header_1:custom_value_1|custom_header_2:custom_value_2'
    }
};


apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
    console.log('API called successfully. Returned data: ' + data);
}, function(error) {
    console.error(error);
});*/

console.log("order.$action route")