import * as React from 'react';
import { useCallback, useMemo } from 'react';

import { useUser } from '@/hooks/useUser';
import { JetDropdown, JetDropdownLink } from '@/Components/Jetstream';
import { ChevronDown, ChevronUpDown } from '@/Components/Svg';
import { CircleCheckmark } from '@/Components/Svg/CircleCheckmark';
import { useLogout } from '@/hooks/auth';
import route from '@/lib/route';

export const User = () => {
  const user = useUser();
  const logout = useLogout();

  const hasTeamFeatures = false;
  const canCreateTeams = false;
  const currentTeam = useMemo(() => user.teams?.find(team => team.id === user?.current_team_id), [user]);

  const switchToTeam = useCallback((team) => {
    console.log(team.name);
  }, []);

  return (
    <div className="flex items-center ml-6">
      <div className="ml-3 relative">
        {/* Teams Dropdown */}
        <JetDropdown
          align="right"
          width="60"
          renderTrigger={() => (
            <div className="inline-flex rounded-md">
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:bg-gray-50 active:bg-gray-50 transition ease-in-out duration-150"
              >
                {currentTeam?.name}
                <ChevronUpDown />
              </button>
            </div>
          )}
        >
          <div className="w-60">
            <div className="block px-4 py-2 text-xs text-gray-400">
              Manage Team
            </div>
            <JetDropdownLink href={`/teams/${user?.current_team_id}`}>
              Team Settings
            </JetDropdownLink>
            {canCreateTeams && (
              <JetDropdownLink href="/teams/create">
                Create New Team
              </JetDropdownLink>
            )}
            <div className="border-t border-gray-100" />
            <div className="block px-4 py-2 text-xs text-gray-400">
              Switch Teams
            </div>
            {user?.teams?.map(team => (
              <JetDropdownLink as="button" key={team.id} onClick={() => switchToTeam(team)}>
                <div className="flex items-center">
                  {team.id === user?.current_team_id && <CircleCheckmark />}
                  <div>{team.name}</div>
                </div>
              </JetDropdownLink>
            ))}
          </div>
        </JetDropdown>
      </div>
      <div className="ml-3 relative">
        <JetDropdown
          align="right"
          width={48}
          renderTrigger={() => (
            <>
              {user?.profile_photo_url ? (
                <button className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
                  <img
                    className="h-8 w-8 rounded-full object-cover"
                    src={user.profile_photo_url}
                    alt={user.name}
                    width={32}
                    height={32}
                  />
                </button>
              ) : (
                <div className="inline-flex rounded-md">
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                  >
                    {user.name}
                    <ChevronDown />
                  </button>
                </div>
              ) }
            </>
          )}
        >
          <>
            {/* Account Management */}
            <div className="block px-4 py-2 text-xs text-gray-400">
              Manage Account
            </div>
            <JetDropdownLink href={route('profile.show')}>
              Profile
            </JetDropdownLink>
            <div className="border-t border-gray-100" />
            <JetDropdownLink as="button" onClick={logout}>
              Logout
            </JetDropdownLink>
          </>
        </JetDropdown>
      </div>
    </div>
  );
};
