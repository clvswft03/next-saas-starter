import styled from 'styled-components';

import FormSection from '@/views/ContactPage/FormSection';
import InformationSection from '@/views/ContactPage/InformationSection';
import Page from '@/components/Page';
import { media } from '@/utils/media';

export default function ContactPage() {
  return (
    <Page
      title="Contact"
      description="Minim sint aliquip nostrud excepteur cupidatat amet do laborum exercitation cupidatat ea proident."
    >
      <ContactContainer>
        <InformationSection />
        <FormSection />
      </ContactContainer>
    </Page>
  );
}

const ContactContainer = styled.div`
  display: flex;

  ${media('<=tablet')} {
    flex-direction: column;
  }
`;
