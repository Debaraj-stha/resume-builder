import styled from "styled-components";
import { ErrorParagraph, Heading } from "../components/CustomComponents";
import { BiPhone } from "react-icons/bi";
import { BsMailbox } from "react-icons/bs";
import { FaMapMarker } from "react-icons/fa";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import Container from "../components/Container";

const PageWrapper = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  margin-top: 2rem;
`;

const FormSection = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Input = styled.input`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  resize: vertical;
  min-height: 140px;
`;

const SubmitButton = styled.button`
  padding: 1rem;
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover { opacity: 0.9; }
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const CompanyName = styled.div`
  font-size: 1.35rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  svg { color: ${({ theme }) => theme.colors.accent}; }
`;

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }).regex(/^[a-zA-Z\s'-]+$/, { message: "Name can only contain letters, spaces, hyphens, and apostrophes" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().min(1, { message: "Message is required" }),
});

const ContactPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = ({ name, email, message }) => {
    const text = `Hello Wyonora Global,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    window.open(`https://wa.me/916375862123?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <Container>
      <PageWrapper>
        <Heading>Contact Us</Heading>
        <ContactGrid>
          <FormSection onSubmit={handleSubmit(onSubmit)}>
            <Input type="text" placeholder="Your Name" {...register("name")} />
            {errors.name && <ErrorParagraph>{errors.name.message}</ErrorParagraph>}
            <Input type="email" placeholder="Your Email" {...register("email")} />
            {errors.email && <ErrorParagraph>{errors.email.message}</ErrorParagraph>}
            <TextArea placeholder="Your Message" {...register("message")} />
            {errors.message && <ErrorParagraph>{errors.message.message}</ErrorParagraph>}
            <SubmitButton type="submit">Send via WhatsApp</SubmitButton>
          </FormSection>

          <InfoSection>
            <CompanyName>Wyonora Global</CompanyName>
            <InfoItem><BiPhone size={20} /><a href="https://wa.me/916375862123" target="_blank" rel="noopener noreferrer">WhatsApp: +91 63758 62123</a></InfoItem>
            <InfoItem><BsMailbox size={20} /><a href="mailto:contact@resuaibuilder.com">contact@resuaibuilder.com</a></InfoItem>
            <InfoItem><FaMapMarker size={20} /><span>India</span></InfoItem>
          </InfoSection>
        </ContactGrid>
      </PageWrapper>
    </Container>
  );
};

export default ContactPage;
