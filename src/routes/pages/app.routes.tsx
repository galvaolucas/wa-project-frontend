import { Route, Routes } from 'react-router-dom';
import { Films } from '../../components/Films';

export function AppRoutes () {
    return (
        <>
            <Routes>
                <Route path='/' 
                    element = {
                        <Films />
                    }
                />
            </Routes>
        </>
    )
    
}
