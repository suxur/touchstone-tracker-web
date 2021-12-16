import React from 'react';
import DeleteUserForm from '@/Domains/Profile/DeleteUserForm';
import LogoutOtherBrowserSessions from '@/Domains/Profile/LogoutOtherBrowserSessionsForm';
import TwoFactorAuthenticationForm from '@/Domains/Profile/TwoFactorAuthenticationForm';
import UpdatePasswordForm from '@/Domains/Profile/UpdatePasswordForm';
import UpdateProfileInformationForm from '@/Domains/Profile/UpdateProfileInformationForm';
import useTypedPage from '@/hooks/useTypedPage';
import { JetSectionBorder } from '@/Components/Jetstream/SectionBorder';
import { AppLayout } from '@/Layouts/AppLayout';
import { Session } from '@/types';

interface Props {
  sessions: Session[];
}

export default function Show({ sessions }: Props) {
  const page = useTypedPage();

  return (
    <AppLayout title="Profile">
      <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
        {page.props.jetstream.canUpdateProfileInformation ? (
          <div>
            <UpdateProfileInformationForm user={page.props.user} />

            <JetSectionBorder />
          </div>
        ) : null}

        {page.props.jetstream.canUpdatePassword ? (
          <div className="mt-10 sm:mt-0">
            <UpdatePasswordForm />

            <JetSectionBorder />
          </div>
        ) : null}

        {page.props.jetstream.canManageTwoFactorAuthentication ? (
          <div className="mt-10 sm:mt-0">
            <TwoFactorAuthenticationForm />

            <JetSectionBorder />
          </div>
        ) : null}

        <div className="mt-10 sm:mt-0">
          <LogoutOtherBrowserSessions sessions={sessions} />
        </div>

        {page.props.jetstream.hasAccountDeletionFeatures ? (
          <>
            <JetSectionBorder />

            <div className="mt-10 sm:mt-0">
              <DeleteUserForm />
            </div>
          </>
        ) : null}
      </div>
    </AppLayout>
  );
}
