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
* To login into the admin side use the email - "2020csb1118@iitrpr.ac.in" and password - "root".
* To login into the student side use the email - "rohitkinha1612@gmail.com" and password - "root".
* Please note that some features that are related to some kind of storage will not work like download and uploading of excel files or profile image will not work as no storage is provided by free hosting services such as vercel or render.
* To test those features please run locally on the system. 

### How to build locally

#### Before building the project locally make sure of these software requirements : 
* The system should have the latest version of node and npm in it preferable the stable ones version which currently is '18.16.0' for node and npm '9.66'.
* Apart from node the system should have postgres v15.0 or above installed in it.
 
#### Guide to update the node version in linux :
* First check the current verison by 'node -v'
* Then install n package in the terminal by 'sudo npm install -g n'
* The run 'n 18.16.0' in the terminal
* Again check the version of node and check if it is upgraded or not

#### 1. Extract Zip folder

* Inside the zip folder there will be two folders one docs and src and a README.txt file.
* The docs folder include the design and SRS realted to the project whereas the src folder contains all the source code of the project.

#### 2. Open project in some editor like vsCode for better visualisation

* The src folder contains basically two folders - client and server.
* We need to run each of them in separate terminals.


#### 3. Setup

Run `npm i` in both the `server` and `client` directories **separately** to install the dependencies.

#### 4. Client

`cd` to the client directory and run `npm start` command in one terminal to start the client-side/frontend.

#### 5. Server

`cd` to the server directory and run `npm run dev` command in another terminal to start the server/backend.

#### 6. Database

#### 7. App running on ` http://localhost:3000/ `

1. Create a database in your postgres shell (psql) using the command `create database hostel;`.
2. Connect to the `hostel` database by running `\c hostel;`.
3. Run all the commands in the `database.sql` (in server directory) file in psql.
4. Also add you own email and app password in .env file.
