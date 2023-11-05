import { Checkbox } from "@mui/material";
import { Col, Form } from "react-bootstrap";
import styled from "styled-components";


const StyledFormLabel = styled(Form.Label)`
  height: 50px;
  margin-bottom: 8px ;
  white-space: nowrap;
`;

export default function DisplayUnitWithCheck({ showCheck, check, setCheck, label, placeholder, unitValue, size }) {

    function handleCheck() {
        setCheck(!check);
    }

    return (
        <Form.Group as={Col} md={size} controlId="validationCustom05">
            <StyledFormLabel className='checkboxLable' style={{ height: '54px' }}>
                {showCheck &&
                    <Checkbox
                        checked={check}
                        onChange={handleCheck}
                        inputProps={{ 'aria-label': 'controlled' }}
                        className='checkClass'
                        color="default"
                    />}
                {label}
            </StyledFormLabel>
            <Form.Control
                type="text"
                placeholder={placeholder}
                value={check ? unitValue : 0}
                disabled
            />
        </Form.Group>

    )
}

export function PartUnitWithCheck({ showCheck, check, setCheck, label, placeholder, unitValue, size }) {



    return (
        <Form.Group as={Col} md={size} controlId="validationCustom05">
            <StyledFormLabel className='checkboxLable' style={{ height: '54px' }}>
                {showCheck &&
                    <Checkbox
                        checked={check}
                        onChange={setCheck}
                        inputProps={{ 'aria-label': 'controlled' }}
                        className='checkClass'
                        color="default"
                    />}
                {label}
            </StyledFormLabel>
            <Form.Control
                type="text"
                placeholder={placeholder}
                value={check ? unitValue : 0}
                disabled
            />
        </Form.Group>

    )
}