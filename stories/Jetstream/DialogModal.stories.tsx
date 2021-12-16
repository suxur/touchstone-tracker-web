import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { JetDialogModal } from '../../resources/js/Components/Jetstream/DialogModal';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: JetDialogModal,
} as ComponentMeta<typeof JetDialogModal>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Primary: ComponentStory<typeof JetDialogModal> = (args) => (
  <JetDialogModal isOpen={true} onClose={() => {}}>
    <JetDialogModal.Content title="Dialog Modal">
      This is the content for the modal.
    </JetDialogModal.Content>
    <JetDialogModal.Footer>
      Dialog Modal Footer
    </JetDialogModal.Footer>
  </JetDialogModal>
);

// export const Primary = Template.bind({});
// // More on args: https://storybook.js.org/docs/react/writing-stories/args
// Primary.args = {
//
//   children: 'This is a confirmation modal.',
// };
