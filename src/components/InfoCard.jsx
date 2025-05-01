import React from "react";
import styled from "styled-components";
import { FeatureCard } from "./CustomComponents";

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.accent || "#333"};
  font-size: 1.25rem;
  margin-bottom: 10px;
`;

const Content = styled.p`
  color: ${({ theme }) => theme.colors.text || "#555"};
  font-size: 1rem;
  line-height: 1.5;
`;

const TagsWrapper = styled.div`
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.span`
  background-color: ${({ theme }) => theme.colors.accent || "#eee"};
  color: white;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.8rem;
`;

const InfoCard = ({ title, content, ...props}) => {
  const{tags=[]}=props
  return (
    <FeatureCard>
      <Title>{title}</Title>
      <Content>{content}</Content>

      {tags.length > 0 && (
        <TagsWrapper>
          {tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </TagsWrapper>
      )}
    </FeatureCard>
  );
};

export default InfoCard;
