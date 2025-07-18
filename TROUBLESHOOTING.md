# Troubleshooting Guide

## Common Issues and Solutions

### 1. **Field Validation Errors**
```
Error: User validation failed: aadharCardNumber: Path `aadharCardNumber` is required
```
**Solution**: The field names have been corrected. The backend now expects:
- `fullName` (not `name`)
- `aadharNumber` (not `aadharCardNumber`)
- `role` with values `'user'` or `'admin'` (not `'voter'`)

### 2. **PowerShell Script Execution**
```
Error: The system cannot find the file specified
```
**Solution**: Use the correct syntax:
```powershell
.\start-dev.ps1
```
Or use the batch file alternative:
```cmd
.\start-dev.bat
```

### 3. **Frontend Cannot Connect to Backend**
```
Error: Failed to fetch
```
**Solutions**:
- Ensure backend is running on port 5000
- Check CORS configuration in `server.js`
- Verify the API base URL in `client/src/utils/api.js`

### 4. **Authentication Issues**
```
Error: Token is not valid
```
**Solutions**:
- Clear browser localStorage
- Check JWT token in browser dev tools
- Ensure token is being sent with requests

### 5. **Database Connection**
```
Error: MongoNetworkError
```
**Solutions**:
- Start MongoDB service
- Check MongoDB connection string in `.env`
- Verify database permissions

### 6. **npm/Node.js Issues**
```
Error: npm is not recognized
```
**Solutions**:
- Install Node.js from https://nodejs.org/
- Restart terminal/command prompt
- Check PATH environment variable

### 7. **Port Already in Use**
```
Error: EADDRINUSE :::5000
```
**Solutions**:
- Kill process using port 5000: `netstat -ano | findstr :5000`
- Use different port in `.env` file
- Restart computer if needed

### 8. **CORS Errors**
```
Error: Access to fetch blocked by CORS policy
```
**Solutions**:
- Verify CORS configuration in `server.js`
- Check if backend is running
- Ensure frontend is running on port 5173

### 9. **Module Not Found**
```
Error: Cannot find module
```
**Solutions**:
- Run `npm install` in root directory
- Run `npm install` in client directory
- Delete `node_modules` and `package-lock.json`, then reinstall

### 10. **React/Vite Build Issues**
```
Error: Failed to resolve import
```
**Solutions**:
- Check import paths in React components
- Ensure all dependencies are installed
- Restart development server

## Testing Steps

### Backend Testing
1. Start backend: `npm start`
2. Test API endpoints using Postman or curl
3. Check MongoDB connection
4. Verify JWT token generation

### Frontend Testing
1. Start frontend: `cd client && npm run dev`
2. Open browser to http://localhost:5173
3. Check browser console for errors
4. Test authentication flow

### Integration Testing
1. Start both servers
2. Test signup/login flow
3. Verify protected routes work
4. Test API calls from frontend

## Debug Commands

### Check if ports are in use:
```bash
netstat -ano | findstr :5000
netstat -ano | findstr :5173
```

### Check Node.js and npm versions:
```bash
node --version
npm --version
```

### Check MongoDB status:
```bash
mongod --version
```

### Clear browser data:
- Open DevTools (F12)
- Go to Application tab
- Clear localStorage
- Clear cookies for localhost

## Contact

If you're still having issues:
1. Check the console logs for specific error messages
2. Verify all dependencies are installed
3. Ensure both servers are running
4. Check network connectivity
5. Try the manual startup method
