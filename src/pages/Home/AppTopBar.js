import React, { useState } from 'react';
import { TopBar } from '@shopify/polaris';
import { S as ProfileMajor } from '@shopify/polaris-icons/dist/icons/ProfileMajor.svg';
import { S as LogOutMinor } from '@shopify/polaris-icons/dist/icons/LogOutMinor.svg';

function AppTopBar({ user, logout, searchValue, onSearchChange }) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <TopBar
      userMenu={
        <TopBar.UserMenu
          avatar={user.avatar}
          open={userMenuOpen}
          detail='user'
          initials={user.name
            .trim()
            .split(' ')
            .map(item => item[0])
            .join('')
            .toUpperCase()}
          name={user.name}
          onToggle={() => setUserMenuOpen(!userMenuOpen)}
          actions={[
            {
              items: [
                {
                  content: 'Update Profile',
                  icon: ProfileMajor,
                  url: '/update-user',
                },
                {
                  content: 'Log Out',
                  id: 'logout',
                  onAction: logout,
                  icon: LogOutMinor,
                },
              ],
            },
          ]}
        />
      }
      searchField={
        <TopBar.SearchField
          placeholder='Search Tasks'
          value={searchValue}
          onChange={onSearchChange}
        />
      }
    />
  );
}

export default AppTopBar;
