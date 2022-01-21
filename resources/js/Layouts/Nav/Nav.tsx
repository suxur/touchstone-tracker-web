import * as React from 'react';
import { useState } from 'react';
import { Link } from '@inertiajs/inertia-react';
import clsx from 'clsx';

import { JetApplicationLogo, JetNavLink, JetResponsiveNavLink } from '@/Components/Jetstream';
import { useUser } from '@/Hooks/useUser';
import { UserMenu } from '@/Layouts/Nav/UserMenu';
import useRoute from '@/Hooks/useRoute';

const Nav = () => {
  const route = useRoute();
  const user = useUser();
  // const hasTeamFeatures = false;
  // const canCreateTeams = false;
  // const currentTeam = useMemo(() => user?.teams?.find(team => team.id === user?.current_team_id), [user]);
  // const switchToTeam = useCallback((team) => {
  //     console.log(team.name);
  // }, []);
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
  return (
    <nav className="relative z-10 bg-white border-t-4 border-purple-600">
      {/* Primary Navigation Menu */}
      <div className="mx-auto px-4 md:px-6 lg:px-8 flex justify-between md:block">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center w-72">
              <Link href="/" className="block w-auto">
                <JetApplicationLogo />
              </Link>
            </div>
            {/* Navigation Links */}
            {user && (
              <div className="hidden space-x-2 md:-my-px md:ml-6 md:flex">
                <JetNavLink href="/e">
                  Encounter
                </JetNavLink>
                <JetNavLink href="/monsters">
                  Monsters
                </JetNavLink>
                <JetNavLink href={route('characters.index')}>
                  Characters
                </JetNavLink>
              </div>
            )}
          </div>
          {!user ? (
            <div className="hidden md:flex md:items-center md:ml-6">
              <Link href={route('login')} className="button bg-purple-600 hover:bg-purple-700">
                Login
              </Link>
            </div>
          ) : (
            <UserMenu />
          )}
          {/* Hamburger */}
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path
                  className={clsx({
                    'hidden': showingNavigationDropdown, 'inline-flex': !showingNavigationDropdown
                  })}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  className={clsx({
                    'hidden': !showingNavigationDropdown, 'inline-flex': showingNavigationDropdown
                  })}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {/* Responsive Navigation Menu */}
          {/*{user ? (*/}
          {/*    <div*/}
          {/*        className={clsx({*/}
          {/*            'block': showingNavigationDropdown, 'hidden': !showingNavigationDropdown*/}
          {/*        }, 'md:hidden')}*/}
          {/*    >*/}
          {/*        <div className="pt-2 pb-3 space-y-1">*/}
          {/*            <JetResponsiveNavLink href="/e">*/}
          {/*                Encounters*/}
          {/*            </JetResponsiveNavLink>*/}
          {/*            <JetResponsiveNavLink href="/monsters">*/}
          {/*                Monsters*/}
          {/*            </JetResponsiveNavLink>*/}
          {/*            <JetResponsiveNavLink href="/characters">*/}
          {/*                Characters*/}
          {/*            </JetResponsiveNavLink>*/}
          {/*        </div>*/}
          {/*        /!*Responsive Settings Options *!/*/}
          {/*        <div className="pt-4 pb-1 border-t border-gray-200">*/}
          {/*            <div className="flex items-center px-4">*/}
          {/*                {user.profile_photo_url && (*/}
          {/*                    <div className="flex-shrink-0 mr-3">*/}
          {/*                        <Image*/}
          {/*                            className="h-10 w-10 rounded-full object-cover"*/}
          {/*                            src={user.profile_photo_url}*/}
          {/*                            alt={user.name}*/}
          {/*                            width={32}*/}
          {/*                            height={32}*/}
          {/*                        />*/}
          {/*                    </div>*/}
          {/*                )}*/}
          {/*                <div>*/}
          {/*                    <div className="font-medium text-base text-gray-800">{user.name}</div>*/}
          {/*                    <div className="font-medium text-sm text-gray-500">{user.email}</div>*/}
          {/*                </div>*/}
          {/*            </div>*/}
          {/*            <div className="mt-3 space-y-1">*/}
          {/*                <JetResponsiveNavLink href="/profile">*/}
          {/*                    Profile*/}
          {/*                </JetResponsiveNavLink>*/}
          {/*                <JetResponsiveNavLink as="button" onClick={logout}>*/}
          {/*                    Logout*/}
          {/*                </JetResponsiveNavLink>*/}
          {/*                {hasTeamFeatures && currentTeam && (*/}
          {/*                    <>*/}
          {/*                        <div className="border-t border-gray-200" />*/}
          {/*                        <div className="block px-4 py-2 text-xs text-gray-400">*/}
          {/*                            Manage Team*/}
          {/*                        </div>*/}
          {/*                        <JetResponsiveNavLink href={`/teams/${currentTeam.id}`}>*/}
          {/*                            Team Settings*/}
          {/*                        </JetResponsiveNavLink>*/}
          {/*                        <JetResponsiveNavLink href="/teams/create">*/}
          {/*                            Create New Team*/}
          {/*                        </JetResponsiveNavLink>*/}
          {/*                        <div className="border-t border-gray-200" />*/}
          {/*                        <div className="block px-4 py-2 text-xs text-gray-400">*/}
          {/*                            Switch Teams*/}
          {/*                        </div>*/}
          {/*                        {user.teams.map(team => (*/}
          {/*                            <JetResponsiveNavLink*/}
          {/*                                as="button"*/}
          {/*                                key={team.id}*/}
          {/*                                onClick={() => switchToTeam(team)}*/}
          {/*                            >*/}
          {/*                                <div className="flex items-center">*/}
          {/*                                    {team.id === user?.current_team_id && <CircleCheckmark />}*/}
          {/*                                    <div>{team.name}</div>*/}
          {/*                                </div>*/}
          {/*                            </JetResponsiveNavLink>*/}
          {/*                        ))}*/}
          {/*                    </>*/}
          {/*                )}*/}
          {/*            </div>*/}
          {/*        </div>*/}
          {/*    </div>*/}
          {/*) : (*/}
          <div
            className={clsx({
              'block': showingNavigationDropdown, 'hidden': !showingNavigationDropdown
            }, 'md:hidden')}
          >
            <div className="pt-2 pb-3 space-y-1">
              <JetResponsiveNavLink href="/login">
                Login
              </JetResponsiveNavLink>
            </div>
          </div>
          {/*)}*/}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
