import { Col, Form } from "react-bootstrap";
import styled from "styled-components";


const StyledFormLabel = styled(Form.Label)`
  margin-bottom: 12px;
  white-space: nowrap;
`;
export default function FormUnit({ label, value, setValue, error, errorMessage, size }) {

    return (
        <Form.Group as={Col} md={size} controlId="validationCustom05">
            <StyledFormLabel>{label}</StyledFormLabel>
            <Form.Control
                type="number"
                placeholder={label}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                isInvalid={error}
                min={0}
                max={10000}
            />
            <Form.Control.Feedback type="invalid">
                {errorMessage}
            </Form.Control.Feedback>
        </Form.Group>
    )
}

export function FormUnitText({ label, value, setValue, error, errorMessage, size }) {

    return (
        <Form.Group as={Col} md={size} controlId="validationCustom05">
            <StyledFormLabel>{label}</StyledFormLabel>
            <Form.Control
                type="text"
                placeholder={label}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                isInvalid={error}
            />
            <Form.Control.Feedback type="invalid">
                {errorMessage}
            </Form.Control.Feedback>
        </Form.Group>
    )
}