const { research_read_db, research_write_db } = require('../../config/db-configs');
const dbPoolManager = require('../../config/db-pool-manager');

const researchDbR = dbPoolManager.get('researchDbR', research_read_db);
const researchDbW = dbPoolManager.get('researchDbW', research_write_db);

module.exports.loginRequest = async (loginId, facultyPassword) => {
    console.log('Faculty id  request in models:', loginId);

    const facultloginSql = {
            text: `SELECT * FROM faculty_table_login WHERE faculty_id = $1 AND password = $2`,
            values: [loginId, facultyPassword]
        };

    console.log('facultloginSql ===>>>>>', facultloginSql);

    const facultyLoginRes = await researchDbR.query(facultloginSql);
    const loginPromises = [facultyLoginRes];

    return Promise.all(loginPromises).then(([facultyLoginRes]) => {
       return  facultyLoginRes.rowCount === 1 ? {
            status: "Done",
            message: "Record Fetched Successfully",
            loginData: facultyLoginRes.rows[0]
       } : {
            status: "Failed",
            message: "Invalid credentials"
       }
    })
    .catch(error => {
        console.error('Error:', error.message); 
        return {
          status: "Failed",
          message: error.message,
          errorCode: error.code
        };
      });
};
