const adminDashboardModel = require('../models/adminModel');


// Controller function to handle admin dashboard
async function adminDashboard(req, res) {
  // You can extract the admin ID from the session or request, depending on your authentication mechanism
  const adminId = req.user.id; // Assuming you have admin ID in the request

  try {
    // Retrieve admin-specific data
    const adminData = await adminDashboardModel.getAdminData(adminId);

    // Render the admin dashboard view with data
    res.render('adminDashboard', { adminData });
    // Adjust the view name ('adminDashboard') and data accordingly
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  adminDashboard,
  // Add other controller functions if needed
};
