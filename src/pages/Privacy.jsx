import styled from "styled-components";
import { Heading, Hspace } from "../components/CustomComponents";
import { privacyPolicies } from "../static-data/privacy-policies";
import Container from "../components/Container";

const PageWrapper = styled.section`
  padding: 4rem 2rem;
  max-width: 900px;
  margin: 0 auto;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text};
`;

const SubHeading = styled.h2`
  font-size: 1.5rem;
  margin-top: 2rem;
  color: ${({ theme }) => theme.colors.accent};
`;

const Paragraph = styled.p`
  margin: 1rem 0;
  font-size: 1rem;
`;

const PrivacyPage = () => {
    return (
        <Container>
            <Hspace />
            <PageWrapper>
                <Heading>Privacy Policy</Heading>

                <Paragraph>
                    Your privacy is important to us. This Privacy Policy explains how we collect,
                    use, and protect your personal information when you use our Resume Builder.
                </Paragraph>

                <div>
                    {privacyPolicies.map((policy, index) => (
                        <div key={index}>
                            <SubHeading>{policy.title}</SubHeading>
                            <Paragraph>{policy.description}</Paragraph>
                        </div>
                    ))}
                </div>


            </PageWrapper>
        </Container>

    );
};

export default PrivacyPage;
