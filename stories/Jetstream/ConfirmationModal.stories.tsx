import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { JetConfirmationModal } from '../../resources/js/Components/Jetstream/ConfirmationModal';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: JetConfirmationModal,
} as ComponentMeta<typeof JetConfirmationModal>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Primary: ComponentStory<typeof JetConfirmationModal> = (args) => (
  <JetConfirmationModal isOpen={true} onClose={() => {}}>
    <JetConfirmationModal.Content title="Confirmation Modal">
      This is the content for the modal.
    </JetConfirmationModal.Content>
    <JetConfirmationModal.Footer>
      Confirmation Modal Footer
    </JetConfirmationModal.Footer>
  </JetConfirmationModal>
);
