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
![dynamnoDB](./Screenshot_20191022_174047.png)

Next, we are going to write the below function code and press ‘Save’. Remember to put the region corresponding to your case in line 2. The key details here are on lines 8–9, and 11. Lines 8–9 indicate that DynamoDB will receive an object from the Lambda function containing a date and a message in ‘object.key1’ property. Line 11 must include the name of the table that you created in DynamoDB. In our case, this is ‘serverlessApp’.
1.3 Configuring an API Gateway.

Next, we need to add a API Gateway Trigger to our AWS Lambda Function. Do this by clicking on ‘API Gateway’ in the left navigation bar.

Configure triggers for the gateway as follows and click ‘Add’ and then ‘Save’ in the top right:

Now, navigate to the Amazon API Gateway dashboard. As the user of the app will be sending data, we need to create a POST method. Hence, click ‘Create Method’ and then in the dropdown, choose ‘POST’.

Configure the method as follows. Don’t forget select ‘Save’ once you finish.

For the POST API Gateway to start working, we need to deploy it. In the same panel, where we clicked ‘Create Method’, choose ‘Deploy API’ and put in the below sample information. Click ‘Deploy’ after that:

Now we have a URL, which we can use for the axios POST request to send data to DynamoDB. The URL shows up at the top of the Stage Editor. We will need this URL after we are done with the next step.
Example URL snippet.

AWS Lambda function does not have the permission to connect to the DynamoDB instance yet. Let’s fix this now. Navigate to IAM in the Services dashboard. Then choose IAM Resources → Roles → Role name ‘serverlessAppFunction’ → Add inline policy.

We are going to allow the function all actions in relation to the given table in DynamoDB. After you do this, click ‘Review Policy’ in the bottom right, create a name and save changes.

Now, we can test the URL from the step earlier in the Postman. Here, an important step is that you need to attach the title of your AWS Lambda Function to the invoke URL link.
Testing API Gateway, Status 200.

To sum up, we have created an AWS Lambda Function that is triggered from a corresponding API Gateway through the POST Method. We have also granted our function an access to DynamoDB.
Front-end: using create-react-app to start the app.

As mentioned in the first paragraph, I created a simple form using create-react-app. The code for the front-end is saved in my repository: https://github.com/gulikholmatova/serverless-app. Feel free to refer to it when building your own project!

If you have not used create-react-app before and have not deployed it to github pages, I found this tutorial short and useful.

In the code for the for the input form, make sure to specify an API Gateway you have configured in step 1.3. Here is the code from my form, where on line 27 I specify the API Gateway which I set up earlier.

Now, let’s test that our app works correctly. I am going to write a simple message in the form:
https://gulikholmatova.github.io/serverless-app/

And this message now is seen in DynamoDB table, too. Great!
DynamoDB table.

This is it, friends! I hope the tutorial was useful. Please, let me know if you have any questions, and, of course, happy coding!
