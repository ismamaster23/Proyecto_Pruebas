import React, { useState } from 'react';
import { Drawer } from '@mui/material';
import routesConfig from '../../routes/routes.json';
import MenuBar from './MenuBar';
import Menu from './Menu';

export default function NestedList() {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(open);
    };

    const handleClose = () => setOpen(false);

    return (
        <div>
            <MenuBar toggleDrawer={toggleDrawer} />
            <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
                <div
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <Menu routes={routesConfig.routes} handleClose={handleClose} />
                </div>
            </Drawer>
        </div>
    );
}
