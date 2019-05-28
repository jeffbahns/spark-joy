import styled from 'styled-components';
import { palette } from 'styled-tools';
import "./layout.css"

export const CentralColumn = styled.div`
    margin: 0 auto;
    max-width: 960px;
`;

export const Heading = styled.h1`
    font-size: ${palette("headings", 0)};
    line-height: ${palette("headings", 0)};
    margin-bottom: 0
`;