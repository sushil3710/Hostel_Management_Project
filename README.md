# README
# Website-Portal-for-hostel-management

This website provides an easy and effective way for students for registering their complaints and communicating to responsible hostel authorities and for admins to manage different aspects of hostel and maintaining code of conduct.

## Features 
* Login for both admin and students for all hostels.
* It offers a student to edit his/her profile, submit fees details, send a complaint regarding any issue such as water, electricity , etc. It also allows a student to request for a room.
* It offers a admin to add students into the portal though a excel file as well as gives the option to add a single student. It offers admin to have a look of fee documents, complaints and room change requests for different students. It also allows a admin to add other admins.

## User guide 

### How to use WebApp 
* Please find the link of hosted website [hostel-managemet-portal](https://hostel-management-portal.vercel.app/) .
* By default the user will see a homepage.
* To login into the admin side use the email - `2020csb1118@iitrpr.ac.in` and password - `root`.
* To login into the student side use the email - `rohitkinha1612@gmail.com` and password - `root`.
* Please note that some features that are related to some kind of storage will not work like download and uploading of excel files or profile image will not work as no storage is provided by free hosting services such as vercel or render.
* To test those features please run locally on the system. 

### How to build locally

#### Before building the project locally make sure of these software requirements : 
* The system should have the latest version of node and npm in it preferable the stable ones version which currently is `18.16.0` for node and npm `9.66`.
* Apart from node the system should have postgres `v15.0` or above installed in it.
 
#### Guide to update the node version in linux :
* First check the current verison by `node -v`
* Then install n package in the terminal by `sudo npm install -g n`
* The run `n 18.16.0` in the terminal
* Again check the version of node and check if it is upgraded or not

#### 1. Extract Zip folder

* Inside the zip folder there will be two folders one docs and src and a README.txt file.
* The docs folder include the design and SRS realted to the project whereas the src folder contains all the source code of the project.

#### 2. Open project in some editor like vsCode for better visualisation

* The src folder contains basically two folders - client and server.
* We need to run each of them in separate terminals.

#### 3. Creating a postgres database locally
* Make sure you have the required version of postgres install.
* Open the shell of your postgres in terminal
* Create a new database named `hostel`
* Then connect to hostel database and copy paste the script present in the `database.sql` file into the hostel psql shell.
* Once the database is created successfully, now we need to update the .env file in the server file/
* Steps are :
* 1. `CREATE DATABASE hostel;`
* 2. `\c hostel;`
* 3. Run all the commands in the database.sql(in server directory) file in psql.

#### 4. Updating .env file in server directory
* `PG_USER` = `postgres`         ////  here we need to write the user of our postgres by default it is postgres
* `PG_PASSWORD` = `1212`         ////  here update the password of your postgres password `This is important to change`.
* `PG_HOST` = `localhost`        ////  Keep it same as we are running locally   
* `PG_PORT` = `5432`             ////  Keep it same 
* `PG_DATABASE` = `hostel`       ////  Keep it hostel itself as we have created a separate database now.

#### 5. Now we will setup and run server side 
* Open a new terminal and go into server directory.
* `cd server`
* Install all dependancies 
* `npm install`
* Run the server in development mode
* `npm run dev`
* If we get a console message 'Server is live and listening on port 8080 then our server side is live'
* We can verify the same by going into browser and running `http://localhost:8080`, we should receive a 'Hello World'

#### 5. Setting up client side
* Open a new terminal and go into the client directory
* `cd client`
* Install all dependancies 
* `npm install`
* Running the frontend
* `npm start `
* The above steps will take sometime to execute, maybe few minutes incase of poor internet connectivity.
* Ignore all the warnings and if some errors are encountered those maybe mostly because of incompatible node version.
* You can try `npm install --legacy-peer-deps`.
* Now our website is live on `http://localhost:3000/`

#### 6. Testing the website
* To test the data manually with features like uploading excel to add students, uploading profile image and downloading the fee details, some samples for the same are added in the folder `./server/test/testData`.
* To test the server using jest follow following steps
* Open a new terminal and go into the server directory
* `cd server`
* `npm test`
* On running the above commands all the testcase should have passed as they were designed accordingly.
* If after manual testing and then running `npm test` some cases fail try reseting the database.

#### 7. Coverage Report
* After running the testcases, a coverage report is generated in `./server/coverage/Icov-report/` directory
* Copy the path of `index.html` file and open the same in a browser and we can see the test report and coverage report.

