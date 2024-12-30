'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const UseNavigation = () => {
  const pathname = usePathname();

  const [isDashboardActive, setIsDashboardActive] = useState(false);
  const [isNewOrderActive, setIsNewOrderActive] = useState(false);
  const [isOrdersActive, setIsOrdersActive] = useState(false);
  const [isInventoryActive, setIsInventoryActive] = useState(false);
  const [isStaffActive, setIsStaffActive] = useState(false);
  const [isProfileActive, setIsProfileActive] = useState(false);
  const [isHomeActive, setIsHomeActive] = useState(false);

  useEffect(() => {
    setIsDashboardActive(false);
    setIsNewOrderActive(false);
    setIsOrdersActive(false);
    setIsInventoryActive(false);
    setIsStaffActive(false);
    setIsProfileActive(false);
    setIsHomeActive(false);
    switch (pathname) {
        case '/protected':
        setIsHomeActive(true);
        break;
      case '/protected/dashboard':
        setIsDashboardActive(true);
        break;
      case '/protected/new-order':
        setIsNewOrderActive(true);
        break;
      case '/protected/orders':
        setIsOrdersActive(true);
        break;
      case '/protected/inventory':
        setIsInventoryActive(true);
        break;
        case '/protected/staff':
        setIsStaffActive(true);
        break;
      case '/protected/profile':
        setIsProfileActive(true);
        break;
      default:
        break;
    }
  }, [pathname]);

  return {
    isDashboardActive,
    isNewOrderActive,
    isOrdersActive,
    isInventoryActive,
    isStaffActive,
    isProfileActive,
    isHomeActive,};
};

export default UseNavigation;