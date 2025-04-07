import { toast } from '../lib/toast';

// Define user type
type User = {
  id: number;
  username: string;
  email: string;
  role: 'user' | 'admin';
  active?: boolean;
};

// Mock database of users
let users: User[] = [
  { id: 1, username: 'admin', email: 'admin@example.com', role: 'admin', active: true },
  { id: 2, username: 'user1', email: 'user1@example.com', role: 'user', active: true },
  { id: 3, username: 'user2', email: 'user2@example.com', role: 'user', active: true },
];

// Get all users
export const getAllUsers = async (): Promise<User[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...users];
};

// Get user by ID
export const getUserById = async (id: number): Promise<User | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return users.find(user => user.id === id);
};

// Create new user
export const createUser = async (userData: Omit<User, 'id'>): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const newUser = {
    id: users.length + 1,
    ...userData,
    active: true,
  };
  
  users.push(newUser);
  toast.success(`User ${newUser.username} created successfully`);
  return newUser;
};

// Update user
export const updateUser = async (id: number, userData: Partial<User>): Promise<User | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...userData };
    toast.success(`User ${users[index].username} updated successfully`);
    return users[index];
  }
  
  toast.error('User not found');
  return undefined;
};

// Delete user
export const deleteUser = async (id: number): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 700));
  
  const initialLength = users.length;
  users = users.filter(user => user.id !== id);
  
  if (users.length < initialLength) {
    toast.success('User deleted successfully');
    return true;
  }
  
  toast.error('User not found');
  return false;
};

// Toggle user active status
export const toggleUserStatus = async (id: number): Promise<User | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    users[index].active = !users[index].active;
    const status = users[index].active ? 'activated' : 'deactivated';
    toast.success(`User ${users[index].username} ${status} successfully`);
    return users[index];
  }
  
  toast.error('User not found');
  return undefined;
};

// Reset user password (mock function)
export const resetUserPassword = async (id: number): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    // In a real app, you would generate a reset token or temporary password
    toast.success(`Password reset link sent to ${users[index].email}`);
    return true;
  }
  
  toast.error('User not found');
  return false;
};
