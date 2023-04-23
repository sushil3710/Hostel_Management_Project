const path = require("path");
const { format } = require("util");
const pool = require("./db");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const auth = require("./auth.js");
const fs = require("fs");
var express = require('express');
const { log } = require("console");
var app = express();
dotenv.config();

async function get_all_complaints(req, res) {
    try {
        const { rows } = await pool.query("SELECT * FROM complaint_details");
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error getting all complaints.");
    }
}

async function get_complaints(req, res) {
    const { id } = req.params;
    try {
        const { rows } = await pool.query("SELECT * FROM complaint_details WHERE complaint_id=$1",[id]);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error getting the complaint.");
    }
}

async function get_all_solved_complaints(req, res) {
    try {
        const { rows } = await pool.query("SELECT * FROM complaint_details WHERE complaint_status='done'");
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error getting all complaints.");
    }
}

async function solveIt(req, res) {
    const { id } = req.params;
  
    try {
      const { rowCount } = await pool.query("UPDATE complaint_details SET complaint_status='done' WHERE complaint_id=$1", [id]);
  
      if (rowCount === 1) {
        res.status(200).send(`Complaint with id ${id} has been marked as solved`);
      } else {
        res.status(404).send(`Complaint with id ${id} not found`);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Error updating complaint status.");
    }
  }
  


async function save_data(req, res) {
    var info = req.body;

    try {
        await pool.query("INSERT INTO complaint_details(name, email_id, hostel_name,wing_side,room_number,floor_number,complaint_type,complaint_details) VALUES($1,$2,$3,$4,$5,$6,$7,$8);",
            [
                info.username,
                info.emailid,
                info.hostel,
                info.wing,
                info.room,
                info.floor,
                info.complainttype,
                info.complaint,
            ]
        );

        res.status(200).send("Complaint successfully registered.");

    } catch (err) {
        console.error(err);
        res.status(500).send("Error registering complaint.");
    }
}



module.exports = {
    save_data,
    get_all_complaints,
    get_complaints,
    get_all_solved_complaints,
    solveIt
};
