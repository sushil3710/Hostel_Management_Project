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

async function get_all_requests(req, res) {
    try {
        const { rows } = await pool.query("SELECT * FROM room_change_request");
        if(rows.length===0)
        {
            res.status(500).send("Error getting your requests.");
            return;
        }
        res.json(rows);
    } catch (err) {
       
        res.status(500).send("Error getting your requests.");
    }
}

// async function checkForRoom(req, res) {
//     try {
//         const { rows } = await pool.query("SELECT * FROM room_change_request");
//         if(rows.length===0)
//         {
//             res.status(500).send("Error getting your requests.");
//             return;
//         }
//         res.json(rows);
//     } catch (err) {
        
//         res.status(500).send("Error getting your requests.");
//     }
// }

async function get_my_requests(req, res) {
    const {id} = req.params;
    try {
        const { rows } = await pool.query("SELECT * FROM room_change_request where email_id = $1 ORDER BY request_date desc", [id]);
        if(rows.length===0)
        {
            res.status(500).send("Error getting your requests.");
            return;
        }
        res.json(rows);
    } catch (err) {
        
        res.status(500).send("Error getting your requests.");
    }
}

async function request_for_exchange(req, res) {
    var info = req.body ;
    
    try{
        await pool.query("INSERT INTO room_change_request(email_id, prev_room, req_room,reason,comments,isexchange,phone,exchange_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8);",
            [
                info.email_id,
                info.prev_room,
                info.req_room,
                info.reason,
                info.comments,
                info.isexchange,
                info.phone,
                info.exchange_id,
            ]
        );
        res.status(200).send("Request successfully registered.");

    }catch(err){
        
        res.status(500).send("Error registering for room change.");    
    }
   
}

async function statusUpdater(req, res) {
    const { id } = req.params;
    var info = req.body ;

    try {
      const { rowCount } = await pool.query("UPDATE room_change_request SET request_status=$1 , admin_comment = $2 WHERE id = $3", [info.option, info.adminComment, id]);
  
      if (rowCount === 1) {
        res.status(200).send(`Complaint with id ${id} has been marked as solved`);
      } else {
        res.status(404).send(`Complaint with id ${id} not found`);
      }
    } catch (err) {
      
      res.status(500).send("Error updating complaint status.");
    }
  }
  



module.exports = {
    get_my_requests,
    request_for_exchange,
    get_all_requests,
    statusUpdater,
    // checkForRoom
};
