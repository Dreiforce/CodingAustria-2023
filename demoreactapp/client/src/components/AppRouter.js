import React from 'react';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import Home from './Home';
import ClientView from './ClientView';
function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/u/*' element={<ClientView />} />
            </Routes>
        </Router>
    );
}
 
export default AppRouter;