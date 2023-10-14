import { Schema, model, models } from 'mongoose';

const DashboardSchema = new Schema({
  user: {
    type: String,
    ref: 'User',
  },
  balance: {
    type: String,
  },
  book_selling: {
    type: String,
  },
  top_selling: {
    type: String,
  },
});

const Dashboard = models.Dashboard || model('Dashboard', DashboardSchema);

export default Dashboard;