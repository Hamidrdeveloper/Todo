import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './providers/authProvider';
import App from './App';
import 'normalize.css';
import './index.css';
import { TaskProvider } from './providers/taskProvider';

ReactDOM.render(
    <AuthProvider>
    <TaskProvider>
 
        
        <Router>
            <App />
        </Router>
       
    
    </TaskProvider>
    </AuthProvider>,
    document.getElementById('root')
);
