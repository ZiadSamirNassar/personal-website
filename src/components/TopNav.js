import React, { useState, useEffect } from 'react';
import { FaUser, FaBars } from 'react-icons/fa';

import '../style/TopNav.css';

const Nav = () => {

    const [navItems, setNavItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await import('../data/Cv');
                const navItems = Object.keys(response.default);
                setNavItems(navItems || []);
            } catch (err) {
                setError('Failed to load navigation data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // إغلاق القائمة عند النقر في أي مكان خارجها
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.nav-container')) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    if (loading) return <div className="loading-spinner">Loading profile...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="nav-container">
            <div className='nav-icon'>
                <FaUser className='nav-icon' size={50} />
            </div>

            {/* زر القائمة المنسدلة في الجوال */}
            <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
                <FaBars size={30} />
            </button>

            {/* القائمة */}
            <ul className={`md:flex ${menuOpen ? 'block' : 'hidden'} gap-4`}>
                {navItems.map((item, index) => (
                    <li key={index} className="nav-item">
                        <a href={`#${item.toLowerCase()}`} className="nav-link">{item}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Nav;
