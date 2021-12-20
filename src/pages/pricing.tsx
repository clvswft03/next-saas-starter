import styled from 'styled-components';

import { FaqSection, PricingTablesSection } from '@/views/PricingPage';
import { Page } from '@/views';

export default function PricingPage() {
  return (
    <Page
      title="Pricing"
      description="Cupidatat et reprehenderit ullamco aute ullamco anim tempor."
    >
      <Wrapper>
        <PricingTablesSection />
        <FaqSection />
      </Wrapper>
    </Page>
  );
}

const Wrapper = styled.div`
  & > :last-child {
    margin-bottom: 15rem;
  }
`;
