import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  department: {
    type: String,
    required: true,
    enum: ['Finance', 'HR', 'IT', 'Marketing', 'Operations', 'Sales'],
    trim: true
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;