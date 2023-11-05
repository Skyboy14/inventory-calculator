import { Col, Form } from "react-bootstrap";
import styled from "styled-components";

const StyledFormLabel = styled(Form.Label)`
  height: 50px;
  white-space: nowrap;
`;
export default function DisplayUnit({ label, placeholder, unitValue, size }) {


    return (
        <Form.Group as={Col} md={size}>
            <StyledFormLabel>{label}</StyledFormLabel>
            <Form.Control
                type="text"
                placeholder={placeholder}
                value={unitValue}
                disabled
            />
        </Form.Group>

    )
}