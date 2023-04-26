const excel = require("excel4node");
const pool = require("./db");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

async function generate_fee_in_excel(info) {
  const workbook = new excel.Workbook();
  const style = workbook.createStyle({
    font: { color: "#000000", size: 11 },
  });

  const header_style = workbook.createStyle({
    font: { color: "#ffffff", size: 10 },
    fill: { type: "pattern", patternType: "solid", fgColor: "365e9e" },
    border: { outline: true },
  });

  const link_style = workbook.createStyle({
    font: { color: "#0000EE", size: 10 },
  });

  const worksheet = workbook.addWorksheet("Sheet 1");

  /** For excel to keep track of rows */
  let rowCount = 1;

  /** Get column list */
  const template = await pool.query(
    "SELECT * from templates WHERE template_id = 2;"
  );

  let column_list = template.rows[0].column_list;

  /** Header list */
  let header_list = column_list.slice();

  /** Write header */
  header_list.forEach((element, columnIndex) => {
    worksheet
      .cell(rowCount, columnIndex + 1)
      .string(element.replaceAll("_", " ").toUpperCase())
      .style(header_style);
  });
  rowCount++;

  /** Get applications */

  const fees = await pool.query(
    "SELECT * FROM fees_records_table where fees_id=$1;",
    [info.fee_id]
  );

  /** All applications */
  let data = fees.rows;

  /** Link fields */
  let link_fields = [
    "fees_pdf_url"
  ];

  /** Write data */
  data.forEach((element, rowIndex) => {
    let columnIndex = 1;
    for (var i = 0; i < column_list.length; i++) {
      if (
        element[column_list[i]] !== null &&
        element[column_list[i]] != "null" && 
        element[column_list[i]] !== "undefined"
      ) {
     if (link_fields.indexOf(column_list[i]) > -1) {
          worksheet
            .cell(rowCount, columnIndex)
            .link(element[column_list[i]])
            .style(link_style);

        } else {
          worksheet
            .cell(rowCount, columnIndex)
            .string(String(element[column_list[i]]))
            .style(style);        
        }
      }
      columnIndex++;
    }
    rowCount++;
  });

  /** Write timestamp */
  worksheet
    .cell(rowCount + 1, 1)
    .string("Fee Script generated at " + new Date())
    .style(style);

  /** Return */
  return workbook;
}

const get_fee_in_excel = async (req, res) => {
  /**
   * Verify using authToken
   */

  authToken = req.headers.authorization;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  var verified = null;

  try {
    verified = jwt.verify(authToken, jwtSecretKey);
  } catch (error) {
    return res.send("1"); /** Error, logout on user side */
  }

  if (!verified) {
    return res.send("1"); /** Error, logout on user side */
  }

  /** Get role */
  var userRole = jwt.decode(authToken).userRole;
  if (userRole !== 0 && userRole !== 1 && userRole !== 3) {
    return res.send("1");
  }

  let workbook = await generate_fee_in_excel(req.body);
  workbook.write("FeeScript.xlsx", res);
};

module.exports = {
  // generate_fee_in_excel,
  get_fee_in_excel,
};
