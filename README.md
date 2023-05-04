# README

# Website-Portal-for-hostel-management

This website provides an easy and effective way for students for registering their complaints and communicating to responsible hostel authorities and for admins to manage different aspects of hostel and maintaining code of conduct.

## Features

1. Login for both admin and students for all hostels.
2. Complaint system for students.
3. Profile to display room number, hostel, name etc.

## User guide

### How to build locally

#### 1. Clone repository

#### 2. Open project in VSCode

#### 3. Setup

Run `npm i` in both the `server` and `client` directories **separately** to install the dependencies.

#### 4. Client

`cd` to the client directory and run `npm start` command in one terminal to start the client-side/frontend.

#### 5. Server

`cd` to the server directory and run `npm run dev` command in another terminal to start the server/backend.

#### 6. Database

#### 7. App running on ``http://localhost:3000/``

1. Create a database in your postgres shell (psql) using the command `create database hostel;`.
2. Connect to the `hostel` database by running `\c hostel;`.
3. Run all the commands in the `database.sql` (in server directory) file in psql.
4. Also add you own email and app password in .env file.
