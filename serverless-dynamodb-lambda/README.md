### react-app for the front-end and AWS Lambda, DynamoDB, and API Gateways for the back-end.
----

[The code for the front-end is saved in this repository](https://github.com/gulikholmatova/serverless-app)

### Back-end: creating a table in DynamoDB, configuring AWS Lambda, and API Gateways.
----

For the back-end of the application to work, we will need to do these steps first:

1. Create a table in DynamoDB to store data.
2. Create an AWS Lambda function.
3. Set up a proper API Gateway.

### Creating a table in DynamoDB to store data.
----
In the AWS Management Console, click on the search bar and type DynamoDB:

Then choose a blue button that says ‘Create Table’.

Populate the table name and set ‘date’ as a primary key. Then choose ‘Create’ in the bottom right.

These are all steps required to set up a DynamoDB table for now.
![dynamnoDB](./Screenshot_20191022_173543.png)

### Creating an AWS Lambda function.
----
Go to the AWS Management Console. Find a Lambda service in the search bar. 

Once you are in the `AWS Lambda → Functions`, choose an orange button in the top right, which says ‘Create Function’. 

Create a function using an ‘Author from scratch’ option, without any preconfigured templates. Populate the table with the following information and then press ‘create function’:
![dynamnoDB](https://miro.medium.com/max/924/1*UPxl3911D8U_vWSiTsL-Ww.png)

Next, we are going to write the below function code and press ‘Save’. Remember to put the region corresponding to your case in line 2. The key details here are on lines 8–9, and 11. Lines 8–9 indicate that DynamoDB will receive an object from the Lambda function containing a date and a message in ‘object.key1’ property. Line 11 must include the name of the table that you created in DynamoDB. In our case, this is ‘serverlessApp’.
```javascript
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: "us-east-2"});

exports.handler = (event, context, callback) => {
console.log("Processing...");
const params = {
Item: {
date: Date.now(),
message: event.key1
},
TableName: "serverlessApp"
};
const response = {
statusCode: 200,
headers: {
"Access-Control-Allow-Origin": "*",
"Access-Control-Allow-Headers": "Content-Type",
"Access-Control-Allow-Methods": "OPTIONS,POST,GET"
},
body: JSON.stringify('Hello from new Lambda!'),
};

docClient.put(params, function(err, data) {
if(err){
callback(err, null);
} else {
callback(null, data);
  }
      })
      };
```

### Configuring an API Gateway.

Next, we need to add a API Gateway Trigger to our AWS Lambda Function. Do this by clicking on ‘API Gateway’ in the left navigation bar.

Configure triggers for the gateway as follows and click ‘Add’ and then ‘Save’ in the top right:
![dynamnoDB](./api_gateway_trigger.png)

Now, navigate to the Amazon API Gateway dashboard. As the user of the app will be sending data, we need to create a POST method. Hence, click ‘Create Method’ and then in the dropdown, choose ‘POST’.

![dynamnoDB](./api-gateway-serverfunc-settings.png)
Configure the method as follows. Don’t forget select ‘Save’ once you finish.

For the POST API Gateway to start working, we need to deploy it. In the same panel, where we clicked ‘Create Method’, choose ‘Deploy API’ and put in the below sample information. Click ‘Deploy’ after that:
![dynamnoDB](./api-gateway-deploy-api.png)

Now we have a URL, which we can use for the axios POST request to send data to DynamoDB. The URL shows up at the top of the Stage Editor. We will need this URL after we are done with the next step.


AWS Lambda function does not have the permission to connect to the DynamoDB instance yet. Let’s fix this now. Navigate to IAM in the Services dashboard. Then choose IAM Resources → Roles → Role name ‘serverlessAppFunction’ → Add inline policy.
![dynamnoDB](./iam-create-role-serverless.png)

We are going to allow the function all actions in relation to the given table in DynamoDB. After you do this, click ‘Review Policy’ in the bottom right, create a name and save changes.

![dynamnoDB](./iam-policy-dynamadbFA.png)
Now, we can test the URL from the step earlier in the Postman. Here, an important step is that you need to attach the title of your AWS Lambda Function to the invoke URL link.
