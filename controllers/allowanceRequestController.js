import AllowanceRequest from '../models/AllowanceRequest.js';
import User from '../models/User.js';
import { sendEmailNotification } from '../utils/emailService.js';

export const createRequest = async (req, res) => {
  try {
    const { userId, amount, description } = req.body;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newRequest = new AllowanceRequest({
      user: userId,
      amount,
      description
    });
    
    const savedRequest = await newRequest.save();
    

    await sendEmailNotification({
      userName: user.name,
      userEmail: user.email,
      userDepartment: user.department,
      amount,
      description,
      date: savedRequest.date
    });
    
    res.status(201).json({
      message: 'Allowance request created successfully',
      request: savedRequest
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRequests = async (req, res) => {
  try {
    const requests = await AllowanceRequest.find()
      .populate('user', 'name email department')
      .sort({ createdAt: -1 });
    
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const updatedRequest = await AllowanceRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('user', 'name email department');
    
    if (!updatedRequest) {
      return res.status(404).json({ message: 'Allowance request not found' });
    }
    
    res.status(200).json({
      message: 'Allowance request status updated successfully',
      request: updatedRequest
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedRequest = await AllowanceRequest.findByIdAndDelete(id);
    
    if (!deletedRequest) {
      return res.status(404).json({ message: 'Allowance request not found' });
    }
    
    res.status(200).json({
      message: 'Allowance request deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRequestsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const requests = await AllowanceRequest.find({ user: userId })
      .populate('user', 'name email department')
      .sort({ createdAt: -1 });
    
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};